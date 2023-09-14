/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

/** load obat controller */
const adminController = require(`../controller/admin.controller`)
// load authorize from middleware'
const authorization =
require(`../middleware/authorization`)
/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))

/** create route for access obat's data */
app.get("/", authorization.cekUser,adminController.showDataAdmin)

// create route for show add obat view
app.get("/add", authorization.cekUser,adminController.showAddPage)

// create route for proses new obat
app.post("/add", authorization.cekUser,adminController.processInsert)

// create route for show edit obat view
app.get("/edit/:id",authorization.cekUser,adminController.showEditPage)

// create route untuk edit obat
app.post("/edit/:id",authorization.cekUser,adminController.processUpdate)

/** create route for process delete obat */
app.get("/delete/:id", authorization.cekUser,adminController.processDelete)
/** :id -> name of paramter URL */


/** export object "app" to another file */
module.exports = app
