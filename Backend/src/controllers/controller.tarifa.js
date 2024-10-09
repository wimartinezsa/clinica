
import prisma from '../libs/prisma.js'


export  const listarTarifas=async(req,resp)=>{
    try{

      

    
        const tarifa = await prisma.tarifa.findMany(
            {
                select:{
                id_tarifa: true,
		        estado: true,
		        precio: true,
		        iva: true,
		        examenId: true,
		        contratoId: true,
		        servicioId: true,
                examen:{
                    select:{
                    nombre:true,
                    tipo_examen:{
                        select:{
                            nombre:true
                        }
                    }
                },
               
                },
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


        return resp.status(200).json(tarifa);
    }catch(error){
        console.log("Error en controller.tarifa.js :"+error);
        resp.status(500).json({ error: 'Error al listar las tarifas' });
    }
}

export  const buscarTarifaId=async(req,resp)=>{
    try{
        const id= await req.params.id_tarifa;
        const tarifa = await prisma.tarifa.findFirst(
            {
                where: { id_tarifa: Number(id) },
                select:{
                    id_tarifa: true,
                    estado: true,
                    precio: true,
                    iva: true,
                    examenId: true,
                    contratoId: true,
                    servicioId: true,
                    examen:{
                        select:{
                        nombre:true,
                        tipo_examen:{
                            select:{
                                nombre:true
                            }
                        }
                    },
                   
                    },
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
        return resp.status(200).json(tarifa);
    }catch(error){
        console.log("Error en controller.tarifa.js :"+error);
        resp.status(500).json({ error: 'Error al buscar la tarifa' });
    }
}



export  const registrarTarifa=async(req,resp)=>{
    try{
        const datos= await req.body;
        const tarifa = await prisma.tarifa.create(
            {
                data: {
                    estado: datos.estado,
                    precio: datos.precio,
                    iva: datos.iva,
                    contratoId:datos.contratoId,
                    examenId: datos.examenId,
                    servicioId: datos.servicioId
                }
            } 
        );
        return resp.status(200).json({"status":200,"message":"Tarifa registrada en el sistema"});
    }catch(error){
        console.log("Error en controller.tarifa.js :"+error);
        resp.status(500).json({ error: 'Error al registrar la tarifa' });
    }  
}

export  const actualizarTarifaId=async(req,resp)=>{
    try{
        const datos= await req.body;
        const id= await req.params.id_tarifa;
        const existencia = await prisma.tarifa.findUnique({
            where: { id_tarifa: Number(id)},
          });
          if (!existencia) {
            return resp.status(501).json({"status":200,"message":"La Tarifa no existe en el sistema"});
          }
          else{
            const tarifa = await prisma.tarifa.update(
                {
                    where:{id_tarifa:Number(id)},
                    data:{
                        estado: datos.estado,
                        precio: datos.precio,
                        iva: datos.iva,
                        contratoId:datos.contratoId,
                        examenId: datos.examenId,
                        servicioId: datos.servicioId
                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"Tarifa actualizada en el sistema"});
          }
    }catch(error){
        console.log("Error en controller.tarifa.js :"+error);
        resp.status(500).json({ error: 'Error al actualizar la tarifa' });
    }  
}


export  const desactivarTarifaId=async(req,resp)=>{
    try{
        const id= await req.params.id_tarifa;
        const existencia = await prisma.tarifa.findUnique({
            where: { id_tarifa: Number(id)}
          });

          if (!existencia) {
            return resp.status(501).json({"status":501,"message":"La Tarifa no existe en el sistema"});
          }
          else{
            const tarifa= await prisma.tarifa.update(
                {
                    where:{id_tarifa:Number(id)},
                    data:{estado: 'Inactivo'}  
                }  
            );
            return resp.status(200).json({"status":200,"message":"Tarifa desactivada del sistema"});
        }

       
    }catch(error){
        console.log("Error en controller.tarifa.js :"+error);
        resp.status(500).json({ error: 'Error al desactivar la Tarifa' });
    }  
}


   