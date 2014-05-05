function fieldsInObject(o) {
  var fields = [];

  for (var field in o) {
    if (o.hasOwnProperty(field) && !reservedWords.hasOwnProperty(field)) {
      fields.push(field);
    }
  }

  return fields;
};

function bind(fields, object) {
  for (var n = 0; n < fields.length; n++) {
    (function (n) {
      var field = [fields[n]];
      var value = object[field];
      if (typeof value === 'function') {
        object[field] = function () {
          return value.apply(object, arguments);
        };
      }
    })(n);
  }
}

module.exports = function (dsl) {
  var terms = fieldsInObject(dsl);
  bind(terms, dsl);
  var callArgs = terms.map(function (p) { return 'dsl.' + p; }).join(',');

  var runDsl = function (fn) {
    var dslFn = prepare(fn);
    return dslFn();
  };

  var prepare = function (fn) {
    var body =
        'var args = Array.prototype.slice.call(arguments, 1);\n'
      + 'return '
      + '  (function (' + terms.join(',') + ') {\n'
      + '    return (' + fn + ').apply(this, args);\n'
      + '  }).call(this, ' + callArgs + ');';

    var dslFn = new Function('dsl', body);

    return function () {
      var args = Array.prototype.slice.call(arguments, 0);
      args.unshift(dsl);

      return dslFn.apply(this, args);
    };
  };

  runDsl.function = prepare;

  return runDsl;
};

var reservedWords = {
  "break": true,
  "case": true,
  "catch": true,
  "continue": true,
  "debugger": true,
  "default": true,
  "delete": true,
  "do": true,
  "else": true,
  "finally": true,
  "for": true,
  "function": true,
  "if": true,
  "in": true,
  "instanceof": true,
  "new": true,
  "return": true,
  "switch": true,
  "this": true,
  "throw": true,
  "try": true,
  "typeof": true,
  "var": true,
  "void": true,
  "while": true,
  "with": true,
  "class": true,
  "enum": true,
  "export": true,
  "extends": true,
  "import": true,
  "super": true
};
