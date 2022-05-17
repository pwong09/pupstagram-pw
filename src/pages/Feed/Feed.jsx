import React, { useState, useEffect } from "react";
import PageHeader from "../../components/Header/Header";
import AddPost from "../../components/AddPostForm/AddPostForm";
import PostFeed from "../../components/PostFeed/PostFeed";
import * as postsAPI from "../../utils/postApi";

export default function Feed(props) {
    const [posts, setPosts] = useState([]);
    
    async function getPosts() {
        try {
            const data = await postsAPI.getAll();
            setPosts([...data.posts])
        } catch(err) {
            console.log(err, ' this is the error')
        }
    }

    useEffect(() => {
        getPosts()
        // fetch from Post model - base url would be /api/posts
        // call the index post controller
        // which matches by req.user
        // does controller return posts?
    }, []);

    async function handleAddPost(post) {
        const data = await postsAPI.create(post);
        console.log("data", data)
        setPosts(posts => [data.post, ...posts]);
    }

    console.log("after useEffect", posts)
    return (
        <>
        <PageHeader />
        <AddPost handleAddPost={handleAddPost} />
        <PostFeed posts={posts} user={props.user}/>
        </>
    )
}