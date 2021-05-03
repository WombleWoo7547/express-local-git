const { Router } = require('express');
const authDB = require('../db/connection');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const router = Router();

const schema = Joi.object({
  username: Joi.string()
    .min(2)
    .max(35)
    .regex(/[a-zA-Z0-9\-_]/),
  password: Joi.string()
    .min(8)
    .regex(/[a-zA-Z0-9\-_$%£&*()"!@';/\.,?><\\\[\]\{\}#~]/),
});

router.post('/signup', (req, res, next) => {
  try {
    const result = Joi.validate(req.body, schema);
    if ((result.error = null)) {
      authDB
        .findOne({
          username: req.body.username,
        })
        .then((user) => {
          if (user) {
            const error = new Error(
              'OH NO! User already is in our DataBase. Try another username'
            );
            next(error);
          } else {
            bcrypt.hash(req.body.password, 17).then((hash) => {
              const newUser = {
                username: req.body.username,
                password: hash,
              };
							authDB.insert(newUser).then(insterted => {
								res.json({
									message: 'Username insterted',
									database: 'auth-yay-food',
									createdUser: insterted
								});
							})
            });
          }
        });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/login', (req, res, next) => {});
