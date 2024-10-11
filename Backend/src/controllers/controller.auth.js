import prisma from '../libs/prisma.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export  const loginUser=async(req,resp)=>{
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return resp.status(400).json({"status":400,"message":"Es obligatorio un Usuario y un Password"});
          
        }

        const existenciaLogin = await prisma.usuario.findFirst(
            {where: {
                     email: email
                    }
            }
        );

        if (!existenciaLogin) {
          
            return resp.status(403).json({"status":403,"message":"Login no autorizado"});
        }

   
     

        const compararPassword = await bcrypt.compare(password, validarEmail.password)

        const existenciaUsuario = await prisma.usuario.findFirst(
            {where: {
                     password: compararPassword.password
                    }
            }
        );

        if (!existenciaUsuario) {
          
            return resp.status(403).json({"status":403,"message":"Usuario no autorizado"});
        }

        const token =  jwt.sign(user, process.env.SECRET_TOKEN, { expiresIn: '8h'})
        
        return res.json({
            token,
            user: existenciaUsuario
        })

    } catch (error) {
        console.log("Error en controller.auth.js :"+error);
        resp.status(500).json({ error: 'Error al validar usurio' });
    }
}



export  const registrarUsuario=async(req,resp)=>{
    try {
      
        const { identificacion,nombre, email, password,rol,cargo} = req.body;
      /*
        if (!identificacion || !nombre || !email || !password || !rol || !cargo) {
            return resp.status(400).json({"status":400,"message":"Todos los datos son obligatorio"});
        }
*/


        const existenciaLogin = await prisma.usuario.findFirst(
            {where: {
                     email: email
                    }
            }
        );

   

        if (existenciaLogin) {
            return resp.status(403).json({"status":403,"message":"El email ya se encuentra registrado"});

        }else{

           
            const encriptPassword = bcrypt.hashSync(String(password), 12)
            
            
           const usuario=  prisma.usuario.create({
                data: {
                    identificacion:identificacion,
                    nombre: nombre,
                    email: email,
                    password: encriptPassword,
                    rol: rol,
                    cargo:cargo
                }
            })
            
           if(usuario){
            return resp.status(200).json({"status":200,"message":"Usuario registrado en el sistema"});

           }
         
        

    }

       




    } catch (error) {
        console.log("Error en controller.auth.js :"+error.message);
        resp.status(500).json({ error: 'Error al validar usuario' });
    }
}




