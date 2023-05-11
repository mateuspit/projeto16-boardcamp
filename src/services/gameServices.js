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
        if (gameFilters.order || gameFilters.desc) {
            const filterOrderString = ` ORDER BY name`
            filterString += filterOrderString;
            if (gameFilters.order === "name" && gameFilters.desc === "true") {
                const filterOrderDesc = ` DESC`;
                filterString += filterOrderDesc;
            }
            else {
                const filterOrderDesc = ` ASC`;
                filterString += filterOrderDesc;
            }
        }
        if (gameFilters.offset) {
            const filterOffsetString = gameFilters.name ? ` OFFSET $2` : ` OFFSET $1`;
            filterString += filterOffsetString;
            values.push(gameFilters.offset);
        }
        if (gameFilters.limit) {
            const filterLimitString = (gameFilters.name && gameFilters.offset) ? ` LIMIT $3` : ((gameFilters.name || gameFilters.offset) ? ` LIMIT $2` : ` LIMIT $1`);
            filterString += filterLimitString;
            values.push(gameFilters.limit);
        }

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