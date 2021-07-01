import React, { useState, useEffect } from 'react'
import axios from 'axios';


function App() {
  const [post, setPosts] = useState([])
  useEffect(() => {
    axios.get('http://192.168.56.1:8080/api')
    .then(res => {
        setPosts(res.data)
    })
  }, [])

  return (
    <React.Fragment>
        <h1>Todo</h1>
        {post.message}
    </React.Fragment>
  );
}

export default App;
