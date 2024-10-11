import { Router } from "express";
import {
    validarUsuario,
    registrarUsuario
} 
        from "../controllers/controller.usuario.js";

const route = Router();

route.get('/login',validarUsuario);
route.post('/usuario',registrarUsuario);




export default route;