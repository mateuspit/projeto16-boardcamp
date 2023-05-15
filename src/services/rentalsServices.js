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
        let filterString = basicDBString;
        let rentals;
        let values = [];
        if (Object.keys(rentalFilters).length === 0) {
            rentals = await db.query(filterString);
            console.log(!!rentalFilters.length);
        }
        else {
            if (rentalFilters.customerId) {
                const customerIdFilter = ` WHERE rentals."customerId"=$1`;
                filterString += customerIdFilter;
                values.push(Number(rentalFilters.customerId));
            }
            if (rentalFilters.gameId) {
                console.log("rentalFilters.customerIdFilter", rentalFilters.customerId)
                const gameIdFilter = rentalFilters.customerId
                    ? ` WHERE rentals."gameId"=$2` : (` WHERE rentals."gameId"=$1`);
                filterString += gameIdFilter;
                values.push(Number(rentalFilters.gameId));
            }
            if (rentalFilters.order) {
                const orderFilter = ` ORDER BY "${rentalFilters.order}"`
                filterString += orderFilter;
                console.log("rentalFilters.desc", rentalFilters.desc);
                if (rentalFilters.desc === "true") {
                    const descFilter = ` DESC`;
                    filterString += descFilter;
                }
            }
            if (rentalFilters.offset) {
                const offsetFilter = (rentalFilters.customerId && rentalFilters.gameId)
                    ? ` OFFSET $3` : (rentalFilters.customerId || rentalFilters.gameId)
                        ? ` OFFSET $2` : ` OFFSET $1`;
                filterString += offsetFilter;
                values.push(Number(rentalFilters.offset));
            }
            if (rentalFilters.limit) {
                const limitFilter = Object.keys(rentalFilters).length === 4
                    ? ` LIMIT $4` : (Object.keys(rentalFilters).length === 3)
                        ? ` LIMIT $3` : (Object.keys(rentalFilters).length === 2)
                            ? ` LIMIT $2` : ` LIMIT $1`;
                filterString += limitFilter;
                values.push(Number(rentalFilters.limit));
            }
            console.log("filterString", filterString);
            console.log("values", values);
            //rentals = await db.query(`SELECT rentals.id, rentals."customerId", rentals."gameId", rentals."rentDate", rentals."daysRented", rentals."returnDate", rentals."originalPrice", rentals."delayFee", customers.name AS "customerName", games.name AS "gameName"
            //FROM rentals
            //JOIN customers ON rentals."customerId" = customers.id
            //JOIN games ON rentals."gameId" = games.id 
            //WHERE rentals."customerId"=$1`, [Number(rentalFilters.customerId)]);
            //let query = "JOIN games ON rentals.gameId = games.id WHERE rentals.customerId=$1 WHERE rentals.gameId=$2";

            const firstWhereIndex = filterString.indexOf("WHERE"); // encontrar a posição do primeiro WHERE
            filterString = filterString.slice(0, firstWhereIndex + 5) + filterString?.slice(firstWhereIndex + 5).replace(/WHERE/g, 'AND');
            rentals = await db.query(filterString, values);
            console.log("filterString", filterString);
            console.log("values", values);
            //console.log("rentals.rows", rentals.rows);
        }
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

export async function findRentalById(rentalId) {
    try {
        const rental = await db.query(`SELECT * FROM rentals WHERE id=$1`, [rentalId]);
        //console.log("rental.rows", rental.rows);
        if (rental.rows.length) return rental.rows[0];
    }
    catch (err) {
        return console.log(err.message);
    }
}

export async function finishRentalServices(rentalData) {
    try {
        //adicionando a data de retorno do jogo
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const returnDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        console.log("returnDate", returnDate);
        console.log("rentalData.id", rentalData.id);
        await db.query(`UPDATE rentals SET "returnDate"=$1 WHERE id=$2`, [returnDate, rentalData.id]);

        //pegando a diaria do jogo
        const pricePerDay = await db.query(`SELECT "pricePerDay" FROM games WHERE id=$1`, [Number(rentalData.gameId)]);
        console.log("pricePerDay.rows[0].pricePerDay", pricePerDay.rows[0].pricePerDay);

        //adicionando multa, caso existe
        //const pickGameData = new Date(rentalData.rentDate);
        const pickGameData = new Date(rentalData.rentDate).getTime();
        const combinedReturnData = (pickGameData) + rentalData.daysRented * 24 * 60 * 60 * 1000;
        const returnDateTimeStamp = new Date(returnDate).getTime();
        if (returnDateTimeStamp > combinedReturnData) {
            const diffInMs = Math.abs(returnDateTimeStamp - combinedReturnData);
            console.log("returnDateTimeStamp", returnDateTimeStamp);
            console.log("combinedReturnData", combinedReturnData);
            const delayFeeDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
            console.log(diffInMs);
            console.log("delayFeeDays", delayFeeDays);
            //console.log("delayFeeDays", delayFeeDays);
            //console.log("pricePerDay.rows[0].pricePerDay", pricePerDay.rows[0].pricePerDay);
            const delayFeeFine = delayFeeDays * pricePerDay.rows[0].pricePerDay;
            await db.query(`UPDATE rentals SET "delayFee"=$1 WHERE id=$2`, [Number(delayFeeFine), Number(rentalData.id)]);
        }
    }
    catch (err) {
        return console.log(err.message);
    }
}