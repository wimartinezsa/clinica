import React, { useState, useEffect, useContext } from "react";
import { Button, Input } from "@nextui-org/react";
import PacientesContext from "../../../context/PacientesContext"; // Importar el contexto
import Swal from 'sweetalert2'; // Importar SweetAlert2
import axiosClient from "../../../configs/axiosClient";

function FormPacientes({ initialData }) {
  const { registrarPaciente } = useContext(PacientesContext); // Usar el contexto
  //const { registrarPaciente } = useContext(PacientesContext); // Usar el contexto



  const [eps, setEps] = useState([]);
  const [selectedEps, setSelectEps] = useState('');
  const [tipo_identificacion, setTipo_identificacion] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [primer_nombre, setPrimerNombre] = useState("");
  const [segundo_nombre, setSegundoNombre] = useState("");
  const [primer_apellido, setPrimerApellido] = useState("");
  const [segundo_apellido, setSegundoApellido] = useState("");
  const [fecha_nacimiento, setSetFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("");
  const [email, setEmail] = useState("");
  const [tipo_paciente, setTipo_Paciente] = useState("");
  const [telefono, setTelefono] = useState("");

  const [municipio, setMunicipio] = useState([]);
  const [selectedMunicipio, setSelectMunicipio] = useState('');

  const [id_paciente, setId_Paciente] = useState(null);


  

 




  
  const [isEditing, setIsEditing] = useState(false);
 
  const [errors, setErrors] = useState({});



  

 
  useEffect(() => {
    const listarEps = async () => {
      try {
        const response = await axiosClient.get('/eps');
        //console.log(response);
        setEps(response.data);
      } catch (error) {
        console.error("Error al cargar eps:", error);
        setErrorMessage("Error al cargar eps. Intenta de nuevo más tarde.");
      }
    };
  
  
    const listarMunicipio = async () => {
      try {
        const response = await axiosClient.get('/municipio');
        setMunicipio(response.data);
        
      } catch (error) {
        console.error("Error al cargar municipios:", error);
        setErrorMessage("Error al cargar municipios. Intenta de nuevo más tarde.");
      }
    };
  
    listarEps();
    listarMunicipio();
  }, []);




  useEffect(() => {

    if (initialData) {
     
      setId_Paciente(initialData.id_paciente);
      setTipo_identificacion(initialData.tipo_identificacion || "");
      setIdentificacion(initialData.identificacion || "");
      setPrimerNombre(initialData.primer_nombre || "");
      setSegundoNombre(initialData.segundo_nombre || "");
      setPrimerApellido(initialData.primer_apellido || "");
      setSegundoApellido(initialData.segundo_apellido || "");
      setEmail(initialData.email || "");
      setTelefono(initialData.telefono || "");
      setTipo_Paciente(initialData.tipo_paciente || "");
      setId_Paciente(initialData.id_paciente); // Establecer el ID del
      setSexo(initialData.sexo); // Establecer el ID del

      const date = new Date(initialData.fecha_nacimiento);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
      const day = String(date.getDate()).padStart(2, '0');
      setSetFechaNacimiento(`${year}-${month}-${day}`); 
      
      setSelectEps(initialData.id_eps || "");
      setSelectMunicipio(initialData.id_municipio || "");
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [initialData]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiar errores previos
    setErrors({});

    const formData = {
      tipo_identificacion,
      identificacion,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      sexo,
      fecha_nacimiento,
      email,
      telefono,
      tipo_paciente,
      epsId: selectedEps,
      municipioId: selectedMunicipio
    };
  

    ///console.log("Campos enviados:", formData);
 

    try {
      if (isEditing) {
        // Actualizar el usuario
        console.log(formData);
        await axiosClient.put(`/paciente/${id_paciente}`, formData);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Usuario actualizado correctamente',
        });
      } else {
        // Registrar un nuevo usuario
        await registrarPaciente(formData);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Usuario registrado correctamente',
        });
      }

      // Puedes omitir la llamada a getPersonas ya que registrarInstructor ya actualiza la lista
    } catch (error) {
      console.error("Error del servidor:", error);
      const { response } = error;

      // Manejar errores específicos del backend
      if (response && response.data) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message || 'Error desconocido',
        });

        // Aquí puedes también actualizar el estado de errores si es necesario
        setErrors(response.data.errors || {});
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error del servidor: ' + error.message,
        });
      }
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-1">
        {isEditing ? "Actualizar Paciente" : "Registro de Pacientes"}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        
      <div className='relative py-1'>
        <select
          name="tipo_identificacion"
          value={tipo_identificacion}
          onChange={(e) => setTipo_identificacion(e.target.value)}
          className={`mt-4 h-14 rounded-xl bg-[#f4f4f5] p-2 ${errors.tipo_identificacion ? 'border-red-500' : ''}`}
          style={{ width: '385px' }}
        >
          <option value="Selecciona">Tipo de Identificación</option>
          
          <option value="CC">Cédula de Ciudadania</option>
          <option value="CE">Cédula Extranjera</option>
          <option value="CD">Carné diplomático</option>
          <option value="PA">Pasaporte</option>
          <option value="SC">Salvoconducto</option>
          <option value="PE"> Permiso Especial de Permanencia</option>
          <option value="RC">Registro Civil</option>
          <option value="TI">Tarjeta de Identidad</option>
          <option value="CN">Certificado de nacido vivo</option>
          <option value="AS">Adulto sin identificar</option>
          <option value="MS">Menor sin identificar</option>
          
         
          
          
        </select>
        {errors.tipo_identificacion && <p className="text-red-500">{errors.tipo_identificacion}</p>}

        </div>
        
        
        
        <div className='relative py-1'>
          <Input
            type="number"
            label='Identificación'
            id='identificacion'
            name="identificacion"
            className="w-96"
            value={identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
            required
            helperText={errors.identificacion} // Mostrar error si existe
            status={errors.identificacion ? 'error' : 'default'}
          />
        </div>

       


        <div className='relative py-1'>
          <Input
            type="text"
            label='Primer Nombre'
            id='primer_nombre'
            name="primer_nombre"
            className="w-96"
            value={primer_nombre}
            onChange={(e) => setPrimerNombre(e.target.value)}
            required
            helperText={errors.primer_nombre} // Mostrar error si existe
            status={errors.primer_nombre ? 'error' : 'default'}
          />
        </div>


        <div className='relative py-1'>
          <Input
            type="text"
            label='Segundo Nombre'
            id='segundo_nombre'
            name="segundo_nombre"
            className="w-96"
            value={segundo_nombre}
            onChange={(e) => setSegundoNombre(e.target.value)}
            required
            helperText={errors.segundo_nombre} // Mostrar error si existe
            status={errors.segundo_nombre ? 'error' : 'default'}
          />
        </div>


        <div className='relative py-1'>
          <Input
            type="text"
            label='Primer Apellido'
            id='primer_apellido'
            name="primer_apellido"
            className="w-96"
            value={primer_apellido}
            onChange={(e) => setPrimerApellido(e.target.value)}
            required
            helperText={errors.primer_apellido} // Mostrar error si existe
            status={errors.primer_apellido ? 'error' : 'default'}
          />
        </div>

        

       
        <div className='relative py-1'>
          <Input
            type="text"
            label='Segundo Apellido'
            id='segundo_apellido'
            name="segundo_apellido"
            className="w-96"
            value={segundo_apellido}
            onChange={(e) => setSegundoApellido(e.target.value)}
            required
            helperText={errors.segundo_apellido} // Mostrar error si existe
            status={errors.segundo_apellido ? 'error' : 'default'}
          />
        </div>


        <div className='relative py-1'>
          <Input
            type="date"
            label='Fecha de Namiento'
            id='fecha_nacimiento'
            name="fecha_nacimiento"
            className="w-96"
            value={fecha_nacimiento}
            onChange={(e) => setSetFechaNacimiento(e.target.value)}
            required
            helperText={errors.fecha_nacimiento} // Mostrar error si existe
            status={errors.fecha_nacimiento ? 'error' : 'default'}
          />
        </div>

       
        <div className='relative py-1'>
        <select
          name="sexo"
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          className={`mt-4 h-14 rounded-xl bg-[#f4f4f5] p-2 ${errors.sexo ? 'border-red-500' : ''}`}
          style={{ width: '385px' }}
        >
          <option value="" disabled={true} >Seleccione el genero</option>
          <option value="Femenino">Femenino</option>
          <option value="Masculino">Masculino</option>
          <option value="Indeterminado">Indeterminado</option>
        
        </select>
        {errors.tipo_identificacion && <p className="text-red-500">{errors.tipo_identificacion}</p>}

        </div>
        



        <div className='relative py-1'>
          <Input
            type="email"
            label='Correo Electrónico'
            id='email'
            name="email"
            className="w-96"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            helperText={errors.email} // Mostrar error si existe
            status={errors.email ? 'error' : 'default'}
          />
        </div>


        <div className='relative py-1'>
          <Input
            type="number"
            label='Teléfono'
            id='telefono'
            name="telefono"
            className="w-96"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            helperText={errors.telefono} // Mostrar error si existe
            status={errors.telefono ? 'error' : 'default'}
          />
        </div>

        

        <select
          name="tipo_paciente"
          value={tipo_paciente}
          onChange={(e) => setTipo_Paciente(e.target.value)}
          className={`mt-4 h-14 rounded-xl bg-[#f4f4f5] p-2 ${errors.tipo_paciente ? 'border-red-500' : ''}`}
          style={{ width: '385px' }}
        >

          <option value="Selecciona" disabled={true} >Selecciona un Tipo de Paciente</option>
          <option value="Subsidiado">Subsidiado</option>
          <option value="Vinculado">Vinculado</option>
          <option value="Particular">Particular</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.tipo_paciente && <p className="text-red-500">{errors.tipo_paciente}</p>}


        
        <select
          className="mt-4 h-14 rounded-xl bg-[#f4f4f5] p-2 ${errors.eps ? 'border-red-500' : ''}"
          id="municipio"
          name="municipio"
          value={selectedMunicipio}
          onChange={(e) =>{ 
            setSelectMunicipio(e.target.value)
          }
          }
          required
        >
          
          <option value="" disabled={true} >Seleccione un Municipio</option>
          { municipio.map((option) => (
            <option key={option.id_municipio} value={option.id_municipio}> {option.nombre }</option>
          ))
          
          }
         
          
        </select>


        <select
          className="mt-4 h-14 rounded-xl bg-[#f4f4f5] p-2 ${errors.eps ? 'border-red-500' : ''}"
          id="eps"
          name="eps"
          value={selectedEps}
          onChange={(e) =>{ 
            setSelectEps(e.target.value)
          }
          }
          required
        >
         
        
          <option value="" disabled={true} >Selecciona una Eps</option>
          { eps.map((option) => (
            <option key={option.id_eps} value={option.id_eps}> {option.nombre }</option>
          ))
          
          }
        </select>



        <div className="flex justify-end gap-5 mt-5">
          <Button className="bg-[#0d324c] text-white" type="submit" color="success">
            {isEditing ? "Actualizar" : "Registrar"}
          </Button>
        </div>

      </form>
    </div>
  );
}

export default FormPacientes;
