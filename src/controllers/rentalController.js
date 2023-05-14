import { findCustomerById } from "../services/customerServices.js";
import { findGameById } from "../services/gameServices.js";
import { findGameStock, postRentalServices } from "../services/rentalsServices.js";

export async function postRental(req, res) {
    try {
        const customerExists = await findCustomerById(req.body.customerId);
        if (!customerExists) return res.status(400).send("Cliente inexistente!");
        const gameExists = await findGameById(req.body.gameId);
        if (!gameExists) return res.status(400).send("Jogo inexistente!");
        const hasStock = await findGameStock(req.body.gameId)
        console.log("hasStock", hasStock);
        if (!hasStock) return res.status(400).send("Estoque inexistente!");
        await postRentalServices(req.body);
        res.sendStatus(201);
    }
    catch (err) {
        return console.log(err.message);
    }
}