"use client"
import { useAuthStore } from '@/store/Auth'
import React, { useState } from 'react'

function LoginPage() {
    const {login} = useAuthStore()
    const [isLoading , setIsLoading] = useState(false)
    const [error , setError] = useState<string | null>("")

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        //collect data 
        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        //validate
        if(!email || !password){
            setError(()=>"All fields are required")
        }
        //handle laoding and error
        setIsLoading(true)
        setError("")
        
        //store 
        const loginResponse = await login(email , password)
        if(loginResponse.error){
            setError(()=> loginResponse.error!.message)
        }
        setIsLoading(()=> false)

    }

  return (
    <div>LoginPage</div>
  )
}

export default LoginPage