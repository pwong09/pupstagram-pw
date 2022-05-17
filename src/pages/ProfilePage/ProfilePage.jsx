import React, { useState, useEffect } from "react";
import userService from '../../utils/userService';
import {useParams} from "react-router-dom";
import { Grid } from 'semantic-ui-react';
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import ProfilePostDisplay from "../../components/ProfilePostDisplay/ProfilePostDisplay";
import PageHeader from "../../components/Header/Header";

export default function ProfilePage(){
    const [posts, setPosts] = useState([]);
    const [user, setProfileUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { username } = useParams();

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
                    <PageHeader />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <ProfileBio user={user} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
                <Grid.Column style={{ maxWidth: 750 }}>
                    <ProfilePostDisplay />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}