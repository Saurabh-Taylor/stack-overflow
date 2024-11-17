import { Permission } from "node-appwrite";


import { db , votesCollection } from "../name";
import { databases } from "./config";

export default async function createAnswerCollection() {

    //create collection
    await databases.createCollection(db , votesCollection , votesCollection , [
        Permission.read("any"),
        Permission.create("users"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])

    console.log("Comment Collection is created");

    //Creating attributes 
    await Promise.all([
        databases.createStringAttribute(db , votesCollection , "votedById" , 100 , true),
        databases.createStringAttribute(db , votesCollection , "typeId" , 100 , true),
        databases.createEnumAttribute(db , votesCollection , "type" , ["answer", "question"] , true),
        databases.createEnumAttribute(db , votesCollection , "voteStatus" , ["upvoted","downvoted"] , true),
    ])

    //creating indexes
    await Promise.all([
        
    ])
    
}