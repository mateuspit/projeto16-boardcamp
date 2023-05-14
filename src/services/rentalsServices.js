import { db } from "../database/database-connection.js";

export async function findGameStock(gameId) {
    try {
        const gameRentedData = await db.query(`SELECT "returnDate" FROM rentals WHERE "gameId" = $1`, [gameId]);
        const gameStock = await db.query(`SELECT "stockTotal" FROM games WHERE id = $1`, [gameId]);
        const totalRentedGames = gameRentedData.rows.length;
        //console.log(gameRentedData.rows);
        //console.log("gameStock.rows", gameStock.rows);
        //console.log("gameStock.rows[0].stockTotal", gameStock.rows[0].stockTotal);
        //console.log("totalRentedGames", gameRentedData.rows.length);
        //console.log("(gameStock.rows[0].stockTotal > totalRentedGames)", (gameStock.rows[0].stockTotal > totalRentedGames));
        return ((gameStock.rows[0].stockTotal > totalRentedGames));
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function postRentalServices(rentalData) {
    try {
        const returnDate = null;
        const delayFee = null;

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        const rentDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        //console.log(formattedDate); // exemplo de output: '2023-05-12'
        //com o gameID preciso descobri o pricePerDay do jogo e multiplicar por daysRented;

        const gamePricePerDay = await db.query(`SELECT "pricePerDay" FROM games WHERE id = $1`, [rentalData.gameId]);
        console.log(gamePricePerDay);
        const originalPrice = Number(gamePricePerDay.rows[0].pricePerDay) * Number(rentalData.daysRented);

        console.log({
            customerId: Number(rentalData.customerId),//user input
            gameId: Number(rentalData.gameId),//user input
            rentDate: rentDate,
            daysRented: Number(rentalData.daysRented),//user input
            returnDate: returnDate,
            originalPrice: Number(originalPrice),
            delayFee: delayFee
        })

        await db.query(`INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee")
        VALUES ($1,$2,$3,$4,$5,$6,$7)`, [
            Number(rentalData.customerId),//user input
            Number(rentalData.gameId),//user input
            rentDate,
            Number(rentalData.daysRented),//user input
            returnDate,
            Number(originalPrice),
            delayFee
        ]);
    }
    catch (err) {
        return console.log(err.message);
    }
}