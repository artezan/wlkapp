import * as functions from 'firebase-functions';
import convert = require('xml-js');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  const xml = req.body.xml;
  const result1 = convert.xml2json(xml, { compact: false, spaces: 4 });
  res.status(200).json({ result1 });
});

// Expose Express API as a single Cloud Function:
export const xmlToJson = functions.https.onRequest((req, res) => {
  /*  const xml =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<note importance="high" logged="true">' +
    '    <title>Happy</title>' +
    '    <todo>Work</todo>' +
    '    <todo>Play</todo>' +
    '</note>';
  const result1 = convert.xml2json(xml, { compact: true, spaces: 4 });
  const result2 = convert.xml2json(xml, { compact: false, spaces: 4 });
  console.log(result1, '\n', result2);
  res.send(result1); */

  if (!req.path) {
    // prepending "/" keeps query params, path params intact
    req.url = `/${req.url}`;
  }

  return app(req, res);
});
