import { Permission } from "node-appwrite";


import { db , commentCollection } from "../name";
import { databases } from "./config";

export default async function createAnswerCollection() {

    //create collection
    await databases.createCollection(db , commentCollection , commentCollection , [
        Permission.read("any"),
        Permission.create("users"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])

    console.log("Comment Collection is created");

    //creating attributes 
    await Promise.all([
        databases.createEnumAttribute(db , commentCollection , "type" , ["answer, question"] , true),
        databases.createStringAttribute(db , commentCollection , "content" , 10000 , true),
        databases.createStringAttribute(db , commentCollection , "typeId" , 100 , true),
        databases.createStringAttribute(db , commentCollection , "authorId" , 100 , true),
    ])

    //creating indexes
    await Promise.all([
        
    ])
    
}