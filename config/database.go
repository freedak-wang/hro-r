package config

import (
	"hr-outsourcing-reconciliation/models"
	"os"
	"path/filepath"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func SetupDatabase() (*gorm.DB, error) {
	dbPath := os.Getenv("DB_PATH")
	if dbPath == "" {
		dbPath = filepath.Join(".", "hr_reconciliation.db")
	}

	db, err := gorm.Open(sqlite.Open(dbPath), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	// Auto migrate models
	err = db.AutoMigrate(&models.Client{}, &models.Contract{}, &models.Employee{}, &models.FinancialDocument{})
	if err != nil {
		return nil, err
	}

	return db, nil
}