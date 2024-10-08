package routes

import (
	"hr-outsourcing-reconciliation/handlers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRoutes(r *gin.Engine, db *gorm.DB) {
	api := r.Group("/api")

	clientHandler := handlers.NewClientHandler(db)
	api.GET("/clients", clientHandler.GetAll)
	api.POST("/clients", clientHandler.Create)
	api.GET("/clients/:id", clientHandler.GetByID)
	api.PUT("/clients/:id", clientHandler.Update)
	api.DELETE("/clients/:id", clientHandler.Delete)

	contractHandler := handlers.NewContractHandler(db)
	api.GET("/contracts", contractHandler.GetAll)
	api.POST("/contracts", contractHandler.Create)
	api.GET("/contracts/:id", contractHandler.GetByID)
	api.PUT("/contracts/:id", contractHandler.Update)
	api.DELETE("/contracts/:id", contractHandler.Delete)

	employeeHandler := handlers.NewEmployeeHandler(db)
	api.GET("/employees", employeeHandler.GetAll)
	api.POST("/employees", employeeHandler.Create)
	api.GET("/employees/:id", employeeHandler.GetByID)
	api.PUT("/employees/:id", employeeHandler.Update)
	api.DELETE("/employees/:id", employeeHandler.Delete)

	financialDocumentHandler := handlers.NewFinancialDocumentHandler(db)
	api.GET("/financial-documents", financialDocumentHandler.GetAll)
	api.POST("/financial-documents", financialDocumentHandler.Create)
	api.GET("/financial-documents/:id", financialDocumentHandler.GetByID)
	api.PUT("/financial-documents/:id", financialDocumentHandler.Update)
	api.DELETE("/financial-documents/:id", financialDocumentHandler.Delete)

	importHandler := handlers.NewImportHandler(db)
	api.POST("/import/clients", importHandler.ImportClients)
	api.POST("/import/contracts", importHandler.ImportContracts)
	api.POST("/import/employees", importHandler.ImportEmployees)
	api.POST("/import/financial-documents", importHandler.ImportFinancialDocuments)
}