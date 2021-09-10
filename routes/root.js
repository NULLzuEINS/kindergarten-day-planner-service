'use strict'
const path = require('path')

module.exports = async function (fastify, opts) {

  // Register swagger routes
  fastify.register(require('fastify-swagger'), {
    mode: 'static',
    specification: {
      path: './swagger.yaml'
    },
    exposeRoute: true
  }) 

  fastify.ready(err => {
    if (err) throw err
    fastify.swagger()
  })

}
