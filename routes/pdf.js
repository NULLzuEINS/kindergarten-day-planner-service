'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/pdf', async function (request, reply) {
    if (request.params.item === null) {
      new Error('Invalid arguments.')
    }
    return request.query
  })
}
