
import prisma from '../libs/prisma.js'


export  const listarExamenes=async(req,resp)=>{
    try{
        const examenes = await prisma.examen.findMany(
            {
                include:{
                    tipo_examen:true
                }
            }
        );
        return resp.status(200).json(examenes);
    }catch(error){
        console.log("Error en controller.examen.js :"+error);
        resp.status(500).json({ error: 'Error al listar los examenes' });
    }
}

export  const buscarExamenId=async(req,resp)=>{
    try{
        const id= await req.params.id_examen;
        const examen = await prisma.examen.findFirst(
            {
                where: { id_examen: Number(id) },
                include:{
                        tipo_examen:true
                    }
                
            }
        );
        return resp.status(200).json(examen);
    }catch(error){
        console.log("Error en controller.examen.js :"+error);
        resp.status(500).json({ error: 'Error al buscar el examen' });
    }
}

export  const registrarExamen=async(req,resp)=>{
    try{
        const datos= await req.body;
        const examen = await prisma.examen.create(
            {
                data: {
                    nombre: datos.nombre,
                    precio: datos.precio,
                    metodo: datos.metodo,
                    rango_biologico: datos.rango_biologico,
                    unidades: datos.unidades,
                    tipo_examenId: datos.tipo_examenId,
                    estado: datos.estado
                }
            } 
        );
        return resp.status(200).json({"status":200,"message":"Examen registrado en el sistema"});
    }catch(error){
        console.log("Error en controller.examen.js :"+error);
        resp.status(500).json({ error: 'Error al registrar el examen' });
    }  
}

export  const actualizarExamenId=async(req,resp)=>{
    try{
        const datos= await req.body;
        const id= await req.params.id_examen;
        const existencia = await prisma.examen.findUnique({
            where: { id_examen: Number(id)},
          });
          if (!existencia) {
            return resp.status(501).json({"status":200,"message":"EL Examen no existe en el sistema"});
          }
          else{
            const examen = await prisma.examen.update(
                {
                    where:{id_examen:Number(id)},
                    data:{
                        nombre: datos.nombre,
                        precio: datos.precio,
                        metodo: datos.metodo,
                        rango_biologico: datos.rango_biologico,
                        unidades: datos.unidades,
                        tipo_examenId: datos.tipo_examenId,
                        estado: datos.estado
                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"Examen actualizado en el sistema"});
          }
    }catch(error){
        console.log("Error en controller.examen.js :"+error);
        resp.status(500).json({ error: 'Error al actualizar el Examen' });
    }  
}

export  const desactivarExamenId=async(req,resp)=>{
    try{
        const id= await req.params.id_examen;
        const existencia = await prisma.examen.findUnique({
            where: { id_examen: Number(id)}
          });

          if (!existencia) {
            return resp.status(501).json({"status":501,"message":"El examen no existe en el sistema"});
          }
          else{
            const eps= await prisma.eps.update(
                {
                    where:{id_examen:Number(id)},
                    data:{estado: 'Inactivo'}  
                }  
            );
            return resp.status(200).json({"status":200,"message":"Examen desactivado del sistema"});
        }

    }catch(error){
        console.log("Error en controller.examen.js :"+error);
        resp.status(500).json({ error: 'Error al desactivar el examen' });
    }  
}


   