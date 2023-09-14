// panggil si expres
const express = require(`express`)

// buat object utk express
const app = express()

// minta ijin utk membaca reques dri user
app.use(express.urlencoded({extended:true }))

//panggil controller auth
const authController = require(`../controller/auth.controller`)

// membuat route utk menampilkan hlm login
app.get(`/`, authController.showLogin)

// membuat route utk proses login
app.post(`/`,authController.authentication)

// membuat route untuk proses logout
app.get(`/logout`, authController.logout)

// export object app
module.exports = app