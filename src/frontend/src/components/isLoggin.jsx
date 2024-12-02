import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

import logout from '../img/logout.png';

const IsLoggin = () => {
  const {signout} = useAuth();
  const navigate = useNavigate();

  const username = localStorage.getItem('userName');

  return (
    <>
      <div className='logout-center'>
        <div className='logout-border' onClick={() => signout(() => navigate('/login', {replace: true}))}>
        <h1>You are already logged in</h1>
        <br></br>
        <h3>Press for logout:</h3>
          <Link to="#" >

              <img src={logout} alt="logout" className='icon'/> 
          </Link>
          <br></br>
          <h2>Current user: <span className='current-user'>{username}</span></h2>
        </div>
      </div>
    </>
  )
}

export { IsLoggin };
