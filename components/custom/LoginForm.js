'use client'
//REACT AND NEXT IMPORTS
import React from 'react'

//SHADCN IMPORTS
import { z } from "zod"
import { CardFooter } from '../ui/card'
import { useForm } from "react-hook-form"
import { login } from '@/app/login/actions'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"


const formSchema = z.object({
    email: z.string().email().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string(),
})

export default function LoginForm() {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    }
    )

    function onSubmit(values) {
        console.log(values)
        login(values)
    }


    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="ml-2 mr-2">
                                <FormLabel>Email:</FormLabel>
                                <FormControl>
                                    <Input type="email" name="email" id="email" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="ml-2 mr-2">
                                <FormLabel>Password:</FormLabel>
                                <FormControl>
                                    <Input type="password" name="password" id="password" required {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <CardFooter className="justify-between flex flex-col gap-8">
                        <Button className="w-full" type="submit">Login</Button>
                        <Label>New user?</Label>
                    </CardFooter>
                </form>
            </Form>
        </div>
    )
}
