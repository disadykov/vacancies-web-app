import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useAuth } from "../hook/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState(false);

  const {signin} = useAuth();

  const fromPage = location.state?.from?.pathname || "/";

  const isUser = localStorage.getItem('userName');

  useEffect(() => {
    if(isUser !== null) {
      navigate("/isloggin");
    } 
  });

  function getUsers() {
    fetch('http://localhost:3001/api/users')
    .then(response => {
      return response.json();
    })
    .then(data => {
      
      setUsers(data);
    });
  }

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const username = form.username.value;
    const InputPassword = form.InputPassword.value;

    const result = users.filter(function(el){
      return el.userName === username; 
    });
    
    if (result.length === 0) {
       alert("User not found! try again!");

       form.InputPassword.value = "";
       form.username.value = "";
    } else {
      const getPassword = result[0].password;
      if (InputPassword === getPassword) {
        signin(username, () => navigate(fromPage));
        localStorage.setItem("isCompany", result[0].isCompany);
        localStorage.setItem("companyName", result[0].companyName);
        localStorage.setItem("userID", result[0].id);
      } else {
        alert("Password is incorrect! try again!");
        form.InputPassword.value = "";
      }
    }
  }

  return (
      <div className="login-form">
          <form className="form-border" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">login</label>
              <input type="text" className="form-control" id="username" name="username" />
            </div>
            <div className="mb-3">
              <label htmlFor="InputPassword" className="form-label">password</label>
              <input type="password" className="form-control" id="InputPassword" name="InputPassword"/>
            </div>
            <div>
              New to BestVacancies?&nbsp; 
              <Link to="/userorcompany" >Create an account</Link>
            </div>
            <div className="btn-login">
              <button className="btn btn-outline-dark" type="submit">Sign in</button>
            </div>
            
          </form>
      </div>
      
  );

}

export {Login};

