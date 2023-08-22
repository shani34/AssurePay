package controller

import (
	"encoding/json"
	"net/http"
	"fmt"

	"github.com/shani34/AssurePay/backend/connection"
	"github.com/shani34/AssurePay/backend/models" // Import the Transaction model
)

var transactions []models.Transaction

func CreateTransactionHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type","application/json")
	var newTransaction models.Transaction
	err := json.NewDecoder(r.Body).Decode(&newTransaction)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	//checking if any field are missing 
	if(newTransaction.AccountNumber<0|| newTransaction.Amount<=0.00||newTransaction.Message==""){
		w.Write([]byte("invalid crednetials"))
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	db:=connection.DBConnection()
	//check account exist or not
	var account models.Account
	err=db.Where("account_number=?",newTransaction.AccountNumber).Find(&account).Error
	if err!=nil{
	   w.Write([]byte(fmt.Sprint(err)))
	   w.WriteHeader(http.StatusBadRequest)
	   return
	}

	if (newTransaction.Message=="withdraw" && account.Balance>=newTransaction.Amount){
		account.Balance-=newTransaction.Amount
		db.Model(&models.Account{}).Where("account_number=?",account.AccountNumber).Update("balance",account.Balance)
	}
	if (newTransaction.Message=="credit" && account.Balance>=newTransaction.Amount){
		account.Balance+=newTransaction.Amount
		db.Model(&models.Account{}).Where("account_number=?",account.AccountNumber).Update("balance",account.Balance)
	}
	//
	db.Create(&newTransaction)


	json.NewEncoder(w).Encode(&newTransaction)
	transactions = append(transactions, newTransaction)
	w.WriteHeader(http.StatusCreated)
}

func GetTransactionsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(transactions)
}
