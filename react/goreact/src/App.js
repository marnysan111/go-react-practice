import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { TextField,Button,Grid } from '@material-ui/core/';

import Header from './components/header';

function App() {
  const [post, setPost] = useState([])
  const [todo, setTodo] = useState({
    title: "",
    text: "",
  })
  useEffect(() => {
    axios.get('http://192.168.1.10:8080/api')
    .then(res => {
        setPost(res.data)
    })
  }, [])

  return (
    <React.Fragment>
      <Header />
      <Grid container justify="center">
        <form method="post" action="http://192.168.1.10:8080/post" onSubmit={ e =>{
          e.preventDefault();
          const todoTitle = e.target.elements["title"];
          const todoText = e.target.elements["text"];
          if (todoTitle.value === "") {
            alert("タイトルが未入力です")
            return
          } else if (todoText.value === "") {
            alert("テキストが未入力です")
            return
          }
          //ここを整理したい気持ち
          setTodo.title = todoTitle.value
          setTodo.text = todoText.value
          //setTodoの使い方わからん
          //setTodo((t) => {t.title = todoTitle.value})

          todoTitle.value = "";
          todoText.value = "";
          axios.post("http://192.168.1.10:8080/post", {
            title: setTodo.title,
            text: setTodo.text
          })
        }}>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={4}> 
              <TextField label="Title" variant="outlined" id="title"/>
            </Grid>
            <Grid item xs={4}>
              <TextField label="Text" variant="outlined" id="text" />
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" color="primary" type="submit">
                SEND
              </Button>
            </Grid>
          </Grid>
        </div>
        </form>
      </Grid>
    </React.Fragment>
  );
}

export default App;
