package models

import(
	 "gorm.io/gorm"
	 "time"
)


type Account struct {
	ID       uint   `gorm:"primaryKey"`
	Username string `json:"username"`
	Balance  float64 `json:"balance"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}
