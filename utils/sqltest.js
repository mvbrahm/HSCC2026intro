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
  '491de1ab5159880033812349e41eea73dac1ae537894801067ebc958a739fa99b056e265c531477cf5e137398029a20b2ddf5bf064f042cf805856f7fb571e7f')
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