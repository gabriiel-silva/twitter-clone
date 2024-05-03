'use client'
//SUPABASE IMPORTS
import { createClient } from '@/utils/supabase/client'

export async function signOut() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
        console.log('Error signing out:', error.message)
    }
    console.log("User signed out successfully")
    location.reload();
}