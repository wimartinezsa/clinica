import { Router } from "express";
import {listarTopoExamenes,
        registrarTipoExamen,
        actualizarTipoExamenId,
        desactivarTipoExamenId,
        buscarTipoExamenId
        } 
        from "../controllers/controller.tipo_examen.js";

const route = Router();

route.get('/tipo_examen',listarTopoExamenes);
route.post('/tipo_examen',registrarTipoExamen);
route.put('/tipo_examen/:id_tipo_examen',actualizarTipoExamenId);
route.delete('/tipo_examen/:id_tipo_examen',desactivarTipoExamenId);
route.get('/tipo_examen/:id_tipo_examen',buscarTipoExamenId);

export default route;