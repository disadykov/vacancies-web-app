import { Link } from 'react-router-dom'

const UserOrCompany = () => {
  return (
    <div className="user-company">
      <h1 className="display-1"> How do you want to register?</h1>
      <div>
        <Link to="/company-signup" ><button className="btn btn-primary btn-lg display btn-choise"> <h3>Employer</h3></button></Link>
        <Link to="/signup" ><button className="btn btn-primary btn-lg display btn-choise"><h3>Applicant</h3></button></Link>
      </div>
      <div className="display-6 exist">
        I already have an account&nbsp; &nbsp; 
        <Link to="/login" >Sign in</Link>
      </div>

      
    </div>
  )
}

export { UserOrCompany } ;
