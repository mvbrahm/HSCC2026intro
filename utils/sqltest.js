// Import the better-sqlite3 library
const Database = require('better-sqlite3');

function openDatabase(){
    const dbPath = process.env.DB_PATH || 'example.db';
    return new Database(dbPath);
}

// Open (or create) an SQLite database file
function createUserTable(){
const db = openDatabase();
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

db.exec(`
    INSERT INTO users(username,role,email,salt,key)
  VALUES('mkematt2', 'voter',
  'mkematt2@example.com',
  'b9e56c4a5d77a3b74a5a1203d82364af',
  'c8a799ecb86cf20885780e34bfcd54bfbdbc26c6d01f70d221527b3388de9f0911500e5459b09db4e6dfd83dd25cfddaa602bdce98e44e3093fbb0a5dfda8fe1')
  ON CONFLICT(username) DO UPDATE SET
    role=excluded.role,
    email=excluded.email,
    salt=excluded.salt,
    key=excluded.key
    `);

console.log('Table created successfully');
db.close();
}

function getAllUsers(){
    const db = openDatabase();
    const selectall = db.prepare('SELECT * FROM users');
    const rows = selectall.all();
    console.log(rows);
    db.close();
    return rows
}

function addUser(username,role,email,salt,key){
    const db = openDatabase();
    const insert = db.prepare('INSERT INTO users (username,role,email,salt,key) VALUES (?, ?,?,?,?)');

    // Insert user data
    insert.run(username,role,email,salt,key);
    db.close();
}

function getUser(username){
    const db = openDatabase();
    const find=db.prepare('SELECT * FROM users where username=?');
    const rows=find.all(username)
    console.log("TEST=",rows)
    if (process.env.PRODUCTION =='false'){
        console.log("Foo",rows)
    }
    db.close();
    return rows
}
module.exports={createUserTable, getAllUsers,addUser,getUser}
