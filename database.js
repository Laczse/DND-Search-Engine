import fs from "fs";
import Database from "better-sqlite3";

export { insertItem, searchItems, getAllItems, findItem, editItem };

const db_path = "./data.db";
const db = connectDB();

function connectDB() {
  if (fs.existsSync(db_path)) {
    console.log("Database initiated");
    const db = new Database(db_path);
    return db;
  } else {
    const db = new Database("data.db");
    console.log("Database created");
    const itemTable = db.prepare(
      "CREATE TABLE items(id INTEGER PRIMARY KEY,name,type,additionalType,rarity,attunement,charges,description,url)"
    );
    itemTable.run();
    console.log("Tables created");
    return db;
  }
}

function insertItem(
  name,
  type,
  additionalType,
  rarity,
  attunement,
  charges,
  description,
  url
) {
  const insert = db.prepare(
    "INSERT INTO items(name,type,additionalType,rarity,attunement,charges,description,url) VALUES (?,?,?,?,?,?,?,?)"
  );
  insert.run(
    name,
    type,
    additionalType,
    rarity,
    attunement,
    charges,
    description,
    url
  );
}

function searchItems(itemName) {
  let searchName = "%" + itemName + "%";
  const stmt = db.prepare("SELECT * FROM items WHERE name LIKE ?");
  const itemSearch = stmt.all(searchName);
  return itemSearch;
}

function findItem(itemName) {
  const stmt = db.prepare("SELECT * FROM items WHERE name LIKE ?");
  const item = stmt.get(itemName);
  return item;
}

function getAllItems() {
  const stmt = db.prepare("SELECT * FROM items");
  const itemSearch = stmt.all();
  return itemSearch;
}

function printDB() {
  const stmt = db.prepare("SELECT * FROM items");
  console.log("Printing DB \n");
  console.log(stmt);
}

function editItem(
  oldName,
  newName,
  type,
  additionalType,
  rarity,
  attunement,
  charges,
  description,
  url
) {
  const update = db.prepare(
    "UPDATE items SET (name,type,additionalType,rarity,attunement,charges,description,url) = (?,?,?,?,?,?,?,?) WHERE name = ?"
  );
  update.run(
    newName,
    type,
    additionalType,
    rarity,
    attunement,
    charges,
    description,
    url,
    oldName
  );
}
