import http from 'http';
import fs from "fs";
import path from "path";
import process from "process";
import url from "url";
import qs from "querystring";
import express from 'express';
import bodyParser from 'body-parser';

const hostname = '127.0.0.1';
const port = 3000;

const rootFileSystem = process.cwd();

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(rootFileSystem + "/PublicResources/html/Main.html");
});
app.get('/Main.html', (req, res) => {
  res.sendFile(rootFileSystem + "/PublicResources/html/Main.html");
});
app.get('/MagicItems.html', (req, res) => {
  res.sendFile(rootFileSystem + "/PublicResources/html/MagicItems.html");
});

app.get('/Spells.html', (req, res) => {
  res.sendFile(rootFileSystem + "/PublicResources/html/Spells.html");
});

app.get('/Creatures.html', (req, res) => {
  res.sendFile(rootFileSystem + "/PublicResources/html/Creatures.html");
});

app.get('/JSItems.js', (req, res) => {
  res.sendFile(rootFileSystem + "/PublicResources/JS/JSItems.js");
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
});


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
