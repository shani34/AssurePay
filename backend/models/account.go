package models

import(
	 "gorm.io/gorm"
	 "time"
)


type Account struct {
	ID       uint   `gorm:"primaryKey"`
	FullName  string `json:"fullName"`
	AccountNumber int64 `json:"accountNumber"`
	AccountHolder string `json:"accountHolder"`
	DOB			string `json:"dob"`
	Nominee		string `json:"nominee"`
	Adhaar  		string 	`json:"adhaar"`
	Balance  float64 `json:"balance"`
	Email    string `json:"email"`
	BankName	string `json:"bankName"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}
