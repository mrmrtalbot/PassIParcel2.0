'use strict';

var url = require('url');


var Categories = require('./CategoriesService');


module.exports.categoriesAllGet = function categoriesAllGet (req, res, next) {
  Categories.categoriesAllGet(req.swagger.params, res, next);
};
