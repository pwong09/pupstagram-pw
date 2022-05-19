import React, { useState, useEffect } from "react";
import PageHeader from "../../components/Header/Header";
import AddPost from "../../components/AddPostForm/AddPostForm";
import PostFeed from "../../components/PostFeed/PostFeed";
import Loading from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import * as postsAPI from "../../utils/postApi";
import * as likesAPI from "../../utils/likesApi";

import {  Grid } from 'semantic-ui-react'

export default function Feed(props) {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    
    async function getPosts() {
        try {
            const data = await postsAPI.getAll();
            setPosts([...data.posts]);
            setLoading(false);
        } catch(err) {
            console.log(err, ' this is an error from getPosts')
            setError(err);
        }
    }

    useEffect(() => {
        getPosts()
    }, []);
    // console.log("after useEffect", posts);

    async function handleAddPost(post) {
        try {
            const data = await postsAPI.create(post);
            console.log('data from addPost ', data)
            setPosts(posts => [data.post, ...posts]);
            setLoading(false);
        } catch(err) {
            console.log(err, "error from handleAddPost");
            setError(err);
        }
    }

    async function addLike(postId) {
        try {
            const data = await likesAPI.create(postId);
            console.log('data from addLike ', data);
            getPosts();
        } catch(err) {
            console.log(err, "error from addLike");
            setError(err);
        }
    }

    async function removeLike(postId) {
        try {
            const data = await likesAPI.removeLike(postId);
            getPosts();
        } catch(err) {
            console.log(err, "error from removeLike");
            setError(err);
        }
    }

    if (error) {
        return (
            <>
                <PageHeader />
                <ErrorMessage error={error} />
            </>
        )
    }

    if (loading) {
        return (
            <>
                <PageHeader />
                <ErrorMessage error={error} />
            </>
        )
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
                        numPhotosCol={1}
                        isProfile={false}
                        loading={loading}
                        addLike={addLike}
                        removeLike={removeLike}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}