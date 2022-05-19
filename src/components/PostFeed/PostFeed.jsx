import React from 'react';
import PostCard from "../../components/PostCard/PostCard";
import {Card} from 'semantic-ui-react';

export default function PostFeed({posts, numPhotosCol, isProfile, addLike, removeLike}){
    console.log("PostFeed's", posts)
    const postcards = Object.keys(posts).map((post) => {
        return (
        <PostCard 
        post={posts[post]}
        user={posts.user}
        addLike={addLike}
        removeLike={removeLike}
        isProfile={isProfile}
        key={posts[post]._id}
        />
        )
    })
    console.log(postcards)
    return (
        <Card.Group itemsPerRow={numPhotosCol} stackable>
        {postcards}
        </Card.Group>
    )
}