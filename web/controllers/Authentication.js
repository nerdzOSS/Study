const jwt = require('jsonwebtoken');
const HashService = require('../services/hash.util');
const {createClient} = require("@supabase/supabase-js");

const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL, 
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
);

const APP_CONFIG = require('../config');

const authenticate = async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('id, email, username, password, is_teacher, first_name, last_name, bio')
            .eq('email', req.body.email);

        if (error) {
            console.log({data,error,i:1})
            return res.json({success: false, data: error.message});
        }

        if (!data || data.length === 0) {
            console.log({data,error,i:2})
            return res.json({success: false, data: 'User not found'});
        }

        const user = data[0];
        // Compare plaintext password with stored hash
        const isValidPassword = HashService.compareHash(
            req.body.password, 
            user.password,
        );

        if (!isValidPassword) {
            console.log({data,error,i:3})
            return res.json({success: false, data: 'Invalid password'});
        }

        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            is_teacher: user.is_teacher,
        };

        const token = jwt.sign(payload, APP_CONFIG.API_SECRET, {
            algorithm: 'HS256',
            expiresIn: APP_CONFIG.TOKEN.EXPIRE
        });

        res.json({
            success: true,
            message: 'Token created successfully',
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                is_teacher: user.is_teacher,
            }
        });

    } catch (error) {
        console.log({error,i:4})
        res.json({success: false, data: error.message});
    }
};

module.exports = authenticate;
