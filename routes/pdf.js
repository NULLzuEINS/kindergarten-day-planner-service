'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/pdf', async function (request, reply) {
    return request.query
  })
}
