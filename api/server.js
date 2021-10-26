const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

const db = mysql.createPool({
    host: 'mysql_db',
    user: 'MYSQL_USER',
    password: 'MYSQL_PASSWORD',
    database: 'todo'
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//c
app.post("/insert", (req, res) => {
    const desc = req.body.description;
    const deadline = req.body.deadline;

    let InsertQuery = "INSERT INTO todos (description) VALUES (?)";
    let values = [
        desc
    ];

    if (deadline) {
        InsertQuery = "INSERT INTO todos (description, deadline) VALUES (?, ?)"
        values.push(new Date(deadline));
    }

    db.query(InsertQuery, values, (err, result) => {
        if (err) console.log(err)
        console.log(result)
        res.send(result);
    });
})

//r
app.get('/get', (req, res) => {
    const SelectQuery = "SELECT * FROM  todos ORDER BY id DESC";
    db.query(SelectQuery, (err, result) => {
        console.log('GET', result);
        res.send(result)
    })
})

//u
app.put("/check/:todoId", (req, res) => {
    const todoId = req.params.todoId;
    const UpdateQuery = "UPDATE todos SET checkedTime = ? WHERE id = ?";
    db.query(UpdateQuery, [new Date(), todoId], (err, result) => {
        if (err) console.log(err)
        res.send(result);
    })
})

//d
app.delete("/delete/:todoId", (req, res) => {
    const todoId = req.params.todoId;
    const DeleteQuery = "DELETE FROM todos WHERE id = ?";
    db.query(DeleteQuery, todoId, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    })
})

app.listen('3001', () => { })

