const auth = require('./auth.routes.js');
const docs = require('./docs.routes.js');
const users = require('./users.routes.js');

module.exports = {
    auth,
    docs,
    users
}