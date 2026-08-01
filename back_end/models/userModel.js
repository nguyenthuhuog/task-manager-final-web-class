const db = require("../database/database");


/* ===========================
   FIND USER BY USERNAME
=========================== */

function findByUsername(username) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT *
            FROM users
            WHERE username = ?
        `;

        db.get(sql, [username], (err, row) => {

            if (err) {

                reject(err);

            } else {

                resolve(row);

            }

        });

    });

}



/* ===========================
   FIND USER BY ID
=========================== */

function findById(id) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT id, username
            FROM users
            WHERE id = ?
        `;

        db.get(sql, [id], (err, row) => {

            if (err) {

                reject(err);

            } else {

                resolve(row);

            }

        });

    });

}



/* ===========================
   CREATE USER
=========================== */

function createUser(username, passwordHash) {

    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO users(
                username,
                password
            )
            VALUES(?,?)
        `;

        db.run(

            sql,

            [

                username,

                passwordHash,

            ],

            function (err) {

                if (err) {

                    reject(err);

                } else {

                    resolve({

                        id: this.lastID

                    });

                }

            }

        );

    });

}



module.exports = {

    findByUsername,

    findById,

    createUser

};