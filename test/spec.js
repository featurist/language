var language = require('..');
var chai = require('chai');

chai.should();

describe('language', function () {
  it('can inject definitions for undeclared variables', function () {
    var simple = language({
      asdf: 'asdf'
    });

    simple(function () {
      return asdf;
    }).should.equal('asdf');
  });

  it('can prepare a function that can be called with arguments', function () {
    var simple = language({
      asdf: 'asdf'
    });

    var f = simple.prepare(function (arg1, arg2) {
      return asdf + ',' + arg1 + ',' + arg2;
    });
    
    f('arg1','arg2').should.equal('asdf,arg1,arg2');
  });
});
