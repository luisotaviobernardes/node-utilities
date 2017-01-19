  'use strict';
  
  // constants 
  var DEFAULT_ENCODING = 'utf8';
  
  // instance
  var instance = new Helper(new Dependencies, new Api(new Methods(), new Methods()), DEFAULT_ENCODING);
  
  function Methods(read, write, exists) {
    this.read = read || undefined;
    this.write = write || undefined;
    this.exists = exists || undefined;
  }
  
  function Api(async, sync) {
    this.async = async || undefined;
    this.sync = sync || undefined;
  }
  
  function Dependencies(object, fs) {
    this.object = object || undefined;
    this.fs = fs || undefined;
  }
  
  function Helper(dependencies, api, encoding) {
    this.dependencies = dependencies || undefined;
    this.api = api || undefined;
    this.encoding = encoding || null;
  }
  
  function isInstanceValid(instance) {
    return (instance !== undefined);
  }  
  
  function preconditions(api, owner) {
    for (var property in api) {
      if (api.hasOwnProperty(property)) {
        if (!isInstanceValid(api[property])) {
          var message = 
          console.error(' - [ERROR] - in ' + owner + ': ' +  '\'property\'' + ' not found when initializing library');
          return false;
        }
      }
    }

    return true;
  }
  
  function checkApiInstance(api) {
    return (preconditions(api.async, 'async file helper') && preconditions(api.sync, 'sync file helper'));
  }
  
  function checkEncoding(encoding) {
    return (instance.dependencies.object.isValidString(encoding)) ? encoding : instance.encoding; 
  }
  
  /**
   * API METHODS
   **/
   
  function readAsyncCallback(error, data) {
    if (instance.dependencies.object.isInstanceValid(error)) {
      console.log(' - [ERROR] - error trying to read file, stack: ', error);
      callback(null);
    } else {
      callback(data);
    }    
  } 
  
  function writeAsyncCallback(error) {
    if (instance.dependencies.object.isInstanceValid(error)) {
      console.log(' - [ERROR] - error trying to write file, stack: ', error);
      callback(false);
    } else {
      callback(true);
    }     
  }
  
  function existsSyncCallback(exists) {
    callback(exists);
  }
  
  function existsSync(path) {
    return instance.dependencies.fs.existsSync(path);
  }
  
  function existsAsync(path, callback) {
    // deprecated [?]
    console.log(' - [WARNING] - deprecated since: v1.0.0(at node \'fs\' library)');
    instance.dependencies.fs.existsSync(path, existsSyncCallback);
  }  
  
  function readSync(path, encoding) {
    return instance.dependencies.fs.readFileSync(path, checkEncoding(encoding));
  }
  
  function readAsync(path, encoding, callback) {
    // TODO: test this more!
    instance.dependencies.fs.readFile(path, checkEncoding(encoding), readAsyncCallback);
  }
  
  function writeSync(path, data, encoding) {
    return instance.dependencies.fs.writeFileSync(path, data, checkEncoding(encoding));
  } 
  
  function writeAsync(path, data, encoding, callback) {
    // TODO: test this more!
    instance.dependencies.fs.writeFileSync(path, data, checkEncoding(encoding), writeAsyncCallback);
  }    
  
  function expose() {
    return new Api(new Methods(readAsync, writeAsync, existsAsync), new Methods(readSync, writeSync, existsSync));
  }    
  
  function initialize(refObject, refFs) {
    instance.dependencies = new Dependencies(refObject, refFs);
    
    if (preconditions(instance.dependencies, 'file helper')) {
      instance.api = expose();
    } else {
      return false;
    }
  }
  
  function api() {
    checkApiInstance(instance.api);    
    return instance.api;    
  }
  
  module.exports.initialize = initialize; 
  module.exports.api = api; 