import db from "./conn.js";
const setFavorite = async (userId, pokemonId, fav) => {
    let collection = await db.collection("favoritesByUser");
    try {
        const keyId = userId + "-" + pokemonId;
        let query = { _id: keyId };
        let isFavorite = await collection.findOne(query);
        if (!isFavorite) {
            const inserted = await collection.insertOne({ _id: keyId, fav: fav });
            console.log(inserted);
        }
        else {
            console.info("updating fav");
            const updated = await collection.updateOne({ _id: keyId }, {
                $set: {
                    fav: fav
                }
            });
            console.log(updated);
        }
        return await collection.findOne(query);
    }
    catch (error) {
        console.log(error);
        throw error; // still want to crash
    }
};
export default setFavorite;
