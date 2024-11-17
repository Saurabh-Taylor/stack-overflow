//creating this file so that our TS wont complain

export const env  = {
    appwrite:{
        endpoint:String(process.env.NEXT_PUBLIC_APP_WRITE_HOST_URL),
        projectId:String(process.env.NEXT_PUBLIC_APP_WRITE_PROJECT_ID),
        apiKey:String(process.env.NEXT_PUBLIC_APP_WRITE_ACCESS_KEY)
    }
}