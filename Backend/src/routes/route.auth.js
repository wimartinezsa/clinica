import { Router } from "express";
import {
    loginUser,
    registrarUsuario
} 
        from "../controllers/controller.auth.js";

const route = Router();

route.get('/login',loginUser);
route.post('/usuario',registrarUsuario);




export default route;