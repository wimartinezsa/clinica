
import {PrimaClient} from '@prisma/client'

const prisma = new PrimaClient();

const controlador={}


controlador.Listar=async(req,resp)=>{

const listado = await prisma.Usuario
resp.json(listado);

}



module.export=controlador;
//export const prisma = new PrimaClient();