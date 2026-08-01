// =====================================
// UI Elements
// =====================================

const loading = document.getElementById("loading");

const toast = document.getElementById("toast");

const taskModal = document.getElementById("taskModal");

const detailModal = document.getElementById("detailModal");

const deleteModal = document.getElementById("deleteModal");

const modalTitle = document.getElementById("modalTitle");

const detailContent = document.getElementById("detailContent");


// Dashboard

const totalTask = document.getElementById("totalTask");

const pendingTask = document.getElementById("pendingTask");

const doingTask = document.getElementById("doingTask");

const doneTask = document.getElementById("doneTask");


// Empty State

const emptyState = document.getElementById("emptyState");

const taskContainer = document.getElementById("taskContainer");


// =====================================
// Loading
// =====================================

function showLoading() {

    loading.classList.remove("hidden");

}

function hideLoading() {

    loading.classList.add("hidden");

}


// =====================================
// Toast
// =====================================

let toastTimer = null;

function showToast(message, type = "success") {

    toast.textContent = message;

    toast.className = `toast ${type}`;

    toast.classList.remove("hidden");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.add("hidden");

    }, 2500);

}


// =====================================
// Modal
// =====================================

function openTaskModal(edit = false) {

    modalTitle.textContent = edit
        ? "Edit Task"
        : "Add Task";

    taskModal.classList.remove("hidden");

}

function closeTaskModal() {

    taskModal.classList.add("hidden");

    document.getElementById("taskForm").reset();

}

function openDetailModal(html) {

    detailContent.innerHTML = html;

    detailModal.classList.remove("hidden");

}

function closeDetailModal() {

    detailModal.classList.add("hidden");

}

function openDeleteModal() {

    deleteModal.classList.remove("hidden");

}

function closeDeleteModal() {

    deleteModal.classList.add("hidden");

}


// =====================================
// Empty State
// =====================================

function toggleEmptyState(tasks) {

    if (tasks.length === 0) {

        emptyState.classList.remove("hidden");

        taskContainer.classList.add("hidden");

    }

    else {

        emptyState.classList.add("hidden");

        taskContainer.classList.remove("hidden");

    }

}


// =====================================
// Dashboard
// =====================================

function updateDashboard(tasks) {

    totalTask.textContent = tasks.length;

    pendingTask.textContent = tasks.filter(

        t => t.status === "Pending"

    ).length;

    doingTask.textContent = tasks.filter(

        t => t.status === "Doing"

    ).length;

    doneTask.textContent = tasks.filter(

        t => t.status === "Done"

    ).length;

}


// =====================================
// Validation
// =====================================

function clearErrors() {

    document.querySelectorAll(".error").forEach(

        e => e.textContent = ""

    );

}

function validateTask(task) {

    clearErrors();

    let valid = true;

    if (!task.title.trim()) {

        document.getElementById("titleError").textContent =
            "Title is required";

        valid = false;

    }

    if (!task.description.trim()) {

        document.getElementById("descriptionError").textContent =
            "Description is required";

        valid = false;

    }

    return valid;

}


// =====================================
// Render Task Cards
// =====================================

function renderTasks(tasks) {

    taskContainer.innerHTML = "";

    toggleEmptyState(tasks);

    tasks.forEach(task => {

        const card = document.createElement("div");

        card.className = "task-card";

        card.innerHTML = `

            <div class="task-header">

                <h3>${task.title}</h3>

                <span class="status ${task.status.toLowerCase()}">

                    ${task.status}

                </span>

            </div>

            <p class="category">

                ${task.category}

            </p>

            <p>

                ${task.description}

            </p>

            <p class="deadline">

                Deadline:
                ${task.deadline || "-"}

            </p>

            <div class="task-actions">

                <button
                    class="detail-btn"
                    data-id="${task.id}">

                    Detail

                </button>

                <button
                    class="edit-btn"
                    data-id="${task.id}">

                    Edit

                </button>

                <button
                    class="delete-btn"
                    data-id="${task.id}">

                    Delete

                </button>

            </div>

        `;

        taskContainer.appendChild(card);

    });

}


// =====================================
// Close Modal Buttons
// =====================================

document
.getElementById("cancelBtn")
.addEventListener(

    "click",

    closeTaskModal

);

document
.getElementById("closeDetail")
.addEventListener(

    "click",

    closeDetailModal

);

document
.getElementById("cancelDelete")
.addEventListener(

    "click",

    closeDeleteModal

);


// =====================================
// Close when clicking outside
// =====================================

window.addEventListener("click", function (e) {

    if (e.target === taskModal)

        closeTaskModal();

    if (e.target === detailModal)

        closeDetailModal();

    if (e.target === deleteModal)

        closeDeleteModal();

});