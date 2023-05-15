import { getCustomersServices, getCustomersByIdServices, postCustomersServices, findCustomerByCpf, attCustomerServices, findCustomerById } from "../services/customerServices.js";


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
    try {allCustomers
        //const idExists = await db.query(`SELECT id FROM customers WHERE id = $1`, [req.params.id]);
        //if(!idExists) return res.status(404).send("id não existe!");
        const customerById = await getCustomersByIdServices(req.params.id);
        if (customerById.length === 0) return res.status(404).send("id não existe!");
        customerById.forEach((obj) => {
            //const newBirthday = obj.birthday.toISOString().slice(0,10);
            obj.birthday = obj.birthday.toISOString().slice(0, 10);;
        });
        return res.send(customerById);
        //if (allCustomers.length === 0) return res.status(404).send("Cliente n encontrado!")
        //console.log(allCustomers);
        //allCustomers.forEach((obj) => {
        //    //const newBirthday = obj.birthday.toISOString().slice(0,10);
        //    obj.birthday = obj.birthday.toISOString().slice(0, 10);;
        //});
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function postCustomer(req, res) {
    try {
        console.log(await findCustomerByCpf(req.body.cpf));
        if (await findCustomerByCpf(req.body.cpf)) return res.status(409).send("Usuario já existe!");
        await postCustomersServices(req.body);
        return res.sendStatus(201);
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function attCustomer(req, res) {
    //console.log("req.params", req.params.id)
    const attUserId = Number(req.params.id);
    //console.log(typeof attUserId);
    //console.log("attUserId", attUserId);
    try {
        const customerDataToAtt = await findCustomerById(attUserId);
        console.log("customerData", customerDataToAtt);
        if (!customerDataToAtt) return res.status(404).send("Cliente inexistente!");
        console.log("customerDataToAtt.cpf", customerDataToAtt.cpf);
        // Busco no banco de dados um cliente com o CPF entrado em params
        // Caso exista:
        // Comparo os ids, se forem igual, faço a mudança
        // Comparo os ids, se forem diferentes, não mudo error 409
        // Caso não exista, faço a mudança
        const customerData = await findCustomerByCpf(req.body.cpf);
        console.log("customerData", customerData.cpf);
        if (!customerData) {
            //console.log("User não cadastrado, pode att");
            //console.log("primeiro if");
            await attCustomerServices(req.body, customerDataToAtt.cpf);
            return res.sendStatus(200);
        }
        else if (customerData.cpf === customerDataToAtt.cpf) {
            //console.log("segundo if");
            await attCustomerServices(req.body, customerDataToAtt.cpf);
            return res.sendStatus(200);
        }
        else {
            //console.log("terceiro if")
            return res.status(409).send("CPF pertence a outro cliente!")
        }
    }
    catch (err) {
        return console.log(err.message);
    }
}