'use strict'

const {test} = require('tap')
const {build} = require('../helper')

// without input
//
test('pdf responses without input', async (t) => {
  const app = build(t)

  const res = await app.inject({
    url: '/pdf'
  })
  t.deepEqual(JSON.parse(res.payload), {})
})

// with input
//
test('pdf responses to input', async (t) => {
  const app = build(t)

  const res = await app.inject({
    url: '/pdf?item[]=Dirk&item[]=Sven'
  })
  t.deepEqual(JSON.parse(res.payload), {"item[]": ["Dirk", "Sven"]})
})


// with false input
//
test('pdf responses to input', async (t) => {
  const app = build(t)

  const res = await app.inject({
    url: '/pdf?item[]=Dirk&item[]=Sven'
  })
  t.deepInequal(JSON.parse(res.payload), {"item[]": ["Ole", "Joern"]})
})

