import React, {useState} from 'react';
import './SignupPage.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';

export default function SignUpPage(props){
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState('');
  const [error, setError] = useState('');
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
    bio: ''
  })

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData() // from the browser
    formData.append('photo', selectedFile);

    for (let fieldName in state){
      console.log('fieldname log', fieldName, state[fieldName]);
      formData.append(fieldName, state[fieldName]);
    }
    try {
      // console.log(formData.forEach((item) => console.log(item)));
      await userService.signup(formData);

      props.handleSignupOrLogin();
      navigate('/');

    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  }

  function handleFileInput(e) {
    console.log('image upload!');
    console.log(e.target.files);
    setSelectedFile(e.target.files[0]);
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="teal" textAlign="center">
        <Image src="https://i.imgur.com/s4LrnlU.png" />Sign Up
      </Header>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Segment stacked>
          {/* username input */}
          <Form.Input
            type="text"
            name="username"
            placeholder="username"
            value={state.username}
            onChange={handleChange}
            required
          />
          {/* email input */}
          <Form.Input 
            type="email"
            name="email"
            placeholder="email"
            value={state.email}
            onChange={handleChange}

          />
          {/* password input */}
          <Form.Input 
            name="password"
            type="password"
            placeholder="password"
            value={state.password}
            onChange={handleChange}
            required
          />
          {/* password confirmation input */}
          <Form.Input 
            name="passwordConf"
            type="password"
            placeholder="confirm password"
            value={state.passwordConf}
            onChange={handleChange}
            required
          />
          {/* bio input */}
          <Form.TextArea 
            label="bio"
            name="bio"
            placeholder="Tell us more about your dogs..."
            onChange={handleChange}
          />
          {/* image file upload input */}
          <Form.Field>
            <Form.Input
              type="file"
              name="photo"
              placeholder="upload image"
              onChange={handleFileInput}
            />
          </Form.Field>
          <Button type="submit" className="btn">Signup</Button>
        </Segment>
        {error ? <ErrorMessage error={error} /> : null}
      </Form>
      </Grid.Column>
    </Grid>
  );
}
