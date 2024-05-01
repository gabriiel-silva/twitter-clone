'use client'

// REACT AND NEXT IMPORTS
import React, { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'

// SHADCN IMPORTS
import { Progress } from "@/components/ui/progress";


export default function ErrorPage() {
    const [progressValue, setProgressValue] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgressValue(prevValue => {
                if (prevValue < 99) {
                    return prevValue + 33;
                } else {
                    clearInterval(interval);
                    redirect('/');
                    return prevValue;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="flex flex-col w-1/2 m-auto mt-40">
            You are being redirected...
            <Progress value={progressValue} />
        </main>
    );
}