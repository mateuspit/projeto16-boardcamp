export default function validadeQuery(schema) {
    return ((req, res, next) => {
        const { error } = schema.validate(req.query, { abortEarly: false });
        const errorMessages = error?.details.map(ed => ed.message);
        if (errorMessages) return res.status(400).send(errorMessages);
        next();
    });
}