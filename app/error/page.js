
// REACT AND NEXT IMPORTS
import React from 'react'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// SHADCN IMPORTS
import { Progress } from "@/components/ui/progress";

export default function ErrorPage() {
    return (
        <main className="flex flex-col w-1/2 m-auto mt-40">
            You are being redirected...
            <Progress value={33} />
        </main>
    ),
        revalidatePath("/", "layout"),
        redirect('/')
}