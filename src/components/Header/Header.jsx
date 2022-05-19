import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import { Header, Segment, Icon, Image} from 'semantic-ui-react';

import userService from "../../utils/userService";

export default function PageHeader({user}){
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            userService.logout()
            navigate('/login')
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <Segment clearing>
            {user ? 
                (
                <>
                <Header as='h2' floated='left' >
                    <Image circular 
                        src={user.photoUrl 
                        ? user.photoUrl 
                        : ""} 
                        as='a'
                        href={`/${user.username}`}
                    />
                </Header>
                <Header as='h2' floated='right'>
                    <Link to="/"><Icon link={true} name='home'/></Link>
                    <a href="/login" onClick={handleLogout}>Logout</a>
                </Header>
                </>
                ) : 
                <Header textAlign='justified'>
                    <Link to="/login">Login </Link> 
                    <Link to="/signup"> Signup</Link>
                </Header>
                }
            </Segment>
    )
}