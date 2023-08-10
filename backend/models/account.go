package models

type Account struct {
	ID       int  `json:id`
	Username string `json:username`
	Balance  float64  `json: balance`
}
