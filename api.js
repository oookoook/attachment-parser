const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var p = require('./parser-service');

const app = express();

app.use(bodyParser.raw({ type: 'application/*'}));
app.use(cors());

app.options('*', cors());

const isAuthenticated = function (req, res, next) {
    if(!process.env.API_KEY || process.env.API_KEY.length == 0) {
        console.log('Authentication disabled.');
        next();
        return;
    }

    if(req.query.key && req.query.key == process.env.API_KEY) {
        next();
    } else {
        res.sendStatus(403);
    }
  };

app.use(isAuthenticated);

app.route('/attachment-parser')
    .post(function(req, res) {
        p.getContent(req.body, req.query.preset, req.query.regex).then(r => res.json(r)).catch(e => { console.log(e); res.sendStatus(400); });
    });

module.exports = app;


