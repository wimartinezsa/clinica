import { Router } from "express";
import {listarTipoServicio,registrarTipoServicio,actualizarTipoServicio,desactivarTipoServicio,buscarTipoServicio} from "../controllers/controller.tipo.servicio.js";

const route = Router();

route.get('/tipo_servicio',listarTipoServicio);
route.post('/tipo_servicio',registrarTipoServicio);
route.put('/tipo_servicio/:id_tipo_servicio',actualizarTipoServicio);
route.delete('/tipo_servicio/:id_tipo_servicio',desactivarTipoServicio);
route.get('/tipo_servicio/:id_tipo_servicio',buscarTipoServicio);


export default route;