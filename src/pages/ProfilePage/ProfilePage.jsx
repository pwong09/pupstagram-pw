import React, { useState, useEffect } from "react";
import userService from '../../utils/userService';
import {useParams} from "react-router-dom";
import { Grid } from 'semantic-ui-react';
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostFeed from "../../components/PostFeed/PostFeed";
import PageHeader from "../../components/Header/Header";
import Loading from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

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

    useEffect(() => {
        getProfile();
    }, []);

    if (error) {
        return (
            <>
                <PageHeader />
                <ErrorMessage error={error}/>
            </>
        )
    }

    if (loading) {
        return (
            <>
                <PageHeader />
                <Loading />
            </>
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