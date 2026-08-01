const sqlite3 = require("sqlite3").verbose();

const path = require("path");

// Đường dẫn tới file SQLite
const dbPath = path.join(__dirname, "task_manager.db");

// Kết nối database
const db = new sqlite3.Database(dbPath, (err) => {

    if (err) {

        console.error("Cannot connect to SQLite database.");
        console.error(err.message);

    }
    else {

        console.log("Connected to SQLite database.");

    }

});

module.exports = db;