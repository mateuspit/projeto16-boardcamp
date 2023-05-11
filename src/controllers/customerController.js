import { getCustomersServices, getCustomersByIdServices } from "../services/customerServices.js";


export async function getCustomers(req, res) {
    try {
        const allCustomers = await getCustomersServices();
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