
import prisma from '../libs/prisma.js'


export  const listarEmpresas=async(req,resp)=>{
    try{
        const empresas = await prisma.Empresa.findMany();
        return resp.status(200).json(empresas);
    }catch(error){
        console.log("Error en controller.empresa.js :"+error);
    }
}


export  const buscarEmpresaId=async(req,resp)=>{
    try{
        const id= await req.params.id_empresa;
        const empresa = await prisma.Empresa.findFirst(
            {
                where: { id_empresa: Number(id) }
            }
        );
        return resp.status(200).json(empresa);
    }catch(error){
        console.log("Error en controller.empresa.js :"+error);
    }
}

export  const registrarEmpresa=async(req,resp)=>{
    try{
        const datos= await req.body;
        const empresa = await prisma.Empresa.create(
            {
                data: {
                    nit:datos.nit,
                    codigo:datos.codigo,
                    nombre: datos.nombre,
                    sigla:datos.sigla,
                    tipo:datos.tipo,
                    estado:datos.estado,
                    municipio:datos.municipio
                }
            } 
        );
        return resp.status(200).json({"status":200,"message":"La empresa se registro en el sistema"});
    }catch(error){
        console.log("Error en controller.empresa.js :"+error);
    }  
}

export  const actualizarEmpresaId=async(req,resp)=>{
    try{
        const datos= await req.body;
        const id= await req.params.id_empresa;
        const existencia = await prisma.Empresa.findUnique({
            where: { id_empresa: Number(id)},
          });
          if (!existencia) {
            return resp.status(501).json({"status":200,"message":"La empresa no existe en el sistema"});
          }
          else{
            const empresa = await prisma.Empresa.update(
                {
                    where:{id_empresa:Number(id)},
                    data:{
                            nit:datos.nit,
                            codigo:datos.codigo,
                            nombre: datos.nombre,
                            sigla:datos.sigla,
                            tipo:datos.tipo,
                            estado:datos.estado,
                            municipio:datos.municipio
                    }
                }  
            );
            return resp.status(200).json({"status":200,"message":"EMpresa actualizada en el sistema"});
          }
    }catch(error){
        console.log("Error en controller.empresa.js :"+error);
    }  
}

export  const desactivarEmpresaId=async(req,resp)=>{
    try{
        const id= await req.params.id_empresa
        const existencia = await prisma.empresa.findUnique({
            where: {id_empresa: Number(id)}
          });
          if (!existencia) {
            return resp.status(501).json({"status":501,"message":"La empresa no existe en el sistema"});
          }
          else{
            const empresa = await prisma.Empresa.update(
                {
                    where:{id_empresa:Number(id)},
                    data:{estado: 'Inactivo'}  
                }  
            );
            return resp.status(200).json({"status":200,"message":"La empresa se desactivo del sistema"});
        }
    }catch(error){
        console.log("Error en controller.empresa.js :"+error);
    }  
}


   