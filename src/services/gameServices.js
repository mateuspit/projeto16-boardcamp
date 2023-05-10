import { db } from "../database/database-connection.js";

export async function getGamesService(filters) {
    //a entrada é filtrada pelos middlewares usando schemas.
    //em services ocorrem as operações, as funções
    //o resultado das funções dão a resposta nos controllers
    try {
        const allGames = await db.query("SELECT * FROM games;");
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

//export async function getGamesByFilterService(gameFilters) {
//    //const { name, offset, order } = req.query
//    let response = "";
//    console.log(gameFilters);
//    console.log("gameFilters");
//    try {
//        if (gameFilters.name) {
//            response =+"tem nome";
//        }
//        if (gameFilters.offset) {
//            response =+"tem offset";
//        }
//        if (gameFilters.order) {
//            response =+"tem order";
//        }
//        return response;
//    }
//    catch (err) {
//        console.log(err.message);
//    }
//}