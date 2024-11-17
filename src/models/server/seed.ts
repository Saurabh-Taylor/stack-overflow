import { db } from "../name";
import createAnswerCollection from "./answer.model";
import createCommentCollection from "./comment.model";
import createQuestionCollection from "./question.model";
import createVoteCollection from "./vote.model";
import { databases } from "./config";


export default async function seed() {
    try {
        await databases.get(db)
        console.log("Database Connected");
        
    } catch (error) {
        try {
            await databases.create(db , db)
            console.log("Database Created");

            await Promise.all([
                createAnswerCollection() ,
                createCommentCollection() ,
                createQuestionCollection() ,
                createVoteCollection()
            ])

            console.log("Collections Are Created");
            console.log("Database created");
            
            
        } catch (error) {
            console.log("Error Creating databases and collections" , error);
        }
    }
}



