// =====================================
// Authentication
// =====================================

let token = localStorage.getItem("token");


// =====================================
// DOM
// =====================================

const loginSection = document.getElementById("loginSection");

const appSection = document.getElementById("appSection");

const loginForm = document.getElementById("loginForm");

const registerForm = document.getElementById("registerForm");

const loginBtn = document.getElementById("loginBtn");

const logoutBtn = document.getElementById("logoutBtn");

const usernameDisplay = document.getElementById("usernameDisplay");


function resetAuthForms() {

    if (loginForm) {
        loginForm.reset();
    }

    if (registerForm) {
        registerForm.reset();
    }

}

// =====================================
// Login
// =====================================

async function login(e) {

    e.preventDefault();

    showLoading();

    const username = loginForm.username.value.trim();

    const password = loginForm.password.value;

    const result = await API.login(username, password);

    hideLoading();

    if (!result.success) {

        showToast(result.message, "error");

        return;

    }
    console.log("Login success");

    token = result.token;

    localStorage.setItem("username", result.user.username);
    
    localStorage.setItem("token", token);

    loginSection.classList.add("hidden");

    appSection.classList.remove("hidden");

    logoutBtn.classList.remove("hidden");

    loginBtn.classList.add("hidden");

    showToast("Login successful");

    usernameDisplay.textContent =`Hello, ${username}`;

    usernameDisplay.classList.remove("hidden");

    loadTasks();

}


// =====================================
// Register
// =====================================

async function register(e){

    e.preventDefault();

    const result = await API.register({

        username:

            registerForm.username.value.trim(),

        password:

            registerForm.password.value

    });

    showToast(result.message);

}

// =====================================
// Logout
// =====================================

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("username");

    token = null;

    appSection.classList.add("hidden");

    loginSection.classList.remove("hidden");

    logoutBtn.classList.add("hidden");

    loginBtn.classList.remove("hidden");

    usernameDisplay.classList.add("hidden");

    showToast("Logged out");

    resetAuthForms()
}


// =====================================
// Auto Login
// =====================================

function checkLogin() {

    if (token) {

        loginSection.classList.add("hidden");

        appSection.classList.remove("hidden");

        logoutBtn.classList.remove("hidden");

        loginBtn.classList.add("hidden");

        const username =
            localStorage.getItem("username");


        if(username){

            usernameDisplay.textContent =
                `Hello, ${username}`;

            usernameDisplay.classList.remove("hidden");

        }
        else{

            usernameDisplay.textContent = "";

            usernameDisplay.classList.add("hidden");

        }

        loadTasks();

    }

    else {

        loginSection.classList.remove("hidden");

        appSection.classList.add("hidden");

        logoutBtn.classList.add("hidden");

        loginBtn.classList.remove("hidden");

        usernameDisplay.textContent = "";

        usernameDisplay.classList.add("hidden");

        resetAuthForms()
    }

}


// =====================================
// Event Listener
// =====================================

if (loginForm) {

    loginForm.addEventListener(

        "submit",

        login

    );

}


if (registerForm) {

    registerForm.addEventListener(

        "submit",

        register

    );

}


if (logoutBtn) {

    logoutBtn.addEventListener(

        "click",

        logout

    );

}