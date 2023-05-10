import { getGamesService } from "../services/locatorServices.js";

export async function getGames(req, res) {
    try {
        const allGames = await getGamesService();
        if (allGames.length === 0) return res.status(404).send(`Nenhum jogo encontrado no banco de dados`);
        res.send(allGames);
    }
    catch (err) {
        console.log(err);
    }
}