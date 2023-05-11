import { getCustomersServices, getCustomersByIdServices, postCustomersServices, findCustomer } from "../services/customerServices.js";


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
        console.log(await findCustomer(req.body.cpf));
        if (await findCustomer(req.body.cpf)) return res.status(409).send("Usuario já existe!");
        await postCustomersServices(req.body);
        return res.sendStatus(201);
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function attCustomer(req, res) {
    try {
        const allCpfs = await db.query(`SELECT cpf FROM customers`);
        console.log(allCpfs)
        //if (!oldCpf) return res.status(409).send("Não é possivel alterar o CPF");
        return res.sendStatus(200);
    }
    catch (err) {
        return console.log(err.message);
    }
}