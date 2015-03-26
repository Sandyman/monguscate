Monguscate
==========

Simple tool for obsfucating ObjectID used by MongoDB. The name is a really lame contraction of mongo and obfuscate. :P

Use this utility to obfuscate ObjectID issued by MongoDB when you use them in your API. It's always a good idea not to
expose anything to the outside world, and this helps you keep your IDs a bit more secure.

You can now pass in your own function for swapping and xor'ing. You have to bear in mind, though, that the swap 
function should be "symmetrical". Basically, this means that ```swap_func(swap_func(x)) === x```. In a real project, you 
would send an obfuscated version of x, which is de-obfuscated by obfuscating that value again.

Internally, the obfuscating function works like this: 

```var obfuscated_value = xor_func(swap_func(xor_func(x)));```

XOR is symmetrical implictly, as long as it's the same value you're xor'ing with.

In the end, the obfuscating function must be symmetrical:

```obfuscate(obfuscate(x)) === x;```

should evaluate to true.

## Installation

  ```npm install monguscate --save```

## Usage

#### Version \>= 1.0.0
  ```
  var Obfuscate = require('monguscate');

  // You can create your own swap and xor methods (not mandatory)
  var my_swap = function (x) {
    // swap x in some manner (must be symmetrical)
  };
  var my_xor = function (x) {
    // Perform xor on x in some manner
  };

  var O = new Obfuscate();
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
* 1.0.0 Added functionality to add your own swap and xor methods
* 1.0.1 Updated README.
* 1.0.2 Updated README: fixed a bug in the example.

