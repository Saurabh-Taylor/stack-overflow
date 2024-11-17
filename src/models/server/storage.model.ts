import { Permission } from "node-appwrite";
import { questionAttachmentBucket } from "../name";
import { storage } from "./config";


export default  async function getOrCreateStorage() {
    try {
        await storage.getBucket(questionAttachmentBucket);
        console.log("Storage Connected");
    } catch (error) {
        try {
            await storage.createBucket(questionAttachmentBucket , questionAttachmentBucket,[
                Permission.read("any"),
                Permission.create("users"),
                Permission.read("users"),
                Permission.update("users"),
                Permission.delete("users"),
            ])
        } catch (error) {
            
        }        
    }
}