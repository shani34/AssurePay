package main

import (
	"net/http"

	"github.com/gorilla/mux"
	auth "github.com/shani34/AssurePay/backend/Auth"
	"github.com/shani34/AssurePay/backend/connection"
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

	//authentication API
	r.HandleFunc("/api/signin", auth.SignIn).Methods("POST")
	r.HandleFunc("/api/signup", auth.SignUp).Methods("POST")
	r.HandleFunc("/api/welcome", auth.Welcome).Methods("POST")
	r.HandleFunc("/api/refresh", auth.Refresh).Methods("GET")
	r.HandleFunc("/api/logout", auth.Logout).Methods("GET")


    connection.DBConnection()
	http.Handle("/", r)

	http.ListenAndServe(":8080", nil)
}
