const express = require('express')
const cors = require('cors');
const authRoutes = require('./controller/auth');

const app = express()

app.use(cors());
app.use(express.json());

app.post('/login', authRoutes.login);

app.post('/register', authRoutes.register);

app.listen(4000, ()=>{
    console.log(`[STARTING] Server starting at port: 4000`);
})

