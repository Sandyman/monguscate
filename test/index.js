require('chai').should();
var mongoose = require('mongoose');
var Obfuscate = require('../index');


describe('Obfuscate', function() {
  var O = new Obfuscate();
  it('All 0s', function() {
    O.obfuscate('000000000000000000000000').should.equal('d00000000000000000d00000');
  });

  it('All 1s', function() {
    O.obfuscate('ffffffffffffffffffffffff').should.equal('2fffffffffffffffff2fffff');
  });

  it('Half/Half (0/1)', function() {
    O.obfuscate('000000000000ffffffffffff').should.equal('2fffffffffff000000d00000');
  });

  it('Half/Half (1/0)', function() {
    O.obfuscate('ffffffffffff000000000000').should.equal('d00000000000ffffff2fffff');
  });

  it ('Some real value', function() {
    O.obfuscate('540000000000000000a60000').should.equal('760000000000000000840000');
  });

  it ('Another real value', function() {
    O.obfuscate('540000000000000020a60000').should.equal('760000000020000000840000');
  });

  it ('Something resembling an actual ObjectId', function() {
    O.obfuscate('54f457292f559f0761000003').should.equal('d000039f0761292f5584f457');
  });

  it ('Unity, meaning: f(f(x)) === x', function() {
    var x = '54f457292f559f0761000003';
    O.obfuscate(O.obfuscate(x)).should.equal(x);
  });

  it ('Real ObjectId', function() {
    var id = mongoose.Types.ObjectId().toString();
    var od = O.obfuscate(id);
    O.obfuscate(od).should.equal(id);
  });
});
