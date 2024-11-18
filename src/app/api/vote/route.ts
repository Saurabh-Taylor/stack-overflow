import { db, votesCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import { response } from "express";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";



export async function POST(request:NextRequest) {
    try {
        //grab the data
        const {votedById , voteStatus , type , typeId} = await request.json()
        //list the document
        const response = await databases.listDocuments(db, votesCollection , [
            Query.equal("type" , type),
            Query.equal("typeId" , typeId),
            Query.equal("votedById" , votedById),
        ])

        if(response.documents.length > 0){
            // 
        }

        //that means prev vote does not exists or vote status changes
        if(response.documents[0]?.voteStatus !== voteStatus){

        }

        const [upvotes , downvotes] = await Promise.all([
            databases.listDocuments(db, votesCollection , [
                Query.equal("type" , type),
                Query.equal("typeId" , typeId),
                Query.equal("voteStatus" , "upvoted"),
                Query.equal("votedById" , votedById),
                Query.limit(1),
            ]),
            databases.listDocuments(db, votesCollection , [
                Query.equal("type" , type),
                Query.equal("typeId" , typeId),
                Query.equal("voteStatus" , "downvoted"),
                Query.equal("votedById" , votedById),
                Query.limit(1),
            ]),

        ])
        return NextResponse.json({data:{document:null , voteResult : upvotes.total = downvotes.total}}, {status:201})

    } catch (error:any) {
        return NextResponse.json({
            error:error?.message || "Error creating vote"

        } ,{status:error?.status || error?.code || 500})
        
    }
}