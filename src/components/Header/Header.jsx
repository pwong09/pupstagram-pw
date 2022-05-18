import React from 'react';
import { Header, Segment} from 'semantic-ui-react';
import {Link} from "react-router-dom";

export default function PageHeader({user}){
    return (
        <Segment>
            <Header as='h2'>
                Welcome to Pupstagram!
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/signup">Signup</Link>
                    <Link to="/login">Login</Link>
                    <Link to={`/${user.username}`}>Profile</Link>
                </nav>
            </Header>
        </Segment>
    )
}