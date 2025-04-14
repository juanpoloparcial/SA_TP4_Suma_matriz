const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static("public"));

app.post("/sumar", (req, res) => {
  const { matriz1, matriz2 } = req.body;

  const filas = matriz1.length;
  const columnas = matriz1[0].length;
  const resultado = [];

  for (let i = 0; i < filas; i++) {
    resultado[i] = [];
    for (let j = 0; j < columnas; j++) {
      resultado[i][j] = matriz1[i][j] + matriz2[i][j];
    }
  }

  res.json({ resultado });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
