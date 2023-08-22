package controller

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"reflect"
	"time"

	"github.com/shani34/AssurePay/backend/connection"
	"github.com/shani34/AssurePay/backend/models"
	"gopkg.in/gomail.v2"
)


func CreateAccountHandler(w http.ResponseWriter, r *http.Request) {
	var newAccount models.Account
	err := json.NewDecoder(r.Body).Decode(&newAccount)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	
	if (newAccount.AccountHolder==""|| newAccount.Balance<2500 || newAccount.Email==""||
	newAccount.Adhaar==""||newAccount.BankName==""||newAccount.FullName==""||newAccount.DOB==""||newAccount.Nominee==""){
         http.Error(w,"invalid fields",http.StatusBadRequest)
		 return 
	}

	w.Header().Set("content-type","application/json")

	var alreadyAccount models.Account
	db:=connection.DBConnection()
	err=db.Where("adhaar=?",newAccount.Adhaar).Find(&alreadyAccount).Error
	if err!=nil{
	   w.Write([]byte(fmt.Sprint(err)))
	   w.WriteHeader(http.StatusBadRequest)
	   return
	}
	if !reflect.DeepEqual(alreadyAccount,models.Account{}){
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(alreadyAccount)
		return 
	}
	rand.Seed(time.Now().UnixNano())
	// Generate a 14-digit random number
	randomNumber := generateRandomNumber(14)
	newAccount.AccountNumber=int64(randomNumber)
	
	//for creating new account
	err=email(newAccount.Email,newAccount.AccountNumber)
	if err!=nil{
		w.Write([]byte(fmt.Sprint(err)))
		w.WriteHeader(http.StatusBadRequest)
		return 
	}
    db.Create(&newAccount)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newAccount)
	
}
func generateRandomNumber(digits int) int {
	min := intPow(10, digits-1)
	max := intPow(10, digits) - 1

	return rand.Intn(max-min+1) + min
}

func intPow(base, exponent int) int {
	result := 1
	for i := 0; i < exponent; i++ {
		result *= base
	}
	return result
}

func email(email string, accountNumber int64)error{
	d := gomail.NewDialer("smtp.gmail.com", 587, "shani.mnnit18@gmail.com", "ldysplzxzfwyskzj")

	accountNumberStr := fmt.Sprintf("%d", accountNumber)
	// Create a new email message
	m := gomail.NewMessage()
	m.SetHeader("From", "shani.mnnit18@gmail.com")
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Account Created Successfully on assurePay")
	m.SetBody("text/plain", "Your account has been successfully created. Your account number is : "+accountNumberStr)

	fmt.Println(m)
	// Send the email
	if err := d.DialAndSend(m); err != nil {
		return err
	} else {
		fmt.Println("Email sent successfully")
	}

	return nil
}
func GetAccountsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	db:=connection.DBConnection()
	var accounts []models.Account
    db.Find(&accounts)
	json.NewEncoder(w).Encode(accounts)
}
