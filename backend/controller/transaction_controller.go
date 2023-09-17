package controller

import (
	"encoding/json"
	"net/http"
	"fmt"

	"github.com/gorilla/mux"
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
	if(newTransaction.Sender<0|| newTransaction.Amount<=0.00||(newTransaction.Message!="withdraw" && newTransaction.Message!="credit")){
		w.Write([]byte("invalid crednetials"))
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	db:=connection.DBConnection()
	tx:=db.Begin()
	if err:=tx.Error; err!=nil{
		tx.Rollback()
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(fmt.Sprint(err)))
	}
	//check account exist or not
	var senderAccount models.Account
	err=tx.Where("account_number=?",newTransaction.Sender).Find(&senderAccount).Error
	if err!=nil{
		tx.Rollback()
	 w.Write([]byte(fmt.Sprint(err)))
	   w.WriteHeader(http.StatusBadRequest)
	   return
	}
	var receiverAccount models.Account

	err=tx.Where("account_number=?",newTransaction.Receiver).Find(&receiverAccount).Error
	if err!=nil{
		tx.Rollback()
	 	w.Write([]byte(fmt.Sprint(err)))
	   w.WriteHeader(http.StatusBadRequest)
	   return
	}

	subject:=""
	
		senderAccount.Balance-=newTransaction.Amount
		subject=fmt.Sprintf("%v",newTransaction.Amount)+" debited"
		newTransaction.TotalAmount=senderAccount.Balance
		err=tx.Model(&models.Account{}).Where("account_number=?",senderAccount.AccountNumber).Update("balance",senderAccount.Balance).Error
		if err!=nil{
			tx.Rollback()
		 	w.WriteHeader(http.StatusInternalServerError)
		    w.Write([]byte(fmt.Sprint(err)))
		   return
		}


		body:=subject+" from account : "
		email(senderAccount.Email,senderAccount.AccountNumber,subject,body)
	
		subject=""
		receiverAccount.Balance+=newTransaction.Amount
		subject=fmt.Sprintf("%v",newTransaction.Amount)+" credited"
		newTransaction.TotalAmount=receiverAccount.Balance
		err=tx.Model(&models.Account{}).Where("account_number=?",receiverAccount.AccountNumber).Update("balance",receiverAccount.Balance).Error
		if err!=nil{
			tx.Rollback()
		 	w.WriteHeader(http.StatusInternalServerError)
		    w.Write([]byte(fmt.Sprint(err)))
		   return
		}
	
	//
	body=subject+" to account : "
	email(receiverAccount.Email,receiverAccount.AccountNumber,subject,body)
	err=tx.Create(&newTransaction).Error
	if err!=nil{
		tx.Rollback()
		 w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(fmt.Sprint(err)))
	   return
	}


//commiting the transaction
	if err:=tx.Commit().Error; err!=nil{
		tx.Rollback()
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(fmt.Sprint(err)))
		
		return
	 }

	json.NewEncoder(w).Encode(&newTransaction)
	transactions = append(transactions, newTransaction)
	w.WriteHeader(http.StatusCreated)
}

func GetTransactionsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(transactions)
}

func GetBalance(w http.ResponseWriter, r *http.Request){
	w.Header().Set("content-type","Application/json")
	mp:=mux.Vars(r)
	accountNumber:=mp["id"]

	db:=connection.DBConnection()
	tx:=db.Begin()
	if err:=tx.Error; err!=nil{
		tx.Rollback()
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(fmt.Sprint(err)))
	}

	var account models.Account
	err:=tx.Where("account_number=?",accountNumber).Find(&account).Error
	if err!=nil{
	   tx.Rollback()
	   w.Write([]byte(fmt.Sprint(err)))
	   w.WriteHeader(http.StatusBadRequest)
	   return
	}

	//commiting the transaction
	if err:=tx.Commit().Error; err!=nil{
		tx.Rollback()
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(fmt.Sprint(err)))
		
		return
	 }
	 
	json.NewEncoder(w).Encode(account.Balance)
}
