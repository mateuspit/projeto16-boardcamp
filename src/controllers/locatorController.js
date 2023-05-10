import { getGamesService } from "../services/locatorServices.js";

export async function getGames(req, res) {
    try {
        const allGames = await getGamesService();
        res.send(allGames.rows);
    }
    catch (err) {
        console.log(err);
    }
}