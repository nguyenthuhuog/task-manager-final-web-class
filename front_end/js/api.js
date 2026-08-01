// =====================================
// API Configuration
// =====================================

const API_BASE = "https://task-manager-final-web-class-back-end.onrender.com/api";


// =====================================
// Generic Request Function
// =====================================

async function request(url, options = {}) {

    try {

        const response = await fetch(API_BASE + url, options);

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message || "Server Error");

        }

        return data;

    }

    catch (err) {

        console.error(err);

        return {

            success: false,

            message: err.message

        };

    }

}



// =====================================
// Authentication API
// =====================================

const API = {

    //----------------------------------
    // Login
    //----------------------------------

    login(username, password) {

        return request("/auth/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                username,

                password

            })

        });

    },



    //----------------------------------
    // Register
    //----------------------------------

    register(user) {

        return request("/auth/register", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(user)

        });

    },



    //----------------------------------
    // Get All Tasks
    //----------------------------------

    getTasks(token) {

        return request("/tasks", {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

    },



    //----------------------------------
    // Get One Task
    //----------------------------------

    getTask(id, token) {

        return request(`/tasks/${id}`, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

    },



    //----------------------------------
    // Create Task
    //----------------------------------

    createTask(task, token) {

        return request("/tasks", {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify(task)

        });

    },



    //----------------------------------
    // Update Task
    //----------------------------------

    updateTask(id, task, token) {

        return request(`/tasks/${id}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify(task)

        });

    },



    //----------------------------------
    // Delete Task
    //----------------------------------

    deleteTask(id, token) {

        return request(`/tasks/${id}`, {

            method: "DELETE",

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

    }

};