import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { TextField,Button,Grid,Box,Fab} from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

import TodoOutput from './components/output';

import Header from './components/header';

function App() {
  const [post, setPost] = useState([])
  const [todo, setTodo] = useState({
    title: "",
    text: "",
  })
  useEffect(() => {
    axios.get('http://192.168.1.10:8080/select')
    .then(res => {
        setPost(res.data.todo)
    })
  }, [])



  return (
    <React.Fragment>
      <Header />


      {/* Todoのフォーム部分 */}
      <Grid container justify="center">
        <form method="post"onSubmit={ e =>{
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
          // スプレット構文というらしい https://qiita.com/akisx/items/682a4283c13fe336c547
          setTodo((t)=>{
            return {
              ...t,
              title: todoTitle.value,
              text: todoText.value
            }
          })

          axios.post("http://192.168.1.10:8080/insert", {
            title: todoTitle.value,
            text: todoText.value
          })
          // formの中身を空にする
          todoTitle.value = "";
          todoText.value = "";


        }}>

        {/* Todoのインプット部分 */}
        <div>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box p={2}>
                <TextField label="Title" variant="outlined" id="title" />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box p={2}>
                <TextField label="Text" variant="outlined" id="text" />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box p={3}>
                <Button variant="contained" color="primary" type="submit">
                  SEND
                </Button>
              </Box>
            </Grid>
          </Grid>
        </div>
        </form>
      </Grid>

      {/* アウトプット部分 */}
      <Grid container justify="center">
        {post.map((todo) => 
          <TodoOutput 
            title={todo.title} 
            text={todo.text} 
          />)}




      </Grid>
    </React.Fragment>
  );
}

export default App;
