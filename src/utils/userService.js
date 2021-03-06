import tokenService from './tokenService';

const BASE_URL = '/api/users/';

function signup(user) {
  console.log('user keys', user.keys());
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    // browser will automatically detect our header with photo file
    // headers: new Headers({'Content-Type': 'application/json'}),  // If you are sending a file/photo over
    // what do datatype do you need to change this too?
    // send over formData instead of json for images
    // JSON.stringify(user) no need to stringify anymore
    body: user // <-- contents of formData
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Email already taken!');
  })
  // Parameter destructuring!
  .then(({token}) => tokenService.setToken(token));
  // The above could have been written as
  //.then((token) => token.token);
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}

function getProfile(username){
  return fetch(BASE_URL + username, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  })
  .then(res => {
    if(res.ok) return res.json();
    throw new Error('Bad Credentials!')
  })
}

export default {
  signup, 
  getUser,
  logout,
  login,
  getProfile
};