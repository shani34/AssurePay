package connection

import (
	"fmt"
	"log"

	"github.com/shani34/AssurePay/backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func DBConnection() *gorm.DB{
	// Define the connection parameters
	dsn := "user=postgres password=mysecretpassword dbname=postgres host=localhost port=5432 sslmode=disable TimeZone=Asia/Kolkata"

	// Open the database connection
	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN: dsn,
		PreferSimpleProtocol: true,
	}),&gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}
 
	err=db.AutoMigrate(&models.Account{},&models.Transaction{},models.Users{})
    if err!=nil{
		log.Fatal("error while migrating!",err)
	}
	// Test the connection
	fmt.Println("Connected to the PostgreSQL database")
	return db
}
