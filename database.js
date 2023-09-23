import fs from 'fs';
import Database from 'better-sqlite3';

export { insertItem, searchItems };

const db_path = './data.db';
const db = connectDB();


function connectDB() {
    if (fs.existsSync(db_path)) {
        console.log("Database initiated");
        const db = new Database(db_path);
        return db;
    } else {
        const db = new Database('data.db');
        console.log("Database created");
        const itemTable = db.prepare('CREATE TABLE items(id INTEGER PRIMARY KEY,name,type,rarity,attunement,charges)');
        itemTable.run();
        console.log("Tables created");
        return db;
    };
};

function insertItem(name, type, rarity, attunement, charges) {
    const insert = db.prepare('INSERT INTO items(name,type,rarity,attunement,charges) VALUES (?,?,?,?,?)');
    insert.run(name, type, rarity, attunement, charges);
}

function searchItems(itemName) {
    let searchName = '%' + itemName + '%';
    const stmt = db.prepare('SELECT * FROM items WHERE name LIKE ?');
    const itemSearch = stmt.all(searchName);
    return itemSearch;

};

function printDB() {
    const stmt = db.prepare('SELECT * FROM items');
    console.log("Printing DB \n");
    console.log(stmt);
}