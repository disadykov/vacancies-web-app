const express = require('express');
const pool = require('./config/db');
const routes = require('./routes');
const { body, validationResult } = require('express-validator');

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

pool.query('SELECT NOW()', (err, res) => {
  if(err) {
    console.error('Error connecting to the database', err.stack);
  } else {
    console.log('Connected to the database:', res.rows);

    app.post('/users', 
      body('userName').notEmpty(),
      body('password').notEmpty(),
      body('isCompany').isBoolean(),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      },
      routes
    );

    app.post('/vacancies', 
      body('title').notEmpty(),
      body('description').notEmpty(),
      body('englishLvl').notEmpty(),
      body('grade').notEmpty(),
      body('tags').notEmpty(),
      body('isActive').isBoolean(),
      body('owner_id').notEmpty(),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      },
      routes
    );

    app.post('/subscriptions', 
      body('id_user').notEmpty(),
      body('id_vacancy').notEmpty(),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      },
      routes
    );
    
    app.use('/api', routes);
    
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});