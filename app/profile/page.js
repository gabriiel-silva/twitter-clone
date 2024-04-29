//REACT AND NEXT IMPORTS
import React from "react";

//SHADCN IMPORTS
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"

//CUSTOM COMPONENT IMPORTS
import UserAvatar from '@/components/custom/UserAvatar'


export default function () {
  return (
    <main>
      <Card className="w-[550px] h-auto border-0 m-auto mt-36">
        <CardHeader>
          <CardTitle>Change settings</CardTitle>
        </CardHeader>
        <form onSubmit={'changeSettings'}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <UserAvatar />
              <div className="flex flex-col space-y-1.5">
                <Label >Name:</Label>
                <Input id="name" name="name" value="{username}" disabled />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>Username:</Label>
                <Input id="password" name="password" value="@{full_name}" disabled />
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