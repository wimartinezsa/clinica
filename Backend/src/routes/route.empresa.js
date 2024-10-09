import { Router } from "express";
import {listarEmpresas,registrarEmpresa,actualizarEmpresaId,desactivarEmpresaId,buscarEmpresaId} from "../controllers/controller.empresa.js";

const route = Router();

route.get('/empresa',listarEmpresas);
route.post('/empresa',registrarEmpresa);
route.put('/empresa/:id_empresa',actualizarEmpresaId);
route.delete('/empresa/:id_empresa',desactivarEmpresaId);
route.get('/empresa/:id_empresa',buscarEmpresaId);


export default route;