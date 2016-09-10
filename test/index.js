'use strict';

const Bcrypt = require('bcryptjs');
const Code = require('code');
const Lab = require('lab');
const Dragonzord = require('../lib');

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.describe;
const it = lab.it;

describe('Dragonzord()', () => {
  it('exports a compare function', (done) => {
    expect(Dragonzord.compare).to.be.a.function();
    // Assert 3 arguments, event, context, callback
    expect(Dragonzord.compare.length).to.equal(3);
    done();
  });
  describe('compare()', () => {
    it('sends back an error if event.value is not a string', (done) => {
      Dragonzord.compare({ value: 0, hash: '1234'}, null, (err, result) => {
        expect(err).to.be.an.error(TypeError, 'you did not supply a value to compare');
        expect(result).to.be.null();
        done();
      });
    });

    it('sends back an error if event.hash is not a string', (done) => {
      Dragonzord.compare({ value: '1234' }, null, (err, result) => {
        expect(err).to.be.an.error(TypeError, 'you did not supply a hashed value to compare against');
        expect(result).to.be.null();
        done();
      });
    });

    it('send back the result of the comparison', (done) => {
      Dragonzord.compare({
        value: 'foobarbaz',
        hash: Bcrypt.hashSync('foobarbaz', 1)
      }, null, (err, result) => {
        expect(err).to.be.null();
        expect(result).to.be.true();
        done();
      });
    });

    // it('hashes the string supplied with the number of saltRounds', (done) => {
    //   const plainText = 'testString';
    //   Dragonzord.hash({ plainText, saltRounds: 1 }, null, (err, result) => {
    //     expect(err).to.not.exist();
    //     expect(result).to.be.a.string();
    //     expect(result.length).to.be.greaterThan(plainText.length);
    //     done();
    //   });
    // });
    //
    // it('callsback with an error if event.plainText not a string with length', (done) => {
    //   Dragonzord.hash({ plainText: null }, null, (err, result) => {
    //     expect(err).to.be.an.error(TypeError, 'you did not supply a plainText value to hash');
    //     expect(result).to.be.null();
    //
    //     Dragonzord.hash({}, null, (err, result) => {
    //       expect(err).to.be.an.error(TypeError, 'you did not supply a plainText value to hash');
    //       expect(result).to.be.null();
    //       done();
    //     });
    //   });
    // });
  });
});
