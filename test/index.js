var should = require('chai').should();
var obfuscate = require('../index').obfuscate;
var mongoose = require('mongoose');

describe('Obfuscate', function() {
  it('All 0s', function() {
    obfuscate('000000000000000000000000').should.equal('d00000000000d00000000000');
  });

  it('All 1s', function() {
    obfuscate('ffffffffffffffffffffffff').should.equal('2fffffffffff2fffffffffff');
  });

  it('Half/Half (0/1)', function() {
    obfuscate('000000000000ffffffffffff').should.equal('2fffffffffffd00000000000');
  });

  it('Half/Half (1/0)', function() {
    obfuscate('ffffffffffff000000000000').should.equal('d000000000002fffffffffff');
  });

  it ('Some real value', function() {
    obfuscate('540000000000a60000000000').should.equal('760000000000840000000000');
  });

  it ('Another real value', function() {
    obfuscate('540000000020a60000000000').should.equal('760000000000840000000020');
  });

  it ('Something resembling an actual ObjectId', function() {
    obfuscate('54f457292f559f0761000003').should.equal('4f076100000384f457292f55');
  });

  it ('Unity, meaning: f(f(x)) === x', function() {
    var x = '54f457292f559f0761000003';
    obfuscate(obfuscate(x)).should.equal(x);
  });

  it ('Real ObjectId', function() {
    var id = mongoose.Types.ObjectId().toString();
    var od = obfuscate(id);
    obfuscate(od).should.equal(id);
  });
});
