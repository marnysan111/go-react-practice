package handler

import (
	"fmt"
	"goreact/status"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

/* DBに接続する */
func DBCommect() (*gorm.DB, error) {
	err := godotenv.Load()
	if err != nil {
		return nil, err
	}
	USER := os.Getenv("DBUSER")
	PASS := os.Getenv("DBPASS")
	PROTOCOL := os.Getenv("DBIP")
	TABLE := os.Getenv("DBTABLE")
	connect := USER + ":" + PASS + "@" + PROTOCOL + "/" + TABLE + "?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(connect), &gorm.Config{
		DisableForeignKeyConstraintWhenMigrating: true,
	})
	if err != nil {
		return nil, err
	}

	return db, nil
}

func DBInit() {
	db, err := DBCommect()
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
	}
	dbClose, err := db.DB()
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
	}
	defer dbClose.Close()

	db.AutoMigrate(&status.Todo{})
}

func InsertTodo(title string, text string) error {
	db, err := DBCommect()
	if err != nil {
		return err
	}
	dbClose, err := db.DB()
	if err != nil {
		return err
	}
	defer dbClose.Close()
	db.Create(&status.Todo{Title: title, Text: text})
	return nil
}

func SelectAllTodo() ([]status.Todo, error) {
	db, err := DBCommect()
	var todo []status.Todo
	if err != nil {
		return todo, err
	}
	dbClose, err := db.DB()
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		return todo, err
	}
	defer dbClose.Close()
	db.Find(&todo)
	return todo, nil
}

func SelectOneTodo(id int) (status.Todo, error) {
	db, err := DBCommect()
	var todo status.Todo
	if err != nil {
		return todo, err
	}
	dbClose, err := db.DB()
	if err != nil {
		return todo, err
	}
	defer dbClose.Close()
	if err = db.First(&todo, id).Error; err != nil {
		return todo, err
	}

	return todo, nil
}

func DeleteOneTodo(id int) error {
	db, err := DBCommect()
	var todo status.Todo
	if err != nil {
		return err
	}
	dbClose, err := db.DB()
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		return err
	}
	defer dbClose.Close()
	db.Where("id = ?", id).Delete(&todo)
	return nil
}
