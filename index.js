const express = require('express');
const path = require('path')
const { db } = require('./db');

const app = express();

const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

// Make db accessible in routes via req.app.locals.db
app.locals.db = db;

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api', (req, res) => {
  res.json({"msg": "Hello world"});
});

app.get('/api/posts', (req, res) => {
  let db = req.app.locals.db;
  db.run(`INSERT INTO lorem(info) VALUES ('Hello World'), ('Hello Again')`);
  db.all(`SELECT * FROM lorem`, [], (err, rows) => {
    if (err) {
      res.status(500).send('Error retrieving data');
    } else {
      res.json(rows);
      console.log(rows);
    }
  });
});



app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})