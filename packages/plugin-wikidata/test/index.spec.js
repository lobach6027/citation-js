/* eslint-env mocha */

const assert = require('assert')
const {plugins} = require('../../../test/api')(require('@citation-js/core'))
require('../lib/')

const data = require('./data')

describe('input', function () {
  for (let type in data) {
    describe(type, function () {
      it('is registered', function () {
        assert(plugins.input.has(type))
      })

      for (let [name, [input, expected, {link, opts} = {}]] of Object.entries(data[type])) {
        describe(name, function () {
          it('parses type', function () {
            assert.strictEqual(plugins.input.type(input), type)
          })
          it('parses data', function () {
            let method = link ? plugins.input.chainLink : plugins.input.chain
            assert.deepStrictEqual(
              method(input, Object.assign({generateGraph: false}, opts || {})),
              expected
            )
          })
        })
      }
    })
  }
})
