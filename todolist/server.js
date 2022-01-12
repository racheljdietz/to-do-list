require('dotenv').config();
const express = require("express");
const knex = require('knex');

const db = knex({
    client: 'pg', // postgres
    connection: {
        host: process.env.HOST,
        port: process.env.PORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.NAME
    }
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));

// res.render
app.get('/', (req, res) => {
    db.select("*").from("list").then( data => {
        res.render('index', {todos: data});
    }).catch(err => res.status(400).json(err));
});

// create new task
app.post("/addTask", (req, res) => {
    const { textTodo } = req.body;
    db("list").insert({task: textTodo}).returning("*").then(list => {
        res.redirect("/");
    }).catch(err => {
        res.status(400).json({ message: "unable to create a new task" });
      });
});

// mark task done
app.post("/", (req, res) => {
    const {name, id} = req.body;
    if(name === "todo checked"){
        db("list")
        .where("id", "=", id)
        .update("status", 1)
        .then(task => {res.json(task[0])});
    } else {
        db("list")
        .where("id", "=", id)
        .update("status", 0)
        .then(task => {res.json(task[0])});
    }
});

// delete task
app.delete("/", (req, res) => {
    const {id} = req.body;
    db("list")
        .where("id", "=", id)
        .del()
        .then(task => {res.json(task[0])});
});


app.listen(8080, () => console.log("app is running on port 8080"));