
import prisma from '../libs/prisma.js'


export  const listarServicios=async(req,resp)=>{
    try{
        const servicios = await prisma.Servicio.findMany();
        return resp.status(200).json(servicios);
    }catch(error){
        console.log("Error en controller.servicio.js :"+error);
    }
}


export  const buscarServicioId=async(req,resp)=>{
    try{
        const id= await req.params.id_servicio;
        const servicios = await prisma.Servicio.findFirst(
            {
                where: { id_servicio: Number(id) }
            }
        );
        return resp.status(200).json(servicios);
    }catch(error){
        console.log("Error en controller.servicio.js :"+error);
    }
}

export  const registrarServicio=async(req,resp)=>{
    try{
        const datos= await req.body;
        const servicio = await prisma.Servicio.create(
            {
                data: {
                    nombre:datos.nombre,
                    nivel:datos.nivel,
                    prestador: datos.prestador,
                    tipo_servicio:datos.tipo_servicio
                }
            } 
        );
        return resp.status(200).json({"status":200,"message":"Servicio registrado en el sistema"});
    }catch(error){
        console.log("Error en controller.Servicio.js :"+error);
    }  
}

export  const actualizarServicioId=async(req,resp)=>{
    try{
        const datos= await req.body;
        const id= await req.params.id_servicio;
        const existencia = await prisma.Servicio.findUnique({
            where: { id_servicio: Number(id)},
          });
          if (!existencia) {
            return resp.status(501).json({"status":200,"message":"El servicio no existe en el sistema"});
          }
          else{
            const servicio = await prisma.Servicio.update(
                {
                    where:{id_servicio:Number(id)},
                    data:{
                            nombre:datos.nombre,
                            nivel:datos.nivel,
                            prestador: datos.prestador,
                            tipo_servicio:datos.tipo_servicio
                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"Servicio actualizado en el sistema"});
          }
    }catch(error){
        console.log("Error en controller.servicio.js :"+error);
    }  
}

export  const desactivarServicioId=async(req,resp)=>{
    try{
        const id= await req.params.id_servicio
        const existencia = await prisma.Servicio.findUnique({
            where: { id_servicio: Number(id)}
          });

          if (!existencia) {
            return resp.status(501).json({"status":501,"message":"El servicio no existe en el sistema"});
          }
          else{
            const servicio = await prisma.Servicio.update(
                {
                    where:{id_servicio:Number(id)},
                    data:{estado: 'Inactivo'}  
                }  
            );
            return resp.status(200).json({"status":200,"message":"El servico se desactivo del sistema"});
        }

       
    }catch(error){
        console.log("Error en controller.tipo.servicio.js :"+error);
    }  
}


   