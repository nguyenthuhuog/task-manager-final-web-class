const express = require("express");
const cors = require("cors");

const db = require("./database/database");

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const createTables = require("./utils/createTables");

const app = express();

const PORT = process.env.PORT || 3000;


// ================= Middleware =================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));



// ================= Database =================

createTables();



// ================= Routes =================

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);



// ================= Test =================

app.get("/", (req,res)=>{

    res.json({

        success:true,

        message:"Task Manager Backend Running"

    });

});



// ================= 404 =================

app.use((req,res)=>{

    res.status(404).json({

        success:false,

        message:"API not found"

    });

});



// ================= Error =================

app.use((err,req,res,next)=>{

    console.error(err);

    res.status(500).json({

        success:false,

        message:"Internal Server Error"

    });

});


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});