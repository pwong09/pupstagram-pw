import React, { useState } from "react";
import PageHeader from "../../components/Header/Header";
import AddPost from "../../components/AddPostForm/AddPostForm";
import PostFeed from "../../components/PostFeed/PostFeed";
import * as postsAPI from "../../utils/postApi";

export default function Feed(props) {
    const [posts, setPosts] = useState([]);

    async function handleAddPost(post) {
        const data = await postsAPI.create(post);
        console.log(data)
        setPosts(posts => [data.post, ...posts]);
    }

    return (
        <>
        <PageHeader />
        <AddPost handleAddPost={handleAddPost} />
        <PostFeed posts={posts}/>
        </>
    )
}