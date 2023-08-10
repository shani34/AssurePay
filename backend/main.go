package main

import (
	"net/http"
	"github.com/gorilla/mux"
	"github.com/shani34/AssurePay/backend/controller"
)

func main() {
	r := mux.NewRouter()

	// accounts API
    r.HandleFunc("/api/accounts", controller.CreateAccountHandler).Methods("POST")
	r.HandleFunc("/api/accounts", controller.GetAccountsHandler).Methods("GET")

	//transaction API
	r.HandleFunc("/api/transaction",controller.CreateTransactionHandler).Methods("POST")
	r.HandleFunc("/api/transaction",controller.GetTransactionsHandler).Methods("GET")

	
	http.Handle("/", r)

	http.ListenAndServe(":8080", nil)
}
