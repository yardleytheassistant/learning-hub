const PDFParser = require('pdf2json');
const fs = require('fs');

const pdfPath = '/Users/yardleytoth/Desktop/IS Powerpoints/Ch_01.pdf';

let pdfParser = new PDFParser();

pdfParser.on('pdfParser_dataError', (err) => console.error('Error:', err.parserError));
pdfParser.on('pdfParser_dataReady', (pdf) => {
  const text = pdfParser.getRawTextContent();
  console.log('Pages:', pdf.Pages.length);
  console.log('Text length:', text.length);
  console.log('First 500 chars:', text.substring(0, 500));
});

pdfParser.loadPDF(pdfPath);
