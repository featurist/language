function fieldsInObject(o) {
  var fields = [];

  for (var field in o) {
    if (o.hasOwnProperty(field)) {
      fields.push(field);
    }
  }

  return fields;
};

module.exports = function (dsl) {
  var terms = fieldsInObject(dsl);
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
      + '    return (' + fn + ').apply(undefined, args);\n'
      + '  })(' + callArgs + ');';

    var dslFn = new Function('dsl', body);

    return function () {
      var args = Array.prototype.slice.call(arguments, 0);
      args.unshift(dsl);

      return dslFn.apply(undefined, args);
    };
  };

  runDsl.prepare = prepare;

  return runDsl;
};
