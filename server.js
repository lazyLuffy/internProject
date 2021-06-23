require('dotenv').config();
const express = require('express');
const app = express();
require('./database/db');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/',require('./routes/regisRoute'))

app.listen(process.env.PORT,'localhost',()=>{
    console.log(`Listninnnng.... At http://localhost:${process.env.PORT}`);
});