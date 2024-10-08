package models

import (
	"time"

	"gorm.io/gorm"
)

type Contract struct {
	gorm.Model
	ClientID    uint      `json:"clientId" binding:"required"`
	ServiceType string    `json:"serviceType" binding:"required"`
	StartDate   time.Time `json:"startDate" binding:"required"`
	EndDate     time.Time `json:"endDate"`
	Terms       string    `json:"terms"`
	Status      string    `json:"status" binding:"required"`
}