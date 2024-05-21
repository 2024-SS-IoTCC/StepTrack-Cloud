package main

import (
    "database/sql"
    "encoding/json"
    "log"
    "net/http"
    "github.com/gorilla/mux"
    _ "github.com/go-sql-driver/mysql"
)

// StepData structure
type StepData struct {
    Username string `json:"username"`
    Steps    int    `json:"steps"`
    Start    string `json:"start"`
    End      string `json:"end"`
}

var db *sql.DB
var err error

// Home handler
func HomeHandler(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
    w.Write([]byte("StepTrack-Cloud API is running!"))
}

// Items handler
func ItemsHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode("Items endpoint not yet implemented")
}

// Add steps handler
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
func GetStepsHandler(w http.ResponseWriter, r *http.Request) {
    // Parse query parameters
    queryParams := r.URL.Query()
    username := queryParams.Get("username")
    start := queryParams.Get("start")
    end := queryParams.Get("end")

    query := "SELECT id, username, steps, start, end FROM steps WHERE 1=1"

    if username != "" {
        query += " AND username = '" + username + "'"
    }
    if start != "" {
        query += " AND start >= '" + start + "'"
    }
    if end != "" {
        query += " AND end <= '" + end + "'"
    }

    rows, err := db.Query(query)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    var steps []StepData
    for rows.Next() {
        var step StepData
        err := rows.Scan(&step.Username, &step.Steps, &step.Start, &step.End)
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        steps = append(steps, step)
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(steps)
}

// Main function
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

    http.Handle("/", r)
    log.Println("Server started at :8080")
    http.ListenAndServe(":8080", nil)
}
