package models

import (
	"time"

	"gorm.io/gorm"
)

type FinancialDocument struct {
	gorm.Model
	DocumentType string    `json:"documentType" binding:"required"`
	ClientID     uint      `json:"clientId" binding:"required"`
	ContractID   uint      `json:"contractId" binding:"required"`
	EmployeeID   uint      `json:"employeeId"`
	Amount       float64   `json:"amount" binding:"required"`
	Date         time.Time `json:"date" binding:"required"`
	Description  string    `json:"description"`
	FileURL      string    `json:"fileUrl"`
}