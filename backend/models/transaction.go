package models

import "gorm.io/gorm"


type Transaction struct{
	gorm.Model
	AccountNumber int64 `json:"accountNumber"`
	Amount    float64  `json:"amount"`
	Message   string   `json:"message"`
}
type SendReceive struct{
	Source int64 `json:"source"`
	Destination int64 `json:"destination"`
}