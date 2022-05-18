import React from "react";
import PostCard from "../PostCard/PostCard";

export default function ProfilePostDisplay({user, posts}) {
    const postcards = Object.keys(posts).map((post) => {
        return (
        <PostCard 
        post={posts[post]}
        user={user}
        />
        )
    })

    return (
        <>
        {postcards}
        </>
    )
}