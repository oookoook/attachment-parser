const p = require('./parser-service');
const fs = require('fs');
process.env.LOCAL = "true";
(async () => {
    let dataBuffer = fs.readFileSync('./test/invoice.pdf');
    var r = await p.getContent(dataBuffer, 'gsuite_invoice');
    console.dir(r);
  })();