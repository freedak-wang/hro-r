package models

import "gorm.io/gorm"

type Client struct {
	gorm.Model
	Name          string `json:"name" binding:"required"`
	ContactPerson string `json:"contactPerson" binding:"required"`
	Email         string `json:"email" binding:"required,email"`
	Phone         string `json:"phone" binding:"required"`
	Address       string `json:"address" binding:"required"`
	Contracts     []Contract `json:"contracts,omitempty" gorm:"foreignKey:ClientID"`
}