import { useLocation, Navigate } from "react-router-dom";
// import { useAuth } from "../hook/useAuth"

const RequireAuth = ({children}) => {
  const location = useLocation();

  //const {user} = useAuth();
  const isLogin = localStorage.getItem('isLogin');
  
  if (!isLogin) {
    return <Navigate to='/login' state={{from: location}} />;
  }

  return children;

}

export { RequireAuth };