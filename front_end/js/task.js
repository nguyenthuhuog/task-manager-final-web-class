// ======================================
// Global Variables
// ======================================

let tasks = [];

let editingTaskId = null;

let deletingTaskId = null;


// ======================================
// DOM Elements
// ======================================

const taskForm = document.getElementById("taskForm");

const addTaskBtn = document.getElementById("addTaskBtn");

const searchInput = document.getElementById("searchInput");

const categoryFilter = document.getElementById("filterCategory");

const statusFilter = document.getElementById("filterStatus");

const sortSelect = document.getElementById("sortSelect");


// ======================================
// Load Tasks
// ======================================

async function loadTasks() {
    console.trace("loadTasks called");

    if (!token) return;

    showLoading();

    const result = await API.getTasks(token);

    console.log(result);

    hideLoading();

    if (!result.success) {

        showToast(result.message, "error");

        return;

    }

    tasks = result.data || [];
    console.log("tasks =", tasks);

    filterTasks();

}


// ======================================
// Open Add Task Modal
// ======================================

if (addTaskBtn) {

    addTaskBtn.addEventListener("click", () => {

        editingTaskId = null;

        taskForm.reset();

        openTaskModal(false);

    });

}


// ======================================
// Save Task
// ======================================

if (taskForm) {

    taskForm.addEventListener("submit", saveTask);

}

async function saveTask(e) {

    e.preventDefault();

    const task = {

        title: document.getElementById("title").value.trim(),

        description: document.getElementById("description").value.trim(),

        category: document.getElementById("category").value,

        status: document.getElementById("status").value,

        deadline: document.getElementById("deadline").value

    };


    //------------------------------------
    // Validate
    //------------------------------------

    if (!validateTask(task))

        return;


    //------------------------------------
    // Loading
    //------------------------------------

    showLoading();


    let result;


    //------------------------------------
    // Create
    //------------------------------------

    if (editingTaskId == null) {

        result = await API.createTask(

            task,

            token

        );

    }

    //------------------------------------
    // Update
    //------------------------------------

    else {

        result = await API.updateTask(

            editingTaskId,

            task,

            token

        );

    }


    hideLoading();


    if (!result.success) {

        showToast(result.message, "error");

        return;

    }


    showToast(

        editingTaskId == null

            ? "Task created"

            : "Task updated"

    );


    editingTaskId = null;

    closeTaskModal();

    loadTasks();

}



// ======================================
// Edit Task
// ======================================

function editTask(id) {

    const task = tasks.find(

        t => t.id == id

    );

    if (!task)

        return;


    editingTaskId = id;


    document.getElementById("title").value =

        task.title;


    document.getElementById("description").value =

        task.description;


    document.getElementById("category").value =

        task.category;


    document.getElementById("status").value =

        task.status;


    document.getElementById("deadline").value =

        task.deadline || "";


    openTaskModal(true);

}



// ======================================
// Delete Task
// ======================================

function confirmDelete(id) {

    deletingTaskId = id;

    openDeleteModal();

}


const confirmDeleteBtn = document.getElementById(

    "confirmDelete"

);

if (confirmDeleteBtn) {

    confirmDeleteBtn.addEventListener(

        "click",

        deleteTask

    );

}


async function deleteTask() {

    if (deletingTaskId == null)

        return;


    showLoading();


    const result = await API.deleteTask(

        deletingTaskId,

        token

    );


    hideLoading();


    closeDeleteModal();


    if (!result.success) {

        showToast(result.message, "error");

        return;

    }


    showToast("Task deleted");


    deletingTaskId = null;


    loadTasks();

}

// ======================================
// Search + Filter + Sort
// ======================================

if (searchInput) {

    searchInput.addEventListener(

        "input",

        filterTasks

    );

}

if (categoryFilter) {

    categoryFilter.addEventListener(

        "change",

        filterTasks

    );

}

if (statusFilter) {

    statusFilter.addEventListener(

        "change",

        filterTasks

    );

}

if (sortSelect) {

    sortSelect.addEventListener(

        "change",

        filterTasks

    );

}


function filterTasks() {

    let result = [...tasks];


    console.log("filterTasks", tasks.length);
    //----------------------------------
    // Search
    //----------------------------------

    const keyword = searchInput.value
        .trim()
        .toLowerCase();

    if (keyword !== "") {

        result = result.filter(task =>

            task.title.toLowerCase().includes(keyword)

            ||

            task.description.toLowerCase().includes(keyword)

        );

    }



    //----------------------------------
    // Category
    //----------------------------------

    const category = categoryFilter.value;

    if (category !== "all") {

        result = result.filter(

            task => task.category === category

        );

    }



    //----------------------------------
    // Status
    //----------------------------------

    const status = statusFilter.value;

    if (status !== "all") {

        result = result.filter(

            task => task.status === status

        );

    }



    //----------------------------------
    // Sort
    //----------------------------------

    switch (sortSelect.value) {

        case "title":

            result.sort(

                (a, b) =>

                a.title.localeCompare(b.title)

            );

            break;


        case "deadline":

            result.sort(

                (a, b) =>

                new Date(a.deadline)

                -

                new Date(b.deadline)

            );

            break;


        case "oldest":

            result.sort(

                (a, b) =>

                a.id - b.id

            );

            break;


        default:

            result.sort(

                (a, b) =>

                b.id - a.id

            );

            break;

    }



    //----------------------------------
    // Update UI
    //----------------------------------
    console.log("rendering", result.length);
    renderTasks(result);

    updateDashboard(result);

}

// ======================================
// Detail
// ======================================

function showTaskDetail(id) {

    const task = tasks.find(

        t => t.id == id

    );

    if (!task)

        return;


    const html = `

        <h3>${task.title}</h3>

        <hr>

        <p>

            <strong>Description</strong>

            <br>

            ${task.description}

        </p>

        <p>

            <strong>Category</strong>

            <br>

            ${task.category}

        </p>

        <p>

            <strong>Status</strong>

            <br>

            ${task.status}

        </p>

        <p>

            <strong>Deadline</strong>

            <br>

            ${task.deadline || "-"}

        </p>

    `;

    openDetailModal(html);

}

// ======================================
// Event Delegation
// ======================================

taskContainer.addEventListener(

    "click",

    function (e) {

        //--------------------------------
        // Detail
        //--------------------------------

        if (

            e.target.classList.contains(

                "detail-btn"

            )

        ) {

            showTaskDetail(

                e.target.dataset.id

            );

        }



        //--------------------------------
        // Edit
        //--------------------------------

        if (

            e.target.classList.contains(

                "edit-btn"

            )

        ) {

            editTask(

                e.target.dataset.id

            );

        }



        //--------------------------------
        // Delete
        //--------------------------------

        if (

            e.target.classList.contains(

                "delete-btn"

            )

        ) {

            confirmDelete(

                e.target.dataset.id

            );

        }

    }

);