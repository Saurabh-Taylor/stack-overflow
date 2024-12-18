import { IndexType, Permission } from "node-appwrite";

import { db , questionCollection } from "../name";
import { databases } from "./config";


export default async function createQuestionCollection() {
    //create collection
   try {
     await databases.createCollection(db , questionCollection , questionCollection , [
         Permission.read("any"),
         Permission.create("users"),
         Permission.read("users"),
         Permission.update("users"),
         Permission.delete("users"),
     ])
     console.log("Question Collection is created");
 
     //creating attributes and Indexes
     await Promise.all([
         databases.createStringAttribute(db, questionCollection, "title", 100 , true),
         databases.createStringAttribute(db, questionCollection, "content", 100 , true),
         databases.createStringAttribute(db, questionCollection, "authorId", 50 , true),
         databases.createStringAttribute(db, questionCollection, "tags", 50 , true , undefined , true),
         databases.createStringAttribute(db, questionCollection, "attachmentId", 50 , false, ),
     ])
 
     console.log("Question Attribute Created");
     
     //Create Indexes
 
    //  await Promise.all([
    //      databases.createIndex(db , questionCollection , "title" , IndexType.Fulltext , ["title"] , ["asc"] ),
    //      databases.createIndex(db , questionCollection , "content" , IndexType.Fulltext , ["content"] , ["asc"] ),
    //  ])
 
    //  console.log("Question Indexes Created");
     
   } catch (error) {
    console.log("Error Creating Question Collection" , error);
   }
}