import { db } from "../database/database-connection.js";

export async function getGamesService(gameFilters) {
    const basicDBString = `SELECT * FROM games`;
    try {
        let allGames;
        const nameFilter = gameFilters.name?.toLowerCase() + "%";
        let filterString = `${basicDBString}`;

        allGames = await db.query(`${filterString}`);

        if (gameFilters.name) {
            const filterNameString = `WHERE LOWER(name) LIKE $1`;
            allGames = await db.query(`${basicDBString} ${filterNameString}`, [nameFilter]);            
        }
        if (gameFilters.offset) {
            const filterOffsetString = `games OFFSET $1`;
            allGames = await db.query(`${basicDBString} ${filterOffsetString}`, [gameFilters.offset])
        }
        if (gameFilters.order || gameFilters.desc) {
            const filterOrderString = `games ORDER BY name`
            if (gameFilters.order === "name" && gameFilters.desc === "true") {
                const filterOrderDesc = `DESC`;
                allGames = await db.query(`${basicDBString} ${filterOrderString} ${filterOrderDesc}`);
            }
            else {
                const filterOrderDesc = `ASC`;
                allGames = await db.query(`${basicDBString} ${filterOrderString} ${filterOrderDesc}`);
            }
        }

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