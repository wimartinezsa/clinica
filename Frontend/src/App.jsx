import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Users, BookMarked, BookUser, Building2, GraduationCap, FolderSearch2, UserCheck, BookText, BarChart3Icon } from 'lucide-react';
import Sidebar, { SidebarItem, SidebarAccordion } from './components/molecules/Menu/Sidebar.jsx';
import { LoginPage } from '../src/components/pages/LoginPage';
import { Navbar2 } from './components/molecules/Menu/Navbar.jsx';
import GlobalProvider from './context/GlobalContext';
import ProtectedRoute from './configs/ProtectedRoute.jsx';

// Importa las páginas directamente

import FichasPage from './components/pages/FichasPage.jsx';
import NominaPage from './components/pages/PacientePage.jsx';
import MatriculasPage from './components/pages/MatriculasPage.jsx';

import SeguimientoPage from './components/pages/SeguimientoPage.jsx';
import EtapaPracticaPage from './components/pages/EtapaPracticaPage.jsx';
import HomePage from './components/pages/HomePage.jsx';
import ReportesPage from './components/pages/ReportesPage.jsx';
import Registro from './components/pages/RegistroPage.jsx';

export const App = () => {
  return (
    <BrowserRouter>
      <GlobalProvider>

        <Routes>
          <Route path='/' element={
            <LoginPage />
          } />

          
          <Route path='/registro' element={
            <Registro />
          } />
          <Route path="/home" element={
            <ProtectedRoute>
              <WithSidebar>
                <HomePage />
              </WithSidebar>
            </ProtectedRoute>
          }
          />

          <Route path="/pacientes" element={
            <ProtectedRoute>
              <WithSidebar>
                <NominaPage />
              </WithSidebar>
            </ProtectedRoute>

          } />

          <Route path="/fichas" element={
            <ProtectedRoute>
              <WithSidebar>
                <FichasPage />
              </WithSidebar>
            </ProtectedRoute>
          } />

          <Route path="/matriculas" element={
            <ProtectedRoute>
              <WithSidebar>
                <MatriculasPage />
              </WithSidebar>
            </ProtectedRoute>
          } />


       

          <Route path="/etapapractica" element={
            <ProtectedRoute>
              <WithSidebar>
                <EtapaPracticaPage />
              </WithSidebar>
            </ProtectedRoute>

          } />

          <Route path="/seguimiento" element={
            <ProtectedRoute>
              <WithSidebar>
                <SeguimientoPage />
              </WithSidebar>
            </ProtectedRoute>
          } />

        

          <Route path="/reportes" element={
            <ProtectedRoute>
              <WithSidebar>
                <ReportesPage />
              </WithSidebar>
              </ProtectedRoute>
              } />

        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
};

export function WithSidebar({ children }) {
  const [userRole, setUserRole] = useState(null);
  const [userRol, setUserRol] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserRole(user.cargo);
        setUserRol(user.rol);
      } catch (error) {
        console.error("Error al parsear el JSON del usuario:", error);
      }
    }
  }, []);


  return (
    <div className="flex ">
      <Sidebar>
        <SidebarItem nav="/home" icon={<Home size={20}/>} text="Inicio" />
        {(userRole !== 'Instructor' && userRole !== 'Aprendiz') && (
          <SidebarItem nav="/pacientes" icon={<Users size={20} />} text="Pacientes" />
        )}
         {(userRole !== 'Aprendiz' && userRole !== 'Instructor') && (
          <SidebarItem nav="/matriculas" icon={<BookUser size={20} />} text="Estudios" />
        )}
       
       <SidebarItem nav="/seguimiento" icon={<FolderSearch2 size={20} />} text="Contratos" />
       
        {(userRole !== 'Aprendiz' && userRole !== 'Instructor') && (
          <SidebarItem nav="/etapapractica" icon={<GraduationCap size={20} />} text="Servicios" />
        )}
      {(userRole !== 'Aprendiz' && userRole !== 'Instructor') && (
          <SidebarItem nav="/fichas" icon={<BookMarked size={20} />} text="Configuraciones" />
        )}

      
       
      </Sidebar>
      <div className="w-full bg-white h-screen overflow-auto">
        <Navbar2 />
        {children}
      </div>
    </div>
  );
}