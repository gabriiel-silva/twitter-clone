'use client';

//REACT AND NEXT IMPORTS
import React, { useState } from 'react'

//SHADCN IMPORTS
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

//CUSTOM IMPORTS
import SignupForm from '@/components/custom/SignupForm'
import LoginForm from '@/components/custom/LoginForm'



export default function LoginPage() {
  const [showLoginForm, setShowLoginForm] = useState(true)
  const handleToggle = () => setShowLoginForm(!showLoginForm)
  {
    return (
      <main>
        <Card className="w-[350px] m-auto mt-36">
          <CardHeader className="text-center">
            <CardTitle>Twitter</CardTitle>
            <CardDescription>Discover new things now!</CardDescription>
          </CardHeader>
          {showLoginForm ? <LoginForm /> : <SignupForm />}
          <CardFooter className="justify-between flex flex-col gap-8">
            <Button onClick={handleToggle} className="text-blue-500 text-white" >{showLoginForm ? 'Create Account' : 'Login'}</Button>
          </CardFooter>
        </Card>
      </main>
    )
  }
}