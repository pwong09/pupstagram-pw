import React from 'react';
import PostCard from "../../components/PostCard/PostCard";

export default function PostFeed({posts, user}){
    console.log("PostFeed's", posts)
    const postcards = Object.keys(posts).map((post) => {
        return (
        <PostCard 
        post={posts[post]}
        user={user}
        />
        )
    })
    console.log(postcards)
    return (
        <>
        {postcards}
        </>
    )
}