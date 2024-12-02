import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


function CompanySignup() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(false);

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

  function createUser(userName, password, isCompany, companyName, createdAt, updatedAt) {
    fetch('http://localhost:3001/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userName, password, isCompany, companyName, createdAt, updatedAt}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert("The user has been successfully created!");
        getUsers();
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const RepeatPassword = form.RepeatPassword.value;
    const password = form.InputPassword.value;
    const companyname = form.companyname.value;
    const username = form.username.value;

    const result = users.filter(function(el){
      return el.userName === username; 
    });

    if (result.length === 0) {
      if (RepeatPassword === "" || password === "" || username ==="" || companyname === "") {
        alert("Please fill in all the fields!");
        form.InputPassword.value = "";
        form.username.value = "";
        form.RepeatPassword.value = "";
        form.companyname.value = "";
      } else {
        if (RepeatPassword !== password) {
          alert("Passwords do not match!");
        } else {
           const Data = Date();
           console.log(Data);
           createUser(username, password, true, companyname, Date, Date);
           navigate("/login");
        }
      }
      } else {
          alert("There is already such a user! Choose a different username!");
          form.InputPassword.value = "";
          form.username.value = "";
          form.RepeatPassword.value = "";
          form.companyname.value = "";
       }
  
  }

  return (
    <div className="login-form" onSubmit={handleSubmit}>
      <form className="form-border">
      <div className="mb-3">
          <label htmlFor="companyname" className="form-label">company name</label>
          <input type="text" className="form-control" id="companyname" name="companyname"/>
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">login</label>
          <input type="text" className="form-control" id="username" name="username"/>
        </div>
        <div className="mb-3">
          <label htmlFor="InputPassword" className="form-label">password</label>
          <input type="password" className="form-control" id="InputPassword" name="InputPassword"/>
        </div>
        <div className="mb-3">
          <label htmlFor="RepeatPassword" className="form-label">repeat password</label>
          <input type="password" className="form-control" id="RepeatPassword" name="RepeatPassword"/>
        </div>
        <div>
          Already have an account?&nbsp; 
          <Link to="/login" >Sign in</Link>
        </div>
        <div className="btn-login">
          <button className="btn btn-outline-dark" type="submit">Sign up</button>
        </div>
      
      </form>
  </div>
  )

}

export {CompanySignup};