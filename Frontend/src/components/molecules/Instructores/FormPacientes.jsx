import React, { useState, useEffect, useContext } from "react";
import { Button, Input } from "@nextui-org/react";
import PersonasContext from "../../../context/PersonasContext"; // Importar el contexto
import Swal from 'sweetalert2'; // Importar SweetAlert2
import axiosClient from "../../../configs/axiosClient";

function FormPacientes({ initialData }) {
  const { registrarInstructor } = useContext(PersonasContext); // Usar el contexto
  const [eps, setEps] = useState([]);
  const [selectedEps, setSelectEps] = useState('');
  const [tipo_identificacion, setTipo_identificacion] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [primer_nombre, setPrimerNombre] = useState("");
  const [segundo_nombre, setSegundoNombre] = useState("");
  const [primer_apellido, setPrimerApellido] = useState("");
  const [segundo_apellido, setSegundoApellido] = useState("");
  const [sexo, setSexo] = useState("");
  const [correo, setCorreo] = useState("");
  const [tipo_paciente, setTipo_Paciente] = useState("");
  const [telefono, setTelefono] = useState("");

  const [id_paciente, setId_Paciente] = useState(null);


  

 




  
  const [isEditing, setIsEditing] = useState(false);
 
  const [errors, setErrors] = useState({});

  useEffect(() => {
    
    const fetchEps = async () => {
      try {
        const response = await axiosClient.get('/eps');
        //console.log(response);
        setEps(response.data);
      } catch (error) {
        console.error("Error al cargar eps:", error);
        setErrorMessage("Error al cargar eps. Intenta de nuevo más tarde.");
      }
    };

    fetchEps();
  }, []);

  useEffect(() => {
    if (initialData) {

      setTipo_identificacion(initialData.tipo_identificacion || "");
      setIdentificacion(initialData.identificacion || "");
      setPrimerNombre(initialData.primer_nombre || "");
      setSegundoNombre(initialData.segundo_nombre || "");
      setPrimerApellido(initialData.primer_apellido || "");
      setSegundoApellido(initialData.segundo_apellido || "");
      setCorreo(initialData.email || "");

      setTelefono(initialData.telefono || "");
      
      setTipo_Paciente(initialData.tipo_paciente || "");
    
      
     setId_Paciente(initialData.id_paciente); // Establecer el ID del

     setSexo(initialData.sexo); // Establecer el ID del
      
     setSelectEps(initialData.id_eps || "");

     

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
      identificacion,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      correo,
      telefono,
      eps: selectedEps
    };
    console.log(formData);

/*     console.log("Campos enviados:", formData);
 */

    try {
      if (isEditing) {
        // Actualizar el usuario
        await axiosClient.put(`/paciente/${idPersona}`, formData);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Usuario actualizado correctamente',
        });
      } else {
        // Registrar un nuevo usuario
        await registrarInstructor(formData);
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
        {isEditing ? "Actualizar Instructor" : "Registro de Pacientes"}
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
        <select
          name="sexo"
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          className={`mt-4 h-14 rounded-xl bg-[#f4f4f5] p-2 ${errors.sexo ? 'border-red-500' : ''}`}
          style={{ width: '385px' }}
        >
          <option value="" disabled='false'>Seleccione un opción</option>
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
            id='correo'
            name="correo"
            className="w-96"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            helperText={errors.correo} // Mostrar error si existe
            status={errors.correo ? 'error' : 'default'}
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
          <option value="Selecciona">Selecciona un Tipo de Paciente</option>
          <option value="Subsidiado">Subsidiado</option>
          <option value="Vinculado">Vinculado</option>
          <option value="Particular">Particular</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.tipo_paciente && <p className="text-red-500">{errors.tipo_paciente}</p>}

        

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
          <option value="">Selecciona una Eps</option>
          
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
