import { Router } from "express";
import {listarTarifas,
        registrarTarifa,
        actualizarTarifaId,
        desactivarTarifaId,
        buscarTarifaId
        } 
        from "../controllers/controller.tarifa.js";

const route = Router();

route.get('/tarifa',listarTarifas);
route.post('/tarifa',registrarTarifa);
route.put('/tarifa/:id_tarifa',actualizarTarifaId);
route.delete('/tarifa/:id_tarifa',desactivarTarifaId);
route.get('/tarifa/:id_tarifa',buscarTarifaId);


export default route;