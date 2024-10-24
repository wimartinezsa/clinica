import React, { createContext, useState, useEffect } from "react";
import axiosClient from "../configs/axiosClient";

// Crear el contexto
const PacientesContext = createContext();

export const PersonasProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga
  const [error, setError] = useState(null); // Para manejar errores


  // Función para obtener la lista de personas

  
  const getPacientes = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/paciente");
      setPacientes(response.data);
    } catch (error) {
      console.error("Error al obtener personas:", error);
      setError("Error al obtener la lista de personas.");
    } finally {
      setLoading(false);
    }
  };


  // Función para registrar un nuevo instructor
  const registrarPaciente = async (formData) => {
    //console.log(formData);
    setLoading(true);
    try {
      const response = await axiosClient.post("/paciente", formData);
     setPacientes((prevPacientes) => [...prevPacientes, response.data]); // Actualiza el estado con el nuevo instructor
     // setPacientes(response.data);
     //setAprendices((prevAprendices) => [...prevAprendices, response.data]); // Actualiza el estado con el nuevo aprendiz
      
      
      //console.log(response.data);
    } catch (error) {
      console.error("Error al registrar paciente:", error);
      setError("Error al registrar el instructor.");
      throw error; // Opcional: lanzar el error si quieres manejarlo en otro lugar
    } finally {
      setLoading(false);
    }
  };



  // Cargar las personas cuando el componente se monta

  
  useEffect(() => {
    getPacientes();
  }, []);
  

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        getPacientes,
        registrarPaciente,
        loading,
        error,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export default PacientesContext;
