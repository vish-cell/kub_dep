const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'mysql', // Docker service name for the MySQL container
  user: 'vishal',
  password: '1',
  database: 'taskdb'
});

db.connect((err) => {
  if (err) throw err;
 console.log('Connected to MySQL');
});

app.get('/', (req, res) => {
  res.sendFile('/index.html', { root: __dirname });
});

app.post('/addTask', (req, res) => {
  const task = req.body.task;
  const sql = 'INSERT INTO tasks (description) VALUES (?)';
  db.query(sql, [task], (err, result) => {
    if (err) throw err;
    console.log('Task added');
    res.send('Task added successfully');
  });
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
