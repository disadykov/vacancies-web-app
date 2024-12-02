import { useState, useEffect } from "react";
import { Link} from 'react-router-dom';


function Vacancies() {
  const [vacancies, setVacancies] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

   function textsmall(text) {
    var sliced = text.slice(0,50);
    if (sliced.length < text.length) {
    sliced += '...';
    }
    return sliced;
  }

  const userID = localStorage.getItem('userID');

  function getVacancies() {
    fetch('http://localhost:3001/api/vacancies')
    .then(response => {
      return response.json();
    })
    .then(data => {
      setVacancies(data);
    });
  }

  useEffect(() => {
    getVacancies();
  }, []);

  function getSubscription() {
    fetch(`http://localhost:3001/api/userssubscriptions/${userID}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      setSubscriptions(data);
    });
  }

  useEffect(() => {
    getSubscription();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function Responded(id_vacancy) {
    const result = subscriptions.filter(function(el){
      return el.id_vacancy === id_vacancy; 
    });
    if (result.length > 0) {
      return "✓ You responded";
    } else {
      return '';
    }
  }

  function strDate(sub_date) {
    const customDate = new Date(sub_date);
    const full_date_time = customDate.toISOString().slice(0, 10) + ' ' + customDate.getHours() + ':' + customDate.getMinutes();
    return full_date_time ;
  }

  return (
    <>
      <h1>Vacansies:</h1>
      <div className="vacncy-list">
        {
          vacancies.map((vacancy) => (
            
            <Link key={vacancy.id} to={`/vacancies/${vacancy.id}`}>
              <div className="vacancy-item">
                <div className="item-top-row">
                  <div>
                    <h3 className="h3">{vacancy.title}</h3>
                  </div>
                  <div>
                  <div className="responded">{Responded(vacancy.id)}</div>
                  </div>
                </div>
                <p>{textsmall(vacancy.description)}</p>
                <div className="time"><b>Update:&nbsp;</b> {strDate(vacancy.updatedAt)}</div>
              </div>
            </Link>
          )).reverse()
        }
      </div>

    </>

  )
}

export { Vacancies };