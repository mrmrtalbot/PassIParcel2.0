'use strict';

var url = require('url');


var UserDetails = require('./UserDetailsService');


module.exports.usersLoginPost = function usersLoginPost (req, res, next) {
  UserDetails.usersLoginPost(req.swagger.params, res, next);
};

module.exports.usersLogoutPost = function usersLogoutPost (req, res, next) {
  UserDetails.usersLogoutPost(req.swagger.params, res, next);
};

module.exports.usersIdGet = function usersIdGet (req, res, next) {
  UserDetails.usersIdGet(req.swagger.params, res, next);
};

module.exports.usersIdPointsPut = function usersIdPointsPut (req, res, next) {
  UserDetails.usersIdPointsPut(req.swagger.params, res, next);
};
