const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const toDoRoutes = require('./routes/ToDoRoutes');
const path = require('path');
require('dotenv').config();

const PORT= process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'client/ToDoApp/dist')));


app.use('/api', authRoutes);
app.use('/api/todo', toDoRoutes);

mongoose.connect(process.env.DB_URL).then((result)=>{
    console.log('db connected succesfully');
}).catch(err=>{
    console.log(err);
})

app.listen(PORT, ()=>{
    console.log(`server Started at ${PORT}`)
})