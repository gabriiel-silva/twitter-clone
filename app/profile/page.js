//REACT AND NEXT IMPORTS
import React from "react";
import { redirect } from 'next/navigation'

//SUPABASE IMPORTS
import { createClient } from '@/utils/supabase/server'

//SHADCN IMPORTS
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"

//CUSTOM IMPORTS
import { signOut } from '../posts/actions'
import { LogOut, ChevronLeft } from 'lucide-react';
import UpdateProfileAndAvatar from "./action";

export default async function ProfilePage() {

  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  
  const userID = data.user?.id;

  if (!data || userID == undefined) {
    console.log("User ID -->>>", userID)
    redirect('/error')
  }
  console.log("User ID -->>>", userID)

  const { data: users, error: users_error } = await supabase.from('profiles').select('*').eq('id', userID )

  if (users_error) {
    console.log("Got an error while trying to retrieve users: ", users_error);
  }
  const user = users.find(u => u.id === userID);
  const avatar_url = user.avatar_url;

  return (
    <main>
      <div className='flex absolute top-3 left-5 text-xl leading-10 font-bold'>
      <button> <a href="/posts"> <ChevronLeft className="mr-5"/> </a></button> 
        <button onClick={signOut}>
          <LogOut />
        </button>
      </div>
      <Card className="w-[550px] h-auto border-0 m-auto mt-36">
        <CardHeader>
          <CardTitle>Change settings</CardTitle>
        </CardHeader>
        <form onSubmit={UpdateProfileAndAvatar}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex  gap-4">
                <Avatar>
                  <AvatarImage htmlFor="picture" id="picture" src={avatar_url}></AvatarImage>
                </Avatar>

                <Input className="w-auto" id="picture" type="file" accept="image/*"/>
              </div>
              <div className="flex flex-col space-y-1.5">
              <Label>Username:</Label>
              <Input id="username" name="username" placeholder={`@${user.username}`}/>
              </div>
              <div className="flex flex-col space-y-1.5">
              <Label >Name:</Label>
              <Input id="name" name="name" placeholder={user.full_name} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-8 justify-between">
            <Button className="w-auto" type="submit">Change</Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}
