'use strict'
const awsServerlessExpress = require('aws-serverless-express')
const app = require('./api')
const binaryMimeTypes = [
	'application/pdf',
	'application/octet-stream',
	'font/eot',
	'font/opentype',
	'font/otf',
	'image/jpeg',
	'image/png',
	'image/svg+xml'
]
const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);
exports.handler = (event, context) => {
	// ugly fix of this bug https://github.com/awslabs/aws-serverless-express/issues/216
	//event.path = event.path.replace('/latest', '');
	
	// nicer fix
	if (event.requestContext.stage){
        event.path=event.path.replace('/'+event.requestContext.stage,'')
    }
	
	awsServerlessExpress.proxy(server, event, context);
}
