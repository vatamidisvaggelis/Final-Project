const express = require('express')
const cors = require('cors');

const app = express();

const employees = require('./routes/employees.routes');
const { model } = require('mongoose'); // αν χρειαζεται να δω
const auth = require('./routes/auth.routes')


app.use(express.json());
app.use(express.urlencoded({extended:false}));


 app.use(cors({
//  // origin:'*'
  origin:['http://localhost:4200']
}))



app.use('/ikm/employees', employees);
app.use('/ikm/auth',auth)

module.exports= app;
