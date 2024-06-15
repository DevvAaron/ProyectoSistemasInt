const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000; // Puedes cambiar el puerto si es necesario

app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'ProyectoSistemas', // Nombre de tu base de datos
  });

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conexión a la base de datos establecida');
});

// Ruta para obtener usuarios
app.get('/usuarios', (req, res) => {
  const sql = 'SELECT * FROM Usuarios';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

// Ruta para obtener labs
app.get('/labs', (req, res) => {
  const sql = 'SELECT * FROM Labs';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

// Ruta para obtener clips
app.get('/clips', (req, res) => {
  const sql = 'SELECT * FROM Clips';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});




app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});


