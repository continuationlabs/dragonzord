'use strict';

const Path = require('path');
const Aws = require('aws-sdk');
const Bcrypt = require('bcrypt');
const Lambundaler = require('lambundaler');

const LAMBDA_NAME = 'dragonzord-demo';
const AWS_ROLE = 'XXXXXXX';
const AWS_CONFIG = {
  accessKeyId: 'XXXXXXX',
  secretAccessKey: 'XXXXXXX',
  region: 'XXXXXXX'
};

console.log('dragonzord deployment sequence has been initiated');

Lambundaler({
  entry: Path.resolve(__dirname, '..', 'lib', 'index.js'),
  export: 'compare',
  exclude: ['bcrypt'],
  install: {
    pkg: Path.resolve(__dirname, '..', 'package.json')
  },
  deploy: {
    config: AWS_CONFIG,
    role: AWS_ROLE,
    name: LAMBDA_NAME,
    overwrite: true,
    timeout: 30
  }
}, function bundleCb (err) {
  if (err) {
    throw err;
  }

  const lambda = new Aws.Lambda(AWS_CONFIG);
  const value = process.argv[2] || 'hello world';
  const hash = Bcrypt.hashSync(value, 1);

  console.log('summoning the dragonzord');
  console.log(`value: ${value}, hashed value: ${hash}`);

  lambda.invoke({
    FunctionName: LAMBDA_NAME,
    Payload: JSON.stringify({ value, hash })
  }, function invokeCb (err, response) {
    if (err) {
      throw err;
    }

    console.log(`lambda response code: ${response.StatusCode}`);
    console.log(`compare result: ${response.Payload}`);
  });
});
