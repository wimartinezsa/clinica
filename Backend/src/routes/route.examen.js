import { Router } from "express";
import {listarExamenes,
        registrarExamen,
        actualizarExamenId,
        desactivarExamenId,
        buscarExamenId
        } 
        from "../controllers/controller.examen.js";

const route = Router();

route.get('/examen',listarExamenes);
route.post('/examen',registrarExamen);
route.put('/examen/:id_examen',actualizarExamenId);
route.delete('/examen/:id_examen',desactivarExamenId);
route.get('/examen/:id_examen',buscarExamenId);

export default route;