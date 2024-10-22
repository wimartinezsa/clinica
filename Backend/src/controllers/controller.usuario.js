import prisma from '../libs/prisma.js'
import bcrypt from 'bcryptjs';



export  const registrarUsuario=async(req,resp)=>{
    try {
      
        const { identificacion,nombre, email, password,rol,cargo} = req.body;
      /*
        if (!identificacion || !nombre || !email || !password || !rol || !cargo) {
            return resp.status(400).json({ "status": 400, "message": "Todos los datos son obligatorios" });
        }
*/

        const existenciaUsuario = await prisma.usuario.findFirst(
            {where: {
                OR:[{email: email},
                    {identificacion:identificacion }
               ]
                     
                    }
            }
        );
      
   
        if (!existenciaUsuario) {

            const encriptPassword = bcrypt.hashSync(String(password), 12)
            const usuario=await  prisma.usuario.create({
                data: {
                    identificacion:String(identificacion),
                    nombre: nombre,
                    email: email,
                    password: encriptPassword,
                    rol: rol,
                    cargo:cargo
                }
            })
            
           if(!usuario){
            return resp.status(200).json({"status":200,"message":"Usuario no registrado en el sistema"});

           }else{
            return resp.status(200).json({"status":200,"message":"Usuario registrado en el sistema"});
           }
        }else{
            return resp.status(403).json({"status":403,"message":"La identificación o el  email ya se encuentra registrado"});
    }

       




    } catch (error) {
        console.log("Error en controller.usuario.js :"+error.message);
        resp.status(500).json({ error: 'Error al validar usuario' });
    }
}


export  const actualizarUsuarioId=async(req,resp)=>{
    try{
        const datos= await req.body;
        const id= await req.params.id_usuario;
      

        const existencia = await prisma.usuario.findUnique({
            where: {id_usuario: Number(id)},
          });
          //console.log(existencia);

          if (!existencia) {
            return resp.status(501).json({"status":200,"message":"El Usuario no existe en el sistema"});
          }
          else{
           
            const encriptPassword = bcrypt.hashSync(String(datos.identificacion), 12);
         
            const usuario = await prisma.usuario.update(
                {
                    where:{id_usuario:Number(id)},
                    data:{
                        identificacion:String(datos.identificacion),
                        nombre: datos.nombre,
                        email: datos.email,
                        password: encriptPassword,
                        rol: datos.rol,
                        cargo:datos.cargo
                    }
                }  

                


            );
            return resp.status(200).json({"status":200,"message":"Usuario actualizado en el sistema"});
            
          }

          
    }catch(error){
        console.log("Error en controller.usuario.js :"+error);
        resp.status(500).json({ error: 'Error al actualizar el Usuario' });
    }  
}



export  const buscarUsuarioId=async(req,resp)=>{
    try{
        const id= await req.params.id_usuario;
        const usuario = await prisma.usuario.findUnique({
            where: {id_usuario: Number(id)},
            select:{
                id_usuario:true,
                identificacion:true,
                nombre:true,
                cargo:true,
                rol:true,
                email:true,
                estado:true
            }
          });
       resp.status(200).json(usuario);
          
    }catch(error){
        console.log("Error en controller.usuario.js :"+error);
        resp.status(500).json({ error: 'Error al buscar el Usuario' });
    }  
}

