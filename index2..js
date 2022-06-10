//Revisé tu código y lo reescribí, en la parte de solicitar todos los productos no es necesario hacer un map. Espero te sirva y puedas comprenderlo para continuar con tu trabajo. :D  ... Exitos crack!!! Abrazo

const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async getAll() {
    try {
      const data = JSON.parse(
        await fs.promises.readFile(this.archivo, "utf-8")
      );
      return data ? data : "Archivo vacío o con problemas";
    } catch (error) {
      console.log("Error buscando objetos del archivo. Code: ", error);
    }
  }
}

const productosFile = new Contenedor("./productos.txt");

const express = require("express");
const app = express();
const puerto = 8080;

/* middleware */
app.use((req, res, next) => {
  next();
});
/* fin middleware */

//Llamamos al título del servidor
app.get("/", (req, res) => {
  res.send("<h1 style=color:blue>Sebastian Musso</h1>");
});

//Se solicitan los productos en la ruta en cuestion
app.get("/productos", (req, res) => {
  const productos = productosFile.getAll();
  productos.then((productos) => res.json(productos));
});

//Se solicitan los productos Random
app.get("/productoRandom", (req, res) => {
  const productos = productosFile.getAll();
  productos.then((productos) => {
    const randomProductIndex = Math.floor(Math.random() * productos.length); 
    const randomProduct = productos[randomProductIndex]
    const responseString = `Title: ${randomProduct.title}<br/> Price: ${randomProduct.price}<br/> Id: ${randomProduct.id}`
    res.send(responseString)
  });
});


app.listen(puerto, (err) => {
  if (!err) {
    console.log(`Servidor iniciado en el puerto ${puerto}`);
  } else {
    console.log(`Error al iniciar el servidor: `, err);
  }
});
