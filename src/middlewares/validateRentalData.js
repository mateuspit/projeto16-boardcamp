export default function validateRentalData(schema) {
    return ((req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        const errorMessages = error?.details.map(ed => ed.message);
        if (errorMessages) return res.status(400).send(errorMessages);
        next();
    });
}