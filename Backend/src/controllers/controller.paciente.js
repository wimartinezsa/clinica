import JSONbig from 'json-bigint';
import prisma from '../libs/prisma.js'


export  const listarPacientes=async(req,resp)=>{
    try{
        const paciente = await prisma.paciente.findMany(
            {
                include:{
                    eps:true,
                    municipio:true
                }
            }
        );
        return resp.status(200).send(JSONbig.stringify(paciente));
    }catch(error){
        console.log("Error en controller.paciente.js :"+error);
        resp.status(500).json({ error: 'Error al listar los paciente' });
    }
}

export  const buscarPacienteId=async(req,resp)=>{
    try{
        const id= await req.params.id_paciente;
        const paciente = await prisma.paciente.findFirst(
            {
                where: { id_paciente: Number(id) },
                include:{
                    eps:true,
                    municipio:true
                }
            }
        );
        return resp.status(200).send(JSONbig.stringify(paciente));
    }catch(error){
        console.log("Error en controller.paciente.js :"+error);
        resp.status(500).json({ error: 'Error al buscar el paciente' });
    }
}

export  const registrarPaciente=async(req,resp)=>{
    try{
        const datos= await req.body;
        const paciente = await prisma.paciente.create(
            {
                data: {
                    tipo_identificacion: datos.tipo_identificacion,
                    identificacion: datos.identificacion,
                    primer_nombre: datos.primer_nombre,
                    segundo_nombre: datos.segundo_nombre,
                    primer_apellido: datos.primer_apellido,
                    segundo_apellido: datos.segundo_apellido,
                    fecha_nacimiento: datos.fecha_nacimiento,
                    sexo: datos.sexo,
                    email: datos.email,
                    telefono:datos.telefono,
                    tipo_paciente: datos.tipo_paciente,
                    municipioId: datos.municipioId,
                    epsId:datos.epsId, 
                    estado:datos.estado

                }
            } 
        );
        return resp.status(200).json({"status":200,"message":"paciente registrado en el sistema"});
    }catch(error){
        console.log("Error en controller.paciente.js :"+error);
        resp.status(500).json({ error: 'Error al registrar el paciente' });
       
    }  
}

export  const actualizarPacienteId=async(req,resp)=>{
    try{
        const datos= await req.body;
        const id= await req.params.id_paciente;
        const existencia = await prisma.paciente.findUnique({
            where: { id_paciente: Number(id)},
          });
          if (!existencia) {
            return resp.status(501).json({"status":200,"message":"El usuario no existe en el sistema"});
          }
          else{

            const paciente = await prisma.paciente.update(
                {
                    where:{id_paciente:Number(id)},
                    data:{
                                tipo_identificacion: datos.tipo_identificacion,
                                identificacion: datos.identificacion,
                                primer_nombre: datos.primer_nombre,
                                segundo_nombre: datos.segundo_nombre,
                                primer_apellido: datos.primer_apellido,
                                segundo_apellido: datos.segundo_apellido,
                                fecha_nacimiento: datos.fecha_nacimiento,
                                sexo: datos.sexo,
                                email: datos.email,
                                telefono:datos.telefono,
                                tipo_paciente: datos.tipo_paciente,
                                municipioId: datos.municipioId,
                                epsId:datos.epsId,
                                estado:datos.estado
                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"Usuario actualizado en el sistema"});
          }
    }catch(error){
        console.log("Error en controller.paciente.js :"+error);
        resp.status(500).json({ error: 'Error al actualizar el paciente' });
    }  
}



export  const desactivarPacienteId=async(req,resp)=>{
    try{
        const id= await req.params.id_paciente;
        const existencia = await prisma.paciente.findUnique({
            where: { id_paciente: Number(id)}
          });

          if (!existencia) {
            return resp.status(501).json({"status":501,"message":"El usuario no existe en el sistema"});
          }
          else{
            const paciente = await prisma.paciente.update(
                {
                    where:{id_paciente:Number(id)},
                    data:{estado: 'Inactivo'}  
                }  
            );
            return resp.status(200).json({"status":200,"message":"Paciente desactivado del sistema"});
        }

       
    }catch(error){
        console.log("Error en controller.paciente.js :"+error);
        resp.status(500).json({ error: 'Error al desactivar el Paciente' });
    }  
}


   