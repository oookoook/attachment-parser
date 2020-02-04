const p = require('./parser-service');
const fs = require('fs');
process.env.LOCAL = "true";
(async () => {
    let dataBuffer = fs.readFileSync('./test/invoice_aws.pdf');
    var r = await p.getContent(dataBuffer, 'aws_invoice');
    //var r = await p.getContent(dataBuffer);
    console.dir(r);
  })();