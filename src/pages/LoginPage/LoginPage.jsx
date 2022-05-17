import React, { useState } from 'react';
import './LoginPage.css';
import userService from "../../utils/userService";

import {Link, useNavigate} from "react-router-dom";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function LoginPage(props){
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [state, setState] = useState({
    username: '',
    password: ''
  })

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await userService.login(state);
      props.handleSignupOrLogin();
      navigate('/');
    } catch(err) {
      setError(err.message);
    }
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='https://i.imgur.com/s4LrnlU.png' /> Log-in to your account
        </Header>
        <Form size='large' autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input 
              fluid icon='user' 
              iconPosition='left' 
              placeholder='username' 
              name='username'
              value={state.username}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='password'
              type='password'
              name='password'
              value={state.password}
              onChange={handleChange}
            />
            <Button fluid size='large' className="btn" >
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to='/signup'>Sign Up</Link>
        </Message>
        {error ? <ErrorMessage error={error} /> : null}
      </Grid.Column>
    </Grid>
  )

}

