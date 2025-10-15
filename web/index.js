const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const APP_CONFIG = require('./config');
const Authentication = require('./controllers/Authentication');
const UserController = require('./controllers/User');

// Create a single supabase client for interacting with your database
app.use(passport.initialize());
app.use(cors())
require('./config/passport')(passport);

app.set('superSecret', APP_CONFIG.API_SECRET);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.post('/api/login', Authentication);
app.post('/api/user/signup', UserController.signup);
app.get('/api/getinfo', (req,res)=>{
    res.json({success: true, data: 'ok'})
})
app.get('/health', (req,res)=>{
    res.send('ok')
})

module.exports = {app};