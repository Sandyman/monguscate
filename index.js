/**
 * Monguscate
 * Copyright (c) 2015 Sander Huijsen
 * MIT Licensed
 */
var S = require("string");  // Some helper functions for string manipulation

var split_point = 12; // Half the length of a Mongo ObjectId, because swapping must be symmetrical

/**
 * XORs the left-most character of the input string with xor_val
 *
 * @param {String} val
 * @return {String}
 */
function f_xor(val) {
  t = {};
  t["0"] = "d"; t["1"] = "c"; t["2"] = "f"; t["3"] = "e"; t["4"] = "9"; t["5"] = "8"; t["6"] = "b"; t["7"] = "a";
  t["8"] = "5"; t["9"] = "4"; t["a"] = "7"; t["b"] = "6"; t["c"] = "1"; t["d"] = "0"; t["e"] = "3"; t["f"] = "2";

  var y = val.length - 1;
  return t[S(val).left(1)] + S(val).right(y);
}

/**
 * Splits a string and swaps both parts
 *
 * @param {String} val
 * @return {String}
 */
function f_swap(val) {

  var l = S(val).left(split_point);
  var r = S(val).right(split_point);
  var sl = l.right(split_point/2) + l.left(split_point/2);
  var sr = r.right(split_point/2) + r.left(split_point/2);

  return sr + sl;
}

/**
 * Obfuscates an ObjectId. This method is reversible, so that:
 *
 *   obfuscate(obfuscate(some_string)) === some_string
 *
 * @param {String} id
 * @return {String}
 */
function obfuscate(id) {
  // 24 is the length of  a regular ObjectID. Only obfuscate if the length is correct.
  if (24 === id.length) {
    return f_xor(f_swap(f_xor(id)));
  }

  // Return input value if length !== 24
  return id;
}

module.exports = {
  obfuscate: obfuscate
};
