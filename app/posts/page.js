// REACT AND NEXT IMPORTS
import React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

//SUPABASE IMPORTS
import { createClient } from '@/utils/supabase/server'

// SHADCN IMPORTS
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"

//ICON IMPORTS
import { HeartIcon, MessageCircleMoreIcon, Share2Icon, LogOut, Trash2, ChevronLeft } from 'lucide-react'

// CUSTOM IMPORTS
import { createPost, deletePost, signOut } from './actions';


export default async function PostsPage() {

    const supabase = createClient()

    const { data } = await supabase.auth.getUser();
    const userID = data.user?.id;
    if (!data || userID == undefined) {
        console.log("User ID -->>>", userID)
        redirect('/error')
    }

    console.log("User ID -->>>", userID)
    let { data: posts, error: posts_error } = await supabase.from('posts').select('*')
    let { data: users, error: users_error } = await supabase.from('profiles').select('*')

    if (posts_error || users_error) {
        console.log("Got an error:", posts_error || users_error);
        return;
    }

    else {

        return (
            <main>
                <div className='flex absolute top-3 left-5 text-xl leading-10 font-bold'>
                    <button> <a href="/"> <ChevronLeft className="mr-5"/> </a> </button> 
                    <button onClick={signOut}>
                        <LogOut />
                    </button>
                </div>

                <div className='relative flex flex-col gap-4 w-3/4 md:w-1/2 border shadow-sm m-auto mt-16 md:mt-10 rounded-sm p-5 md:p-10 '>
                    <CardTitle>Create a new post</CardTitle>

                    <input type="text" id="textInput" className="border border-gray-300 rounded-md p-10 w-full" placeholder="Insert your content here" />

                    <Button onClick={createPost} className="hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Post</Button>

                </div>

                <div className='flex flex-col gap-4 w-3/4 md:w-1/2 border shadow-sm m-auto mt-10 rounded-sm p-5 md:p-10 '>
                    <CardTitle>Timeline</CardTitle>
                    <CardDescription>Those are your timeline tweets</CardDescription>
                    {
                        posts.map((post) => {
                            const user = users.find(u => u.id === post.user_owner);
                            const avatar_url = user.avatar_url;

                            return (

                                <Card className="bg-white shadow-md rounded-lg overflow-hidden ">
                                    <CardHeader>
                                        {userID && <Trash2 className='hover:bg-red-50 cursor-pointer mb-4 w-4 h-4' data-post-id={post.id} onClick={deletePost} />}
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

                                    <div className='flex absolute top-3 right-5 text-xl leading-10'>
                                        <Link href="/profile">
                                            <Avatar>
                                                <AvatarImage htmlFor="picture" id="picture" src={avatar_url}></AvatarImage>
                                            </Avatar>
                                        </Link>
                                        <Button variant="outline" className='ml-2 bg-black hover:bg-gray-700 text-white hover:text-white font-bold'>
                                            <a href="/profile">Edit Profile</a>
                                        </Button>
                                    </div>

                                    <CardContent className="grid gap-4">
                                        <p>{post.content}</p>
                                    </CardContent>
                                    <CardFooter className="flex flex-wrap flex-col w-full gap-2 p-2 md:gap-4 md:p-4 sm:flex-row">
                                        <Button
                                            variant="ghost"
                                            className="flex-1 flex gap-1 md:gap-2 text-sm md:text-lg font-bold"
                                        >
                                            <HeartIcon className="w-3 h-3 md:w-4 md:h-4" />
                                            <div>{post.likes}</div>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="flex-1 flex gap-1 md:gap-2 text-sm md:text-lg font-bold"
                                        >
                                            <MessageCircleMoreIcon className="w-3 h-3 md:w-4 md:h-4" />
                                            <div>{post.number_comments}</div>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="flex-1 flex gap-1 md:gap-2 text-sm md:text-lg font-bold"
                                        >
                                            <Share2Icon className="w-3 h-3 md:w-4 md:h-4" />
                                            <div>{post.shares}</div>
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