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
    Start    int    `json:"start"`
    End      int    `json:"end"`
}

var db *sql.DB
var err error

// Home handler
func HomeHandler(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
    w.Write([]byte("StepTrack-Cloud API ready."))
}

// AddSteps handler
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

    w.WriteHeader(http.StatusCreated)
    w.Write([]byte("Step data added successfully"))
}

// Main function
func main() {
    dsn := "iotcc:ZGrRTTbyKZpZeEuTUM3R@tcp(127.0.0.1:3306)/step_data_db"
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

    http.Handle("/", r)
    log.Println("Server started at :8080")
    http.ListenAndServe(":8080", nil)
}
