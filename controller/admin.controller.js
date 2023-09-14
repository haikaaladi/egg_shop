/** controller file contains logic function for
 * accepting requests from user and giving responses
 * to user.
 * 
 * if controller needs to manage data in database,
 * it has to load model's file first.
 */

/** load model's file of obat */
const adminModel = require(`../models/admin.model`)

/** -------------------------------------
 * create function to handle request
 * with url: /obat/ with method GET
 */
exports.showDataAdmin = async (request, response) => {
    try {
        /** get data obat using model */
        let dataAdmin = await adminModel.findAll()

        /** send data to view */
        let sendData = {
            page: `admin`,
            data: dataAdmin,
            dataUser: request.session.dataUser
        }

        /** set view page for this function */
        return response.render(`../views/index`, sendData)
        
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
/** -------------------------------------
 * create function to handle request
 * with url: /obat/add with method GET
 */

 exports.showAddPage = (request, response) => {
    let sendData = {
        page: `form-admin`, // page that will be show
        /** set empty data because this is add feature */
        nama_admin: ``,
        username:``,
        password: ``,
        dataUser: request.session.dataUser,
        /** set target route for submit filled data */
        targetRoute: `/admin/add`
    }

    /** set view page for this function */
    return response.render(`../views/index`, sendData)
}

/** -------------------------------------
 * create function to handle request
 * with url: /obat/add with method POST
 */

 exports.processInsert = async (request, response) => {
    try {
        /** reading obat's data from user that has sent */
        let newAdmin = {

            nama_admin: request.body.nama_admin,
            username: request.body.username,
            password: request.body.password
        }

        /** call function for insert to table of obat */
        await adminModel.add(newAdmin)

        /** redirect to obat's page */
        return response.redirect(`/admin`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}
/** -------------------------------------
 * create function to handle request
 * with url: /obat/edit/ID with method GET
 */

 exports.showEditPage = async (request, response) => {
    /** read selected ID from URL parameter */
    let selectedID = request.params.id

    /** store selected ID to object "parameter" */
    let parameter = {
        id: selectedID // 'id' is similar as column's name of table
    }

    /** call function for get data from database based on seleced id */
    let selectedData = await memberModel.findByCriteria(parameter)

    /** prepare data to send to view page  */
    let sendData = {
        page: `form-admin`, // page that will be show
        /** set each data based on data that will be change */
        nama_admin: selectedData[0].nama_admin,
        username: selectedData[0].username,
        password: selectedData[0].password,
        /** set target route for submit filled data */
        targetRoute: `/admin/edit/${selectedID}`,
        dataUser: request.session.dataUser
    }

    /** set view page for this function */
    return response.render(`../views/index`, sendData)

}

exports.processUpdate = async (request, response)=>{
    try {
        let selectedID = request.params.id

        let parameter = {
            id:selectedID

        }
        let newAdmin = {
            nama_admin: request.body.nama_admin,
            username: request.body.username,
            password : request.body.password
        }
        await adminModel.update(newAdmin, parameter)

        // redirect ke member
        return response.redirect(`/admin`)
    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// create function delete
exports.processDelete = async (request, response)=>{
    try {
        /** read selected ID from URL parameter */
        let selectedID = request.params.id

        /** store selected ID to object "parameter" */
        let parameter = {
            id: selectedID // 'id' is similar as column's name of table
        }

        /** call function for delete data table of obat */
        await adminModel.delete(parameter)

        /** redirect to obat's page */
        return response.redirect(`/admin`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}





