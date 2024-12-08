'use server'

//REACT AND NEXT IMPORTS
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

//SUPABASE IMPORTS
import { createClient } from '@/utils/supabase/server'


export async function login(formData) {
  const supabase = createClient()
  console.log(formData)

  const data = {
    email: formData.email,
    password: formData.password,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log("Login error:", error)
    redirect('/error')
  }
  redirect('/posts')
}

export async function signup(formData) {
  const supabase = createClient();
  console.log(formData)

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log("Signup error:", error)
    redirect('/error');
  }
  console.log("Signup successful")
  redirect('/posts');
}
