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
        if (customersFilters.order || customersFilters.desc) {
            const filterOrderString = ` ORDER BY ${customersFilters.order}`;
            filterString += filterOrderString;
            if (customersFilters.desc === "true") {
                const filterOrderDesc = ` DESC`
                filterString += filterOrderDesc;
            }
        }
        //if (customersFilters.order || customersFilters.desc) {
        //    const filterOrderString = ` ORDER BY name`;
        //    filterString += filterOrderString;
        //    if (customersFilters.desc === "true") {
        //        const filterOrderDesc = ` DESC`
        //        filterString += filterOrderDesc;
        //    }
        //}
        if (customersFilters.offset) {
            const filterOffsetString = (customersFilters.cpf)
                ? ` OFFSET $2` : ` OFFSET $1`;
                    //? ` OFFSET $2` : ` OFFSET $1`);
            filterString += filterOffsetString;
            values.push(customersFilters.offset);
        }
        //if (customersFilters.offset) {
        //    const filterOffsetString = customersFilters.cpf ? ` OFFSET $2` : ` OFFSET $1`;
        //    filterString += filterOffsetString;
        //    values.push(customersFilters.offset);
        //}
        if (customersFilters.limit) {
            const filterLimitString = (customersFilters.cpf && customersFilters.offset)
                ? ` LIMIT $3` : (customersFilters.cpf || customersFilters.offset)
                    ? ` LIMIT $2` : ` LIMIT $1`;
                        //? ` LIMIT $2` : ` LIMIT $1`);
            filterString += filterLimitString;
            values.push(customersFilters.limit);
        }
        console.log(filterString);
        console.log(values);
        const allCustomers = await db.query(filterString, values);
        //const allCustomers = await db.query(`SELECT * FROM customers ORDER BY name`);
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

export async function postCustomersServices(customerData) {
    //a entrada é filtrada pelos middlewares usando schemas.
    //em services ocorrem as operações, as funções
    //o resultado das funções dão a resposta nos controllers
    //o req.body é enviado ao service pelo controller
    //console.log(id);
    try {
        console.log("postCustomersServices", customerData.birthday);
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1,$2,$3,to_date($4, 'YYYY-MM-DD'));`, [
            customerData.name,
            customerData.phone,
            customerData.cpf,
            customerData.birthday
        ]);
        console.log("postCustomersServices2", customerData.birthday);
        return true;
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function findCustomer(customerCpf) {
    try {
        console.log("findCustomer");
        const customerExists = await db.query(`SELECT * FROM customers 
                                            WHERE cpf = $1`, [customerCpf]);
        if (customerExists.rows[0]) return true;
        return false;
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function attCustomerServices(){
    try{

    }
    catch (err){
        return console.log(err.message);
    }
}