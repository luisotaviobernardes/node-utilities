  'use strict';

  // constants
  var DEFAULT_OBJECT_TYPE_REFERENCE = 'object';
  var DEFAULT_STRING_TYPE_REFERENCE = 'string';
   
  // instance
  var instance = new Helper(new Api(), new References(DEFAULT_OBJECT_TYPE_REFERENCE, DEFAULT_STRING_TYPE_REFERENCE));  
   
  function Api(isNullOrUndefined, isNullUndefinedOrEmpty, isInstanceValid, isArray, isNonArrayObject, isString, isValidString, isArrayNotEmpty, matches) {
    this.isNullOrUndefined = isNullOrUndefined || undefined;
    this.isNullUndefinedOrEmpty = isNullUndefinedOrEmpty || undefined;
    this.isInstanceValid = isInstanceValid || undefined;
    this.isArray = isArray || undefined;
    this.isNonArrayObject = isNonArrayObject || undefined;
    this.isString = isString || undefined;
    this.isValidString = isValidString || undefined;
    this.isArrayNotEmpty = isArrayNotEmpty || undefined;
    this.matches = matches || undefined;
  }
  
  function References(object, string) {
    this.object = object || '';
    this.string = string || '';
  }
  
  function Helper(api, references) {
    this.api = api || undefined;
    this.references = references || undefined;
  }  

  function typeComparison(object, type) {
    return (typeof object === type);
  }

  function instanceComparison(object, basic) {
    return (object instanceof basic);
  }

  function isObject(object) {
    return typeComparison(object, instance.references.object);
  }

  function isNullOrUndefined(instance) {
    return (instance === null || instance === undefined);
  }

  function isNullUndefinedOrEmpty(instance) {
    return (isNullOrUndefined(instance) || (instance === '' ) || (instance === ' '));
  }

  function isInstanceValid(instance) {
    return ((!isNullOrUndefined(instance)) && (isObject(instance)));
  }

  function isArray(object) {
    return (isObject(object) && instanceComparison(object, Array));
  }

  function isNonArrayObject(object) {
    return (isObject(object) && (!isArray(object)));
  }

  function isString(object) {
    return typeComparison(object, instance.references.string);
  }

  function isValidString(instance) {
    return (!isNullUndefinedOrEmpty(instance) && isString(instance));
  }

  function isArrayNotEmpty(object) {
    return ((isInstanceValid(object)) && (isArray(object)) && (object.length > 0));
  }

  function matches(objectOne, objectTwo) {
    return (objectOne === objectTwo);
  }
  
  function expose() {
    return new Api(isNullOrUndefined, isNullUndefinedOrEmpty, isInstanceValid, isArray, isNonArrayObject, isString, isValidString, isArrayNotEmpty, matches);
  }    
  
  function initialize() {
    instance.api = expose();
  }
  
  function api() {
    return instance.api;
  }

  module.exports.initialize = initialize;
  module.exports.api = api;
