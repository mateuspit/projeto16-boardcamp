export default function validateNewGameSchema(schema) {
    return ((req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map(ed => ed.message);
            return res.status(400).send(errorMessages);
        }
        next();
    });
}