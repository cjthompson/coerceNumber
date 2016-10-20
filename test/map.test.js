'use strict';

var test = require('simple-test');
var inspect = require('util').inspect;
var map = require('../index').map;

function simpleDeepEqual(obj1, obj2) {
  var actual = inspect(obj1, { depth: null });
  var expected = inspect(obj2, { depth: null });

  return actual === expected;
}

test('map', function () {
  test('with default iteratee', function () {
    test('coerces a numeric string', function () {
      test.equal(map('1'), 1);
      test.equal(map('  1.01'), 1.01);
      test.equal(map('-1.01  '), -1.01);
    });

    test('does not coerce non-numeric string', function () {
      test.equal(map('a'), 'a');
      test.equal(map('1. 01'), '1. 01');
      test.equal(map('- 1'), '- 1');
    });

    test('does not coerce non-string values', function () {
      test.ok(map(/abc/) instanceof RegExp);
      test.ok(map(new Error()) instanceof Error);
    });

    test('coerces values in a simple object', function () {
      var actual = map({ a: '1', b: '2' });
      var expected = { a: 1, b: 2 };
      test.ok(simpleDeepEqual(actual, expected));
    });

    test('coerces only numeric strings in a simple object', function () {
      var actual = map({ a: '1', b: '2a', c: /abc/, d: '10' });
      var expected = { a: 1, b: '2a', c: /abc/, d: 10 };
      test.ok(simpleDeepEqual(actual, expected));
    });

    test('coerces numeric string in a nested object', function () {
      var actual = map({ a: '1', b: { c: '1', d: { e: '1' } } });
      var expected = { a: 1, b: { c: 1, d: { e: 1 } } };

      test.ok(simpleDeepEqual(actual, expected));
    });

    test('coerces values in a simple array', function () {
      var date = new Date();
      var regexp = new RegExp();
      var error = new Error();
      var actual = map(['1', '2', true, '3a', date, regexp, error]);
      var expected = [1, 2, true, '3a', date, regexp, error];
      test.ok(simpleDeepEqual(actual, expected));
    });

    test('coerces values in a deeply nested array', function () {
      var actual = map(['1', ['1', ['1']]]);
      var expected = [1, [1, [1]]];
      test.ok(simpleDeepEqual(actual, expected));
    });

    test('coerces values in a deeply nested object with arrays', function () {
      var actual = map({ a: '1', b: ['1', ['1'], { g: '1' }], c: { d: ['1'], e: { f: '1' } } });
      var expected = { a: 1, b: [1, [1], { g: 1 }], c: { d: [1], e: { f: 1 } } };
      test.ok(simpleDeepEqual(actual, expected));
    });

    test('coerces values in a deeply nested array with objects', function () {
      var actual = map(['1', ['1', ['1'], { a: '1' }], { c: { d: ['1'], e: { f: '1' } } }]);
      var expected = [1, [1, [1], { a: 1 }], { c: { d: [1], e: { f: 1 } } }];
      test.ok(simpleDeepEqual(actual, expected));
    });
  });
});