import http from 'http';
import fs from "fs";
import path from "path";
import process from "process";
import url from "url";
import qs from "querystring";
import express from 'express';
import bodyParser from 'body-parser';

import { insertItem, searchItems, getAllItems } from "./database.js";
import { capitalizeWords } from "./supportFunctions.js";

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
  res.sendFile(rootFileSystem + "/publicResources/html/item/magicItems.html");
});

app.get('/spells.html', (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/html/spell/spells.html");
});

app.get('/creatures.html', (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/html/creature/creatures.html");
});

app.get('/createItem.html', (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/html/item/CreateItem.html");
});

app.get('/createCreature.html', (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/html/creature/CreateCreature.html");
});

app.get('/createSpell.html', (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/html/spell/CreateSpell.html");
});

app.get('/jsItems.js', (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/js/jsItems.js");
});

app.get('/jsNewItem.js', (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/js/JSNewItem.js");
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

app.get('/sortingArrows', (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/icons/sortingArrows.png");
});

app.get('/style', (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/css/style.css");
});

app.post('/itemSearch', (req, res) => {
  console.log(req.body);
  console.log(req.body.name);
  if (req.body.name != ' ') {
    let items = searchItems(req.body.name.toLowerCase());
    if (items.length == 0) {
      return res.send("null");
    }
    console.log("\n");
    console.log(items);
    return res.send(items);
  } else {
    console.log("No name");
    return res.send("null");
  }
});

app.post('/onLoadItemSearch', (req, res) => {
    let items = getAllItems();
    console.log("\n");
    console.log(items);
    return res.send(items);
  }
);

app.post('/newItem', (req, res) => {
  console.log(req.body);
  console.log(req.body.name);
  console.log(req.body.type);
  insertItem(req.body.name.toLowerCase(), req.body.type[0].toLowerCase(), req.body.rarity[0].toLowerCase(), req.body.attunement.toLowerCase(), req.body.charges.toLowerCase(), req.body.description);
  return res.sendStatus(200);
}
);



app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

