import { Router } from "express";
import {
    validarUsuario,
    registrarUsuario,
    actualizarUsuarioId
} 
        from "../controllers/controller.usuario.js";

const route = Router();

route.get('/login',validarUsuario);
route.post('/usuario',registrarUsuario);
route.put('/usuario/:id_usuario',actualizarUsuarioId);



export default route;