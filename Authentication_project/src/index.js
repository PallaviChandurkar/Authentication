const express = require('express');
const path = require("path")
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();
app.use(express.json());

app.use(express.urlencoded({extended: false}));

//use ejs as the view engine
app.set('view engine','ejs');

//static file
app.use(express.static("public"));

app.get("/",(req,res) => {
    res.render("login");
});

app.get("/signup",(req,res)=> {
    res.render("signup");
});

//Register User
app.post("/signup",async (req,res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    // check if the user already exist in the database
    const existingUser = await collection.findOne({name: data.name});

    if(existingUser) {
        res.send("User already exists. Please choose a different username.")
    }else{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password,saltRounds);
        data.password = hashedPassword;

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
});

//Login User
app.post("/login",async (req,res) => {
    try{
        const check = await collection.findOne({name: req.body.username});
        if(!check){
            res.send("user name cannot find");
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch){
            res.render("home");
        }
        else{
            res.send("wrong password")
        }
    }catch {
        res.send("Wrong details");
    }
})

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});