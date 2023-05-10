import { db } from "../database/database-connection.js";

export async function getGamesService(){
//export default function getGames() {
    //a entrada é filtrada pelos middlewares usando schemas.
    //em services ocorrem as operações, as funções
    //o resultado das funções dão a resposta nos controllers
    try {        
        const allGames = await db.query("SELECT * FROM games");
        return allGames;
    }
    catch (err) {
        console.log(err.message);
    }
}