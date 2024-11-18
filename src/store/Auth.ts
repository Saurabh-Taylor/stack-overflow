// flow of our code for zustand and appwrite
/*
    1. imports
    2. interface definations
    3. zustand store --> immer , persist
    4. store state and methods
*/
import { create } from "zustand";

//immer --> The Immer middleware enables you to use immutable state in a more convenient way. Also, with Immer, you can simplify handling immutable data structures in Zustand.
import { immer} from "zustand/middleware/immer";

// persist --> The Persist middleware enables you to store your Zustand state in a storage (e.g., localStorage, AsyncStorage, IndexedDB, etc.), thus persisting its data.
import { persist } from "zustand/middleware";

// AppwriteException -> is used in login and register error response
import { AppwriteException , ID , Models } from "appwrite";

//account we are getting from client side app write
import { account } from "@/models/client/config";

export interface IUserPrefs{
    reputation: number;
}

interface IAuthStore{
    session: Models.Session | null;
    jwt: string | null;
    user:Models.User<IUserPrefs> | null
    hydrated:boolean
    setHydrated():void
    verifySession():Promise<void>
    //appwrite login and register
    login(email:string , password:string):Promise<{success:boolean; error?:AppwriteException | null}>
    register(name:string , email:string , password:string):Promise<{success:boolean; error?:AppwriteException | null}>
    logout():Promise<void>
}

export const useAuthStore = create<IAuthStore>()(
    persist(
        immer((set)=>({
            session: null,
            jwt:null,
            user:null,
            hydrated:false,
            // setHydrated(){
            //     set({hydrated:true})
            // }
            setHydrated:()=>{set({hydrated:true})},
            async verifySession(){
                try {
                   const session = await account.getSession("current")
                   set({session})
                } catch (error) {
                    console.log("Error verifying session", error);
                }                
            },
            async login(email:string , password:string){
                try {
                    const session  = await account.createEmailPasswordSession(email,password)
                    const [user , {jwt}] = await Promise.all([
                        account.get<IUserPrefs>(),
                        account.createJWT()
                    ])

                    if(!user.prefs?.reputation) await account.updatePrefs<IUserPrefs>({reputation:0})
                    set({session , jwt , user})
                    return {success:true}

                } catch (error) {
                    console.log("Error logging in", error);
                    return {success:false , error: error instanceof AppwriteException ? error : null}
                }
            },
            async register(name:string , email:string , password:string){
                try {
                    await account.create(ID.unique() , name , email , password)
                    return {success:true}
                } catch (error) {
                    console.log("Error registering up", error);
                    return {success:false , error: error instanceof AppwriteException ? error : null}

                }
            },
            async logout(){
                try {
                    await account.deleteSessions()
                    set({session:null , jwt:null , user:null})
                } catch (error) {
                    console.log("Error logging out", error);
                }
            },


        })),
        {
            name:"auth",
            onRehydrateStorage(){
                return (state, error)=>{
                    if(!error) state?.setHydrated()
                }
            }
        }
    )
)




