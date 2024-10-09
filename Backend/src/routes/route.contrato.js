import { Router } from "express";
import {listarContratos,
        registrarContrato,
        actualizarContratoId,
        desactivarContratoId,
        buscarContratoId} 
        from "../controllers/controller.contrato.js";

const route = Router();

route.get('/contrato',listarContratos);
route.post('/contrato',registrarContrato);
route.put('/contrato/:id_contrato',actualizarContratoId);
route.delete('/contrato/:id_contrato',desactivarContratoId);
route.get('/contrato/:id_contrato',buscarContratoId);



export default route;