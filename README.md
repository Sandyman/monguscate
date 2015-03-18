Monguscate
==========

Simple tool for obsfucating ObjectID used by MongoDB. The name is a really lame contraction of mongo and obfuscate. :P

Use this utility to obfuscate ObjectID issued by MongoDB when you use them in your API. It's always a good idea not to
expose anything to the outside world, and this helps you keep your IDs a bit more secure.

This is the first incarnation of the module. I am planning on making it more flexible, e.g., by allowing to pass in
your own "value to xor with", or even to pass in your own functions for xor() and swap().

## Installation

  ```npm install monguscate --save```

## Usage

#### Version \>= 1.0.0
  ```
  // You can create your own swap and xor methods (not mandatory)
  var my_swap = function (x) {
    // swap x in some manner (must be symmetrical)
  };
  var my_xor = function (x) {
    // Perform xor on x in some manner
  };

  var O = require('monguscate');
  O.setXorCallback(my_xor);     // override the default xor method
  O.setSwapCallback(my_swap);   // override the default swap method

  var x = '54f457292f559f0761000003';   // This is what an ObjectID looks like as a String
  var obfuscated_x = O.obfuscate(x);
  console.log('ObjectID ', x, 'obfuscated ObjectID ', obfuscated_x);
  ```

#### Version \<= 0.2.1
  ```
  var obfuscate = require('monguscate').obfuscate;
  var x = '54f457292f559f0761000003';   // This is what an ObjectID looks like as a String
  var obfuscated_x = obfuscate(x);
  console.log('ObjectID ', x, 'obfuscated ObjectID ', obfuscated_x);
  ```

## Tests

  ```npm test```

## Release History

* 0.1.0 Initial release
* 0.2.0 Swap function only allows swapping both halves, because it must be a symmetrical function
