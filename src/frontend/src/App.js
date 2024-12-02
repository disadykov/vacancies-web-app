import { Routes, Route, Navigate} from 'react-router-dom';

import { Vacancies } from './pages/Vacancies';
import { VacanciesID } from './pages/VacanciesID';
import { MyVacancies } from './pages/MyVacancies';
import { ActiveVacancies } from './pages/ActiveVacancies';
import { ActiveVacanciesID } from './pages/ActiveVacanciesID';
import { CreateVacancy } from './pages/CreateVacancy';
import { Signup } from './pages/Signup';
import { CompanySignup } from './pages/CompanySignup';
import { NotfoundPage } from './pages/NotfoundPage';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { UserOrCompany } from './pages/UserOrCompany';
import { IsLoggin } from './components/isLoggin';

import { RequireAuth } from './hoc/RequireAuth';
import { AuthProvider } from './hoc/AuthProvider';

import './css/app.css';

function App() {

  return (
    <AuthProvider> 
      <div className='main-container'>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="userorcompany" element={<UserOrCompany />} />
            <Route path="signup" element={<Signup />} />
            <Route path="company-signup" element={<CompanySignup />} />
            <Route path="isloggin" element={<IsLoggin />} />
            
            <Route path='/' element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
             
            }>
              <Route path='/' element={<Navigate to="/vacancies" replace/>} />
              <Route path="vacancies" element={<Vacancies />} />
              <Route path="vacancies/:id" element={
                <div className='ViewVacancy'>
                  <div className="vacncy-list">
                    <Vacancies />
                  </div>
                  <div className='VacancyID'>
                    <VacanciesID />
                  </div>
                </div>
              } />          
              <Route path="my-vacancies" element={<MyVacancies />} />
              <Route path="active-vacancies" element={<ActiveVacancies />} />
              <Route path="active-vacancies/:id" element={
                <div className='ViewVacancy'>
                  <div className="vacncy-list">
                  <ActiveVacancies />
                  </div>
                  <div className='VacancyID'>
                  <ActiveVacanciesID />
                  </div>
                </div>
              } /> 
              <Route path="create-vacancy" element={<CreateVacancy />} />
              <Route path="*" element={<NotfoundPage />} />
            </Route>
          </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
