"use server";

//SUPABASE IMPORTS
import { createClient } from '@/utils/supabase/client'


export default async function ReadUserSession() {
    const supabase = createClient()
    const { data: id } = await supabase.auth.getUser()

    return id;
}