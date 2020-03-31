const express = require('express');
const router = express.Router();
const City = require('../models/cities');
const Locaity = require('../models/localities');
const SubLocality = require('../models/sub_localities');
const { Op } = require('sequelize');

router.get('/', (req, res) => {
  const { city_id, query } = req.query;
  const where = { city_id };
  if (query) {
    where.name = {[Op.iLike]: `%${query}%`};
  }

  Locaity.findAll({
    attributes: ['id', 'name'],
    where
  })
    .then(result => {
      res.status(200).json({
        data: {
          localities: result
        }
      });
    })
    .catch(err => res.status(400).json({ err }));
});

router.get('/cities', (req, res) => {
  City.findAll({ attributes: ['id', 'name'] })
    .then(cities => {
      res.status(200).json({
        data: {
          cities
        }
      });
    })
    .catch(err => res.status(400).json({ err }));
});

router.get('/sub_localities', (req, res) => {
  const { locality_id, query } = req.query;
  const where = { locality_id }
  if (query) {
    where.name = { [Op.iLike]: `%${query}%` };
  }

  SubLocality.findAll({
    attributes: ['id', 'name'],
    where
  })
    .then(result => {
      res.status(200).json({
        data: {
          sub_localities: result
        }
      });
    })
    .catch(err => res.status(400).json({ err }));
});

module.exports = router;
