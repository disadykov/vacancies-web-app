import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function VacanciesID() {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState([]);
  const [vacancy2, setVacancy2] = useState([]);
  const [respondVacancy, setRespondVacancy] = useState("Subscribe");
  const [id_sub, setIDsub] = useState(0);

  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");

  const goBack = () => {navigate(-1)};


  function getVacancy() {
    fetch(`http://localhost:3001/api/vacancies/${id}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      setVacancy(data);
    });
  }

  function getVacancy2() {
    fetch(`http://localhost:3001/api/vacancies2/${id}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      setVacancy2(data);
    });
  }


  async function getIDsub(id_user, id_vacancy) {
    let url = `http://localhost:3001/api/subscriptions/${id_user}/${id_vacancy}`;
    const response = await fetch(url);
    
    let commits = await response.json(); // читаем ответ в формате JSON
    
    if(commits.length > 0) {
      setIDsub(commits[0].id);
    } else {
      setIDsub(0);
    }
    
  }
  
  useEffect(() => {
    getIDsub(userID, id);
  }, ); 


  useEffect(() => {
    getVacancy();
    respondedVacancy();
  }, ); 

  useEffect(() => {
    getVacancy2();
    respondedVacancy();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function respondedVacancy() {
    
    const result = vacancy2.filter(function(el){
      return el.id_user === Number(userID); 
    });
    
    if (result.length > 0) {
      setRespondVacancy("Cancel response");
    } else {
      setRespondVacancy("Subscribe");
    }

  }

  function createSubscription(id_user, id_vacancy, createdAt, updatedAt) {
    fetch('http://localhost:3001/api/subscriptions', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id_user, id_vacancy, createdAt, updatedAt}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        console.log(data);
      });
  }

  function deleteSubscription(id_subscription) {
    fetch(`http://localhost:3001/api/subscriptions/${id_subscription}`, { 
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        console.log(data);
      });
  }

  function btnClick() {
    
    if (respondVacancy === "Subscribe") {
      createSubscription(Number(userID), id, Date, Date);
      setRespondVacancy("Cancel response");
      alert("You have successfully subscribed to a vacancy!");
      navigate("/vacancies");
    }  else {
      deleteSubscription(id_sub);
      setRespondVacancy("Subscribe");
      alert("Your job subscription has been cancelled!");
      navigate("/vacancies");
    }
  }



  return (
      <div>
          <h5 className="h5">Vacancy ID: {id}</h5>
          {vacancy && (
            <div className="Vacancy-id-container">
              <div className="Vacancy-id-top">
                <div className="Vacancy-title"><h2 className="h2">{vacancy.title}</h2></div>
                <div className="lvl"><h6><span className="Vacancy-id-span-color">English lvl: </span>{vacancy.englishLvl}</h6></div>
                <div className="lvl"><h6><span className="Vacancy-id-span-color">Grade: </span>{vacancy.grade}</h6></div>
              </div>
              <div className="Vacancy-id-center">
                <p className="Vacancy-id-description">{vacancy.description}</p>
              </div>
              <div className="Vacancy-id-contact"><h1 className="h1">Contacts &#9742; 8 (888) 888-8888</h1></div>
              <div className="lvl vacancy-id-tags"><h6><span className="Vacancy-id-span-color">Tags: </span>{vacancy.tags}</h6></div>
              
              <div className="Vacancy-id-bottom">
                <button className="btn btn-secondary btn-lg vacancy-id-btn" onClick={goBack}>Go back</button>
                <button className="btn btn-secondary btn-lg vacancy-id-btn" onClick={btnClick}>{respondVacancy}</button>
              </div>
            </div>
          )
          }
      </div>
  );

}

export { VacanciesID };