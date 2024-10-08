import express from "express";
import cors from "cors";
import usuario from './src/routers/route.usuario.js'
import tipo_servicio from './src/routers/route.tipo.servicio.js'

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(usuario);
app.use(tipo_servicio);


app.listen(port, () => {
    console.log("Listening on port ", port);
});