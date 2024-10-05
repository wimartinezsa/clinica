import { Router } from "express";
import {listarUsuario,registrarUsuario,actualizarUsuario,eliminarUsuario,buscarUsuario} from "../controllers/controller.usuario.js";

const route = Router();

route.get('/usuario',listarUsuario);
route.post('/usuario',registrarUsuario);
route.put('/usuario/:id_usuario',actualizarUsuario);
route.delete('/usuario/:id_usuario',eliminarUsuario);
route.get('/usuario/:id_usuario',buscarUsuario);


export default route;