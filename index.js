'use strict';

var isIntegerCheck = /^\s*-?\d+\s*$/;
var isPositiveIntegerCheck = /^\s*\d+\s*$/;
var isFloatCheck = /^\s*-?\d+(\.\d+)?\s*$/;
var isPositiveFloatCheck = /^\s*\d+(\.\d+)?\s*$/;
var objectCtorString = Function.prototype.toString.call(Object);

/**
 * @typedef {RegExp|{ test: Function }} IsNumericFunction
 */

/**
 * Checks if a value is `NaN`
 *
 * @param {*} value The value to check
 * @returns {Boolean} Returns `true` if `value` is equal to `NaN`
 */
function isNaN(value) {
  return value != +value;
}

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @param {*} value The value to check.
 * @returns {Boolean} Returns `true` if `value` is a string, else `false`.
 * @see https://github.com/lodash/lodash/blob/master/dist/lodash.core.js#L2894
 */
function isString(value) {
  return typeof value == 'string' ||
    (!Array.isArray(value)
    && (value != null && typeof value == 'object')
    && Object.prototype.toString.call(value) == '[object String]');
}

function isPlainObject(value) {
  if ((value == null || typeof value !== 'object') ||
    Object.prototype.toString.call(value) != '[object Object]') {
    return false;
  }
  var proto = Object.getPrototypeOf(Object(value));
  if (proto === null) {
    return true;
  }
  var Ctor = Object.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
  Ctor instanceof Ctor && Function.prototype.toString.call(Ctor) == objectCtorString);
}

/**
 * Whether value can be coerced to a number.
 *
 * @param {IsNumericFunction} check A RegExp to test against the value
 * @param {String|*} value Value to convert
 * @returns {Boolean} Returns `true` if the value can be coerced to a number
 */
function isCoercible(check, value) {
  return isString(value) && check.test(value);
}

/**
 * Create an object with the same keys as object with values passed to `iteratee` function
 *
 * @param {Object} object The source object
 * @param {Function} iteratee A function that takes `(value, key, object)` and returns a value
 *
 * @returns {Object}
 */
function mapValues(object, iteratee) {
  var result = {};
  var key;

  for (key in object) {
    if (object.hasOwnProperty(key)) {
      result[key] = iteratee(object[key], key, object);
    }
  }

  return result;
}

/**
 * Convert numeric string value to `Number` if possible, otherwise return original value.
 *
 * @param {IsNumericFunction} check An object with a `test` function that returns `true` if `value` is numeric
 * @param {String|*} value String to convert
 * @param {*} [isNaNValue] A value to return if `value` cannot be coerced to a Number
 * Default is to return the value of the `value` parameter
 *
 * @returns {Number|*} Returns a Number if `value` can be coerced. Otherwise returns `returnValue`
 */
function stringToNumber(check, value, isNaNValue) {
  if (isCoercible(check, value)) {
    const num = Number(value);
    if (!isNaN(num)) return num;
  }
  return isNaNValue || value;
}

/**
 * Coerce a positive or negative numeric string without a decimal to a Number
 *
 * @param {String} value String to coerce to a Number
 * @returns {Number|*} Returns a Number if `value` can be coerced. Otherwise returns `returnValue`
 */
function toInteger(value) {
  return stringToNumber(isIntegerCheck, value);
}

/**
 * Coerce a positive numeric string without a decimal to a Number
 *
 * @param {String} value String to coerce to a Number
 * @returns {Number|*} Returns a Number if `value` can be coerced. Otherwise returns `returnValue`
 */
function toPositiveInteger(value) {
  return stringToNumber(isPositiveIntegerCheck, value);
}

/**
 * Coerce a positive or negative numeric string (optionally) with a decimal to a Number
 *
 * @param {String} value String to coerce to a Number
 * @returns {Number|*} Returns a Number if `value` can be coerced. Otherwise returns `returnValue`
 */
function toFloat(value) {
  return stringToNumber(isFloatCheck, value);
}

/**
 * Coerce a positive numeric string (optionally) with a decimal to a Number
 *
 * @param {String} value String to coerce to a Number
 * @returns {Number|*} Returns a Number if `value` can be coerced. Otherwise returns `returnValue`
 */
function toPositiveFloat(value) {
  return stringToNumber(isPositiveFloatCheck, value);
}

/**
 * Create a custom stringToNumber function by passing in a check and default return value
 *
 * @param {IsNumericFunction} check An object with a `test` function that returns `true` if `value` is numeric
 * @param {*} [isNaNValue] A value to return if `value` cannot be coerced to a Number
 *
 * @returns {Function}
 */
function create(check, isNaNValue) {
  return function (value) {
    return stringToNumber(check, value, isNaNValue);
  }
}

/**
 * Transform all numeric string values in an object to Numbers
 *
 * @param {Object|String|Array} value
 * @param {Function} [iteratee=toFloat] The function invoked per iteration.
 * @returns {Object|String|Array}
 */
function map(value, iteratee) {
  // Create function to map nested objects
  function mapFn (obj) { return map(obj, iteratee); };

  // Default map function is to convert all numeric values
  if (iteratee === undefined) { iteratee = toFloat; }

  if (isString(value)) {
    return iteratee(value);
  } else if (isPlainObject(value)) {
    return mapValues(value, mapFn);
  } else if (Array.isArray(value)) {
    return value.map(mapFn);
  }
  return value;
}

module.exports = {
  checkFunctions: {
    isIntegerCheck: isIntegerCheck,
    isPositiveIntegerCheck: isPositiveIntegerCheck,
    isFloatCheck: isFloatCheck,
    isPositiveFloatCheck: isPositiveFloatCheck
  },
  map: map,
  toInteger: toInteger,
  toPositiveInteger: toPositiveInteger,
  toFloat: toFloat,
  toPositiveFloat: toPositiveFloat,
  stringToNumber: stringToNumber,
  create: create
};
