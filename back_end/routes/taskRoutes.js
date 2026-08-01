const express = require("express");

const router = express.Router();

const TaskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");


/* ===========================
   GET ALL TASKS
=========================== */

router.get(
    "/",
    authMiddleware,
    TaskController.getTasks
);


/* ===========================
   SEARCH TASK
   GET /api/tasks/search?keyword=abc
=========================== */

router.get(
    "/search",
    authMiddleware,
    TaskController.searchTasks
);


/* ===========================
   FILTER TASK
   GET /api/tasks/filter?category=Work&status=Doing
=========================== */

router.get(
    "/filter",
    authMiddleware,
    TaskController.filterTasks
);


/* ===========================
   GET TASK DETAIL
=========================== */

router.get(
    "/:id",
    authMiddleware,
    TaskController.getTask
);


/* ===========================
   CREATE TASK
=========================== */

router.post(
    "/",
    authMiddleware,
    TaskController.createTask
);


/* ===========================
   UPDATE TASK
=========================== */

router.put(
    "/:id",
    authMiddleware,
    TaskController.updateTask
);


/* ===========================
   DELETE TASK
=========================== */

router.delete(
    "/:id",
    authMiddleware,
    TaskController.deleteTask
);


module.exports = router;