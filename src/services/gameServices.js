import { db } from "../database/database-connection.js";

export async function getGamesService(gameFilters) {
    //a entrada é filtrada pelos middlewares usando schemas.
    //em services ocorrem as operações, as funções
    //o resultado das funções dão a resposta nos controllers
    //o req.body é enviado ao service pelo controller
    const basicDBString = `SELECT * FROM games`;
    try {
        let allGames;
        const nameFilter = gameFilters.name?.toLowerCase() + "%";
        let filterString = `${basicDBString}`;
        let values = [];

        if (gameFilters.name) {
            const filterNameString = ` WHERE LOWER(name) LIKE $1`;
            filterString += filterNameString;
            values = [nameFilter];
        }

        if (gameFilters.status) {
            if (gameFilters.status === "open") {
                const filterStatusString = Object.keys(gameFilters).length === 4
                    ? ` WHERE "returnDate"=$4` : Object.keys(gameFilters).length === 3
                        ? ` WHERE "returnDate"=$3` : Object.keys(gameFilters).length === 2
                            ? ` WHERE "returnDate"=$2` : ` WHERE "returnDate"=$1`;
                filterString += filterStatusString;
                values.push(null);
            }
            else if (gameFilters.status === "closed") {
                const filterStatusString = Object.keys(gameFilters).length === 4
                    ? ` WHERE "returnDate" IS NOT NULL` : Object.keys(gameFilters).length === 3
                        ? ` WHERE "returnDate" IS NOT NULL` : Object.keys(gameFilters).length === 2
                            ? ` WHERE "returnDate" IS NOT NULL` : ` WHERE "returnDate" IS NOT NULL`;
                filterString += filterStatusString;
            }
        }
        if (gameFilters.startDate) {
            
            const filterStartDateString = Object.keys(gameFilters).length === 5
                ? ` WHERE "returnDate"=$5` : Object.keys(gameFilters).length === 4
                    ? ` WHERE "returnDate"=$4` : Object.keys(gameFilters).length === 3
                        ? ` WHERE "returnDate"=$3` : Object.keys(gameFilters).length === 2
                            ? ` WHERE "returnDate"=$2` : ` WHERE "returnDate"=$1`;
            filterString += filterStartDateString;
            values.push(startDate);
        }

        if (gameFilters.order) {
            const filterOrderString = ` ORDER BY "${gameFilters.order}"`;
            //const filterOrderString = ` ORDER BY name`
            //gameFilters.name ? ` OFFSET $2` : ` OFFSET $1`;
            filterString += filterOrderString;
            if (gameFilters.order && gameFilters.desc === "true") {
                if (gameFilters.desc === "true") {
                    const filterOrderDesc = ` DESC`;
                    filterString += filterOrderDesc;
                }
                else {
                    const filterOrderAsc = ` ASC`;
                    filterString += filterOrderAsc;
                }
            }
        }
        if (gameFilters.offset) {
            const filterOffsetString = (gameFilters.name)
                ? ` OFFSET $2` : ` OFFSET $1`;
            //const filterOffsetString = (gameFilters.name && gameFilters.order)
            //    ? ` OFFSET $3` : ((gameFilters.name || gameFilters.order)
            //        ? ` OFFSET $2` : ` OFFSET $1`);
            filterString += filterOffsetString;
            values.push(gameFilters.offset);
        }
        //console.log("gameFilters", gameFilters);
        //console.log("3", (Object.keys(gameFilters).length) === 3);
        //console.log("2", (Object.keys(gameFilters).length) === 2);
        //console.log("1", (Object.keys(gameFilters).length) === 1);
        if (gameFilters.limit) {
            const filterLimitString = (gameFilters.name && gameFilters.offset)
                ? ` LIMIT $3` : ((gameFilters.name || gameFilters.offset)
                    ? ` LIMIT $2` : ` LIMIT $1`);
            //const filterLimitString = (Object.keys(gameFilters).length === 4)
            //    ? ` LIMIT $4` : ((Object.keys(gameFilters).length === 3)
            //        ? ` LIMIT $3` : ((Object.keys(gameFilters).length === 2)
            //            ? ` LIMIT $2` : ` LIMIT $1`));
            filterString += filterLimitString;
            values.push(gameFilters.limit);
            //values.push(1);
        }

        const firstWhereIndex = filterString.indexOf("WHERE"); // encontrar a posição do primeiro WHERE
        filterString = filterString.slice(0, firstWhereIndex + 5) + filterString?.slice(firstWhereIndex + 5).replace(/WHERE/g, 'AND');

        console.log("filterString:", filterString);
        console.log("values:", values);
        allGames = await db.query(filterString, values);

        return allGames.rows;
    }
    catch (err) {
        console.log(err.message);
    }
}

export async function postGameService(reqGame) {
    //a entrada é filtrada pelos middlewares usando schemas.
    //em services ocorrem as operações, as funções
    //o resultado das funções dão a resposta nos controllers
    //o req.body é enviado ao service pelo controller
    try {
        const gameCreated = await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") 
                                            VALUES ($1, $2, $3, $4);`,
            [
                reqGame.name,
                reqGame.image,
                reqGame.stockTotal,
                reqGame.pricePerDay
            ]);
        return gameCreated;
    }
    catch (err) {
        console.log(err.message);
    }
}

export async function findGameService(gameName) {
    try {
        const gameExists = await db.query(`SELECT * FROM games
        WHERE name = $1`, [gameName]);
        //console.log("existe?",gameExists.rows[0]);
        if (!gameExists.rows[0]) return true;
        return false;
    }
    catch (err) {
        console.log(err.message);
    }
}

export async function findGameById(gameId) {
    try {
        const gameExists = await db.query(`SELECT * FROM games WHERE id = $1`, [gameId]);
        console.log("gameExists.rows", gameExists.rows);
        console.log(!!gameExists.rows);
        if (gameExists.rows.length) return gameExists.rows;
        return false;
    }
    catch (err) {
        return console.log(err.message);
    }
}

