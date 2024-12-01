'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Vacancies', [
      {
        title: 'Преподователь танцев',
        description: "Мы - международная cеть cтудий pастяжки и бaлета - “LЕVITA”, oбучaющaя свыше 100 000 клиентов на двух континентах! Студия Levita – это пространство, где каждый может почувствовать лёгкость бытия и заняться балетом и растяжкой в атмосфере творчества и вдохновения. Если ты умеешь вдохновлять людей на изменения, а также доводить их до результата, то нам стоит познакомиться!) Ты нам подходишь, если: - Ты живешь танцами или фитнесом - Желаешь развивать свой творческий потенциал - Ты требовательна и профессиональна - Опыт преподавания будет твоим преимуществом, (не обязательно – всему научим)",
        englishLvl: 'A1 (Beginner)',
        grade: 'Базовый уровень',
        tags: 'Гибкий график',
        isActive: true,
        owner_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
     },
     {
      title: 'Ведущий системный администратор',
      description: "Компания «Мир Упаковки» более 26 лет предлагает качественные и современные решения в сфере упаковочных и расходных материалов для бизнеса.",
      englishLvl: 'A1 (Pre)',
      grade: 'Нет',
      tags: 'Полный рабочий день',
      isActive: false,
      owner_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
   },
   {
    title: 'C++ Developer [Middle/Senior]',
    description: "Компания LLC GFAGAMES занимается разработкой ММО-шутера PIONER.Руководство и коллектив имеют большой опыт в индустрии и принимали участие в проектах: STALKER 2, Atomic Heart, Kings Bounty и Metro Exodus.Компания находится в состоянии расширения в связи с инвестициями её миноритарного инвестора Tencent и ищет как опытных и талантливых профессионалов, так и специалистов готовых развиваться в быстрорастущей компании для работы над крупным проектом.",
    englishLvl: 'B1 (Intermediate)',
    grade: 'Senior',
    tags: 'Полный рабочий день',
    isActive: true,
    owner_id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
    ], {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Vacancies', null, {});

  }
};
