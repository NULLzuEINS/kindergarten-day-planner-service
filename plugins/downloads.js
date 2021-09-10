'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  // Serve static files
  const DIR_DOWNLOADS = 'downloads' || process.env.DIR_DOWNLOADS
  fastify.register(require('fastify-static'), {
    root: __dirname + '/../' + DIR_DOWNLOADS,
    prefix: `/${DIR_DOWNLOADS}/`
  })
})
