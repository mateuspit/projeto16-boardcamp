import { getCustomersServices, getCustomersByIdServices } from "../services/customerServices.js";


export async function getCustomers(req, res) {
    console.log("test");
    try {
        //console.log(req);
        console.log("id", req.params.id);
        console.log("query", req.query);
        const allCustomers = await getCustomersServices(req.query);
        if (allCustomers.length === 0) return res.status(404).send("Cliente n encontrado!")
        return res.send(allCustomers);
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function getCustomersById(req, res) {
    try {
        const customerById = await getCustomersByIdServices(req.params.id);
        return res.send(customerById);
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function postCustomer(req, res) {
    try {
        
    }
    catch (err) {
        return console.log(err.message);
    }
}