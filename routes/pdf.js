'use strict'

const fs = require('fs');
const images = require('../data/images.json')
const path = require('path')
const PDFDocument = require('pdfkit');

module.exports = async function (fastify, opts) {
  fastify.get('/pdf', async function (request, reply) {

    // Throw an error when request.query.image is not defined
    if (!request.query.image) {
      reply.code(400).send({
        error: 'Image parameter is required.'
      })
    }

    // Throw an error when request.query.image is not an array
    if (!Array.isArray(request.query.image)) {
      reply.code(400).send({
        error: 'At least two images must be added.'
      })
    }

    // Throw an error when request.query.image is larger than images.length
    if (request.query.image.length > images.length) {
      reply.code(400).send({
        error: 'You can only add up to ' + images.length + ' images.'
      })
    }

    // Throw an error when the number in request.query.image is not in images.length
    if (request.query.image.includes(images.length)) {
      reply.code(400).send({
        error: 'The image identifier is not in the properate scope. The hights is ' + images.length + '.'
      })
    }

    // Test if image param is set
    if (request.query.image.length <= 1 || request.query.image.length > images.length) {
      new Error('Invalid arguments.')
    }

    // Parse all image parameters into integers
    const imageIds = request.query.image.map(id => parseInt(id)).filter(id => !isNaN(id))

    // throw error if imageId is larger than the amount of images
    if (imageIds.some(id => id > images.length)) {
      new Error('Invalid arguments.')
    }
    
    // Configure the PDF document
    const margin = 70
    const imageWitdh = 450

    // Setup file name and download path
    const downloadsDirectory = process.env.DIR_DOWNLOADS || 'downloads'
    const filename = `tagesplaner_${request.query.image.join('-')}.pdf`
    const filePath = `${downloadsDirectory}/${filename}`
    const url = `${request.protocol}://${request.hostname}/${filePath}`

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      return reply.sendFile(filename, path.join(__dirname, `../${downloadsDirectory}`))
      // File already exists, return url
      return {
        cache: true,
        url: url
      }
    } else { 
      // Create a document
      const doc = new PDFDocument({
        size: 'A4',
        info: {
          Title: 'KiTa Tagesplaner',
          Subject: 'KiTa Tagesplaner mit Bildern',
          Keywords: 'pdf, Kindergarten,Kita,Tagesplaner',
          CreationDate: new Date(),
          ModDate: new Date(),
          Author: 'Sarah Girlich',
          Creator: 'NULLzuEINS Inh. André Lademann',
          Producer: 'Landeskompetenzzentrum zur Sprachförderungan Kindertageseinrichtungen in Sachsen(LakoS)',
        },
        margins: {
          top: margin,
          bottom: margin * 2,
          left: margin,
          right: margin
        }
      });

      await doc.pipe(fs.createWriteStream(`${filePath}`));

      // Add images to the document
      request.query.image.forEach((element, index) => {
        doc.image(`images/${images[element].filename}`, {
          fit: [imageWitdh, imageWitdh],
          align: 'center',
        });

        // Add space between images
        if (index % 2 === 0) {
          doc.moveDown()
        } else {
          if (index !== request.query.image.length - 1) {
            doc.addPage()
          }
        }
      })

      // Close the document
      await doc.end();
      
      // timeout to wait for the file to be written
      await new Promise(resolve => setTimeout(resolve, 2000));
      return await reply.sendFile(filename, path.join(__dirname, `../${downloadsDirectory}`))
    }
  })
}
