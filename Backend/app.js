import express from "express";
import cors from "cors";


import { swaggerUi, swaggerSetup }  from "./views/swagger.js"

import paciente from './src/routes/route.paciente.js'
import tipo_servicio from './src/routes/route.tipo.servicio.js'
import servicio from './src/routes/route.servicio.js'
import empresa from './src/routes/route.empresa.js'
import municipio from './src/routes/route.municipio.js'
import departamento from './src/routes/route.departamento.js'
import contrato from './src/routes/route.contrato.js'
import prestador from './src/routes/route.prestador.js'
import eps from './src/routes/route.eps.js'
import tipo_examen from './src/routes/route.tipo_examen.js'
import examen from './src/routes/route.examen.js'
import tarifa from './src/routes/route.tarifa.js'

import usuario from './src/routes/route.usuario.js'

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(paciente);
app.use(tipo_servicio);
app.use(servicio);
app.use(empresa);
app.use(municipio);
app.use(departamento);
app.use(contrato);
app.use(prestador);
app.use(eps);
app.use(tipo_examen);
app.use(examen);
app.use(tarifa);
app.use(usuario);




app.use('/api-docs', swaggerUi.serve,swaggerSetup);

app.listen(port, () => {
    console.log("Listening on port ", port);
});