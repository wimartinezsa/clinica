import { Router } from "express";
import {listarPacientes,registrarPaciente,actualizarPacienteId,desactivarPacienteId,buscarPacienteId} from "../controllers/controller.paciente.js";

const route = Router();

route.get('/paciente',listarPacientes);
route.post('/paciente',registrarPaciente);
route.put('/paciente/:id_paciente',actualizarPacienteId);
route.delete('/paciente/:id_paciente',desactivarPacienteId);
route.get('/paciente/:id_paciente',buscarPacienteId);


export default route;