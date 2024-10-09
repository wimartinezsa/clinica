import { Router } from "express";
import {listarUsuarios,registrarUsuario,actualizarUsuarioId,desactivarUsuarioId,buscarUsuarioId} from "../controllers/controller.usuario.js";

const route = Router();

route.get('/usuario',listarUsuarios);
route.post('/usuario',registrarUsuario);
route.put('/usuario/:id_usuario',actualizarUsuarioId);
route.delete('/usuario/:id_usuario',desactivarUsuarioId);
route.get('/usuario/:id_usuario',buscarUsuarioId);


export default route;