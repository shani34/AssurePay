package models

import "gorm.io/gorm"


type Transaction struct{
	gorm.Model
	AccountNumber int64 `json:"accountNumber"`
	Amount    float64  `json:"amount"`
	TotalAmount float64 `json:"TotalAmount"`
	Message   string   `json:"message"`
}
type SendReceive struct{
	Source int64 `json:"source"`
	Destination int64 `json:"destination"`
}