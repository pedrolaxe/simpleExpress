const express = require('express')
const crypto = require('crypto')
const mysql = require('mysql2')
const app = express()
require('dotenv').config()
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
            });
                return res.json({'insert': 'ok'});
        }else{
            return res.json({'insert': 'fail'});
        }
    });
})
// Delete
app.delete('/users', function (req, res) {
    const data = {
        id: req.body.id
    }
    con.query(
        'DELETE FROM users WHERE id = ?', [data.id], (err, result) => {
          if (err) throw err;
            if(result.affectedRows>0){
                return res.json({'delete': 'ok'});
            }else{
                return res.json({'delete': 'fail'});
            }
        }
    );
    
})


app.listen(3000)