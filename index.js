/**
 * Monguscate
 * Copyright (c) 2015 Sander Huijsen
 * MIT Licensed
 */
var S = require('string');

function Obfuscator () {
  // Default internal xor function - only xor's the left most (hex) character of the string
  this.xor = function (x) {
    t = {};
    t["0"] = "d"; t["1"] = "c"; t["2"] = "f"; t["3"] = "e"; t["4"] = "9"; t["5"] = "8"; t["6"] = "b"; t["7"] = "a";
    t["8"] = "5"; t["9"] = "4"; t["a"] = "7"; t["b"] = "6"; t["c"] = "1"; t["d"] = "0"; t["e"] = "3"; t["f"] = "2";

    return t[S(x).left(1)] + S(x).right(x.length - 1);
  };

  // Default internal swap function - swaps left/right recursively twice
  this.swap = function (x) {
    var rswap = function(n, y) {
      if (n === 0) return y;

      var l = y.length / 2;
      return rswap(n-1, S(y).right(l)) + rswap(n-1, S(y).left(l));
    };
    return rswap(2, x);
  };
}

// The internal xor method can be overridden by setting a callback
Obfuscator.prototype.setXorCallback = function(cb) {
  this.xor = cb;
};

// The internal swap method can be overridden by setting a callback
Obfuscator.prototype.setSwapCallback = function(cb) {
  this.swap = cb;
};

// The main function to call when obfuscating a string (should be ObjectId)
Obfuscator.prototype.obfuscate = function(x) {
  return this.xor(this.swap(this.xor(x)));
};

exports = module.exports = Obfuscator;
