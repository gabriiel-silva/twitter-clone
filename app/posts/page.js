// REACT AND NEXT IMPORTS
import React from 'react'
import Link from 'next/link'

//ICON IMPORTS
import { HeartIcon, MessageCircleMoreIcon, Share2Icon } from 'lucide-react'

// SHADCN IMPORTS
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"

// CUSTOM COMPONENT IMPORTS
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import UserAvatar from '@/components/custom/UserAvatar'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function PostsPage() {

    const supabase = createClient()

    const { data } = await supabase.auth.getUser();
    const userID = data.user?.id;
    if (!data || userID == undefined) {
        console.log("User ID -->>>", userID)
        redirect('/')
    }

    console.log("User ID -->>>", userID)
    let { data: posts, error: posts_error } = await supabase.from('posts').select('*')
    let { data: users, error: users_error } = await supabase.from('profiles').select('*')
    let { data: avatar_url } = await supabase.from('profiles').select('avatar_url').eq('id', userID).single()

    if (posts_error || users_error) {
        console.log("Got an error:", posts_error || users_error);
        return;
    }

    else {

        return (
            <main>
                <div className='flex absolute top-3 left-5 text-xl leading-10'>
                    <button>Logout</button>
                </div>

                <div className='flex absolute top-3 right-5 text-xl leading-10'>
                    <Link href="/profile">
                        <Avatar>
                            <AvatarImage htmlFor="picture" id="picture" src={avatar_url}></AvatarImage>
                        </Avatar>
                    </Link>
                    <Link href="/profile" className='ml-2'>Profile</Link>
                </div>

                <div className='flex flex-col gap-4 w-1/2 border shadow-sm m-auto mt-40 rounded-sm p-20'>
                    <CardTitle>Timeline</CardTitle>
                    <CardDescription>Estes sao os seus posts no clone do Twitter.</CardDescription>
                    {
                        posts.map((post) => {
                            const user = users.find(u => u.id === post.user_owner);
                            const avatar_url = user.avatar_url;

                            return (

                                <Card className="bg-white shadow-md rounded-lg overflow-hidden">
                                    <CardHeader>
                                        <div className="flex items-center">
                                            <Avatar>
                                                <AvatarImage htmlFor="picture" id="picture" src={avatar_url}></AvatarImage>
                                            </Avatar>
                                            <div className="ml-2">
                                                <h3 className="font-bold">{user.full_name}</h3>
                                                <p className="text-gray-500">@{user.username}</p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="grid gap-4">
                                        <p>{post.content}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="ghost" className="w-1/3 flex gap-2 text-lg font-bold">
                                            <HeartIcon className='w-4 h-4' />
                                            <div>
                                                {post.likes}
                                            </div>
                                        </Button>
                                        <Button variant="ghost" className="w-1/3 flex gap-2 text-lg font-bold">
                                            <MessageCircleMoreIcon className='w-4 h-4' />
                                            <div>
                                                {post.number_comments}
                                            </div>
                                        </Button>
                                        <Button variant="ghost" className="w-1/3 flex gap-2 text-lg font-bold">
                                            <Share2Icon className='w-4 h-4' />
                                            <div>
                                                {post.shares}
                                            </div>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            )
                        })
                    }
                </div>
            </main>
        )
    }
}