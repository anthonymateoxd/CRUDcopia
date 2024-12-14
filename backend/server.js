const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'crud',
    port: 3307
});


app.get("/", (req, res) => {
    const sql = 'SELECT * FROM students';
    db.query(sql, (err, data) => {
        if(err) return res.json('Error');
        return res.json(data);
    })
})

app.post('/create', (req, res) => {
    const sql = 'INSERT INTO students (`Name`, `Email`) VALUES (?)';
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json('Error')
            return res.json(data);
    })
})

app.put('/update/:id', (req, res) => {
    const sql = 'UPDATE students SET `Name` = ?, `Email` = ? WHERE ID = ?';
    const values = [
        req.body.name,
        req.body.email
    ]
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json('Error')
            return res.json(data);
    })
})

app.delete('/students/:id', (req, res) => {
    const sql = 'DELETE FROM students WHERE ID = ?'
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if(err) return res.json('error')
            return res.json(data);
    })
})

app.listen(8081,() => {
    console.log('Listen');
})