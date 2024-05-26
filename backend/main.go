package main

import (
    // "github.com/davecgh/go-spew/spew"
    "database/sql"
    "encoding/json"
    "net/url"
    "log"
    "net/http"
    "github.com/gorilla/handlers"
    "github.com/gorilla/mux"
    _ "github.com/go-sql-driver/mysql"
    httpSwagger "github.com/swaggo/http-swagger"
    _ "github.com/2024-SS-IoTCC/StepTrack-Cloud/docs"
)

// StepData structure
type StepData struct {
    Username string `json:"username"`
    Steps    int    `json:"steps"`
    Start    string `json:"start"`
    End      string `json:"end"`
}

// GetStepData structure
type GetStepData struct {
    ID       int    `json:"id"`
    Username string `json:"username"`
    Steps    int    `json:"steps"`
    Start    string `json:"start"`
    End      string `json:"end"`
}

var db *sql.DB
var err error

// Home handler
// @Summary Show the status of the server
// @Description Get the status of the server
// @Tags status
// @Accept  json
// @Produce  json
// @Success 200 {object} map[string]string
// @Router / [get]
func HomeHandler(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
    jsonResponse := map[string]string{"status": "running"}
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(jsonResponse)
}

// Add steps handler
// @Summary Add steps data
// @Description Add steps data to the database
// @Tags steps
// @Accept  json
// @Produce  json
// @Param step body StepData true "Step Data"
// @Success 200 {object} map[string]string
// @Failure 400 {string} string "Bad Request"
// @Failure 500 {string} string "Internal Server Error"
// @Router /steps [post]
func AddStepsHandler(w http.ResponseWriter, r *http.Request) {
    var stepData StepData
    err := json.NewDecoder(r.Body).Decode(&stepData)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    stmt, err := db.Prepare("INSERT INTO steps (username, steps, start, end) VALUES (?, ?, ?, ?)")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer stmt.Close()

    _, err = stmt.Exec(stepData.Username, stepData.Steps, stepData.Start, stepData.End)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    jsonResponse := map[string]string{"insert": "ok"}
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(jsonResponse)
}

// GetSteps handler
// @Summary Get steps data
// @Description Get steps data from the database
// @Tags steps
// @Accept  json
// @Produce  json
// @Param username query string false "Username"
// @Param start query string false "URI encoded Start Time"
// @Param end query string false "URI encoded End Time"
// @Success 200 {array} interface{} "Array of StepData or aggregated data"
// @Failure 400 {string} string "Bad Request"
// @Failure 500 {string} string "Internal Server Error"
// @Router /steps [get]
func GetStepsHandler(w http.ResponseWriter, r *http.Request) {
    queryParams := r.URL.Query()
    username := queryParams.Get("username")
    start := queryParams.Get("start")
    end := queryParams.Get("end")

    var query string
    var args []interface{}

    // Check if any query parameter is provided
    if username != "" || start != "" || end != "" {
        query = "SELECT username, SUM(steps) as steps FROM steps WHERE 1=1"
        if username != "" {
            query += " AND username = ?"
            args = append(args, username)
        }
        if start != "" {
            startDecoded, err := url.QueryUnescape(start)
            if err != nil {
                http.Error(w, "Failed to decode 'start' parameter", http.StatusBadRequest)
                return
            }
            query += " AND start >= ?"
            args = append(args, startDecoded)
        }
        if end != "" {
            endDecoded, err := url.QueryUnescape(end)
            if err != nil {
                http.Error(w, "Failed to decode 'end' parameter", http.StatusBadRequest)
                return
            }
            query += " AND end <= ?"
            args = append(args, endDecoded)
        }
        query += " GROUP BY username ORDER BY steps DESC"
    } else {
        query = "SELECT id, username, steps, start, end FROM steps ORDER BY id DESC"
    }

    rows, err := db.Query(query, args...)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    if username != "" || start != "" || end != "" {
        var aggregatedSteps []struct {
            Username string `json:"username"`
            Steps    int    `json:"steps"`
        }
        for rows.Next() {
            var agg struct {
                Username string `json:"username"`
                Steps    int    `json:"steps"`
            }
            err := rows.Scan(&agg.Username, &agg.Steps)
            if err != nil {
                http.Error(w, err.Error(), http.StatusInternalServerError)
                return
            }
            aggregatedSteps = append(aggregatedSteps, agg)
        }
        if len(aggregatedSteps) == 0 {
            aggregatedSteps = []struct {
                Username string `json:"username"`
                Steps    int    `json:"steps"`
            }{}
        }
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(aggregatedSteps)
    } else {
        var steps []GetStepData
        for rows.Next() {
            var step GetStepData
            err := rows.Scan(&step.ID, &step.Username, &step.Steps, &step.Start, &step.End)
            if err != nil {
                http.Error(w, err.Error(), http.StatusInternalServerError)
                return
            }
            steps = append(steps, step)
        }
        if len(steps) == 0 {
            steps = []GetStepData{}
        }
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(steps)
    }
}

// Main function
// @title Step Data API
// @version 1.0
// @description This is a sample server for managing step data.
// @host localhost:8080
// @BasePath /
func main() {
    dsn := "iotcc:PPNfnJiya2cZVwWEXmAH@tcp(127.0.0.1:3306)/step_data"
    db, err = sql.Open("mysql", dsn)
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    err = db.Ping()
    if err != nil {
        log.Fatal(err)
    }

    r := mux.NewRouter()

    // Route handlers
    r.HandleFunc("/", HomeHandler).Methods("GET")
    r.HandleFunc("/steps", AddStepsHandler).Methods("POST")
    r.HandleFunc("/steps", GetStepsHandler).Methods("GET")

    // Swagger documentation
    r.PathPrefix("/swagger/").Handler(httpSwagger.WrapHandler)

    corsObj := handlers.AllowedOrigins([]string{"*"})

    http.Handle("/", r)
    log.Println("Server started at :8080")
    http.ListenAndServe(":8080", handlers.CORS(corsObj)(r))
}
