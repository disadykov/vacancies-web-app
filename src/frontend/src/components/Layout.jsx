import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

import '../css/app.css';
import createvacancy from '../img/create.png';
import vacancies from '../img/vacancies.png';
import myvacancies from '../img/myvacancies.png';
import activevacancies from '../img/active.png';
import logout from '../img/logout.png';

const Layout = () => {
  const {signout} = useAuth();
  const navigate = useNavigate();

  const isCompany = JSON.parse(localStorage.getItem('isCompany'));
  const username = localStorage.getItem('userName');

  return (
    <>
      <div className="vertical-menu">
        <NavLink to="/vacancies">
          <div className='menu-item'>
            <img src={vacancies} alt="vacancies" className='icon'/>
            <div>Vacancies</div>
          </div>
        </NavLink>

        <>
          {!isCompany ?                  
            <NavLink to="/my-vacancies">
              <div className='menu-item'>
                <img src={myvacancies} alt="myvacancies" className='icon'/>
                <div>My vacancies</div>
              </div>       
            </NavLink> : '' 
          }
        </>
        
        <>
          {isCompany ? 
            <NavLink to="/active-vacancies">
            <div className='menu-item'>
              <img src={activevacancies} alt="activevacancies" className='icon'/>
              <div>Active vacancies</div>
            </div>        
          </NavLink> : ''
          }
        </>

        <>
          {isCompany ? 
            <NavLink to="/create-vacancy">
              <div className='menu-item'>
                <img src={createvacancy} alt="createvacancy" className='icon'/>
                <div>Create vacancy</div>
              </div>
            </NavLink> : ''
          }
        </>

        <div className='logout' onClick={() => signout(() => navigate('/login', {replace: true}))}>
          <Link to="#" className='logout'>
            <div className='menu-item'>
              <img src={logout} alt="logout" className='icon'/>
              <div>logout</div>
              <br></br>
              <div><h6>Current user: <span className='current-user'>{username}</span></h6> </div>
            </div>
            
          </Link>
        </div>
        
      </div>
    
      <div className="App">
        <Outlet />
      </div>
    </>
  )
}

export { Layout };
