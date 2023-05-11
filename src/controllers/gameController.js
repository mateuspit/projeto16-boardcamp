import { findGameService, getGamesService, postGameService } from "../services/gameServices.js";

export async function getGames(req, res) {
    try {
        const allGames = await getGamesService(req.query);
        //if (allGames.length === 0) return res.status(404).send(`Nenhum jogo encontrado no banco de dados`);
        return res.send(allGames);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function postGame(req, res) {
    try {
        //const gameExists = await findGameService(req.body.name);
        //console.log(req.body.name);
        //console.log("await",await findGameService(req.body.name));
        //console.log("!await",!await findGameService(req.body.name));
        //console.log(gameExists);
        if (!await findGameService(req.body.name)) return res.status(409).send("Esse jogo já existe!")
        await postGameService(req.body);
        return res.sendStatus(201);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}