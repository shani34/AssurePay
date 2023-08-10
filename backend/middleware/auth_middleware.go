package middleware

import (
	"fmt"
	"net/http"
)

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Implement your authentication logic here
		// For this example, let's assume we check a query parameter "auth" (not secure)

		authToken := r.URL.Query().Get("auth")
		if authToken != "mysecrettoken" {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		fmt.Println("Authenticated request:", r.Method, r.URL.Path)
		next.ServeHTTP(w, r)
	})
}
