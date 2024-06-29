import process from "process";
import express from "express";
import bodyParser from "body-parser";

import { insertItem, searchItems, getAllItems, findItem } from "./database.js";
import {
  capitalizeWords,
  filterByType,
  filterByRarity,
  filterByCharges,
  filterByAttunement,
} from "./supportFunctions.js";

const hostname = "127.0.0.3";
const port = 5000;

const rootFileSystem = process.cwd();

const app = express();

app.use(bodyParser.json());

app.use(express.static("publicResources"));
//app.use('/itemImages', express.static('itemImages'));

app.get("/", (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/html/main.html");
});
app.get("/main.html", (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/html/main.html");
});
app.get("/magicItems.html", (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/html/item/magicItems.html");
});

app.get("/spells.html", (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/html/spell/spells.html");
});

app.get("/creatures.html", (req, res) => {
  res.sendFile(
    rootFileSystem + "/publicResources/html/creature/creatures.html"
  );
});

app.get("/createItem.html", (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/html/item/CreateItem.html");
});

app.get("/editItem.html", (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/html/item/EditItem.html");
});

app.get("/createCreature.html", (req, res) => {
  res.sendFile(
    rootFileSystem + "/publicResources/html/creature/CreateCreature.html"
  );
});

app.get("/createSpell.html", (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/html/spell/CreateSpell.html");
});

app.get("/monsterStatBlock.html", (req, res) => {
  res.sendFile(
    rootFileSystem + "/publicResources/html/creature/monsterStatBlock.html"
  );
});

app.get("/jsItems.js", (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/js/jsItems.js");
});

app.get("/jsNewItem.js", (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/js/JSNewItem.js");
});

app.get("/jsEditItem.js", (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/js/jsEditItem.js");
});

app.get("/chosen/chosen.css", (req, res) => {
  res.sendFile(rootFileSystem + "/chosen/chosen.css");
});

app.get("/chosen/chosen-sprite.png", (req, res) => {
  res.sendFile(rootFileSystem + "/chosen/chosen-sprite.png");
});

app.get("/chosen/docsupport/style.css", (req, res) => {
  res.sendFile(rootFileSystem + "/chosen/docsupport/style.css");
});

app.get("/chosen/docsupport/jquery-3.2.1.min.js", (req, res) => {
  res.sendFile(rootFileSystem + "/chosen/docsupport/jquery-3.2.1.min.js");
});

app.get("/chosen/chosen.jquery.js", (req, res) => {
  res.sendFile(rootFileSystem + "/chosen/chosen.jquery.js");
});

app.get("/chosen/docsupport/prism.js", (req, res) => {
  res.sendFile(rootFileSystem + "/chosen/docsupport/prism.js");
});

app.get("/chosen/docsupport/prism.css", (req, res) => {
  res.sendFile(rootFileSystem + "/chosen/docsupport/prism.css");
});

app.get("/chosen/docsupport/init.js", (req, res) => {
  res.sendFile(rootFileSystem + "/chosen/docsupport/init.js");
});

app.get("/sortingArrows", (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/icons/sortingArrows.png");
});

app.get("/ogre", (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/icons/ogre.png");
});

app.get("/style", (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/css/style.css");
});

app.get("/marketplace.html", (req, res) => {
  res.sendFile(
    rootFileSystem + "/publicResources/html/marketplace/marketplace.html"
  );
});

app.get("/marketplace.js", (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/js/marketplace.js");
});

app.get("/marketplaceStyle.css", (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/css/marketplaceStyle.css");
});

app.get("/monsterStatBlock.css", (req, res) => {
  res.sendFile(rootFileSystem + "/publicResources/css/monsterStatBlock.css");
});

app.post("/itemSearch", (req, res) => {
  console.log(req.body);
  console.log(req.body.name);
  let items;
  if (req.body.name != "") {
    items = searchItems(req.body.name.toLowerCase());
    if (items.length == 0) {
      return res.send("null");
    }
    console.log("\n");
    console.log(items);
  } else {
    items = getAllItems();
  }

  items = filterByType(items, req.body.type);
  items = filterByRarity(items, req.body.rarity);
  items = filterByCharges(items, req.body.charges.toLowerCase());
  items = filterByAttunement(items, req.body.attunement.toLowerCase());

  return res.send(items);
});

app.post("/onLoadItemSearch", (req, res) => {
  let items = getAllItems();
  console.log("\n");
  console.log(items);
  return res.send(items);
});

app.post("/findItem", (req, res) => {
  return res.send(findItem(req.body.name));
});

app.post("/newItem", (req, res) => {
  console.log(req.body);
  console.log(req.body.name);
  console.log(req.body.type);
  let url;
  if (req.body.url == null) {
    url = "itemImages/";
    switch (req.body.type.toLowerCase()) {
      case "armor":
        url = url.concat("default/armor.jpg");
        break;
      case "potion":
        url = url.concat("default/potion.jpg");
        break;
      case "ring":
        url = url.concat("default/ring.jpg");
        break;
      case "rod":
        url = url.concat("default/rod.jpg");
        break;
      case "scroll":
        url = url.concat("default/scroll.jpg");
        break;
      case "staff":
        url = url.concat("default/staff.jpg");
        break;
      case "wand":
        url = url.concat("default/wand.jpg");
        break;
      case "weapon":
        url = url.concat("default/weapon.jpg");
        break;
      case "wondrous item":
        url = url.concat("default/wondrousitem.jpg");
        break;
      default:
        url = url.concat("default/wondrousitem.jpg");
        break;
    }
  } else {
    url = req.body.url;
  }

  if (findItem(req.body.name.toLowerCase()) == null) {
    insertItem(
      req.body.name.toLowerCase(),
      req.body.type.toLowerCase(),
      req.body.additionalType.toLowerCase(),
      req.body.rarity.toLowerCase(),
      req.body.attunement.toLowerCase(),
      req.body.charges.toLowerCase(),
      req.body.description,
      url
    );
    return res.sendStatus(200);
  } else {
    console.log("Item with that name already exists");
  }

  return res.sendStatus(422);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
