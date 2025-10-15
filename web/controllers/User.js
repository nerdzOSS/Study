const {createClient} = require("@supabase/supabase-js")

const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL, process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY)

const jwt = require('jsonwebtoken');
const HashService = require('../services/hash.util');
const APP_CONFIG = require('../config');

const signup = (req, res, next) => {
    console.log(req.body)
    supabase.from('users').insert({
        email: req.body.email,
        username: req.body.username,
        password: HashService.generateHash(req.body.password),
        is_teacher: req.body.is_teacher === true || req.body.is_teacher === 'teacher',
        first_name: req.body.firstName || null,
        last_name: req.body.lastName || null,
        bio: req.body.bio || null,
    }).then(e=>{
        if (e.error) {
            res.status(200).json({ success: false, data: e.error.message });
            return;
        }

        // Create JWT token for the new user
        const payload = {
            id: e.data[0].id,
            username: req.body.username,
            email: req.body.email,
            is_teacher: req.body.is_teacher === true || req.body.is_teacher === 'teacher',
        };

        const token = jwt.sign(payload, APP_CONFIG.API_SECRET, {
            algorithm: 'HS256',
            expiresIn: APP_CONFIG.TOKEN.EXPIRE
        });

        res.status(200).json({
            success: true,
            message: 'User created successfully',
            token: token,
            user: {
                id: e.data[0].id,
                username: req.body.username,
                email: req.body.email,
                is_teacher: req.body.is_teacher === true || req.body.is_teacher === 'teacher',
                first_name: req.body.firstName || null,
                last_name: req.body.lastName || null,
                bio: req.body.bio || null,
            }
        });
        console.log('User saved successfully')
    }).catch(e=>{
        res.status(200).json({ success: false, data: e });
    })
};

const getUsers = (req, res, next) => {
  console.log(req);
  supabase.from('users').select('username').then(e=>{
    res.status(200).json({ success: true, data: e });
    console.log('Users fetched successfully')
  }).catch(e=>{
    res.status(200).json({ success: false, data: e });
  })
};

module.exports = {
  signup,
  getUsers
};