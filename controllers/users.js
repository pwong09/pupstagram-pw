const User = require('../models/user');
const Post = require('../models/post');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const { v4: uuidv4 } = require('uuid');
// uuid generates our unique ids
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3();

module.exports = {
  signup,
  login,
  profile
};

async function signup(req, res) {
  console.log('signup in controller/users');
  console.log(req.body, '^^ this is req.body');
  console.log('req.file here: ', req.file);

  // create a file Path
  const filePath = `${uuidv4()}/${req.file.originalname}`;
  const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer};
  
  // upload the image to bucket
  s3.upload(params, async function(err, data) {
    const user = new User({...req.body, photoUrl: data.Location});
      try {
        await user.save();
        console.log('new user', user);
        const token = createJWT(user);
        res.json({ token });
      } catch(err) {
        res.status(400).json(err);
      }
    }

  // old function
  // const user = new User(req.body);
  // try {
  //   await user.save();
  //   const token = createJWT(user);
  //   res.json({ token });
  // } catch (err) {
  //   // Probably a duplicate email
  //   res.status(400).json(err);
  // }
)}

async function login(req, res) {
  try {
    const user = await User.findOne({username: req.body.username});
  
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function profile(req, res){
  try {
    const user = await User.findOne({username: req.params.username});
    const posts = await Post.find({user: user._id});
    console.log('profile function posts', posts);
    res.status(200).json({posts: posts, user: user})
  } catch(err) {
    console.log(err)
    res.send({err})
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
