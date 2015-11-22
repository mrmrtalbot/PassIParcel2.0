'use strict';

exports.usersLoginPost = function(args, res, next) {
  /**
   * parameters expected in the args:
   * username (String)
   * password (String)
   **/

var examples = {};
  
  examples['application/json'] = {
  "expiryDate" : "",
  "tokenId" : ""
};
  

  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
  
}
exports.usersLogoutPost = function(args, res, next) {
  /**
   * parameters expected in the args:
   * id (String)
   * token (String)
   **/

var examples = {};
  
  examples['application/json'] = {
  "code" : 123,
  "message" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
  
}
exports.usersIdGet = function(args, res, next) {
  /**
   * parameters expected in the args:
   * id (BigDecimal)
   **/

var examples = {};
  
  examples['application/json'] = {
  "password" : "aeiou",
  "dateCreated" : "aeiou",
  "tokens" : [ {
    "expiryDate" : "",
    "tokenId" : ""
  } ],
  "userId" : "",
  "email" : "aeiou",
  "username" : "aeiou",
  "points" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
  
}
exports.usersIdPointsPut = function(args, res, next) {
  /**
   * parameters expected in the args:
   * id (BigDecimal)
   * direction (String)
   * points (BigDecimal)
   **/

var examples = {};
  
  examples['application/json'] = {
  "code" : 123,
  "message" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
  
}
