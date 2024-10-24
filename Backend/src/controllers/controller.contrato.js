
import prisma from '../libs/prisma.js'


export  const listarContratos=async(req,resp)=>{
    try{
       
        const contratos = await prisma.$queryRaw`SELECT 
        co.id_contrato,
        co.fecha_inicio,
        co.fecha_fin,
        co.estado,
        em.nombre as empresa,
        em.sigla,
        mp.nombre as municipio

        FROM contratos co 
        join empresas em on id_empresa=empresaId
        join municipios mp on mp.id_municipio=municipioId
        `;
        return resp.status(200).json(contratos);
      
    }catch(error){
        console.log("Error en controller.contrato.js :"+error);
        resp.status(500).json({ error: 'Error al listar el contrato' });
    }
}

export  const buscarContratoId=async(req,resp)=>{
    try{
        const id= await req.params.id_contrato;
        const contratos = await prisma.contrato.findFirst(
            {
                where: { id_contrato: Number(id) },
                    include:
                     {
                        empresa:true,
                        empresa:{
                            include:{
                                municipio:true
                            }
                        }
                     }
                
            }
        );
        return resp.status(200).json(contratos);
    }catch(error){
        console.log("Error en controller.contrato.js :"+error);
        resp.status(500).json({ error: 'Error al buscar el contrato' });
    }
}

export  const registrarContrato=async(req,resp)=>{
    try{
        const datos= await req.body;
        const contrato = await prisma.contrato.create(
            {
                data: {
                    fecha_inicio:new Date(datos.fecha_inicio),
                    fecha_fin:new Date(datos.fecha_fin),
                    estado:datos.estado,
                    empresaId:datos.empresaId
                }
            } 
        );
        return resp.status(200).json({"status":200,"message":"Contrato registrado en el sistema"});
    }catch(error){
        console.log("Error en controller.contrato.js :"+error);
        resp.status(500).json({ error: 'Error al registrar el contrato' });
    }  
}

export  const actualizarContratoId=async(req,resp)=>{
    try{
        const datos= await req.body;
        const id= await req.params.id_contrato;
        const existencia = await prisma.contrato.findUnique({
            where: { id_contrato: Number(id)},
          });
          if (!existencia) {
            return resp.status(501).json({"status":200,"message":"El contrato no existe en el sistema"});
          }
          else{

            const contrato = await prisma.contrato.update(
                {
                    where:{id_contrato:Number(id)},
                    data:{
                            fecha_inicio:new Date(datos.fecha_inicio),
                            fecha_fin:new Date(datos.fecha_fin),
                            estado:datos.estado
                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"Contrato actualizado en el sistema"});
          }
    }catch(error){
        console.log("Error en controller.contrato.js :"+error);
        resp.status(500).json({ error: 'Error al actualizar el contrato' });
    }  
}


export  const desactivarContratoId=async(req,resp)=>{
    try{
        const id= await req.params.id_contrato;
        const existencia = await prisma.contrato.findUnique({
            where: { id_contrato: Number(id)}
          });

          if (!existencia) {
            return resp.status(501).json({"status":501,"message":"El contrato no existe en el sistema"});
          }
          else{
            const contrato= await prisma.contrato.update(
                {
                    where:{id_contrato:Number(id)},
                    data:{estado: 'Inactivo'}  
                }  
            );
            return resp.status(200).json({"status":200,"message":"Contrato desactivado del sistema"});
        }

       
    }catch(error){
        console.log("Error en controller.contrato.js :"+error);
        resp.status(500).json({ error: 'Error al desactivar el contrato' });
    }  
}


   