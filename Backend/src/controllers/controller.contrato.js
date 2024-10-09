
import prisma from '../libs/prisma.js'


export  const listarContratos=async(req,resp)=>{
    try{
        const contratos = await prisma.contrato.findMany();
        return resp.status(200).json(contratos);
    }catch(error){
        console.log("Error en controller.contrato.js :"+error);
    }
}

export  const buscarContratoId=async(req,resp)=>{
    try{
        const id= await req.params.id_contrato;
        const contratos = await prisma.contrato.findFirst(
            {
                where: { id_contrato: Number(id) }
            }
        );
        return resp.status(200).json(contratos);
    }catch(error){
        console.log("Error en controller.contrato.js :"+error);
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
                    empresa:datos.empresa
                }
            } 
        );
        return resp.status(200).json({"status":200,"message":"Contrato registrado en el sistema"});
    }catch(error){
        console.log("Error en controller.contrato.js :"+error);
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
    }  
}


   