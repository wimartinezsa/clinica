import prisma from '../libs/prisma.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export  const validarUsuario=async(req,resp)=>{
    try {
        const { login, password } = req.body;
        

        if (!login || !password) {
            return resp.status(400).json({"status":400,"message":"Es obligatorio un Usuario y un Password"});
        }

        const existenciaLogin = await prisma.usuario.findFirst(
            {where: { email: login }
        }
        );


        console.log( req.body);
     
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
