import { Router } from "express";
import {
    registrarUsuario,
    actualizarUsuarioId,
    buscarUsuarioId
} 
from "../controllers/controller.usuario.js";

import {validarUsuario} from "../middlewares/authentication.js"

const route = Router();

route.post('/login',validarUsuario);
route.get('/usuario/:id_usuario',buscarUsuarioId);
route.post('/usuario',registrarUsuario);
route.put('/usuario/:id_usuario',actualizarUsuarioId);



export default route;