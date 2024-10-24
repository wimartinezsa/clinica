
import prisma from '../libs/prisma.js'

export  const listarAcerdos=async(req,resp)=>{
    try{

        const acuerdos = await prisma.$queryRaw`SELECT 
        ac.id_acuerdo,
        se.nombre as servicio,
        ac.precio,
        ac.iva,
        con.id_contrato,
        em.nombre as empresa,
        em.sigla,
        mu.nombre as municipio,
        ac.estado
        FROM acuerdos ac
        join contratos con on con.id_contrato = ac.contratoId
        join empresas em on em.id_empresa= con.empresaId 
        join servicios se on se.id_servicio= ac.servicioId 
        join municipios mu on mu.id_municipio = em.municipioId
         `;
        return resp.status(200).json(acuerdos);
    }catch(error){
        console.log("Error en controller.acuerdo.js :"+error);
        resp.status(500).json({ error: 'Error al listar los acuerdos' });
    }
}

export  const buscarAcuerdoId=async(req,resp)=>{
    try{
        const id= await req.params.id_acuerdo;
        const acuerdo = await prisma.acuerdo.findFirst(
            {
                where: { id_acuerdo: Number(id) },
                select:{
                    id_acuerdo: true,
                    estado: true,
                    precio: true,
                    iva: true,
                    contratoId: true,
                    servicioId: true,
                contrato:{
                    select:{
                        id_contrato:true,
                        fecha_inicio:true,
                        fecha_fin:true,
                        empresa:{
                            select:{
                            nombre:true,
                            sigla:true,
                            municipio:{
                                select:{
                                    nombre:true
                                }
                            }
                        }
                        },
                      
                        }
                    }
    
                    }
            }
        );
        return resp.status(200).json(acuerdo);
    }catch(error){
        console.log("Error en controller.acuerdo.js :"+error);
        resp.status(500).json({ error: 'Error al buscar acuerdo' });
    }
}


export  const registrarAcuerdo=async(req,resp)=>{
    try{
        const datos= await req.body;
        const acuerdo = await prisma.acuerdo.create(
            {
                data: {
                    estado: "Activo",
                    precio: datos.precio,
                    iva: datos.iva,
                    servicioId:datos.servicioId,
                    contratoId: datos.contratoId
                }
            } 
        );
        return resp.status(200).json({"status":200,"message":"Tarifa registrada en el sistema"});
    }catch(error){
        console.log("Error en controller.tarifa.js :"+error);
        resp.status(500).json({ error: 'Error al registrar la tarifa' });
    }  
}

export  const actualizarAcuerdoId=async(req,resp)=>{
    try{
        const datos= await req.body;
        const id= await req.params.id_acuerdo;
        const existencia = await prisma.acuerdo.findUnique({
            where: { id_acuerdo: Number(id)},
          });
          if (!existencia) {
            return resp.status(501).json({"status":200,"message":"EL aceurdo no existe en el sistema"});
          }
          else{
            const acuerdo = await prisma.acuerdo.update(
                {
                    where:{id_acuerdo:Number(id)},
                    data:{
                        estado: datos.estado,
                        precio: datos.precio,
                        iva: datos.iva,
                        contratoId:datos.contratoId,
                        servicioId: datos.servicioId
                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"Acuerdo actualizada en el sistema"});
          }
    }catch(error){
        console.log("Error en controller.acuerdo.js :"+error);
        resp.status(500).json({ error: 'Error al actualizar la acuerdo' });
    }  
}

export  const desactivarAcuerdoId=async(req,resp)=>{
    try{
        const id= await req.params.id_acuerdo;
        const existencia = await prisma.acuerdo.findUnique({
            where: { id_acuerdo: Number(id)}
          });

          if (!existencia) {
            return resp.status(501).json({"status":501,"message":"El acuerdo no existe en el sistema"});
          }
          else{
            const acuerdo= await prisma.acuerdo.update(
                {
                    where:{id_acuerdo:Number(id)},
                    data:{estado: 'Inactivo'}  
                }  
            );
            return resp.status(200).json({"status":200,"message":"Acuerdo desactivado del sistema"});
        }

       
    }catch(error){
        console.log("Error en controller.acuerdo.js :"+error);
        resp.status(500).json({ error: 'Error al desactivar la Acuerdo' });
    }  
}


   