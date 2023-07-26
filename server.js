import http from 'http';
import fs from "fs";
import path from "path";
import process from "process";
import url from "url";
import qs from "querystring";
import express from 'express';
import bodyParser from 'body-parser';

import { insertItem, searchItems } from "./database.js";
import{capitalizeWords} from "./supportFunctions.js";

const hostname = '127.0.0.1';
const port = 3000;

const rootFileSystem = process.cwd();

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/html/main.html");
});
app.get('/main.html', (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/html/main.html");
});
app.get('/magicItems.html', (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/html/magicItems.html");
});

app.get('/spells.html', (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/html/spells.html");
});

app.get('/creatures.html', (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/html/creatures.html");
});

app.get('/jsItems.js', (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/js/jsItems.js");
});

app.get('/chosen/chosen.css', (req, res) => {
  res.sendFile(rootFileSystem + "/chosen/chosen.css");
});

app.get('/chosen/chosen-sprite.png', (req, res) => {
  res.sendFile(rootFileSystem + "/chosen/chosen-sprite.png");
});

app.get('/chosen/docsupport/style.css', (req, res) => {
  res.sendFile(rootFileSystem + "/chosen/docsupport/style.css");
});

app.get('/chosen/docsupport/jquery-3.2.1.min.js', (req, res) => {
  res.sendFile(rootFileSystem + "/chosen/docsupport/jquery-3.2.1.min.js");
});

app.get('/chosen/chosen.jquery.js', (req, res) => {
  res.sendFile(rootFileSystem + "/chosen/chosen.jquery.js");
});

app.get('/chosen/docsupport/prism.js', (req, res) => {
  res.sendFile(rootFileSystem + "/chosen/docsupport/prism.js");
});

app.get('/chosen/docsupport/prism.css', (req, res) => {
  res.sendFile(rootFileSystem + "/chosen/docsupport/prism.css");
});

app.get('/chosen/docsupport/init.js', (req, res) => {
  res.sendFile(rootFileSystem + "/chosen/docsupport/init.js");
});

app.post('/itemSearch', (req, res) => {
  console.log(req.body);
  console.log(req.body.name)
  if (req.body.name != ' ') {
    let items = searchItems(req.body.name.toLowerCase());
    if (items.length == 0){
      return res.send("null");
    }
    console.log("\n");
    console.log(items);
  }else{
    console.log("No name");
    return res.send("null");
  }
  /*
  insertItem(req.body.name, req.body.type, req.body.rarity);
  */

});


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
