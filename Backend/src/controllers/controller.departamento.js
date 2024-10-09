
import prisma from '../libs/prisma.js'


export  const listarDepartamentos=async(req,resp)=>{
    try{
        const departamentos = await prisma.Departamento.findMany();
        return resp.status(200).json(departamentos);
    }catch(error){
        console.log("Error en controller.departamento.js :"+error);
    }
}







   