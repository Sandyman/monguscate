/**
 * Monguscate
 * Copyright (c) 2015 Sander Huijsen
 * MIT Licensed
 */
var S = require("string");

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
 * @param {Number} split
 * @param {String} val
 * @return {String}
 */
function f_swap(split, val) {

  var y = val.length - split;
  return S(val).right(split) + S(val).left(y);
}

/**
 * Obfuscates an ObjectId. This method is reversible, so that:
 *
 *   obfuscate(obfuscate(some_string, split), split) === some_string
 *
 * @param {String} id
 * @param {Number} split
 * @return {String}
 */
function obfuscate(id, split) {
  // 24 is the length of a regular ObjectID
  if (24 === id.length) {
    var split_val = 'undefined' !== typeof split ? (split % 24) : 12;

    return f_xor(f_swap(split_val, f_xor(id)));
  }

  // Return input value if length !== 24
  return id;
}

module.exports = {
  obfuscate: obfuscate
};
