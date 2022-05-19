import React, {useState} from 'react';
import { Route, Routes } from 'react-router-dom';
// import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import PageHeader from "../../components/Header/Header";
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
    <div className="app">
      {user ? 
      <>
      <PageHeader user={user} />
      <Routes>
          <Route path='/' element={<Feed user={user} />} />
          <Route path="/:username" element={<ProfilePage user={user} />} />
          <Route path="/signup" element={<SignupPage handleSignupOrLogin={handleSignupOrLogin} />} />
          <Route path="/login" element={<LoginPage handleSignupOrLogin={handleSignupOrLogin}/>} />
      </Routes>
      </>
      : 
      <>
        <PageHeader />
        <Routes>
          <Route path="/" element={<LoginPage handleSignupOrLogin={handleSignupOrLogin}/>} />
          <Route path="/signup" element={<SignupPage handleSignupOrLogin={handleSignupOrLogin} />} />
          <Route path="/login" element={<LoginPage handleSignupOrLogin={handleSignupOrLogin}/>} />
        </Routes>
      </>
      }
    </div>
  );
}

export default App;
