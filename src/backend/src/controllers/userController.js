const pool = require('../config/db');

exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Users"');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  const { userName, password, isCompany, companyName } = req.body;
  try {
    const result = await pool.query('INSERT INTO "Users" ("userName", "password", "isCompany", "companyName", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [userName, password, isCompany, companyName, new Date(), new Date()]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { userName, password, isCompany } = req.body;
  try {
    const result = await pool.query('UPDATE "Users" SET userName = $1, password = $2, isCompany = $3 WHERE id = $4 RETURNING *', [userName, password, isCompany, id]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVacancies = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Vacancies" where "isActive" = true');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVacanciesID = async (req, res) => {
  const { id_vacancy } = req.params;
  try {
    const result = await pool.query('SELECT "Vacancies".id, title, description, "englishLvl", grade, tags, "isActive", owner_id, "Subscriptions".id as id_sub, "Subscriptions".id_user, "Subscriptions".id_vacancy FROM "Vacancies" FULL join "Subscriptions" on "Vacancies".id = "Subscriptions".id_vacancy where "Vacancies".id = $1',[id_vacancy]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVacanciesID2 = async (req, res) => {
  const { id_vacancy } = req.params;
  try {
    const result = await pool.query('SELECT "Vacancies".id, title, description, "englishLvl", grade, tags, "isActive", owner_id, "Subscriptions".id as id_sub, "Subscriptions".id_user, "Subscriptions".id_vacancy FROM "Vacancies" FULL join "Subscriptions" on "Vacancies".id = "Subscriptions".id_vacancy where "Vacancies".id = $1',[id_vacancy]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createVacancy = async (req, res) => {
  const { title, description, englishLvl, grade, tags, isActive, owner_id } = req.body;
  try {
    const result = await pool.query('INSERT INTO "Vacancies" ("title", "description", "englishLvl", "grade", "tags", "isActive", "owner_id", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [title, description, englishLvl, grade, tags, isActive, owner_id, new Date(), new Date()]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSubscriptions = async (req, res) => {
  const { id_user } = req.params;
  const { id_vacancy } = req.params;
  try {
    const result = await pool.query('SELECT * FROM "Subscriptions" WHERE id_user = $1 AND id_vacancy = $2',[id_user, id_vacancy]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSubscription = async (req, res) => {
  const { id_user, id_vacancy } = req.body;
  try {
    const result = await pool.query('INSERT INTO "Subscriptions" ("id_user", "id_vacancy", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4) RETURNING *', [id_user, id_vacancy, new Date(), new Date()]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVacanciesIDmax = async (req, res) => {
  try {
    const result = await pool.query('SELECT MAX(id) FROM "Vacancies"');
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsersSubscription = async (req, res) => {
  const { id_user } = req.params;
  try {
    const result = await pool.query('SELECT * FROM "Subscriptions" WHERE id_user = $1',[id_user]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSubscription = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM "Subscriptions" WHERE id = $1 RETURNING *', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyVacancies = async (req, res) => {
  const { id_user } = req.params;
  try {
    const result = await pool.query('SELECT "Vacancies".id, title, description, "englishLvl", grade, tags, "isActive", owner_id, "Vacancies"."updatedAt", "Subscriptions".id_user as id_user, "Subscriptions".id_user, "Subscriptions".id_vacancy FROM "Vacancies" FULL join "Subscriptions" on "Vacancies".id = "Subscriptions".id_vacancy where id_user = $1',[id_user]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getActiveVacancies = async (req, res) => {
  const { owner_id } = req.params;
  try {
    const result = await pool.query('select * from "Vacancies" where owner_id = $1 and "Vacancies"."isActive" = true ',[owner_id]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getActiveID = async (req, res) => {
  const { id_vacancy } = req.params;
  try {
    const result = await pool.query('select * from "Vacancies" where id = $1',[id_vacancy]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCountSub = async (req, res) => {
  try {
    const result = await pool.query('SELECT id_vacancy , COUNT(*) AS count_sub FROM "Subscriptions" GROUP BY id_vacancy');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.closeVacancy = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('UPDATE "Vacancies" SET "isActive" = false WHERE id = $1 RETURNING *', [id]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
