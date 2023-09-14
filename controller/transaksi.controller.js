/** memanggil model obat */
const telurModel = require(`../models/telur.model`)

/** memanggil model obat */
const packModel = require(`../models/pack.model`)

/** memanggil model customer */
const memberModel = require(`../models/member.model`)
const { request, response } = require("express")

// memanggil model transaksi
const transaksiModel = require(`../models/transaksi.model`)

// memanggil model detail transaksi
const detailModel = require(`../models/detail_transaksi.model`)


exports.showTransaksi = async(request, response) => {
    try {
        let transaksi = await transaksiModel.findAll()

        for (let i = 0; i < transaksi.length; i++) {
            // ambil id_transaksi
            let id = transaksi[i].id
            // ambil data detailnya sesuai id
            let detail = await detailModel.findByCriteria({id_transaksi: id})
            // sisipkan detail ke transaksi nya
            transaksi[i].detail = detail
        }
        let sendData = {
            page: `transaksi`,
            dataUser: request.session.dataUser,
            transaksi: transaksi
        }

        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** function utk menampilkan form transaksi */
exports.showFormTransaksi = async (request, response) => {
    try {
        // ambil data telur
        let telur = await telurModel.findAll()

        let pack = await packModel.findAll()
        // ambil data member
        let member = await memberModel.findAll()

        // prepare data dipassing ke view
        let sendData = {
            dataTelur: telur,
            dataPack: pack,
            dataMember: member,
            page: `form-transaksi`,
            tgl_transaksi: ``,
            id_member: ``,
            id_admin: ``,
            dataTelurString: JSON.stringify(telur), // string
            dataPackString: JSON.stringify(pack), // string
            // JavaScriptObjectNotation = JSON 
            dataUser: request.session.dataUser,
            cart: request.session.cart

        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fungsi menambah obat ke keranjang
exports.addToCart = async (request, response) => {
    try {
        let selectedTelur = await telurModel.findAll({
            id_telur:request.body.id_telur
        })
        let selectedPack = await packModel.findAll({
            id_pack: request.body.id_pack
        })
        
        // let total = await totalKeseluruhan.findAll()

        let storData = {
            id_telur: request.body.id_telur,
            jenis_telur: selectedTelur[0].jenis_telur,
            jumlah_telur: request.body.jumlah_telur,
            harga_telur: request.body.harga_telur,
            id_pack: request.body.id_pack,
            nama_pack: selectedPack[0].nama_pack,
            jumlah_pack: request.body.jumlah_pack,
            harga_pack: request.body.harga_pack,

        }
        // memasukan data ke keranjang menggunakn session
        request.session.cart.push(storData)

        return response.redirect(`/transaksi/add`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// function utk menghapus data item di cart
exports.hapusCart = async (request, response) => {
    try {
        // mengambil seluruh data cart pda session
        let cart = request.session.cart

        // mengambil id_obat yang akan dihapus dari cart
        let id_telur = request.params.id
        

        // cari tahu posisi index dari data yang akan dihapus
        let index = cart.findIndex(item => item.id_telur == id_telur)

        // menghapus data sesuai index yang telah ditentukan
        cart.splice(index, 1)
        // splice digunakan untuk menghapus data pada array

        // kembalikan data cart ke dalam session
        request.session.cart = cart

        // direct ke halaman form-transaksi
        return response.redirect(`/transaksi/add`)
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// function utk menyimpan data transakasi

exports.simpanTransaksi = async (request, response) => {
    try {
        let newTransaksi={
            tgl_transaksi: request.body.tgl_transaksi,
            id_member: request.body.id_member,
            id_admin:request.session.dataUser.id
        }
            // simpan
            let resultTransaksi = await transaksiModel.add(newTransaksi)

            // menampung isi cart
            let cart = request.session.cart

            for (let i = 0; i < cart.length; i++) {
                
                // hapus key nama_obat dri cart
                delete cart[i].jenis_telur

                 // hapus key nama_obat dri cart
                 delete cart[i].nama_pack

                cart[i].id_transaksi = resultTransaksi.insertId

                // ekskusi sompan cart ke detail transaksi
                await detailModel.add(cart[i])
                
            }
            // hapus cart
            request.session.cart = []
            return response.redirect(`/transaksi`)
        
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// membuat fungsi untuk menampilkan data transaksi
exports.showTransaksi = async (request, response) => {
    try {
        // ambil dataa transaksi
        let transaksi = await transaksiModel.findAll()

        // sisipin data detail darisetiap transakasi
        for (let i = 0; i < transaksi.length; i++) {

            
            // ambil id transaksi
            let id = transaksi[i].id
            // ambil datadetailnya sesuai id
            let detail = await detailModel.findByCriteria({ id_transaksi: id })
            // sisipin detail ke transaksinya
            transaksi[i].detail = detail
        }
        // prepare data yg dikirim ke view
        let sendData = {
            page: `transaksi`,
            dataUser: request.session.dataUser,
            transaksi: transaksi
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// menghapus data transaksi
exports.hapusTransaksi = async (request, response) => {
    try {
        // mrnampung data id yang akan dihapus
        let id = request.params.id
        // proses hapus data detail transaksi
        await detailModel.delete({id_transaksi:id})

        // menghapus data transaksi
        await transaksiModel.delete({id:id})

        // kembali kehalaman transaksi
        return response.redirect(`/transaksi`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)

    }
}