import db from "./conn.js";
const setFavorite = async (userId, pokemonId, fav) => {
    console.log();
    let collection = await db.collection("favoritesByUser");
    try {
        const keyId = userId + "-" + pokemonId;
        let query = { _id: keyId };
        console.info("query isFavorite userId: " + userId + " keyId:" + keyId);
        let isFavorite = await collection.findOne(query);
        console.info("isFavorite" + JSON.stringify(isFavorite));
        if (!isFavorite) {
            console.info("creating fav");
            const inserted = await collection.insertOne({ _id: keyId, fav: fav });
            console.info("updated" + JSON.stringify(inserted));
        }
        else {
            console.info("updating fav");
            const updated = await collection.updateOne({ _id: keyId }, {
                $set: {
                    fav: fav
                }
            });
            console.info("updated" + JSON.stringify(updated));
        }
        console.info("finished setting fav");
        let isFavorite2 = await collection.findOne(query);
        console.info("isFavorite" + JSON.stringify(isFavorite2));
    }
    catch (error) {
        console.log(error);
        throw error; // still want to crash
    }
};
export default setFavorite;
