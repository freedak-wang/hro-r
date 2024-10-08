package handlers

import (
	"encoding/csv"
	"fmt"
	"hr-outsourcing-reconciliation/models"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gocarina/gocsv"
	"gorm.io/gorm"
)

type ImportHandler struct {
	DB *gorm.DB
}

func NewImportHandler(db *gorm.DB) *ImportHandler {
	return &ImportHandler{DB: db}
}

func (h *ImportHandler) ImportClients(c *gin.Context) {
	file, _, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get file from request"})
		return
	}
	defer file.Close()

	clients, err := parseClientCSV(file)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Failed to parse CSV: %v", err)})
		return
	}

	for _, client := range clients {
		if err := h.DB.Create(&client).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to create client: %v", err)})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("Successfully imported %d clients", len(clients))})
}

func (h *ImportHandler) ImportContracts(c *gin.Context) {
	file, _, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get file from request"})
		return
	}
	defer file.Close()

	contracts, err := parseContractCSV(file)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Failed to parse CSV: %v", err)})
		return
	}

	for _, contract := range contracts {
		if err := h.DB.Create(&contract).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to create contract: %v", err)})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("Successfully imported %d contracts", len(contracts))})
}

func (h *ImportHandler) ImportEmployees(c *gin.Context) {
	file, _, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get file from request"})
		return
	}
	defer file.Close()

	employees, err := parseEmployeeCSV(file)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Failed to parse CSV: %v", err)})
		return
	}

	for _, employee := range employees {
		if err := h.DB.Create(&employee).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to create employee: %v", err)})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("Successfully imported %d employees", len(employees))})
}

func (h *ImportHandler) ImportFinancialDocuments(c *gin.Context) {
	file, _, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get file from request"})
		return
	}
	defer file.Close()

	documents, err := parseFinancialDocumentCSV(file)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Failed to parse CSV: %v", err)})
		return
	}

	for _, document := range documents {
		if err := h.DB.Create(&document).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to create financial document: %v", err)})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("Successfully imported %d financial documents", len(documents))})
}

func parseClientCSV(file io.Reader) ([]models.Client, error) {
	var clients []models.Client
	if err := gocsv.UnmarshalCSV(csv.NewReader(file), &clients); err != nil {
		return nil, err
	}
	return clients, nil
}

func parseContractCSV(file io.Reader) ([]models.Contract, error) {
	var contracts []models.Contract
	if err := gocsv.UnmarshalCSV(csv.NewReader(file), &contracts); err != nil {
		return nil, err
	}
	return contracts, nil
}

func parseEmployeeCSV(file io.Reader) ([]models.Employee, error) {
	var employees []models.Employee
	if err := gocsv.UnmarshalCSV(csv.NewReader(file), &employees); err != nil {
		return nil, err
	}
	return employees, nil
}

func parseFinancialDocumentCSV(file io.Reader) ([]models.FinancialDocument, error) {
	var documents []models.FinancialDocument
	if err := gocsv.UnmarshalCSV(csv.NewReader(file), &documents); err != nil {
		return nil, err
	}
	return documents, nil
}