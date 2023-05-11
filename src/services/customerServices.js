import { db } from "../database/database-connection.js";

export async function getCustomersServices() {
    //a entrada é filtrada pelos middlewares usando schemas.
    //em services ocorrem as operações, as funções
    //o resultado das funções dão a resposta nos controllers
    //o req.body é enviado ao service pelo controller
    const basicDBString = `SELECT * FROM customers`;
    let values = [];
    console.log("ihu");
    try {
        let filterString = basicDBString;
        const allCustomers = await db.query(filterString, values);
        return allCustomers.rows;
    }
    catch (err) {
        console.log(err.message);
    }
}

export async function getCustomersByIdServices(id){
    try{
        const customerById = await db.query(`SELECT * FROM customers WHERE id = $1`, [id]);
        return customerById.rows;
    }
    catch (err){
        return console.log(err.message);
    }
}