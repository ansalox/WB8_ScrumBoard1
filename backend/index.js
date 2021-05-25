// importamos modulos express para crear el server y mongoose para manejar mongoDB
const express = require("express");
const mongoose = require("mongoose");
// modulos
const User = require("./routes/user");

// creamos la variable principal que ejecutara nuestra aplicacion
const app = express();
// que vamos a usar en nuestra app
app.use(express.json());
// modulos
app.use("/api/user/", User);

// creamos variable del puerto sea de hosting o local
const port = process.env.PORT || 3001;
// escuchamos el puerto
app.listen(port, () =>
  console.log("Servidor backend funcionando en puerto: " + port)
);

// conexion con MongoDB usando una promesa
mongoose
  .connect("mongodb://localhost:27017/sbprojectdb", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("conexion con MongoDB: ON"))
  .catch((error) => console.log("Error al conectar a MongoDB: ", error));
