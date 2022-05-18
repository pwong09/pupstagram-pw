import React, { useState, useEffect } from "react";
import PageHeader from "../../components/Header/Header";
import AddPost from "../../components/AddPostForm/AddPostForm";
import PostFeed from "../../components/PostFeed/PostFeed";
import * as postsAPI from "../../utils/postApi";
import * as likesAPI from "../../utils/likesApi";

import {  Grid } from 'semantic-ui-react'

export default function Feed(props) {
    const [posts, setPosts] = useState([]);
    
    async function getPosts() {
        try {
            const data = await postsAPI.getAll();
            setPosts([...data.posts])
        } catch(err) {
            console.log(err, ' this is an error from getPosts')
        }
    }

    useEffect(() => {
        getPosts()
    }, []);
    // console.log("after useEffect", posts);

    async function handleAddPost(post) {
        const data = await postsAPI.create(post);
        console.log('data from addPost ', data)
        setPosts(posts => [data.post, ...posts]);
    }

    async function addLike(postId) {
        try {
            const data = await likesAPI.create(postId);
            console.log('data from addLike ', data);
            getPosts();
        } catch(err) {
            console.log(err)
        }
    }

    async function removeLike(postId) {
        try {
            const data = await likesAPI.removeLike(postId);
            getPosts();
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader user={props.user} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450}}>
                    <AddPost handleAddPost={handleAddPost} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <PostFeed 
                        posts={posts} 
                        user={props.user}
                        addLike={addLike}
                        removeLike={removeLike}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}