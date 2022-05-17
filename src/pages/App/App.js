import React, {useState} from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from "../../utils/userService";
import Feed from "../Feed/Feed";

function App() {
  const [user, setUser] = useState(userService.getUser());

  function handleSignupOrLogin() {
    setUser(userService.getUser());
    console.log('user -->', user);
  }

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
          <Route path='/' element={<Feed />} />
          <Route path="/login" element={<LoginPage handleSignupOrLogin={handleSignupOrLogin} />} />
          
          <Route exact path="/signup" element={<SignupPage handleSignupOrLogin={handleSignupOrLogin} />} />
      </Routes>
      </>
  );
}

export default App;
