# dragonzord

[![Current Version](https://img.shields.io/npm/v/dragonzord.svg)](https://www.npmjs.org/package/dragonzord)
[![Build Status](https://travis-ci.org/continuationlabs/dragonzord.svg?branch=master)](https://travis-ci.org/continuationlabs/dragonzord)
![Dependencies](http://img.shields.io/david/continuationlabs/dragonzord.svg)

[![belly-button-style](https://cdn.rawgit.com/continuationlabs/belly-button/master/badge.svg)](https://github.com/continuationlabs/belly-button)

<img src="https://raw.github.com/continuationlabs/dragonzord/master/images/green-ranger.jpg" />

Run `bcrypt.compare()` as an AWS Lambda function. For `bcrypt.hash()` as a Lambda function, see [`tigerzord`](https://github.com/continuationlabs/tigerzord).

## API

`dragonzord` uses the Lambda function interface in the following manner:

  - `event` - The following properties are expected in the `event` argument.
    - `value` (string) - The plaintext value to compare.
    - `hash` (string) - The hash to compare `value` against.
  - `context` - Unused.
  - `callback(err, result)` - A typical Node.js error first callback. If no error occurs, `result` will be a Boolean representing the result of `compare()`.
