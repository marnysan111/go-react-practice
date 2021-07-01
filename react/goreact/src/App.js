import React, { useState, useEffect } from 'react'
import axios from 'axios';


function App() {
  const [post, setPosts] = useState([])
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => {
        setPosts(res.data)
    })
  }, [])

  return (
    <React.Fragment>
        <h1>Todo</h1>
        {post.map((obj) => <li>{obj.id}：{obj.title}</li>)}
    </React.Fragment>
  );
}

export default App;
