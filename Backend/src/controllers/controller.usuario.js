import JSONbig from 'json-bigint';
import prisma from '../libs/prisma.js'


export  const listarUsuarios=async(req,resp)=>{
    try{
        const usuarios = await prisma.usuario.findMany();
        return resp.status(200).send(JSONbig.stringify(usuarios));
    }catch(error){
        console.log("Error en controller.usuario.js :"+error);
    }
}

export  const buscarUsuarioId=async(req,resp)=>{
    try{
        const id= await req.params.id_usuario;
        const usuarios = await prisma.usuario.findFirst(
            {
                where: { id_usuario: Number(id) }
            }
        );
        return resp.status(200).send(JSONbig.stringify(usuarios));
    }catch(error){
        console.log("Error en controller.usuario.js :"+error);
    }
}

export  const registrarUsuario=async(req,resp)=>{
    try{
        const datos= await req.body;
        const usuario = await prisma.usuario.create(
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
                    tipo_usuario: datos.tipo_usuario,
                    municipio: datos.municipio,
                    eps:datos.eps, 
                    estado:datos.estado

                }
            } 
        );
        return resp.status(200).json({"status":200,"message":"Usuario registrado en el sistema"});
    }catch(error){
        console.log("Error en controller.usuario.js :"+error);
    }  
}

export  const actualizarUsuarioId=async(req,resp)=>{
    try{
        const datos= await req.body;
        const id= await req.params.id_usuario;
        const existencia = await prisma.usuario.findUnique({
            where: { id_usuario: Number(id)},
          });
          if (!existencia) {
            return resp.status(501).json({"status":200,"message":"El usuario no existe en el sistema"});
          }
          else{

            const usuario = await prisma.usuario.update(
                {
                    where:{id_usuario:Number(id)},
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
                                tipo_usuario: datos.tipo_usuario,
                                municipio: datos.municipio,
                                eps:datos.eps,
                                estado:datos.estado
                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"Usuario actualizado en el sistema"});
          }
    }catch(error){
        console.log("Error en controller.usuario.js :"+error);
    }  
}
export  const desactivarUsuarioId=async(req,resp)=>{
    try{
        const id= await req.params.id_usuario;
        const existencia = await prisma.usuario.findUnique({
            where: { id_usuario: Number(id)}
          });

          if (!existencia) {
            return resp.status(501).json({"status":501,"message":"El usuario no existe en el sistema"});
          }
          else{
            const usuario = await prisma.usuario.update(
                {
                    where:{id_usuario:Number(id)},
                    data:{estado: 'Inactivo'}  
                }  
            );
            return resp.status(200).json({"status":200,"message":"Usuario desactivado del sistema"});
        }

       
    }catch(error){
        console.log("Error en controller.usuario.js :"+error);
    }  
}


   