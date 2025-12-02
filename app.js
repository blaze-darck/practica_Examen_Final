const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
let datos = [];
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});
app.get("/datos", (req, res) => {
  res.json(datos);
});
app.post("/datos", (req, res) => {
  const {
    nombre,
    apellido,
    edad,
    diaNacimiento,
    mesNacimiento,
    añoNacimiento,
  } = req.body;
  if (
    !nombre ||
    !apellido ||
    !edad ||
    !diaNacimiento ||
    !mesNacimiento ||
    !añoNacimiento
  ) {
    return res.status(400).send("Faltan datos.");
  }
  const mayorEdad = edad >= 18 ? true : false;
  const verificacionEdad = mayorEdad ? "es mayor de edad" : "es menor de edad";
  const nuevaEdad = edad + 10;
  const verificacionAño =
    añoNacimiento % 4 === 0
      ? "nació en un año bisiesto"
      : "no nació en un año bisiesto";
  const fibonaciEdad = [];
  for (let i = 0; i < edad; i++) {
    if (i === 0) {
      fibonaciEdad.push(0);
    } else if (i === 1) {
      fibonaciEdad.push(1);
    } else {
      fibonaciEdad.push(fibonaciEdad[i - 1] + fibonaciEdad[i - 2]);
    }
  }
  const nuevoDato = {
    id: datos.length + 1,
    nombre,
    apellido,
    edad,
    mayorEdad,
    diaNacimiento,
    mesNacimiento,
    añoNacimiento,
    verificacionAño,
    verificacionEdad,
    nuevaEdad,
    fibonaciEdad,
  };
  datos.push(nuevoDato);
  res.send("Dato agregado correctamente");
});
app.put("/datos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, apellido, edad } = req.body;
  const index = datos.findIndex((d) => d.id === id);
  if (nombre) datos[index].nombre = nombre;
  if (apellido) datos[index].apellido = apellido;
  if (edad) datos[index].edad = edad;
  res.send("Dato actualizado correctamente");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
