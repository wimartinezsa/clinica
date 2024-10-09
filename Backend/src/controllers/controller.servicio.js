
import JSONbig from 'json-bigint';
import prisma from '../libs/prisma.js'


export  const listarServicios=async(req,resp)=>{
    try{
        const servicios = await prisma.Servicio.findMany(

            { include: { 
                prestador: true,
                tipo_servicio:true          
                }
            }

        );
        return resp.status(200).send(JSONbig.stringify(servicios));
    }catch(error){
        console.log("Error en controller.servicio.js :"+error);
        resp.status(500).json({ error: 'Error al listar los servicios' });
    }
}

export  const buscarServicioId=async(req,resp)=>{
    try{
        const id= await req.params.id_servicio;
        const servicios = await prisma.Servicio.findFirst(
            {
                where: { id_servicio: Number(id) },
                 include: { 
                    prestador: true,
                    tipo_servicio:true          
                    }
                
            }
        );
        return resp.status(200).send(JSONbig.stringify(servicios));
    }catch(error){
        console.log("Error en controller.servicio.js :"+error);
        resp.status(500).json({ error: 'Error al buscar el servicio' });
    }
}

export  const registrarServicio=async(req,resp)=>{
    try{
        const datos= await req.body;
        const servicio = await prisma.servicio.create(
            {
                data: {
                    nombre:datos.nombre,
                    nivel:datos.nivel,
                    prestadorId: datos.prestadorId,
                    tipo_servicioId:datos.tipo_servicioId
                }
            } 
        );
        return resp.status(200).json({"status":200,"message":"Servicio registrado en el sistema"});
    }catch(error){
        console.log("Error en controller.Servicio.js :"+error);
        resp.status(500).json({ error: 'Error al registrar el servicio' });
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
                            prestadorId: datos.prestadorId,
                            tipo_servicioId:datos.tipo_servicioId
                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"Servicio actualizado en el sistema"});
          }
    }catch(error){
        console.log("Error en controller.servicio.js :"+error);
        resp.status(500).json({ error: 'Error al actualizar el servicio' });
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
        resp.status(500).json({ error: 'Error al desactivar el servico' });
    }  
}


   