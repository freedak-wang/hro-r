package main

import (
	"hr-outsourcing-reconciliation/config"
	"hr-outsourcing-reconciliation/routes"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize database
	db, err := config.SetupDatabase()
	if err != nil {
		log.Fatalf("Failed to setup database: %v", err)
	}

	// Create a new Gin router
	r := gin.Default()

	// Setup routes
	routes.SetupRoutes(r, db)

	// Run the server
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}