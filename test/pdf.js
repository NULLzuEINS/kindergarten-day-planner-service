const PDFDocument = require('pdfkit');
const fs = require('fs');
const data = {
   file: {
      name: 'output.pdf'
   },
   content: [
      {
         type: 'image',
         path: 'images/00_unspecified.jpg'
      },
      {
         type: 'text',
         content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque.'
      },
      {
         type: 'image',
         path: 'images/01_ankommen.jpg'
      },
      {
         type: 'image',
         path: 'images/02_frühstück.jpg'
      },
      {
         type: 'image',
         path: 'images/03_morgenkreis.jpg'
      },
      {
         type: 'image',
         path: 'images/04_draußen.jpg'
      },
      {
         type: 'image',
         path: 'images/05_wickeln.jpg'
      },
      {
         type: 'image',
         path: 'images/06_tanzen.jpg'
      },
      {
         type: 'image',
         path: 'images/07_lesen.jpg'
      },
      {
         type: 'image',
         path: 'images/08_spielen.jpg'
      },
      {
         type: 'image',
         path: 'images/09_experimentieren.jpg'
      },
      {
         type: 'image',
         path: 'images/10_mittagessen.jpg'
      },
      {
         type: 'image',
         path: 'images/12_kitafest.jpg'
      },
      {
         type: 'image',
         path: 'images/13_elternabend.jpg'
      },
      {
         type: 'image',
         path: 'images/14_verabschieden.jpg'
      }
   ]
}

   // Create a document
   const doc = new PDFDocument({layout: 'portrait', size: 'A4'})
   doc.font('fonts/GoodDog.ttf').fontSize(36)
   doc.info.Title = 'Tagesablauf'
   doc.info.subject = 'Tagesablauf'
   doc.info.Creator = 'NULLzuEINS Inh. André Lademann'
   doc.info.Keywords = 'kindergarten'

   const positionX = 70

   // Pipe its output somewhere, like to a file or HTTP response
   // See below for browser usage
   doc.pipe(fs.createWriteStream(data.file.name))

   // Embed a font, set the font size, and render some text
   data.content.forEach( (element, index) => {
      let positionY = (index % 2 === 0) ? 60 : 430
      if(element.type === 'image') {
         doc.image(element.path, positionX, positionY, {
            width: 450
         })   
      }  
      if(element.type === 'text') {
         doc.text(element.content, positionX + 8, positionY)
      }
      if( index % 2 === 1 && index < data.content.length - 1 ) {
         doc.addPage({layout: 'portrait', size: 'A4'})
      }
   })

   // Finalize PDF file
   doc.end()

