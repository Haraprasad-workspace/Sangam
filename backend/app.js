const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
const compression = require('compression');
const helmet = require('helmet');
require("dotenv").config();

app.use(compression());
app.use(helmet());
// passport setup
const passport = require("./configurations/passport_config");

// models
const User = require("./models/userSchema");
const Post = require("./models/postSchema");
const Like = require("./models/likeSchema.js");
const Follow = require("./models/followSchema.js");
const Notification = require("./models/notificationSchema.js");

// config
const PORT = process.env.PORT || 3000;
const react = process.env.FRONTEND_ORIGIN;

// Allow React frontend
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  })
);

// sessions (stored in MongoDB for persistence)
app.use(session({
  name: "sid",
  secret: process.env.MYSECRETKEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"?true:false,
    sameSite:"none"
  }
}));


// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// JSON parser
app.use(express.json());

// ✅ middleware to protect routes
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: "Not authenticated" });
}

app.use((req, res, next) => {
  console.log("🧠 Cookie received:", req.headers.cookie);
  console.log("🧠 Session ID:", req.sessionID);
  console.log("🧠 Session object:", req.session);
  console.log("🧠 Authenticated:", req.isAuthenticated());
  next();
});

// -------------------------------------------------------------------------------------------------
// ROUTES
// -------------------------------------------------------------------------------------------------

// test
app.get("/", (req, res) => {
  res.redirect(`${react}/`);
});

// ---------------------- GOOGLE OAUTH -----------------------
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // on success, passport saves user in session
    res.redirect(`${react}`);
  }
);

// ---------------------- LOGOUT -----------------------
app.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie("sid");
      res.json({ success: true, message: "Logged out successfully" });
    });
  });
});

// ---------------------- MANUAL LOGIN -----------------------
app.post("/login", passport.authenticate("local"), (req, res) => {
  // if successful, req.user is available
  res.json({
    success: true,
    message: "Login successful",
    user: { id: req.user._id, email: req.user.email },
  });
});

// ---------------------- REGISTER -----------------------
app.post("/register", async (req, res, next) => {
  const { email, name, password } = req.body;

  try {
    // check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Account already exists" });
    }

    // hash password
    const hash = await bcrypt.hash(password, 10);

    // create user
    user = await User.create({
      email,
      name: name,
      password: hash,
    });

    // ✅ log user in immediately after registration (create session)
    req.login(user, (err) => {
      if (err) return next(err);

      // passport stores user.id in session → frontend gets cookie
      return res.status(200).json({
        success: true,
        message: "Registration successful",
        user: { id: user._id, email: user.email },
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// --------------------------------------------- PROTECTED ROUTES -------------------------------------------

//1.) route to open profile from profile id

app.get("/profile/:id", isLoggedIn, async (req, res) => {
  try {
    //first find a profile with the id from params

    let profile = await User.findById(req.params.id);

    //if profile not found , then , return 404 error

    if (!profile) return res.status(404).send("No profile found");

    //if a profile is found then return the profile

    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

//2.) this route is to load the feed from the profile id

app.get("/profilefeed/:profileid", isLoggedIn, async (req, res) => {
  try {
    let { profileid } = req.params;

    //find the posts from the profile order , and sort in order in desc order of time

    let posts = await Post.find({
      author: profileid,
    }).sort({ createdAt: -1 });

    //if posts found then return all the posts

    return res.json({
      success: true,
      posts,
      message: "profile fetched successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "internal server error" });
  }
});

//3.) this route is follow from the post , author id will be passed from the url as a param

app.post("/follow/:authorid", isLoggedIn, async (req, res) => {
  //check if the user is authenticated or not
  if (!req.user) {
    return res.status(400).json({ message: "user not authenticated" });
  }
  //if user is authenticated then come to this block of code
  try {
    //destructure the authorid from url params
    let { authorid } = req.params;

    //check first weather , the following id exist or not

    let author = await User.findOne({ _id: authorid });

    //if author do not exist , the return

    if (!author) {
      return res
        .status(400)
        .json({ message: "the receipt not found in the database" });
    }
    //then check weather the user already follows or not
    let checkfollow = await Follow.findOne({
      follower: req.user.id,
      following: authorid,
    });

    if (req.user.id.toString() === authorid.toString()) {
      return res
        .status(200)
        .json({ success: true , isfollow:-1 ,  message: "You cannot follow yourself" });
    }

    //if the user already follows , then remove the follow document
    if (checkfollow) {
      try {
        let deletefollow = await Follow.deleteOne({
          follower: req.user.id,
          following: authorid,
        });
    //delete the notification of follow , which have been placed in collection - Notification
        let unfollownoti = await Notification.deleteOne({
          receipt: authorid,
          sender: req.user.id,
        });

        return res
          .status(200)
          .json({ success: true, isfollow: 0, message: "Unfollowed " });
      } catch (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: false, message: "some error encountered" });
      }
    }

    //if the follow do not exist then create a follow document

    let newfollow = await Follow.create({
      follower: req.user.id,
      following: authorid,
    });

    let follownoti = await Notification.create({
      receipt: authorid,
      sender: req.user.id,
      type: "follow",
    });

    return res
      .status(200)
      .json({ success: true, isfollow: 1, message: "followed " });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
});

//4.) this route is to like a thought from a post

app.post("/likeThought/:postid", isLoggedIn, async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ message: "user not authenticated" });
  }
  try {
    let { postid } = req.params;

    //checking weather such post exist or not
    let post = await Post.findById({ _id: postid });
    if (!post) {
      return res
        .status(401)
        .json({ message: "no such post found , some error encountered - " });
    }

    //checking wwather , a like document exist with a particular userid and postid , as it should have one to many r
    let like = await Like.findOne({
      user: req.user.id,
      post: postid,
    });

    //if the document exist , then delete it , set the slike to false

    if (like) {
      let deletelike = await Like.deleteOne({
        user: req.user.id,
        post: postid,
      });

      let deletenotification = await Notification.deleteOne({
        receipt: post.author,
        sender: req.user.id,
        type: "like",
      });

      return res.status(200).json({ islike: false, message: "like removed" });

      //if not , then create a document , and set the islike to true
    } else {
      let createlike = await Like.create({
        user: req.user.id,
        post: postid,
      });

      let createnotification = await Notification.create({
        receipt: post.author,
        sender: req.user.id,
        post: postid,
        type: "like",
      });

      return res.status(200).json({ islike: true, message: "liked post" });
    }

    //now creating mechanism to trigger a notification on this like thing
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "could not like , server error " });
  }
});

//5.) this route is to load feed of the logged in user

app.get("/loadfeed", isLoggedIn, async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ message: "user not authenticated" });
  }

  try {
    let feeds = await Post.find().populate("author").sort({ createdAt: -1 });

    return res.status(200).json(feeds);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error encountered" });
  }
});

//6.) this route is to write a thought , for the logged in user
app.post("/writeThought", isLoggedIn, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  } else {
    let { thought } = req.body;

    if (!thought || thought.trim() === "") {
      return res
        .status(400)
        .json({ message: "thought is not in proper format " });
    }

    try {
      let newthought = await Post.create({
        author: req.user.id,
        content: thought,
      });
      return res.status(200).json({ success: true, message: "successful" });
    } catch (err) {
      console.log(err);
      return res.status(500).json("thought could not be posted ");
    }
  }
});

//7.) this route is to get the profile of the logged in user
app.get("/getProfile", isLoggedIn, async (req, res) => {

  try{
    let user = await User.findOne({_id:req.user.id});
    if(!user){
      return res.status(401).json({ message: "Not authenticated" });
    }

    return res.status(200).json(user);
  }catch(err){
    console.log(err);
    return res.status(500).json({success:false , message:"internal server Error"});
  }
});

//8.) to send the status of like and no of like count on each re render
app.get("/likestatus/:postid", isLoggedIn, async (req, res) => {
  //destructuring  the params
  let { postid } = req.params;

  try {
    //trying to find the post from the id given

    let post = await Post.findOne({ _id: postid });
    if (!post) {
      //if post not found then return with an error
      return res
        .status(404)
        .json({ success: false, message: "post didnt found " });
    }
    //saving the author of the post in a variable
    let authorid = post.author;

    //counting the no of like from no of documents in the like collection
    let likecount = await Like.countDocuments({ post: postid });

    //logic to check weather the logged in user currently likes the post or not

    let postlikedbyuser = await Like.findOne({
      user: req.user.id,
      post: postid,
    });

    let likedbyuser = postlikedbyuser ? true : false;

    // sending alll the details in json format

    return res.status(200).json({ success: true, likecount, likedbyuser });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "internal server error " });
  }
});

app.get("/checkfollow/:authorid", isLoggedIn, async (req, res) => {
  //check if the user is authenticated or not
  if (!req.user) {
    return res.status(400).json({ message: "user not authenticated" });
  }
  //if user is authenticated then come to this block of code
  try {
    //destructure the authorid from url params
    let { authorid } = req.params;

    //check first weather , the following id exist or not

    let author = await User.findOne({ _id: authorid });

    //if author do not exist , the return

    if (!author) {
      return res
        .status(400)
        .json({ message: "the receipt not found in the database" });
    }


    //then check weather the user already follows or not
    if(req.user.id.toString()==author._id.toString()){
      return res.status(200).json({success:true , message:"cannot follow yourself", isfollow:-1 , authorname : author.name} );

    }
    let isfollow = await Follow.findOne({
      follower: req.user.id,
      following: authorid,
    });
    
    
    if(!isfollow){

      return res.status(200).json({ success: true, isfollow : 0 , authorname : author.name});
    }
    else{
      return res.status(200).json({ success: true, isfollow : 1 , authorname : author.name });
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
});

app.get("/countfollowers/:profileid", isLoggedIn, async (req, res) => {
  try {
    let {profileid} = req.params;
    let user = await User.findOne({_id:profileid});
    if(!user){
      return res.status(404).json({success:false , message:"profile not found"});
    }

    let followers = await Follow.countDocuments({ following: profileid });
    let following = await Follow.countDocuments({ follower: profileid });

    return res.status(200).json({
      success: true,
      followers,
      following,
      message: "count is provided",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error " });
  }
});

app.get("/getnotifications", isLoggedIn, async (req, res) => {
  if (!req.user.id) {
    return res.status(404).json({ success: false, message: "user not found" });
  }
  try {
    let notifications = await Notification.find({ receipt: req.user.id }).populate("sender").sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ success: true, message: "notification fetched ", notifications   });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
});

app.post("/updateprofile" , isLoggedIn , async(req,res)=>{
  try{
    let {username} = req.body;

  let updateduser = await User.updateOne({_id:req.user.id } , {$set:{username:username}});

  if(!updateduser){
    return res.status(400).json({success:false , message:"could not update user's profile"});

  }

  return res.status(200).json({success:true , message:"updated user's profile"});

  }catch(err){
    console.log(err);
    return res.status(500).json({message:"internal server error" , success:false})
  }
})

app.get("/getThought/:postid" , isLoggedIn , async(req,res)=>{
  let {postid} = req.params;

  try{
    let post = await Post.findOne({_id:postid});
    if(!post){
      return res.status(404).json({success:false  , message:"could not find the post"});
    }

    let thought = post.content;

    return res.status(200).json({success:true , thought});

  }catch(err){
    console.log(err);
    return res.json({success:false , message:"internal server error"});
  }
})

app.get("/checkUser", (req, res) => {
  if (req.isAuthenticated() && req.user) {
    return res.status(200).json({ loggedIn: true, user: req.user });
  } else {
    return res.status(401).json({ loggedIn: false, message: "Not authenticated" });
  }
});


app.get('/getfollowings/:profileid' , isLoggedIn , async(req,res)=>{
  let {profileid} = req.params;

  try{
    let user = await User.findOne({_id:profileid});
    if(!user){
      return res.status(404).json({success:false });
    }

    let profiles =await  Follow.find({follower:profileid});
    if(profiles.length==0){
      return res.status(200).json({success:true ,  profiles , message:"no followings of the given id"});
    }


    return res.status(200).json({success:true ,  profiles , message:" followings of the given id "});
  }catch(err){
    console.log(err);
    return res.status(500).json({success:false , message:"internal server Error "})
  }
})
app.get('/getfollowers/:profileid' , isLoggedIn , async(req,res)=>{
  let {profileid} = req.params;

  try{
    let user = await User.findOne({_id:profileid});
    if(!user){
      return res.status(404).json({success:false });
    }

    let profiles = await Follow.find({following:profileid});
    if(profiles.length==0){
      return res.status(200).json({success:true ,  profiles , message:"no followers of the given id"});
    }


    return res.status(200).json({success:true ,  profiles , message:" followers of the given id "});
  }catch(err){
    console.log(err);
    return res.status(500).json({success:false , message:"internal server Error "})
  }
})
app.get('/getlikes/:postid', isLoggedIn , async(req,res)=>{
  let {postid} = req.params;

  try{
    let post = await Post.findOne({_id:postid});
    if(!post){
      return res.status(404).json({success:false , message:"Post not found"}); 
    }
    let likes = await Like.find({post:postid});
    if(likes.length==0){
      return res.status(200).json({success:true , message:"No likes in this post" , likes});
    }

    return res.status(200).json({success:true , message:"profiles found" , likes});
  }catch(err){
    console.log(err);
    return res.status(500).json({success:false , message:"internal server error"});
  }
})

// -------------------------------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
