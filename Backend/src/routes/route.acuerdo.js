import { Router } from "express";
import {listarAcerdos,
        registrarAcuerdo,
        actualizarAcuerdoId,
        desactivarAcuerdoId,
        buscarAcuerdoId
        } 
        from "../controllers/controller.acuerdo.js";

const route = Router();

route.get('/acuerdo',listarAcerdos);
route.post('/acuerdo',registrarAcuerdo);
route.put('/acuerdo/:id_acuerdo',actualizarAcuerdoId);
route.delete('/acuerdo/:id_acuerdo',desactivarAcuerdoId);
route.get('/acuerdo/:id_acuerdo',buscarAcuerdoId);


export default route;