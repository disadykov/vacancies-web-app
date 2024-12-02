import { Link } from "react-router-dom";
function NotfoundPage() {
  return (
      <div className="alert alert-danger" role="alert">
          <p>This page does not exist. Go <Link to="/">home</Link></p>
      </div>
  )

}

export { NotfoundPage };