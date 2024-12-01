const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);

router.get('/vacancies', userController.getVacancies);
router.post('/vacancies', userController.createVacancy);
router.get('/vacancies/:id_vacancy/', userController.getVacanciesID);
router.get('/vacancies2/:id_vacancy/', userController.getVacanciesID2);
router.get('/vacanciesmaxid', userController.getVacanciesIDmax);
router.put('/vacancies/:id', userController.closeVacancy);

router.get('/subscriptions/:id_user/:id_vacancy', userController.getSubscriptions);
router.get('/userssubscriptions/:id_user', userController.getUsersSubscription);
router.post('/subscriptions', userController.createSubscription);
router.delete('/subscriptions/:id', userController.deleteSubscription);

router.get('/myvacancies/:id_user', userController.getMyVacancies);
router.get('/activevacancies/:owner_id', userController.getActiveVacancies);
router.get('/active-vacancies/:id_vacancy', userController.getActiveID);

router.get('/countsub', userController.getCountSub);

module.exports = router;
