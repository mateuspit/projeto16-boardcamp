export default function validadeNewCustomer(schema) {
    return ((req, res, next) => {
        console.log("validadeNewCustomer",req.body.birthday);
        const { error } = schema.validate(req.body, { abortEarly: false });
        const errorMessages = error?.details.map(ed => ed.message);
        if (errorMessages) return res.status(400).send(errorMessages);
        next();
    });
}