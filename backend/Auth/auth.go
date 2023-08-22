package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
	"reflect"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/shani34/AssurePay/backend/connection"
	"github.com/shani34/AssurePay/backend/models"
)

var jwtKey=[]byte("my-secret-key")

type Claims struct{
	Username string `json:"username"`
	jwt.RegisteredClaims
}

// signin routes

func SignIn(w http.ResponseWriter, r *http.Request){
	var user models.Users
    w.Header().Set("Access-Control-Allow-Headers", "Authorization, Content-Type, set-cookie")

     err:=json.NewDecoder(r.Body).Decode(&user)
	 if err!=nil{
		w.WriteHeader(http.StatusBadRequest)
		return
	 }

	 //Db connection
	 
	 db:=connection.DBConnection()
	 var dbuser models.Users
	 err=db.Where("username=?",user.Username).Find(&dbuser).Error
	 if err!=nil{
		w.Write([]byte(fmt.Sprint(err)))
		w.WriteHeader(http.StatusBadRequest)
		return
	 }
	 if reflect.DeepEqual(dbuser,models.Users{}){
		
         w.WriteHeader(http.StatusUnauthorized)
		 w.Write([]byte("not exist in db"))
		 return
	 }

	 expTime:=time.Now().Add(5*time.Minute)
	//generating claims
	 claims:=&Claims{
		Username: user.Username,
		RegisteredClaims:jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expTime),
		},
	 }

	//generating tokens
   token:=jwt.NewWithClaims(jwt.SigningMethodHS256,claims)

   tokenStr,err:=token.SignedString(jwtKey)
   if err!=nil{
	w.WriteHeader(http.StatusInternalServerError)
	return
   }
   
   w.Header().Set("Content-Type","application/json")
// setting the cookie in request
   http.SetCookie(w, &http.Cookie{
	Name: "Token",
	Value: tokenStr,
	Expires: expTime,
   })
   user.Cookie=tokenStr
   _=json.NewEncoder(w).Encode(user)

}

//method for welcome
func Welcome(w http.ResponseWriter, r *http.Request){
	c, err:=r.Cookie("Token")
	if err!=nil{
		if err==http.ErrNoCookie{
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		w.WriteHeader(http.StatusBadRequest)
		return
	}

	tknStr:=c.Value

	claims:=&Claims{}

	tkn, err:=jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token)(interface{}, error){
      return jwtKey,nil
	})

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if !tkn.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
  
	w.Header().Set("Content-Type","application/json")
	w.Write([]byte(fmt.Sprintf("Welcome %s!", claims.Username)))
}

//refresh function

func Refresh(w http.ResponseWriter, r *http.Request){
	c, err:=r.Cookie("Token")
	if err!=nil{
		if err==http.ErrNoCookie{
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		w.WriteHeader(http.StatusBadRequest)
		return
	}

	tknStr:=c.Value

	claims:=&Claims{}

	tkn, err:=jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token)(interface{}, error){
      return jwtKey,nil
	})

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if !tkn.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
  
	if time.Until(claims.ExpiresAt.Time)>30*time.Second{
       w.WriteHeader(http.StatusBadRequest)
	   return 
	}

	//again do the same
	expirationTime := time.Now().Add(5 * time.Minute)
	claims.ExpiresAt = jwt.NewNumericDate(expirationTime)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Set the new token as the users `token` cookie
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})

}

func Logout(w http.ResponseWriter, r *http.Request){
	http.SetCookie(w, &http.Cookie{
		Name: "Token",
		Expires: time.Now(),
	})
}

func SignUp(w http.ResponseWriter, r *http.Request){
	var user models.Users

	err:=json.NewDecoder(r.Body).Decode(&user)
	if err!=nil{
	   w.WriteHeader(http.StatusBadRequest)
	   return
	}

	//verify the email id
	
	//Db connection
	db:=connection.DBConnection()
	db.Create(&user)
	
	w.Header().Set("Content-Type","application/json")
	err=json.NewEncoder(w).Encode(user)
	if err!=nil{
		w.WriteHeader(http.StatusBadRequest)
		return
	 }
	 
	w.WriteHeader(http.StatusCreated)
}
