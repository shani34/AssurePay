package models

import "gorm.io/gorm"


type Transaction struct{
	gorm.Model
	AccountID uint     `json:"accountID"`
	Amount    float64  `json:"amount"`
	Message   string   `json:"message"`
	Account   Account  `gorm:"foreignKey:AccountID"` 
}