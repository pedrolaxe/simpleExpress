const express = require('express')
var crypto = require('crypto')
require('dotenv').config()
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const app = express()

app.use(express.json());

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

app.get('/', (req, res) =>{
    res.json({'status': 'ok'});
});

//Select
app.get('/users', (req, res) =>{
    con.query('SELECT * FROM users', (err,rows) => {
        if(err) throw err;
        return res.json(rows);
    });
});
//Add (PUT)
app.put('/users', function (req, res) {
    // crypt password to sha1  
    let pass = crypto.createHash('sha1').update(req.body.password).digest('hex')
    
    const user = {
        name: req.body.name,
        username: req.body.username,
        password: pass
    }

    con.query("SELECT * FROM users WHERE username='"+req.body.username+"'", (err,rows) => {
        if(err) throw err;
        if (rows.length === 0) {
            con.query('INSERT INTO users SET ?', user, (err, res) => {
                if(err) throw err;
                console.log('Last insert ID:', res.insertId);
            });
                return res.json({'insert': 'ok'});
        }else{
            return res.json({'insert': 'fail'});
        }
    });
})


app.listen(3000)