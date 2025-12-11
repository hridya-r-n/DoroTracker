const express=require('express');
const cors=require("cors");
const mysql=require("mysql2");

const app=express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'pomodoro_db'
});

db.connect((err)=>{
    if(err){
        console.error("Connection Failed:",err);
        return;
    }
    console.log("Connection Successful");
});

app.set('db',db)
const authRoutes = require("./routes/auth");
const settingsRoutes = require("./routes/settings");
const focusRoutes = require("./routes/focus");

app.use("/api/auth", authRoutes);
app.use("/settings", settingsRoutes);
app.use("/focus", focusRoutes);

app.listen(5000,()=>{
    console.log("Server running on port 5000")
})