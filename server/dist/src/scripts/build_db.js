import db from "../db/conn.js";
const start = async () => {
    let collection = await db.collection("user");
    try {
        await collection.insertOne({ _id: 1 });
        await collection.insertOne({ _id: 1 }); // duplicate key error
    }
    catch (error) {
        throw error; // still want to crash
    }
};
export default start;
