// ======================================
// Application Entry
// ======================================

window.addEventListener("DOMContentLoaded", init);


// ======================================
// Initialize Application
// ======================================

function init() {

    console.log("Task Manager started.");

    // Kiểm tra trạng thái đăng nhập
    checkLogin();

    // Thiết lập các sự kiện giao diện
    initializeUI();

}


// ======================================
// Initialize UI
// ======================================

function initializeUI() {

    //--------------------------------------------------
    // Đóng modal khi nhấn ESC
    //--------------------------------------------------

    document.addEventListener("keydown", function (e) {

        if (e.key !== "Escape")
            return;

        closeTaskModal();

        closeDetailModal();

        closeDeleteModal();

    });


    //--------------------------------------------------
    // Đóng modal khi click nền tối
    //--------------------------------------------------

    document.querySelectorAll(".modal").forEach(modal => {

        modal.addEventListener("click", function (e) {

            if (e.target === modal) {

                closeTaskModal();

                closeDetailModal();

                closeDeleteModal();

            }

        });

    });


    // //--------------------------------------------------
    // // Refresh khi quay lại tab
    // //--------------------------------------------------

    // document.addEventListener("visibilitychange", function () {
    // console.log("visibility:", document.visibilityState);

    //     if (

    //         document.visibilityState === "visible"

    //         &&

    //         token

    //     ) {

    //         loadTasks();

    //     }

    // });

}