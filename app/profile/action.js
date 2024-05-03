'use client';

import { createClient } from '@/utils/supabase/client';

export default async function UpdateProfile() {
    const supabase = createClient();

    try {
        const { data } = await supabase.auth.getUser();
        const userID = data.user?.id;

        const new_username = document.getElementById('username').value.trim();
        const new_full_name = document.getElementById('name').value.trim();

        if (!new_username && !new_full_name) {
            console.log("No new data provided.");
            return;
        }

        const { data: updatedData, error: updateError } = await supabase
            .from('profiles')
            .update({
                username: new_username || undefined,
                full_name: new_full_name || undefined
            })
            .eq('id', userID);

        if (updatedData) {
            console.log("Profile updated successfully: ", updatedData);
        }

        if (updateError) {
            console.error("An error occurred while updating profile: ", updateError);
        }
    } catch (error) {
        console.error("An error occurred while updating profile: ", error);
    }
}

/* export async function UpdateAvatar() {
    const supabase = createClient();
    const file = document.querySelector('input[type="file"]').files[0];
    const { data : uploadData,  error : uploadError } = await supabase.storage.from('avatar_url').upload(`public/${file.name}`, file);
    
    if (uploadError) {
        console.error('Got ant error while trying to upload avatar: ', uploadError.message);
        return;
    }
    console.log('Avatar sent sucessfully:', uploadData);
}
*/