// express 모듈 호출
const { default: axios } = require('axios');
const express = require('express');
const app = express();
const PORT = 4001;
const mysql = require('mysql');
const cors = require('cors');
const bodyparser = require('body-parser');
app.use(cors());
app.use(bodyparser.json());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'food'
});

conn.connect((err) => {
    if (err) console.log(err);
    else console.log('Connected to the database');
});

module.exports = conn;

app.get('/Lunch/SimpleLunch', (req, res) => {
    conn.query('SELECT * FROM fooddata', function (err, results, fields) {
        if (err) throw err;
        res.send(results);
    });
});

app.post("/Lunch/SimpleLunch_add", (req, res) => {
    const category = req.body.category
    const menu = req.body.menu
    conn.query('INSERT into fooddata (category, menu) values (?, ?)',[category,menu], function (err, results, fields) {
        if (err) throw err;
        res.send(results);
    });
});


app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})