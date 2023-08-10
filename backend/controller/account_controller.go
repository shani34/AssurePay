package controller

import (
	"encoding/json"
	"net/http"
	"github.com/shani34/AssurePay/backend/models" // Import the Account model
)

var accounts []models.Account

func CreateAccountHandler(w http.ResponseWriter, r *http.Request) {
	var newAccount models.Account
	err := json.NewDecoder(r.Body).Decode(&newAccount)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	newAccount.ID = len(accounts) + 1
	accounts = append(accounts, newAccount)
	w.WriteHeader(http.StatusCreated)
}

func GetAccountsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(accounts)
}
