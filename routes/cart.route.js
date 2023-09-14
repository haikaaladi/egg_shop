// memanggil si express
const express = require(`express`)

// membuat objevt untuk express
const app = express()

// meminta izin untuk membaca request pada user
app.use(express.urlencoded({extended: true}))

// memanggil controller transaksi
const transaksiController = require (`../controller/transaksi.controller`)

// load authorizaction dari middleware
const authorization = require(`../middleware/authorization`)

// definisikan route untuk menambahkan isi cart
app.post(`/`, authorization.cekUser, transaksiController.addToCart)

// definisikan route untuk menghapus item pada cart
app.get(`/:id`, authorization.cekUser, transaksiController.hapusCart)

// export object app
module.exports = app