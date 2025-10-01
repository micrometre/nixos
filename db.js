const sqlite3 = require('sqlite3').verbose();

// Open the database and make it available via app.locals
const db = new sqlite3.Database('file.db', (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    db.run(`CREATE TABLE IF NOT EXISTS lorem (info TEXT)`);
  }
});
exports.db = db;