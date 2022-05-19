import React, { useState, useEffect } from "react";
import userService from '../../utils/userService';
import {useParams} from "react-router-dom";
import { Grid } from 'semantic-ui-react';
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostFeed from "../../components/PostFeed/PostFeed";
import PageHeader from "../../components/Header/Header";
import * as postsAPI from "../../utils/postApi";

export default function ProfilePage(){
    const { username } = useParams();
    
    const [posts, setPosts] = useState([]);
    const [user, setProfileUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    async function getProfile() {
        try {
            const data = await userService.getProfile(username);
            console.log('profile data ', data);

            setLoading(() => false);
            setPosts(() => [...data.posts]);
            setProfileUser(() => data.user);

        } catch(err) {
            console.log(err);
            setError("Profile does not exist");
        }
    }

    async function getPosts() {
        try {
            const data = await postsAPI.getAll();
            setPosts([...data.posts])
        } catch(err) {
            console.log(err, ' this is an error from getPosts')
        }
    }

    useEffect(() => {
        getProfile();
        getPosts();
    }, []);

    if (error) {
        return (
            <>
                <PageHeader user={user} />
                <h1>{error}</h1>
            </>
        )
    }

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader user={user} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <ProfileBio user={user} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
                <Grid.Column style={{ maxWidth: 750 }}>
                    <PostFeed 
                        isProfile={true}
                        posts={posts}
                        numPhotosCol={3}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}