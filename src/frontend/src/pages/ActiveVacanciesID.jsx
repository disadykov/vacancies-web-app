import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
function ActiveVacanciesID() {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState([]);
  const navigate = useNavigate();
  const isCompany = JSON.parse(localStorage.getItem('isCompany'));

  const goBack = () => {navigate(-1)};

  useEffect(() => {
    if(!isCompany) {
      navigate("/vacancies");
    } 
  });

  function getVacancy() {
    fetch(`http://localhost:3001/api/active-vacancies/${id}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      setVacancy(data);
    });
  }

  useEffect(() => {
    getVacancy();
  }, ); 

  function closeVacancy() {
    fetch(`http://localhost:3001/api/vacancies/${id}`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        console.log(data);
        alert("The vacancy has been successfully disabled");
        navigate("/active-vacancies");
      });
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
          <button className="btn btn-secondary btn-lg vacancy-id-btn"onClick={closeVacancy}>Close vacancy</button>
        </div>
      </div>
    )
    }
</div>
  )

}

export {ActiveVacanciesID};