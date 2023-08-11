package models

import "gorm.io/gorm"

type Users struct{
     gorm.Model
     Password string `json:"password"`
	 Username string `json:"username"`
}