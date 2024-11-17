import { Permission } from "node-appwrite";


import { db , answerCollection } from "../name";
import { databases } from "./config";

export default async function createAnswerCollection() {

    //create collection
    await databases.createCollection(db , answerCollection , answerCollection , [
        Permission.read("any"),
        Permission.create("users"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])

    console.log("Answer Collection is created");

    //creating attributes 
    await Promise.all([
        databases.createStringAttribute(db , answerCollection , "content" , 100 , true),
        databases.createStringAttribute(db , answerCollection , "questionId" , 100 , true),
        databases.createStringAttribute(db , answerCollection , "authorId" , 100 , true),
    ])

    //creating indexes
    await Promise.all([
        
    ])
    
}