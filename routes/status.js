'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/status', async (request, reply) => {
    return {
      "health": request.query.health,
      "date": new Date().toISOString()
    }
  })

}
