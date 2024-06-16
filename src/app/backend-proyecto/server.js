const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000; // Puedes cambiar el puerto si es necesario

app.use(cors());
app.use(bodyParser.json()); // Middleware para parsear JSON en las solicitudes

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

// Ruta para registrar un laboratorio
app.post('/registrar-lab', (req, res) => {
  console.log('Datos recibidos:', req.body); // Verifica los datos recibidos
  const { NumLab, Profesor, Turno, Curso } = req.body;
  const sql = `INSERT INTO Labs (NumLab, Profesor, Turno, Curso) VALUES (${NumLab}, '${Profesor}', '${Turno}', '${Curso}')`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al registrar lab:', err); // Muestra errores de inserción
      res.status(500).send('Error al registrar laboratorio');
      return;
    }
    console.log('Laboratorio registrado:', result); // Verifica el resultado de la inserción
    res.send('Laboratorio registrado exitosamente');
  });
});

// Ruta para registrar un usuario
app.post('/registrar-usuario', (req, res) => {
  console.log('Datos recibidos:', req.body); // Verifica los datos recibidos
  const { Id, Usuario, Clave, Correo } = req.body;
  const sql = `INSERT INTO Usuarios (Id, Usuario, Clave, Correo) VALUES ('${Id}', '${Usuario}', '${Clave}', '${Correo}')`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al registrar usuario:', err); // Muestra errores de inserción
      res.status(500).send('Error al registrar usuario');
      return;
    }
    console.log('Usuario registrado:', result); // Verifica el resultado de la inserción
    res.send('Usuario registrado exitosamente');
  });
});

// Ruta para validar usuario y clave
app.post('/login', (req, res) => {
  const { Usuario, Clave } = req.body;
  const sql = 'SELECT * FROM Usuarios WHERE Usuario = ? AND Clave = ?';
  db.query(sql, [Usuario, Clave], (err, result) => {
    if (err) {
      console.error('Error al validar usuario:', err);
      res.status(500).send('Error al validar usuario');
      return;
    }
    if (result.length > 0) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  });
});

// Ruta para verificar credenciales de usuario
app.post('/verificar-credenciales', (req, res) => {
  const { Usuario, Clave } = req.body;
  console.log('Datos recibidos para verificación:', req.body);

  const sql = 'SELECT * FROM Usuarios WHERE Usuario = ? AND Clave = ?';
  db.query(sql, [Usuario, Clave], (err, result) => {
    if (err) {
      console.error('Error al verificar credenciales:', err);
      res.status(500).send('Error al verificar credenciales');
      return;
    }
    console.log('Resultado de la consulta:', result);
    if (result.length > 0) {
      res.send('Credenciales correctas');
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
