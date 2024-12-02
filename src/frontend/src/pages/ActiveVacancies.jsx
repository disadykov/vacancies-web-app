import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Link} from 'react-router-dom';

import userimg from '../img/user.png';

function ActiveVacancies() {
  const [vacancies, setVacancies] = useState([]);
  const [countsub, setCountsub] = useState([]);

  const userID = localStorage.getItem('userID');
  const navigate = useNavigate();
  const isCompany = JSON.parse(localStorage.getItem('isCompany'));
  const companyName = localStorage.getItem('companyName');

  useEffect(() => {
    if(!isCompany) {
      navigate("/vacancies");
    } 
  });

  function textsmall(text) {
    var sliced = text.slice(0,50);
    if (sliced.length < text.length) {
    sliced += '...';
    }
    return sliced;
  }

  function getActiveVacancies() {
    fetch(`http://localhost:3001/api/activevacancies/${userID}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      setVacancies(data);
    });
  }

  function getCountSub() {
    fetch(`http://localhost:3001/api/countsub`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      setCountsub(data);
    });
  }

  useEffect(() => {
    getActiveVacancies();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getCountSub();
  }, []); 

  function CountSubscriptions(id_vacancy) {
    const result = countsub.filter(function(el){
      return el.id_vacancy === id_vacancy; 
    });
    if (result.length > 0) {
      return result[0].count_sub;
    } else {
      return 0;
    }
  }
  
  function strDate(sub_date) {
    const customDate = new Date(sub_date);
    const full_date_time = customDate.toISOString().slice(0, 10) + ' ' + customDate.getHours() + ':' + customDate.getMinutes();
    return full_date_time ;
  }

  return (
    <>
      <div>
          <h4>Current company: <span className='company-name'><b>{companyName}</b></span></h4>
      </div>
      <div className="vacncy-list">
      {
        vacancies.map((vacancy) => (
          
          <Link key={vacancy.id} to={`/active-vacancies/${vacancy.id}`}>
            <div className="vacancy-item">
              <div className="item-top-row">
                <div className='widht-card'>
                  <div className="item-top-row-img">
                    <div className='vacancy-width'>
                      <h3>{vacancy.title}</h3>
                    </div>
                    <div className='count-row'>
                      <img src={userimg} alt="countsubstriction" className="icon-user" />
                      <div className='count-user'><b>{CountSubscriptions(vacancy.id)}</b></div>
                    </div>
                  </div>
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

export {ActiveVacancies};