'use strict'

module.exports = async function (fastify, opts) {

  /*
  fastify.register(require('fastify-swagger'), {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'Kita day planner swagger',
        description: 'API to generate kita day planner pdf',
        version: '0.0.1'
      },
      externalDocs: {
        url: 'https://github.com/nullzueins/kindergarten-day-planner-service/',
        description: 'Find more info on GitHub repository'
      },
      host: '127.0.0.1:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/pdf'],
      tags: [
        {name: 'image', description: 'Day planner related images'},
        {name: 'code', description: 'Code related end-points'}
      ],
      definitions: {
        Image: {
          type: 'object',
          required: ['id'],
          properties: {
            id: {type: 'string', format: 'uuid'},
            fileName: {type: 'string'},
            description: {type: 'string'}
          }
        }
      }
    },
    uiConfig: {
      docExpansion: 'full',
      deepLinking: true
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true
  })
  */
  
  fastify.register(require('fastify-swagger'), {
    mode: 'static',
    specification: {
      path: './swagger.yaml'
    },
    exposeRoute: true
  })

  fastify.get('/status', async (request, reply) => {
    return {
      "health": request.query.health,
      "date": new Date().toISOString()
    }
  })

  fastify.get('/', {
    schema: {
      description: 'Get the root path',
      tags: ['test'],
      summary: 'Get the root path',
      params: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the user'
          }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            hello: {
              type: 'string',
              description: 'The message'
            }
          }
        }
      }
    }
  }, (request, reply) => { })

  fastify.ready(err => {
    if (err) throw err
    fastify.swagger()
  })

}
