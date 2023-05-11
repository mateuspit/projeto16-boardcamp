import { db } from "../database/database-connection";

export async function getCostumersServices(customersFilters) {
    //a entrada é filtrada pelos middlewares usando schemas.
    //em services ocorrem as operações, as funções
    //o resultado das funções dão a resposta nos controllers
    //o req.body é enviado ao service pelo controller
    try {
        
    }
    catch (err) {
        console.log(err.message);
    }
}