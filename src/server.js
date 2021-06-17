const express = require('express')

const app = express()



app.get('/', (req, res) =>{

    const data = ['Pedro', 'João', 'Carlos'];

    return res.json({ data })

});

app.listen(8000)