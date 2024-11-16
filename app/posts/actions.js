'use client'
//SUPABASE IMPORTS
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export async function signOut() {
    const { error } = await supabase.auth.signOut()

    if (error) {
        console.log('Error signing out:', error.message)
    }
    console.log("User signed out successfully")
    location.reload();
}

export async function createPost() {
    const { data } = await supabase.auth.getUser();
    const userID = data.user?.id;

    const text = document.getElementById('textInput').value.trim();

    const { data: post, error } = await supabase
        .from('posts')
        .insert([
            {
                user_owner: userID,
                content: text,
            }
        ]);
    console.log("Post created successfully: ");
    location.reload();

    if (error) {
        console.error("An error occurred while creating post: ", error);
    }
}

export async function deletePost(event) {
    const target = event.currentTarget;

    if (!target) {
        console.error("No event from trash button found.");
        return;
    }

    const postID = target.getAttribute("data-post-id");

    if (!postID) {
        console.error("Post ID is missing.");
        return;
    }

    console.log("Deleting post with ID:", postID);


    if (window.confirm("Are you sure you want to delete this post?")) {
        const { data } = await supabase.auth.getUser();
        const userID = data?.user?.id;

        if (!userID) {
            console.error("User is not authenticated.");
            return;
        }

        console.log("Authenticated user ID:", userID);

        const { data: deletedPost, error } = await supabase
            .from('posts')
            .delete()
            .eq('id', postID)
            .eq('user_owner', userID);

        if (error) {
            console.error("Error deleting post:", error.message, error.details);
        }
        else {
            console.log("Post deleted successfully:");
            location.reload();
        }
    }
    else {
        window.alert("Deletion cancelled.");
        console.log("User cancelled deletion.");
    }
}


