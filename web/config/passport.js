/**
 * @description Passport JWT middleware
 */
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const APP_CONFIG = require('../config');
const {createClient} = require("@supabase/supabase-js")
const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL, process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY)


module.exports = (passport) => {
  const jwtOptions = {};
  jwtOptions.jwtFromRequest = ExtractJwt.fromHeader('x-access-token');
  jwtOptions.secretOrKey = APP_CONFIG.API_SECRET;

  passport.use(new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    supabase.from('users').select('username').eq('username', jwt_payload.username).then(user=>{
      if (user && user.length > 0) {
        next(null, user);
      } else {
        next(null, { message: 'Unauthorized to access' });
      }
    }).catch(err=>{
        next(null, err, { message: 'Unauthorized to access' });
    })
  }));
};