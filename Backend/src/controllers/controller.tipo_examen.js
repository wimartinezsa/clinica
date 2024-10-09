
import prisma from '../libs/prisma.js'


export  const listarTopoExamenes=async(req,resp)=>{
    try{
        const tipos_examenes = await prisma.tipo_Examen.findMany( );
           
        return resp.status(200).json(tipos_examenes);
    }catch(error){
        console.log("Error en controller.tipo_examen.js :"+error);
        resp.status(500).json({ error: 'Error al listar los tipos de examenes' });
    }
}

export  const buscarTipoExamenId=async(req,resp)=>{
    try{
        const id= await req.params.id_tipo_examen;
        const tipo_Examen = await prisma.tipo_Examen.findFirst(
            {
                where: { id_tipo_examen: Number(id) }
                
            }
        );
        return resp.status(200).json(tipo_Examen);
    }catch(error){
        console.log("Error en controller.tipo_Examen.js :"+error);
        resp.status(500).json({ error: 'Error al buscar el tipo de examen' });
    }
}

export  const registrarTipoExamen=async(req,resp)=>{
    try{
        const datos= await req.body;
        const tipo_Examen = await prisma.tipo_Examen.create(
            {
                data: {
                    
                    nombre:datos.nombre,
                    estado:datos.estado
                   
                }
            } 
        );
        return resp.status(200).json({"status":200,"message":"Tipo de Examen registrado en el sistema"});
    }catch(error){
        console.log("Error en controller.tipo_examen.js :"+error);
        resp.status(500).json({ error: 'Error al registrar el tipo de examen' });
    }  
}

export  const actualizarTipoExamenId=async(req,resp)=>{
    try{
        const datos= await req.body;
        const id= await req.params.id_tipo_examen;
        const existencia = await prisma.tipo_Examen.findUnique({
            where: { id_tipo_examen: Number(id)},
          });
          if (!existencia) {
            return resp.status(501).json({"status":200,"message":"El tipo de examen no existe en el sistema"});
          }
          else{

            const tipo_examen = await prisma.tipo_Examen.update(
                {
                    where:{id_tipo_examen:Number(id)},
                    data:{
                        nombre:datos.nombre,
                        estado:datos.estado
                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"Tipo de examen actualizado en el sistema"});
          }
    }catch(error){
        console.log("Error en controller.tipoexamen.js :"+error);
        resp.status(500).json({ error: 'Error al actualizar el tipo de examen' });
    }  
}


export  const desactivarTipoExamenId=async(req,resp)=>{
    try{
        const id= await req.params.id_tipo_examen;
        const existencia = await prisma.tipo_Examen.findUnique({
            where: { id_tipo_examen: Number(id)}
          });

          if (!existencia) {
            return resp.status(501).json({"status":501,"message":"El tipo de examen no existe en el sistema"});
          }
          else{
            const contrato= await prisma.tipo_Examen.update(
                {
                    where:{id_tipo_examen:Number(id)},
                    data:{estado: 'Inactivo'}  
                }  
            );
            return resp.status(200).json({"status":200,"message":"Tipo de Examen desactivado del sistema"});
        }

       
    }catch(error){
        console.log("Error en controller.tipo_examen.js :"+error);
        resp.status(500).json({ error: 'Error al desactivar el tipo de examen' });
    }  
}


   