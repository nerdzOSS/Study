/**
 * @description TOKEN SETTING
 * @see https://www.npmjs.com/package/jsonwebtoken
 */

const APP_CONFIG = {
  API_SECRET: 'secretfortaskworld',
  TOKEN: {
    EXPIRE: '5m'
  }
};

module.exports = APP_CONFIG;