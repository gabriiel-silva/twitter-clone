'use server'

//NEXT IMPORTS
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

//SUPABASE IMPORTS
import { createClient } from '@/utils/supabase/client'


export async function login(formData) {
  const supabase = createClient()
  console.log(formData)

  const data = {
    email: formData.email,
    password: formData.password,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
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
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/posts');
}
