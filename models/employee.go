package models

import "gorm.io/gorm"

type Employee struct {
	gorm.Model
	Name                 string  `json:"name" binding:"required"`
	Position             string  `json:"position" binding:"required"`
	HourlyRate           float64 `json:"hourlyRate" binding:"required"`
	ClientID             uint    `json:"clientId" binding:"required"`
	ContractID           uint    `json:"contractId" binding:"required"`
	EmploymentType       string  `json:"employmentType" binding:"required"`
	SocialSecurityNumber string  `json:"socialSecurityNumber" binding:"required"`
	BankAccount          string  `json:"bankAccount" binding:"required"`
}