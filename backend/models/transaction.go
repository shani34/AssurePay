package models

import "gorm.io/gorm"


type Transaction struct{
	gorm.Model
	Sender int64 `json:"sender"`
	Receiver int64 `json:"receiver"`
	Amount    float64  `json:"amount"`
	TotalAmount float64 `json:"TotalAmount"`
	Message   string   `json:"message"`
}
type SendReceive struct{
	Source int64 `json:"source"`
	Destination int64 `json:"destination"`
}