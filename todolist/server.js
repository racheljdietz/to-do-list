const express = require("express");
const app = express();

// route to the root
app.get('/', (req, res) => {
    db.select('*').from('task').then(data => {
        res.render('index', { todolist: data });
    }).catch(err => res.status(400).json(err));
});

// server port connection
app.listen(8080, ()=> console.log('app is running on port 8080'));

// set up the express to use template engine
app.set('view engine', 'ejs');

const dotenv = require('dotenv');
dotenv.config();

const knex = require('knex');
const db = knex({
    client: 'pg', // postgres
    connection: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD
    }
});

const bodyParser = require("body-parser");
app.user(bodyParser.urlencoded({ extended: true }));

// create new task
app.post("/addTask", (req, res) => {
    const { textTodo } = req.body;
    
    db("task").insert({ task: textTodo }).returning("*").then(_=> {
       res.redirect("/");
    }).catch(err => {
        res.status(400).json({ message: "unable to create a new task"
       });
    });
});