import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { TextField,Button,Grid } from '@material-ui/core/';

function App() {
  const [post, setPosts] = useState([])
  useEffect(() => {
    axios.get('http://192.168.1.10:8080/api')
    .then(res => {
        setPosts(res.data)
    })
  }, [])

  return (
    <React.Fragment>
        <h1>Todo</h1>
        {post.message}
        <form method="POST" action="http://192.168.1.10:8080/post">
          <div>
            <TextField label="Title" variant="outlined" name="title"/>
            <TextField label="Title" variant="outlined" name="text"/>
            <button type="submit">send</button>
          </div>
        </form>
    </React.Fragment>
  );
}

export default App;
