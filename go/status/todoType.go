package status

import "gorm.io/gorm"

type Todo struct {
	gorm.Model
	Title string `json:"title"`
	Text  string `json:"text"`
}
