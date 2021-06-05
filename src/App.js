import './App.css';
import React, {useState, useEffect} from 'react';
import Post from './Post';
import {db} from './firebase';

function App() {
  const [posts, setPosts] = useState([]);

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

  return (
    <div className="App">
       {/* Header */}
      <div className="app__header">
        <img 
          className = "app__headerImage"
          src="	https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
       
      </div>
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
