import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
function CreateVacancy() {

  const navigate = useNavigate();
  const isCompany = JSON.parse(localStorage.getItem('isCompany'));

  useEffect(() => {
    if(!isCompany) {
      navigate("/vacancies");
    } 
  });

  function createVacancy(title, description, englishLvl, grade, tags, isActive, owner_id, createdAt, updatedAt) {
    fetch('http://localhost:3001/api/vacancies', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, description, englishLvl, grade, tags, isActive, owner_id, createdAt, updatedAt}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        console.log(data);
        alert("The vacancy has been successfully created!");
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const description = form.description.value;
    const lvl = form.lvl.value;
    const grade = form.grade.value;
    const tags = form.tags.value;
    
    if (title === "" || description === "") {
      alert("Please fill in all the fields!");
    } else {
      let trimmed_title = title.trim();
      let trimmed_description = description.trim();
      if (trimmed_title === "" || trimmed_description === "") {
        alert("Field values ​​cannot only contain spaces!");
        form.title.value = "";
        form.description.value = "";
      } else {
        const userID = Number(localStorage.getItem('userID'));
        createVacancy(title, description, lvl, grade, tags, true, userID, Date, Date);
        form.title.value = "";
        form.description.value = "";
      }
    }
  }

  return (
    <div className='Vacancy-card-container'>
          <div className='Vacancy-item' onSubmit={handleSubmit}>
            <h1 className='h1'>New vacancy:</h1>
            <form>

              <div className="input-group input-group-lg mb-size">
                <span className="input-group-text" id="basic-addon1"><h4>Vacancy title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4></span>
                <input type="text" className="form-control" placeholder="Enter a name" aria-label="Title" aria-describedby="basic-addon1" name="title"/>
              </div>

              <div className="input-group input-group-lg mb-size">
                <span className="input-group-text"><h4>Vacancy description</h4></span>
                <textarea className="form-control Vacancy-description" aria-label="With textarea" name="description" placeholder="Enter a description"></textarea>
              </div>

              <div className='input-group mb-size'>
                <span className="input-group-text"><h4>English lvl&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4></span>
                <select className="form-select form-select-lg" aria-label=".form-select-lg example" name="lvl">
                  <option value="A1 (Pre)">A1 (Pre)</option>
                  <option value="A1 (Beginner)">A1 (Beginner)</option>
                  <option value="B1 (Intermediate)">B1 (Intermediate)</option>
                  <option value="B2 (Upper-Intermediate)">B2 (Upper-Intermediate)</option>
                  <option value="C1 (Advanced)">C1 (Advanced)</option>
                  <option value="C2 (Proficiency)">C2 (Proficiency)</option>
                </select>
              </div>

              <div className='input-group mb-size'>
                <span className="input-group-text"><h4>Grade&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4></span>
                <select className="form-select form-select-lg" aria-label=".form-select-lg example" name="grade">
                  <option value="Без грейда">Без грейда</option>
                  <option value="Junior">Junior</option>
                  <option value="Middle">Middle</option>
                  <option value="Senior">Senior</option>
                  <option value="Руководитель">Руководитель</option>
                  <option value="Team Lead">Team Lead</option>
                </select>
              </div>

              <div className='input-group mb-size'>
                <span className="input-group-text"><h4>Tags&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4></span>
                <select className="form-select form-select-lg" aria-label=".form-select-lg example" name="tags">
                  <option value="Удаленная работа">Удаленная работа</option>
                  <option value="Вахтовый метод">Вахтовый метод</option>
                  <option value="Не полный день">Не полный день</option>
                  <option value="Гибкий график">Гибкий график</option>
                  <option value="Полный рабочий день">Полный рабочий день</option>
                  <option value="Частые командировки">Частые командировки</option>
                </select>
              </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-size">
                  <Link className="btn btn-outline-danger btn-lg btn-size" to="/vacancies">Close</Link>
                  <button type="submit" className="btn btn-outline-success btn-lg btn-size">Save</button>
                </div>
            </form>
  </div>

    </div>
  )
}

export { CreateVacancy };