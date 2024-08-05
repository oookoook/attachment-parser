const p = require('./parser-service');
const fs = require('fs');
process.env.LOCAL = "true";
(async () => {
  p.debug(true);  
  let dataBuffer = fs.readFileSync('./test/invoice_gsuite_2024.pdf');
    var r = await p.getContent(dataBuffer, 'gsuite_invoice');
    //var r = await p.getContent(dataBuffer);
    console.dir(r);
  })();