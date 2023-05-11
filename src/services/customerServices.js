import { db } from "../database/database-connection.js";

export async function getCustomersServices(customersFilters) {
    //a entrada é filtrada pelos middlewares usando schemas.
    //em services ocorrem as operações, as funções
    //o resultado das funções dão a resposta nos controllers
    //o req.body é enviado ao service pelo controller
    //console.log(id);
    const basicDBString = `SELECT * FROM customers`;
    let values = [];
    try {
        let filterString = basicDBString;

        console.log(customersFilters.cpf);
        if (customersFilters.cpf) {
            const filterCpfString = ` WHERE cpf LIKE $1`;
            filterString += filterCpfString;
            values.push(customersFilters.cpf + `%`);
        }

        //const allCustomers = await db.query(filterString, values);
        const allCustomers = await db.query(filterString, values);
        return allCustomers.rows;
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function getCustomersByIdServices(id) {
    try {
        const customerById = await db.query(`SELECT * FROM customers WHERE id = $1`, [id]);
        return customerById.rows;
    }
    catch (err) {
        return console.log(err.message);
    }
}