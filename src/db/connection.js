const monk = require('monk');
import config from '../config.js';

const db = monk(config.MONGO_URI);
const authDB = db.get('auth-yay-food');

module.exports = authDB;