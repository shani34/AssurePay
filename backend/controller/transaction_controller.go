package controller

import (
	"encoding/json"
	"net/http"
	"github.com/shani34/AssurePay/backend/models" // Import the Transaction model
)

var transactions []models.Transaction

func CreateTransactionHandler(w http.ResponseWriter, r *http.Request) {
	var newTransaction models.Transaction
	err := json.NewDecoder(r.Body).Decode(&newTransaction)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	transactions = append(transactions, newTransaction)
	w.WriteHeader(http.StatusCreated)
}

func GetTransactionsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(transactions)
}
