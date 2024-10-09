import { Router } from "express";
import {listarServicios,buscarServicioId,registrarServicio,actualizarServicioId,desactivarServicioId} from "../controllers/controller.servicio.js";

const route = Router();

route.get('/servicio',listarServicios);
route.post('/servicio',registrarServicio);
route.put('/servicio/:id_servicio',actualizarServicioId);
route.delete('/servicio/:id_servicio',desactivarServicioId);
route.get('/servicio/:id_servicio',buscarServicioId);


export default route;