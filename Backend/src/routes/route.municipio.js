import { Router } from "express";
import {listarMunicipios} from "../controllers/controller.municipio.js";

const route = Router();

route.get('/municipio',listarMunicipios);


export default route;