const db = require("../database/database");

function createTables() {

    db.serialize(() => {

        // ===============================
        // USERS
        // ===============================
        db.run(

        `
        CREATE TABLE IF NOT EXISTS users (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            username TEXT UNIQUE NOT NULL,

            password TEXT NOT NULL,

            role TEXT DEFAULT 'user',

            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP

        )
        `,
        (err)=>{

            if(err){

                console.log(err.message);

            }else{

                console.log("Users table ready.");

            }

        }

        );



        // ===============================
        // TASKS
        // ===============================

        db.run(

            `
            CREATE TABLE IF NOT EXISTS tasks (

                id INTEGER PRIMARY KEY AUTOINCREMENT,

                userId INTEGER NOT NULL,

                title TEXT NOT NULL,

                description TEXT,

                category TEXT NOT NULL,

                status TEXT NOT NULL,

                deadline TEXT,

                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,

                FOREIGN KEY(userId)
                    REFERENCES users(id)
                    ON DELETE CASCADE

            )
            `,

            (err) => {

                if (err) {

                    console.log("Create tasks table failed.");

                    console.log(err.message);

                }
                else {

                    console.log("Tasks table ready.");

                }

            }

        );

    });

}

module.exports = createTables;