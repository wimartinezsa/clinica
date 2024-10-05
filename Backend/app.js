import express from "express";
import cors from "cors";
import usuario from './src/routers/route.usuario.js'

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(usuario);

app.listen(port, () => {
    console.log("Listening on port ", port);
});