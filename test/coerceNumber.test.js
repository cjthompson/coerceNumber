'use strict';

const test = require('simple-test');
const coerce = require('../index.js');

test('stringToNumber', function () {
  test('converts string value to a number', function () {
    test('when string is a positive number', function () {
      test.equal(coerce.toPositiveInteger('1'), 1);
      test.equal(coerce.toPositiveInteger('1000000000'), 1000000000);
      test.equal(coerce.toPositiveFloat('1.01'), 1.01);
      test.equal(coerce.toPositiveFloat('0.001'), 0.001);
      test.equal(coerce.toPositiveFloat('1000.000'), 1000);
      test.equal(coerce.toPositiveFloat('1000000000.9'), 1000000000.9);
    });

    test('when string is a negative number', function () {
      test.equal(coerce.toInteger('-1'), -1);
      test.equal(coerce.toFloat('-1.01'), -1.01);
      test.equal(coerce.toFloat('-0.001'), -0.001);
      test.equal(coerce.toFloat('-1000.000'), -1000);
      test.equal(coerce.toInteger('-1000000000'), -1000000000);
      test.equal(coerce.toFloat('-1000000000.9'), -1000000000.9);
    });

    test('when string is numeric and includes whitespace', function () {
      test.equal(coerce.toInteger(' 9'), 9);
      test.equal(coerce.toInteger('9 '), 9);
      test.equal(coerce.toInteger(' 9 '), 9);
      test.equal(coerce.toInteger('\t\t9'), 9);
      test.equal(coerce.toInteger('    9'), 9);
      test.equal(coerce.toInteger('9 '), 9);
      test.equal(coerce.toInteger('9     '), 9);
      test.equal(coerce.toInteger('9\r\n'), 9);
      test.equal(coerce.toInteger('\t  9  \r\n'), 9);
      test.equal(coerce.toFloat(' 9.1'), 9.1);
      test.equal(coerce.toFloat('9.1 '), 9.1);
      test.equal(coerce.toFloat(' 9.1 '), 9.1);
      test.equal(coerce.toFloat('\t\t9.1'), 9.1);
      test.equal(coerce.toFloat('    9.1'), 9.1);
      test.equal(coerce.toFloat('9.1 '), 9.1);
      test.equal(coerce.toFloat('9.1     '), 9.1);
      test.equal(coerce.toFloat('9.1\r\n'), 9.1);
      test.equal(coerce.toFloat('\t  9.1  \r\n'), 9.1);
    });

    test('when string is a number with a leading 0', function () {
      test.equal(coerce.toInteger('0666'), 666);
    });

    test('when string has a comma', function () {
      test.equal(coerce.toInteger('1,000'), '1,000');
      test.equal(coerce.toFloat('-1,01'), '-1,01');
      test.equal(coerce.toFloat('0,001'), '0,001');
    });

    test('when string has a decimal with a space', function () {
      test.equal(coerce.toFloat('1. 000'), '1. 000');
      test.equal(coerce.toFloat('-1.0 1'), '-1.0 1');
      test.equal(coerce.toFloat('1.'), '1.');
      test.equal(coerce.toFloat(' 1.'), ' 1.');
      test.equal(coerce.toFloat('1. '), '1. ');
      test.equal(coerce.toFloat('0 1.1'), '0 1.1');
      test.equal(coerce.toFloat('1. 1.1'), '1. 1.1');
    });

    test('when string has spaces between numbers', function () {
      test.equal(coerce.toInteger('1 0'), '1 0');
      test.equal(coerce.toInteger('1 1'), '1 1');
      test.equal(coerce.toFloat('-1 1.1'), '-1 1.1');
      test.equal(coerce.toFloat('1. 1'), '1. 1');
    });
  });

  test('returns provided value when given a ', function () {
    test('invalid string value', function () {
      test.equal(coerce.toFloat(''), '');
      test.equal(coerce.toFloat('      '), '      ');
      test.equal(coerce.toFloat('\t'), '\t');
      test.equal(coerce.toFloat('\r\n'), '\r\n');
      test.equal(coerce.toFloat('1a'), '1a');
      test.equal(coerce.toFloat('1x2'), '1x2');
      test.equal(coerce.toFloat('2016-01-01'), '2016-01-01');
      test.equal(coerce.toFloat('0x15'), '0x15'); // no hex conversion
      test.equal(coerce.toFloat('1e15'), '1e15'); // no scientific notation conversion
    });

    test('null or undefined', function () {
      test.equal(coerce.toFloat(null), null);
      test.equal(coerce.toFloat(undefined), undefined);
    });

    test('Boolean', function () {
      test.equal(coerce.toFloat(true), true);
    });

    test('Date', function () {
      test.ok(coerce.toFloat(new Date()) instanceof Date);
    });

    test('RegExp', function () {
      test.ok(coerce.toFloat(new RegExp()) instanceof RegExp);
    });

    test('Error', function () {
      test.ok(coerce.toFloat(new Error()) instanceof Error);
    });

    test('Array', function () {
      var value = coerce.toFloat(['1']);
      test.equal(value[0], '1');
    });

    test('Object', function () {
      var value = coerce.toFloat({ a: '1' });
      test.equal(value.a, '1');
    });
  });
});
