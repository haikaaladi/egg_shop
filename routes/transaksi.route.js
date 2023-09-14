// memanggil express
const express = require(`express`)

// membuat object dari express
const app = express()

// izin membaca data dari request.body
app.use(express.urlencoded({extended: true}))

// memanggil controller transaksi
const transaksiController = require (`../controller/transaksi.controller`)

// load authorizaction dari middleware
const authorization = require(`../middleware/authorization`)

// membuat route untuk menampilkan form transaksi
app.get(`/add`, authorization.cekUser, transaksiController.showFormTransaksi)

// route utk menyimpan data transaksi
app.post(`/add`,authorization.cekUser,transaksiController.simpanTransaksi)

// route utk menampilkan data transaksinya
app.get(`/`,authorization.cekUser,transaksiController.showTransaksi)

// route utk menghapus data transaksi
app.get(`/:id`,authorization.cekUser,transaksiController.hapusTransaksi)

// export object app
module.exports = app