import { findCustomerById } from "../services/customerServices.js";
import { findGameById } from "../services/gameServices.js";
import { findGameStock, postRentalServices, getRentalsServices, findRentalById, finishRentalServices } from "../services/rentalsServices.js";

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

export async function getRentals(req, res) {
    try {
        const rentals = await getRentalsServices(req.query);
        res.send(rentals);
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function finishRental(req, res) {
    try {
        const rentalExists = await findRentalById(req.params.id);
        //console.log("rentalExists", rentalExists);
        if (!rentalExists) return res.status(404).send("Aluguel inexistente!");
        //console.log("rentalExists.returnDate", rentalExists.returnDate);
        //console.log("!rentalExists.returnDate", !rentalExists.returnDate);
        if (rentalExists.returnDate) return res.status(400).send("Aluguel finalizado!");
        await finishRentalServices(rentalExists);
        res.sendStatus(200);
    }
    catch (err) {
        return console.log(err.message);
    }
}