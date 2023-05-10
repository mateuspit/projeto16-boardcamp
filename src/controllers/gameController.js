import { getGamesService, postGameService } from "../services/gameServices.js";

//export async function getGames(req, res) {
export async function getGames(req,res) {
    //const { name, offset, order } = req.query
    try {
        const allGames = await getGamesService(req.query);
        //const allGames = await getGamesService();
        //console.log(allGames);
        //console.log(allGames.length === 0);
        if (allGames.length === 0) return res.status(404).send(`Nenhum jogo encontrado no banco de dados`);
        return res.send(allGames);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

//export async function getGameByFilter(req, res) {
//    //const { name, offset, order } = req.query
//    console.log(req.query);
//    console.log("controller");
//    try {
//        const gameList = await getGamesByFilterService(req.query);
//        res.send(gameList);
//    }
//    catch (err) {
//        return res.status(500).send(err.message);
//    }
//}

export async function postGame(req, res) {
    try {
        await postGameService(req.body);
        return res.sendStatus(201);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}