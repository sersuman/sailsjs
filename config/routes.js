/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
'GET /': { action: 'home/index' },
'POST /user/register': { action: 'user/register' },
'POST /user/login': { action: 'user/login' },
'POST /user/forgot-password': { action: 'user/forgot-password' },
'POST /user/reset-password': { action: 'user/reset-password' },
};
