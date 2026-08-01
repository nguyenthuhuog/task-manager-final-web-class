const TaskModel = require("../models/taskModel");

/* ===========================
   GET ALL TASKS
=========================== */

async function getTasks(req, res) {

    try {

        const userId = req.user.id;

        const tasks = await TaskModel.getAllTasks(userId);

        res.status(200).json({

            success: true,

            data: tasks

        });

    }
    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: "Không thể lấy danh sách công việc."

        });

    }

}


/* ===========================
   GET TASK DETAIL
=========================== */

async function getTask(req, res) {

    try {

        const id = req.params.id;
        const userId = req.user.id;

        const task = await TaskModel.getTaskById(id, userId);

        if (!task) {

            return res.status(404).json({
                message: "Không tìm thấy công việc."
            });

        }

        res.json(task);

    }
    catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Lỗi máy chủ."
        });

    }

}



/* ===========================
   CREATE TASK
=========================== */

async function createTask(req, res) {

    try {

        const {

            title,
            description,
            category,
            status,
            deadline

        } = req.body;


        if (!title || title.trim() === "") {

            return res.status(400).json({

                success:false,

                message:"Tên công việc không được để trống."

            });

        }


        const task = {

            userId:req.user.id,

            title,

            description,

            category,

            status,

            deadline

        };


        const result = await TaskModel.createTask(task);


        res.status(201).json({

            success:true,

            message:"Tạo công việc thành công.",

            data:{
                id:result.id
            }

        });


    }

    catch(err){

        console.error(err);


        res.status(500).json({

            success:false,

            message:"Không thể tạo công việc."

        });

    }

}



/* ===========================
   UPDATE TASK
=========================== */

async function updateTask(req, res) {

    try {

        const id = req.params.id;

        const userId = req.user.id;

        const {

            title,
            description,
            category,
            status,
            deadline

        } = req.body;

        if (!title || title.trim() === "") {

            return res.status(400).json({

                message: "Tên công việc không được để trống."

            });

        }

        const task = {

            title,

            description,

            category,

            status,

            deadline

        };

        const result = await TaskModel.updateTask(

            id,
            userId,
            task

        );

        if (result.changes === 0) {

            return res.status(404).json({

                message: "Không tìm thấy công việc."

            });

        }

        res.json({

            success:true,
            message: "Cập nhật thành công."

        });

    }
    catch (err) {

        console.error(err);

        res.status(500).json({

            message: "Không thể cập nhật."

        });

    }

}



/* ===========================
   DELETE TASK
=========================== */

async function deleteTask(req, res) {

    try {

        const id = req.params.id;

        const userId = req.user.id;


        const result = await TaskModel.deleteTask(
            id,
            userId
        );


        if (result.changes === 0) {

            return res.status(404).json({

                success:false,

                message:"Không tìm thấy công việc."

            });

        }


        res.json({

            success:true,

            message:"Đã xóa."

        });


    }
    catch (err) {

        console.error(err);


        res.status(500).json({

            success:false,

            message:"Không thể xóa."

        });

    }

}


/* ===========================
   SEARCH TASK
=========================== */

async function searchTasks(req, res) {

    try {

        const keyword = req.query.keyword || "";

        const userId = req.user.id;

        const tasks = await TaskModel.searchTasks(

            userId,
            keyword

        );

        res.json(tasks);

    }
    catch (err) {

        console.error(err);

        res.status(500).json({

            message: "Lỗi tìm kiếm."

        });

    }

}



/* ===========================
   FILTER TASK
=========================== */

async function filterTasks(req, res) {

    try {

        const category = req.query.category || "";

        const status = req.query.status || "";

        const userId = req.user.id;

        const tasks = await TaskModel.filterTasks(

            userId,

            category,

            status

        );

        res.json(tasks);

    }
    catch (err) {

        console.error(err);

        res.status(500).json({

            message: "Lỗi lọc dữ liệu."

        });

    }

}



/* ===========================
   EXPORT
=========================== */

module.exports = {

    getTasks,

    getTask,

    createTask,

    updateTask,

    deleteTask,

    searchTasks,

    filterTasks

};