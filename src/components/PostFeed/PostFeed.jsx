import React from 'react';
import PostCard from "../../components/PostCard/PostCard";

export default function PostFeed({posts}){
    console.log(posts)
    const postcards = posts.map((el, index) => {
        return (
        <PostCard 
        photoUrl={el.photoUrl}
        likes={el.likes}
        caption={el.caption}
        key={index}
        />
        )
    })
    return (
        <>
        {postcards}
        </>
    )
}