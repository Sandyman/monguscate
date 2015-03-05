Monguscate
==========

Simple tool for obsfucating ObjectID used by MongoDB.

Use this utility to obfuscate ObjectID issued by MongoDB when you use them in your API. It's always a good idea not to
expose anything to the outside world, and this helps you keep your IDs a bit more secure.

This is the first incarnation of the module. I am planning on making it more flexible, e.g., by allowing to pass in
your own "value to xor with", or even to pass in your own functions for xor() and swap().

## Installation

  ```npm install monguscate --save```

## Usage

  ```
  var obfuscate = require('monguscate').obfuscate
  var x = '54f457292f559f0761000003';   // This is what an ObjectID looks like as a String
  var obfuscated_x = obfuscate(x);
  console.log('ObjectID ', x, 'obfuscated ObjectID', obfuscated_x);
  ```

## Tests

  ```npm test```

## Release History

* 0.1.0 Initial release
