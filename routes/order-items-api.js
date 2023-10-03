const express = require('express');
const router  = express.Router();
const db = require('../db/connection');


router.get('/', (req, res) => {
  if (req.query.email) {
    return db.query(`
    SELECT *
    FROM users
    WHERE email = $1
    `, [req.query.email])
      .then(({ rows: user }) => {
        res.json(
          user.reduce(
            (previous, current) => ({ ...previous, [current.id]: current }),
            {}
          )
        );
      });

  } else {
    return db.query(`
    SELECT *
    FROM users
    ORDER BY id DESC
    `)
      .then(({ rows: users }) => {
        res.json(
          users.reduce(
            (previous, current) => ({ ...previous, [current.id]: current }),
            {}
          )
        );
      });
  }

});


module.exports = router;
