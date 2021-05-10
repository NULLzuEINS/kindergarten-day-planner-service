'use strict'

module.exports = async function (fastify, opts) {

  // Register the plugin before your routes
  fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/',
    swagger: require('../schema.json')
  })


  fastify.post('/pdf/:id', {
    schema: {
      description: 'post some data',
      tags: ['user', 'code'],
      summary: 'qwerty',
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'user id'
          }
        }
      },
      body: {
        type: 'object',
        properties: {
          obj: {
            type: 'object',
            properties: {
              some: {type: 'string'}
            }
          }
        }
      },
      response: {
        201: {
          description: 'Successful response',
          type: 'object',
          properties: {
            hello: {type: 'string'}
          }
        }
      },
      security: [
        {
          "apiKey": []
        }
      ]
    }
  }, (req, reply) => { })

  fastify.ready(err => {
    if (err) throw err
    fastify.swagger()
  })
}
