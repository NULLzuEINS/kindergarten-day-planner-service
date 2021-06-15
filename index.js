// https://itnext.io/generating-a-pdf-with-node-js-express-cloudinary-8a9b9160207

const express = require('express')
const PDFDocument = require('pdfkit')
const app = express()

const url = process.env.URL || 'http://0.0.0.0'
const port = process.env.PORT || 4000

app.use(function (req, res, next) {
    if (req.query.data || req.query.params) {
        next()
    } else {
        let error = new Error('Missing data')
        error.status = 400
        next(error)
    }
})

app.get('/', (req, res, next) => {

    console.log(JSON.parse(req.query.data))
    /*
    const doc = new PDFDocument({layout: 'portrait', size: 'A4'})
    const positionX = 70

    doc.font('fonts/GoodDog.ttf').fontSize(36)
    doc.info.Title = 'Tagesablauf'
    doc.info.subject = 'Tagesablauf'
    doc.info.Creator = 'NULLzuEINS Inh. André Lademann'
    doc.info.Keywords = 'kindergarten'

    doc.x = 240
    doc.y = 200

    let date = (new Date()).toISOString().split('T')[0]
    let filename = 'tagesplaner_' + date
    let data = JSON.parse(req.query.data)

    data.forEach((element, index) => {
        let positionY = (index % 2 === 0) ? 60 : 430
        if (element.type === 'image') {
            doc.image(element.path, positionX, positionY, {
                width: 450
            })
        }
        if (element.type === 'text') {
            doc.text(element.content, positionX + 8, positionY)
        }
        if (index % 2 === 1 && index < data.length - 1) {
            doc.addPage({layout: 'portrait', size: 'A4'})
        }
    })

    // Stripping special characters
    filename = encodeURIComponent(filename) + '.pdf'
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
    res.setHeader('Content-type', 'application/pdf')

    doc.pipe(res)
    doc.end()
    */
    res.send('data: ' + req.query.data)
})

app.listen(port, () => {
    console.log('Server running on ' + url + ':' + port)
})
