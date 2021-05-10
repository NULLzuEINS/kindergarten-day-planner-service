'use strict'

const {test} = require('tap')
const {build} = require('../helper')

test('default root route', async (t) => {
  const app = build(t)

  const res = await app.inject({
    url: '/'
  })
  t.deepEqual(res.payload, "This is not a punk rock song!")
})
