import React, {useState} from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from "../../utils/userService";
import Feed from "../Feed/Feed";
import ProfilePage from "../ProfilePage/ProfilePage";

function App() {
  const [user, setUser] = useState(userService.getUser());

  function handleSignupOrLogin() {
    setUser(userService.getUser());
    console.log('user -->', user);
  }

  return (
    <>
      <main>
      <Routes>
          <Route path='/' element={<Feed user={user}/>} />
          <Route path="/login" element={<LoginPage handleSignupOrLogin={handleSignupOrLogin} />} />
          <Route exact path="/signup" element={<SignupPage handleSignupOrLogin={handleSignupOrLogin} />} />
          <Route path="/:username" element={<ProfilePage />} />
      </Routes>
      </main>
      </>
  );
}

export default App;
