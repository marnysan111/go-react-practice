package main

import (
	"fmt"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Todo struct {
	Title string `json:"title"`
	Text  string `json:"text"`
}

func main() {
	r := gin.Default()

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

	r.GET("/api", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "test"})
	})

	r.POST("/post", func(c *gin.Context) {
		req := Todo{}
		c.Bind(&req)

		items := Todo{
			Title: req.Title,
			Text:  req.Text,
		}
		fmt.Println("Title is: ", items.Title)
		fmt.Println("Text is: ", items.Text)
		c.Status(http.StatusNoContent)
	})

	r.Run(":8080")
}
