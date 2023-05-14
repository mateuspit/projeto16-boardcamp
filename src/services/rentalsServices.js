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

export async function getRentalsServices(rentalFilters) {
    const basicDBString = `SELECT rentals.id, rentals."customerId", rentals."gameId", rentals."rentDate", rentals."daysRented", rentals."returnDate", rentals."originalPrice", rentals."delayFee", customers.name AS "customerName", games.name AS "gameName"
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id`;
    try {
        console.log("rentalFilters.customerId", rentalFilters.customerId);
        console.log("rentalFilters.gameId", rentalFilters.gameId);
        console.log("rentalFilters.length", rentalFilters.length);
        console.log("rentalFilters.length", !!rentalFilters.length);
        let filterString = basicDBString;
        let rentals
        let values = [];
        if (rentalFilters.length) {
            rentals = await db.query(filterString);
            //console.log(rentals);
        }
        else{
            if (rentalFilters.customerId) {
                console.log("rentalFilters.customerIdfff");
                const customerIdFilter = ` WHERE rentals."customerId"=$1`;
                filterString += customerIdFilter;
                values.push(rentalFilters.customerId);
            }
            console.log("filterString",filterString);
            console.log("values",values);
            rentals = await db.query(filterString, values);
        }
        
        //console.log("rentalFilters", rentalFilters);
        //console.log("rentalFilters.length === 0", (rentalFilters.rows));
        //console.log("filterString", filterString);
        //console.log("values", values);

        
        const rentalsDataObject = rentals.rows.map(rr => ({
            id: rr.id,
            customerId: rr.customerId,
            gameId: rr.gameId,
            rentDate: new Date(rr.rentDate).toISOString().slice(0, 10),
            daysRented: rr.daysRented,
            returnDate: rr.returnDate,
            originalPrice: rr.originalPrice,
            delayFee: rr.delayFee,
            customer: {
                id: rr.customerId,
                name: rr.customerName
            },
            game: {
                id: rr.gameId,
                name: rr.gameName
            }
        }));

        return rentalsDataObject;
    }
    catch (err) {
        return console.log(err.message);
    }
}