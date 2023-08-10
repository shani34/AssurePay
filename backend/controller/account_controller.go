package controller

import (
	"encoding/json"
	"net/http"
	"github.com/shani34/AssurePay/backend/models" // Import the Account model
	"github.com/shani34/AssurePay/backend/connection"

)


func CreateAccountHandler(w http.ResponseWriter, r *http.Request) {
	var newAccount models.Account
	err := json.NewDecoder(r.Body).Decode(&newAccount)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	db:=connection.DBConnection()
    db.Create(&newAccount)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newAccount)
	
}

func GetAccountsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	db:=connection.DBConnection()
	var accounts []models.Account
    db.Find(&accounts)
	json.NewEncoder(w).Encode(accounts)
}
