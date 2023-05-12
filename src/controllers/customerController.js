import { getCustomersServices, getCustomersByIdServices, postCustomersServices, findCustomer, attCustomerServices } from "../services/customerServices.js";


export async function getCustomers(req, res) {
    console.log("test");
    try {
        //console.log(req);
        console.log("id", req.params.id);
        console.log("query", req.query);
        const allCustomers = await getCustomersServices(req.query);
        if (allCustomers.length === 0) return res.status(404).send("Cliente n encontrado!")
        console.log(allCustomers);
        allCustomers.forEach((obj) => {
            //const newBirthday = obj.birthday.toISOString().slice(0,10);
            obj.birthday = obj.birthday.toISOString().slice(0, 10);;
        });
        //console.log(allCustomers);
        return res.send(allCustomers);
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function getCustomersById(req, res) {
    try {
        //const idExists = await db.query(`SELECT id FROM customers WHERE id = $1`, [req.params.id]);
        //if(!idExists) return res.status(404).send("id não existe!");
        const customerById = await getCustomersByIdServices(req.params.id);
        if (customerById.length === 0) return res.status(404).send("id não existe!");
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
        //const allCpfs = await db.query(`SELECT cpf FROM customers`);
        //console.log(allCpfs)
        //const validCpf = await db.query(`SELECT cpf FROM customers WHERE cpf = $1`, [req.body.cpf]);
        const getValidCpf = await findCustomer(req.body.cpf);
        //console.log("getValidCpf", getValidCpf);
        //console.log("req.body.cpf", req.body.cpf);
        console.log("getValidCpf", !!getValidCpf);
        console.log("req.body.cpf !== getValidCpf)", (req.body.cpf !== getValidCpf));
        //console.log("!req.body.cpf", !req.body.cpf);
        //console.log("body", req.body);
        if (((req.body.cpf !== getValidCpf))) return res.status(409).send("Não é possivel alterar o CPF");
        //if (!((req.body.cpf === getValidCpf) || !getValidCpf)) return res.status(409).send("Não é possivel alterar o CPF");
        //await db.query(`UPDATE customers 
        //            SET name=$1, phone=$2, cpf=$3, birthday=to_date($4, 'YYYY-MM-DD') WHERE cpf = $5`, [
        //    req.body.name,
        //    req.body.phone,
        //    req.body.cpf,
        //    req.body.birthday
        //])
        await attCustomerServices(req.body);
        //if (!oldCpf) return res.status(409).send("Não é possivel alterar o CPF");
        return res.sendStatus(200);
    }
    catch (err) {
        return console.log(err.message);
    }
}