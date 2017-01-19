  'use strict';
  
  // instance 
  var instance = new Script(new Dependencies(), new Api()); 
  
  // constructor
  function Api(object, file) {
    this.object = object || undefined;
    this.file = file || undefined;
  }
  
  function Dependencies(fs, file, object) {
    this.fs = fs || undefined;
    this.file = file || undefined;
    this.object = object || undefined;
  }
  
  function Script(dependencies, api) {
    this.dependencies = dependencies || undefined;
    this.api = api || undefined;
  }
  
  function isInstanceValid(instance) {
    return (instance !== undefined);
  }
  
  function expose() {
    instance.dependencies.object.initialize(instance.dependencies.object, instance.dependencies.fs);
    instance.dependencies.file.initialize(instance.dependencies.object.api(), instance.dependencies.fs);
    
    instance.api = new Api(instance.dependencies.object.api(), instance.dependencies.file.api());
    return instance.api;
  }  
  
  function fetch() {
    var fs = require('fs') || undefined;
    var object = require('./scripts/object.helper.js') || undefined; 
    var file = require('./scripts/file.helper.js') || undefined;
    
    return new Dependencies(fs, file, object);   
  }
  
  function preconditions(api) {
    for (var property in api) {
      if (api.hasOwnProperty(property)) {
        if (!isInstanceValid(api[property])) {
          console.error(' - [ERROR] - dependency: ' + property + ' not found when initializing library');
          return false;
        }
      }
    }

    return true;
  }  
  
  function initialize() {
    instance.dependencies = fetch();

    if (preconditions(instance.dependencies)) {
      module.exports = expose();
      return true;
    } else {
      return false;
    }
  }
  
  initialize();
