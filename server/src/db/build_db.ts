import db from "./conn.js";
//import {  } from "mongodb";

const getUserOrCreateIt = async (id: string) => {
    let collection = await db.collection("user");
    try {
        let query = { _id: id };
        console.info("query user: "+ id);
        let user = await collection.findOne(query);
        if(!user) {
            console.info("user doesn't exist, creating it ");
            await collection.insertOne({ _id: id }); 
            console.info("query user: "+ id + "after creation");  
            return await collection.findOne(query);
        }
        console.info("user exist: "+ JSON.stringify(user) );  
        return user;
    } catch (error) {
        throw error; // still want to crash
    }
}

export default getUserOrCreateIt;
