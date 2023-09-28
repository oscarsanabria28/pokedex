import { log } from "console";
import db from "./conn.js";

const isFavorite = async (userId: string, pokemonId: string) => {
    let collection = await db.collection("favoritesByUser");
    try {
        const keyId= userId+ "-" +pokemonId;
        let query = { _id: keyId};
        console.info("query isFavorite userId: "+ userId + " pokemonId:" + pokemonId);
        let isFavorite = await collection.findOne(query);
        console.info("isFavorite"+ JSON.stringify(isFavorite));
        if(!isFavorite) {
            return false;
        } 
        return isFavorite.fav;
    } catch (error) {
        console.log(error);
        throw error; // still want to crash
    }
}

export default isFavorite;
