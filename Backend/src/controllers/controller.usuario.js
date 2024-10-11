import prisma from '../libs/prisma.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export  const validarUsuario=async(req,resp)=>{
    try {
        const { login, password } = req.body;
/*
        if (!email || !password) {
            return resp.status(400).json({"status":400,"message":"Es obligatorio un Usuario y un Password"});

        }
*/


        const existenciaLogin = await prisma.usuario.findFirst(
            {where: { email: login }
        }
        );
     
 
        if (!existenciaLogin) {
            return resp.status(403).json({"status":403,"message":"Usuario no autorizado"});
        }else{
            const passwordCorrecto  = await bcrypt.compare(password, existenciaLogin.password);
         
            if(passwordCorrecto){
                const token = jwt.sign(
                    { id: existenciaLogin.id, email: existenciaLogin.email, rol: existenciaLogin.rol }, // Datos que quieras incluir en el token
                    process.env.SECRET_TOKEN,
                    { expiresIn: '8h' } 
                );
    
                return resp.status(200).json({
                    "status": 200,
                    "message": "Login exitoso",
                    token,
                    user: { id: existenciaLogin.id,nombre:existenciaLogin.nombre ,email: existenciaLogin.email, rol: existenciaLogin.rol }
                });

            }else{
                return resp.status(403).json({"status":403,"message":"Usuario no autorizado"});
            }
           
           
          
        }

      
      

       

    } catch (error) {
        console.log("Error en controller.usuario.js :"+error);
        resp.status(500).json({ error: 'Error al validar usurio' });
    }
}



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
                    identificacion:identificacion,
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




