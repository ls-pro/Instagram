import './App.css';
import React, {useState, useEffect} from 'react';
import Post from './Post';
import {db , auth} from './firebase';
import  Modal  from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles'
import { Button , Input } from '@material-ui/core';

function getModalStyle(){
  const top = 50;
  const left = 50;

  return{
    top: `${top}%`,
    left: `${left}%`,
    transform : `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position : 'absolute',
    //position: 'relative',
    width:300,
    backgroundColor: theme.palette.background.paper,
    border : '2px solid #000',
    boxShadow : theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser) =>{
      if (authUser) {
        //user has logged in..
        console.log(authUser);
        setUser(authUser);
        
        // if(authUser.displayName){
        //   //dont update username

        // }
        // else{
        //   //if we create someone
        //   return authUser.updateProfile({
        //     displayName: username,
        //   });
        // }
      } else {
        //user has logout
        setUser(null);
      }
    })
    return ()=>{
      unsubscribe();
    }
  },[user, username]);

  // useEffect -> runs a piece of code based on a specific condition
  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot => {
      //every time a new post is added, this code fire
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

  const signUp =(event) => {
    event.preventDefault();
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) =>{
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error)=> alert(error.message));
  }

  const signIn = (event) =>{
    event.preventDefault();

    
  }

  return (
    <div className="App">
       {/* Header */}

       <Modal 
         open={open}
         onClose={ () => setOpen(false)}
         >
           <div style={modalStyle} className={classes.paper}>
             <center> 
               <img 
               className = "app__headerImage"
               src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
               alt = ""
               />
                </center>
               <form className = "app__signup"> 
              <Input 
              placeholder ="username"
              type = "text"
              value = {username}
              onChange ={(e) => setUsername(e.target.value)}
              />
               <Input 
              placeholder ="email"
              type = "text"
              value = {email}
              onChange ={(e) => setEmail(e.target.value)}
              />
              <Input 
              placeholder ="password"
              type = "password"
              value = {password}
              onChange ={(e) => setPassword(e.target.value)}
              />
              {/* <br/> */}
              <Button type='submit' onClick={signUp}>Sign Up</Button>
              </form>
           </div>
       </Modal>

       <Modal 
         open={openSignIn}
         onClose={ () => setOpenSignIn(false)}
         >
           <div style={modalStyle} className={classes.paper}>
             <center> 
               <img 
               className = "app__headerImage"
               src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
               alt = ""
               />
                </center>
               <form className = "app__signup"> 
              <Input 
              placeholder ="email"
              type = "text"
              value = {email}
              onChange ={(e) => setEmail(e.target.value)}
              />
              <Input 
              placeholder ="password"
              type = "password"
              value = {password}
              onChange ={(e) => setPassword(e.target.value)}
              />
              {/* <br/> */}
              <Button type='submit' onClick={signIn}>Sign In</Button>
              </form>
           </div>
       </Modal>

      <div className="app__header">
        <img 
          className = "app__headerImage"
          src="	https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
       
      </div>

      { user  ? (
        <Button onClick={()=> auth.signOut()}> Logout </Button>
      ) :(
       <div calssName = 'app__loginContainer' >
         <Button onClick={()=> setOpenSignIn(true)}> Sign In </Button>
        <Button onClick={()=> setOpen(true)}> Sign up </Button>

        </div>
      )}    

      <h1> Instagram Clone with React 🚀</h1>

     {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }
     
      
    </div>
  );
}

export default App;
