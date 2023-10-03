const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  return db.query(`
  SELECT *
  FROM relationships
  `)
    .then(({ rows: relationships }) => {
      res.json(
        relationships.reduce(
          (previous, current) => ({ ...previous, [current.id]: current }),
          {}
        )
      );
    });
});


router.get('/:id', (req, res) => {
  return db.query(`
  SELECT *
  FROM relationships
  WHERE current_pet = $1
  `, [req.params.id]).then(({ rows: relationships }) => {
    res.json(
      relationships.reduce(
        (previous, current) => ({ ...previous, [current.id]: current }),
        {}
      )
    );
  });

});

router.post('/', (req, res) => {
  return db.query(`
  INSERT INTO relationships (current_pet, other_pet)
  VALUES ($1, $2)
  RETURNING *
  `, [req.body.current_pet, req.body.other_pet])
    .then(({ rows: relationships }) => {
      res.json(
        relationships.reduce(
          (previous, current) => ({ ...previous, [current.id]: current }),
          {}
        )
      );
    });
});

router.post('/update', (req, res) => {
  return db.query(`
  UPDATE relationships
  SET interact = false
  WHERE current_pet = $1
  AND other_pet = $2
  RETURNING *
  `, [req.body.current_pet, req.body.other_pet])
    .then(({ rows: relationships }) => {
      res.json(
        relationships.reduce(
          (previous, current) => ({ ...previous, [current.id]: current }),
          {}
        )
      );
    });
});


module.exports = router;
