import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { TextField,Button,Grid } from '@material-ui/core/';

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
        <h1>Todo</h1>
        <p>{post.message}</p>
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
          console.log(setTodo.title, setTodo.text)

          todoTitle.value = "";
          todoText.value = "";
          axios.post("http://192.168.1.10:8080/post", {
            title: setTodo.title,
            text: setTodo.text
          })
        }}>
          <TextField label="Title" variant="outlined" id="title"/>
          <TextField label="Title" variant="outlined" id="text" />
          <button type="submit">send</button>
        </form>
    </React.Fragment>
  );
}

export default App;
