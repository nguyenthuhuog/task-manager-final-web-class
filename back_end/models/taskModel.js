const db = require("../database/database");

/* ===========================
   GET ALL TASKS OF A USER
=========================== */

function getAllTasks(userId) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT *
            FROM tasks
            WHERE userId = ?
            ORDER BY createdAt DESC
        `;

        db.all(sql, [userId], (err, rows) => {

            if (err) {

                reject(err);

            } else {

                resolve(rows);

            }

        });

    });

}



/* ===========================
   GET TASK BY ID
=========================== */

function getTaskById(id, userId) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT *
            FROM tasks
            WHERE id = ?
            AND userId = ?
        `;

        db.get(sql, [id, userId], (err, row) => {

            if (err) {

                reject(err);

            } else {

                resolve(row);

            }

        });

    });

}



/* ===========================
   CREATE TASK
=========================== */

function createTask(task) {

    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO tasks
            (
                userId,
                title,
                description,
                category,
                status,
                deadline
            )
            VALUES
            (?, ?, ?, ?, ?, ?)
        `;

        db.run(

            sql,

            [

                task.userId,

                task.title,

                task.description,

                task.category,

                task.status,

                task.deadline

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



/* ===========================
   UPDATE TASK
=========================== */

function updateTask(id, userId, task) {

    return new Promise((resolve, reject) => {

        const sql = `
            UPDATE tasks

            SET

                title = ?,

                description = ?,

                category = ?,

                status = ?,

                deadline = ?

            WHERE

                id = ?

                AND userId = ?
        `;

        db.run(

            sql,

            [

                task.title,

                task.description,

                task.category,

                task.status,

                task.deadline,

                id,

                userId

            ],

            function (err) {

                if (err) {

                    reject(err);

                } else {

                    resolve({

                        changes: this.changes

                    });

                }

            }

        );

    });

}



/* ===========================
   DELETE TASK
=========================== */

function deleteTask(id, userId) {

    return new Promise((resolve, reject) => {

        const sql = `
            DELETE FROM tasks

            WHERE

                id = ?

                AND userId = ?
        `;

        db.run(

            sql,

            [

                id,

                userId

            ],

            function (err) {

                if (err) {

                    reject(err);

                } else {

                    resolve({

                        changes: this.changes

                    });

                }

            }

        );

    });

}



/* ===========================
   SEARCH TASK
=========================== */

function searchTasks(userId, keyword) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT *

            FROM tasks

            WHERE

                userId = ?

                AND

                (

                    title LIKE ?

                    OR description LIKE ?

                    OR category LIKE ?

                )

            ORDER BY createdAt DESC
        `;

        const search = `%${keyword}%`;

        db.all(

            sql,

            [

                userId,

                search,

                search,

                search

            ],

            (err, rows) => {

                if (err) {

                    reject(err);

                } else {

                    resolve(rows);

                }

            }

        );

    });

}



/* ===========================
   FILTER TASK
=========================== */

function filterTasks(userId, category, status) {

    return new Promise((resolve, reject) => {

        let sql = `
            SELECT *

            FROM tasks

            WHERE userId = ?
        `;

        const params = [

            userId

        ];



        if (category) {

            sql += `
                AND category = ?
            `;

            params.push(category);

        }



        if (status) {

            sql += `
                AND status = ?
            `;

            params.push(status);

        }



        sql += `
            ORDER BY createdAt DESC
        `;



        db.all(

            sql,

            params,

            (err, rows) => {

                if (err) {

                    reject(err);

                } else {

                    resolve(rows);

                }

            }

        );

    });

}



/* ===========================
   EXPORT
=========================== */

module.exports = {

    getAllTasks,

    getTaskById,

    createTask,

    updateTask,

    deleteTask,

    searchTasks,

    filterTasks

};