// load model admin
const adminModel = require(`../models/admin.model`)

// load crypt
const crypt = require(`../crypt`)


// function utk menampilkan hlm login
exports.showLogin = (request, response) => {
    try {
        return response.render(`../views/pages/login`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// function baru utk proses authentication
exports.authentication = async (request, response) => {
    try {
        // tampung data username &password
        let username = request.body.user_name
        let password = request.body.password

        //check kecocokan username dlu
        let result = await adminModel.findByCriteria({ username: username })


        // cek eksistensi data admin 
        // 123 === (kjwdnemddhjenlsi)
        if (result.length > 0) {
            console.log(`${password} === ${crypt.deskripsi(result[0].password)}`);
            // cek dulu kecocokan password
            if (password === crypt.deskripsi(result[0].password)) {
                // loginn berhasil
                // menyimpan data user ke session
                // `userData` = label of session
                request.session.dataUser = result[0]

                // membuat sessuion cart
                request.session.cart = []

                return response.redirect(`/telur`)
            } else {
                // login gagal
                return response.redirect(`/auth`)
            }
        } else {
            //data admin tidak ada
            return response.redirect(`/auth`)
        }

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// membuat function untuk logout
exports.logout = async (request, response) => {
    try {
        // menghapus data user dari session
        request.session.dataUser = undefined

        // kembali ke login
        return response.redirect(`/auth`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }

}