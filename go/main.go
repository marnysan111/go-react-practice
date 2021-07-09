package main

import (
	"fmt"
	"goreact/handler"
	"goreact/status"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	handler.DBInit()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://192.168.56.1:3000",
			"http://192.168.1.10:3000",
		},

		AllowMethods: []string{
			"POST",
			"GET",
		},
		AllowHeaders: []string{
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Headers",
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"Authorization",
		},
	}))

	r.GET("/select", func(c *gin.Context) {
		todo, err := handler.SelectAllTodo()
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
			return
		}
		c.JSON(200, gin.H{"todo": todo})
	})

	r.GET("/select/:id", func(c *gin.Context) {
		n := c.Param("id")
		id, err := strconv.Atoi(n)
		if err != nil {
			fmt.Fprintln(os.Stderr, err, "/select/id Error")
		}
		todo, err := handler.SelectOneTodo(id)
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
			return
		}
		c.JSON(200, gin.H{"todo": todo})
	})

	r.POST("/insert", func(c *gin.Context) {
		req := status.Todo{}
		c.Bind(&req)

		items := status.Todo{
			Title: req.Title,
			Text:  req.Text,
		}
		err := handler.InsertTodo(items.Title, items.Text)
		if err != nil {
			fmt.Fprintln(os.Stderr, err, "Insert Error")
		}
		c.Status(http.StatusNoContent)
	})

	r.POST("/delete/:id", func(c *gin.Context) {
		n := c.Param("id")
		id, err := strconv.Atoi(n)
		if err != nil {
			fmt.Fprintln(os.Stderr, err, "/delete/id Error")
		}
		err = handler.DeleteOneTodo(id)
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
			return
		}
		c.Status(http.StatusNoContent)
	})

	r.Run(":8080")
}
