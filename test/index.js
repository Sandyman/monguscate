var should = require('chai').should();
var obfuscate = require('../index').obfuscate;

describe('Obfuscate', function() {
  it('All 0s', function() {
    obfuscate('000000000000000000000000').should.equal('d00000000000d00000000000');
  });

  it('All 1s', function() {
    obfuscate('ffffffffffffffffffffffff').should.equal('2fffffffffff2fffffffffff');
  });

  it ('Some real value', function() {
    obfuscate('540000000000a60000000000').should.equal('760000000000840000000000');
  })

  it ('Another real value', function() {
    obfuscate('540000000020a60000000000').should.equal('760000000000840000000020');
  })

  it ('An actual ObjectID', function() {
    obfuscate('54f457292f559f0761000003').should.equal('4f076100000384f457292f55');
  })
});
