package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/mattn/go-sqlite3"
)

// Distribution struct
type Distribution struct {
	ID             string              `json:"id"`
	DeliveryMethod string              `json:"deliveryMethod"`
	DomainName     string              `json:"domainName"`
	Origin         string              `json:"origin"`
	State          string              `json:"state"`
	PriceClass     string              `json:"priceClass"`
	Logging        string              `json:"logging"`
	SSLCertificate string              `json:"sslCertificate"`
	Tags           map[string][]string `json:"tags"`
	Date           string              `json:"date"`
}

// CORS middleware to handle requests from different origins
func enableCORS(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
        // Log the headers for debugging
        log.Println("CORS Headers set")

        if r.Method == "OPTIONS" {
            w.WriteHeader(http.StatusNoContent)
            return
        }
        next.ServeHTTP(w, r)
    })
}


// Fetch distribution data from SQLite database with pagination (fixed page size of 10)
// func getDistributions(db *sql.DB) http.HandlerFunc {
// 	return func(w http.ResponseWriter, r *http.Request) {
// 		w.Header().Set("Content-Type", "application/json")

// 		// Fixed page size of 10
// 		pageSize := 10
// 		pageIndex := 1 // Default to the first page if no pageIndex is provided

// 		// Parse query parameter for pageIndex
// 		queryPageIndex := r.URL.Query().Get("pageIndex")
// 		if queryPageIndex != "" {
// 			fmt.Sscanf(queryPageIndex, "%d", &pageIndex)
// 		}

// 		// Calculate offset for SQL query
// 		offset := (pageIndex - 1) * pageSize

// 		// Fetch total count for pagination
// 		var totalCount int
// 		err := db.QueryRow("SELECT COUNT(*) FROM distributions").Scan(&totalCount)
// 		if err != nil {
// 			http.Error(w, "Failed to get total count", http.StatusInternalServerError)
// 			return
// 		}

// 		// Fetch records with limit and offset for pagination
// 		rows, err := db.Query(`
// 			SELECT id, deliveryMethod, domainName, origin, state, priceClass, logging, sslCertificate, date
// 			FROM distributions
// 			LIMIT ? OFFSET ?`, pageSize, offset)
// 		if err != nil {
// 			http.Error(w, err.Error(), http.StatusInternalServerError)
// 			return
// 		}
// 		defer rows.Close()

// 		var distributions []Distribution
// 		for rows.Next() {
// 			var dist Distribution
// 			err := rows.Scan(&dist.ID, &dist.DeliveryMethod, &dist.DomainName, &dist.Origin, &dist.State, &dist.PriceClass, &dist.Logging, &dist.SSLCertificate, &dist.Date)
// 			if err != nil {
// 				http.Error(w, err.Error(), http.StatusInternalServerError)
// 				return
// 			}
// 			// Static tags for simplicity
// 			dist.Tags = map[string][]string{"department": {"marketing"}}
// 			distributions = append(distributions, dist)
// 		}

// 		// Calculate total number of pages
// 		pagesCount := (totalCount + pageSize - 1) / pageSize

// 		// Return the response with pagination info
// 		response := map[string]interface{}{
// 			"items":      distributions,
// 			"totalCount": totalCount,
// 			"pagesCount": pagesCount,
// 			"pageIndex":  pageIndex,
// 		}

// 		json.NewEncoder(w).Encode(response)
// 	}
// }
func getDistributions(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		// Pagination
		pageSize := 10
		pageIndex := 1
		queryPageIndex := r.URL.Query().Get("pageIndex")
		if queryPageIndex != "" {
			fmt.Sscanf(queryPageIndex, "%d", &pageIndex)
		}
		offset := (pageIndex - 1) * pageSize

		// Sorting
		sortingColumn := r.URL.Query().Get("sortingColumn")
		if sortingColumn == "" {
			sortingColumn = "id" // default column
		}
		sortingDescending := r.URL.Query().Get("sortingDescending")
		sortOrder := "ASC"
		if sortingDescending == "true" {
			sortOrder = "DESC"
		}

		// Filtering
		filteringText := r.URL.Query().Get("filteringText")
		filterValues := []interface{}{} // will store the values for the placeholders
		filterCondition := "1=1"        // no filtering by default

		if filteringText != "" {
			filterCondition = `
        		domainName LIKE ? OR
        		state LIKE ? OR
        		origin LIKE ? OR
				priceClass LIKE ? OR
				logging LIKE ? OR
				sslCertificate LIKE ? OR
				

    		`
			// Adding the filtering text with % wildcard for SQL LIKE query
			likePattern := "%" + filteringText + "%"
			filterValues = append(filterValues, likePattern, likePattern, likePattern)
		}

		// Fetch total count for pagination
		totalCountQuery := fmt.Sprintf("SELECT COUNT(*) FROM distributions WHERE %s", filterCondition)
		var totalCount int
		err := db.QueryRow(totalCountQuery, filterValues...).Scan(&totalCount)
		if err != nil {
			http.Error(w, "Failed to get total count", http.StatusInternalServerError)
			return
		}

		// Fetch paginated, sorted, and filtered records
		query := fmt.Sprintf(`
            SELECT id, deliveryMethod, domainName, origin, state, priceClass, logging, sslCertificate, date
            FROM distributions
            WHERE %s
            ORDER BY %s %s
            LIMIT ? OFFSET ?`, filterCondition, sortingColumn, sortOrder)

		// Adding page size and offset to the filter values
		filterValues = append(filterValues, pageSize, offset)

		rows, err := db.Query(query, filterValues...)
		if err != nil {
			log.Println("Error fetching distributions:", err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var distributions []Distribution
		for rows.Next() {
			var dist Distribution
			err := rows.Scan(&dist.ID, &dist.DeliveryMethod, &dist.DomainName, &dist.Origin, &dist.State, &dist.PriceClass, &dist.Logging, &dist.SSLCertificate, &dist.Date)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			dist.Tags = map[string][]string{"department": {"marketing"}}
			distributions = append(distributions, dist)
		}

		pagesCount := (totalCount + pageSize - 1) / pageSize
		response := map[string]interface{}{
			"items":      distributions,
			"totalCount": totalCount,
			"pagesCount": pagesCount,
			"pageIndex":  pageIndex,
		}

		json.NewEncoder(w).Encode(response)
	}
}

// Insert distribution data into the SQLite database
func insertDistribution(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		var dist Distribution
		err := json.NewDecoder(r.Body).Decode(&dist)
		if err != nil {
			http.Error(w, "Invalid input", http.StatusBadRequest)
			return
		}

		// Prepare SQL statement for insertion
		insertQuery := `
		INSERT INTO distributions (id, deliveryMethod, domainName, origin, state, priceClass, logging, sslCertificate, date)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
		`
		_, err = db.Exec(insertQuery, dist.ID, dist.DeliveryMethod, dist.DomainName, dist.Origin, dist.State, dist.PriceClass, dist.Logging, dist.SSLCertificate, dist.Date)
		if err != nil {
			http.Error(w, "Failed to insert data", http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(map[string]string{"status": "Data inserted successfully!"})
	}
}

func main() {
	// Connect to the SQLite database
	db, err := sql.Open("sqlite3", "./distributions.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Create the distributions table if it doesn't exist
	createTable := `
	CREATE TABLE IF NOT EXISTS distributions (
		id TEXT PRIMARY KEY,
		deliveryMethod TEXT,
		domainName TEXT,
		origin TEXT,
		state TEXT,
		priceClass TEXT,
		logging TEXT,
		sslCertificate TEXT,
		date TEXT
	);
	`
	_, err = db.Exec(createTable)
	if err != nil {
		log.Fatal(err)
	}

	r := mux.NewRouter()

	// Add your routes
	r.HandleFunc("/api/distributions", getDistributions(db)).Methods("GET", "OPTIONS")
	r.HandleFunc("/api/distributions", insertDistribution(db)).Methods("POST", "OPTIONS")
	r.Use(enableCORS)

	log.Println("Server running on port 8080")
	http.ListenAndServe(":8080", r) // Serve the API on port 8080
}
