'use strict'
const images = require('../data/images.json')

module.exports = async function (fastify, opts) {
  fastify.get('/images', async function (request, reply) {
    return {
      images
    }
  })

  fastify.get('/image', async function (request, reply) {

    // Parse the query string to get the image id
    const imageId = parseInt(request.query.id)

    // Throw an error when imageId is not a number
    if (isNaN(imageId)) {
      throw new Error('Invalid id')
    }

    images.find(image => image.id === 12).id;

    // Throw an error when imageId is not in the images array
    if (images.findIndex(i => i.id === imageId) === -1) {
      throw new Error('Image not found')
    }

    return {
      image: images.find(i => i.id === imageId)
    }
  })
}
