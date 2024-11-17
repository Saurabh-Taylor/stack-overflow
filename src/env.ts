//creating this file so that our TS wont complain

const env  = {
    appwrite:{
        endpoint:String(process.env.NEXT_PUBLIC_APP_WRITE_HOST_URL),
        project:String(process.env.NEXT_PUBLIC_APP_WRITE_PROJECT_ID)
    }
}