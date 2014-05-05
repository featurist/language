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

    var f = simple.function(function (arg1, arg2) {
      return asdf + ',' + arg1 + ',' + arg2;
    });
    
    f('arg1','arg2').should.equal('asdf,arg1,arg2');
  });

  it('ignores reserved words', function () {
    var simple = language({
      asdf: 'asdf',
      "var": 'var',
      "class": "class"
    });

    simple(function () {
      return asdf;
    }).should.equal('asdf');
  });

  it('passes through `this`', function () {
    var simple = language({
      asdf: 'asdf'
    });

    var obj = {property: 'property'};

    obj.f = simple.function(function (arg1, arg2) {
      return asdf + ',' + this.property;
    });
    
    obj.f().should.equal('asdf,property');
  });

  it('can call methods on language object, with this', function () {
    var simple = language({
      n: 1,
      inc: function (amount) {
        if (typeof amount === 'undefined') {
          amount = 1;
        }

        this.n += amount;
      },
      val: function () {
        return this.n;
      }
    });

    var f = simple(function () {
      inc();
      inc(2);
      return val();
    });
    
    f.should.equal(4);
  });
});
