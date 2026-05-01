// Import the better-sqlite3 library
const Database = require('better-sqlite3');

// Open (or create) an SQLite database file
function createUserTable(){
const db = new Database('example.db');
// console.log("Database created");

// Create a new table called 'users'
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    username TEXT PRIMARY KEY NOT NULL,
    role TEXT NOT NULL,
    email EMAIL NOT NULL, 
    salt TEXT NOT NULL,
    key TEXT NOT NULL,
    city TEXT,
    state TEXT,
    zip TEXT,
    address TEXT
  );
`);


db.exec(`
    INSERT INTO users(username,role,email,salt,key)
  VALUES('mkesuper', 'super',
  'mkesuper@bdpamke.org',
  'a248affc4acb379431a293c4b8f6bb22',
  'c94a8e1bfcb6f38fc1265aaa0c8f8fa7266d01c1f2e7186750869ce18cad0ab33a9d6c26625a847c3a8da790a0145410d7bd66cf5067ab72ee7728c879557abb')
  ON CONFLICT(username) DO UPDATE SET
    role=excluded.role,
    email=excluded.email,
    salt=excluded.salt,
    key=excluded.key
    `);

console.log('Table created successfully');
}

function getAllUsers(){
    const db = new Database('example.db');
    const selectall = db.prepare('SELECT * FROM users');
    const rows = selectall.all();
    console.log(rows);
    return rows
}

function addUser(username,role,email,salt,key){
    const db = new Database('example.db');
    const insert = db.prepare('INSERT INTO users (username,role,email,salt,key) VALUES (?, ?,?,?,?)');

    // Insert user data
    insert.run(username,role,email,salt,key);
}

function getUser(username){
    const db = new Database('example.db');
    const find=db.prepare('SELECT * FROM users where username=?');
    rows=find.all(username)
    console.log("TEST=",rows)
    if (process.env.PRODUCTION =='false'){
        console.log("Foo",rows)
    }
    return rows
}
module.exports={createUserTable, getAllUsers,addUser,getUser}