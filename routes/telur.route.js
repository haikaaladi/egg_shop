/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

/** load telur controller */
const telurController = require(`../controller/telur.controller`)

// const authController = require(`../controller/auth.controller`)

const authorization =
require(`../middleware/authorization`)

// /** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))



/** create route for access telur's data */
app.get("/",authorization.cekUser, telurController.showDataTelur)

// create route for show add telur view
app.get("/add",authorization.cekUser,telurController.showAddPage)

// create route for proses new telur
app.post("/add",authorization.cekUser,telurController.processInsert)

// create route for show edit telur view
app.get("/edit/:id",authorization.cekUser,telurController.showEditPage)

// create route untuk edit telur
app.post("/edit/:id",authorization.cekUser,telurController.processUpdate)

/** create route for process delete telur */
app.get("/delete/:id",authorization.cekUser, telurController.processDelete)
/** :id -> name of paramter URL */


/** export object "app" to another file */
module.exports = app
