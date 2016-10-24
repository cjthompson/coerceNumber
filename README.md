coerceNumber
============

Coerce numeric strings into JavaScript Numbers.

## Installation

```
npm install coerce-number
```

## API

### String to Number

#### stringToNumber(check, value, isNaNValue)

| Argument | Description |
|----------|-------------|
| `check`      | An object with a `test` function, like RegExp, that returns true or false if a value can be converted |
| `value`      | The source value to coerce |
| `isNaNValue` | (optional) The value to return if value cannot be coerced. Default is to return `value`.  | 

#### checkFunctions

The library exports various predicate functions in `coerceNumber.checkFunctions` that can be used as the `check` argument for `stringToNumber`

`isIntegerCheck`: If a value is a whole number (positive or negative)

`isPositiveIntegerCheck`: If a value is a positive whole number (>= 0)

`isFloatCheck`: If a value is a number, with or without a decimal

`isPositiveFloatCheck`: If a value is a positive number, with or without a decimal

#### Pre-defined check functions

The following functions are exported as `stringToNumber` with a check function already provided:

`toInteger`

```javascript
  const one = coerceNumber.toInteger('1'); // one = 1
  const minusOne = coerceNumber.toInteger('-1'); // one = -1
  const onePointOne = coerceNumber.toInteger('1.1'); // onePointOne = '1.1'
  const minusOnePointOne = coerceNumber.toInteger('-1.1'); // onePointOne = '-1.1'
```

`toPositiveInteger`

```javascript
  const one = coerceNumber.toPositiveInteger('1'); // one = 1
  const minusOne = coerceNumber.toPositiveInteger('-1'); // one = '-1'
  const onePointOne = coerceNumber.toPositiveInteger('1.1'); // onePointOne = '1.1'
  const minusOnePointOne = coerceNumber.toPositiveInteger('-1.1'); // onePointOne = '-1.1'
```

`toFloat`

```javascript
  const one = coerceNumber.toFloat('1'); // one = 1
  const minusOne = coerceNumber.toFloat('-1'); // one = -1
  const onePointOne = coerceNumber.toFloat('1.1'); // onePointOne = 1.1
  const minusOnePointOne = coerceNumber.toFloat('-1.1'); // onePointOne = -1.1
```

`toPositiveFloat`

```javascript
  const one = coerceNumber.toPositiveFloat('1'); // one = 1
  const minusOne = coerceNumber.toPositiveInteger('-1'); // one = '-1'
  const onePointOne = coerceNumber.toInteger('1.1'); // onePointOne = 1.1
  const minusOnePointOne = coerceNumber.toInteger('-1.1'); // onePointOne = '-1.1'
```

### Map

This function iterates over arrays and objects and applies a transform to all string values.

`map(value, iteratee)`

`iteratee` is a functions that takes a string and returns a replacement value.  Default is `toFloat`

```javascript
  const coerceNumber = require('coerce-number');
  const data = {
    id: '1',
    currency: 'USD',
    cost: '10',
    tax: '0.8'
  };

  const numericData = coerceNumber.map(data);
  /*
  numericData = {
    id: 1,
    currency: 'USD',
    cost: 10,
    tax: 0.8
  };
  */
```
