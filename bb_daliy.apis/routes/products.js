const express = require('express');
const router = express.Router();
const Product = require('../models/products');

router.get('/', async (req, res) => {
  const query = {};
  if (req.query.category) {
    query.category = req.query.category;
  }
  await Product.findAll({
    attributes: [
      'id',
      'name',
      'price_cents',
      'category',
      'description',
      'image_url'
    ],
    where: query
  })
    .then(result => {
      res.status(200).json({
        data: {
          products: result
        }
      });
    })
    .catch(err => res.status(400).json({ err }));
});

router.get('/categories', async (req, res) => {
  res.status(200).json({
    data: {
      categories: [
      {
        name: "Dairy",
        image_url: "https://via.placeholder.com/300x300.png?text=Dairy"
      },
      {
        name: "Fruits and Vegetables",
        image_url: "https://via.placeholder.com/300x300.png?text=Fruits+and+Vegetables"
      },
      ]
    }
  });
});

router.post('/', async (req, res) => {
  const { name, price_cents, category, description, image_url } = req.body;
  await Product.create({
    name,
    price_cents,
    category,
    description,
    image_url
  })
    .then(result => {
      res.status(200).json({
        data: {
          products: result
        }
      });
    })
    .catch(error => res.status(400).send(error));
});
module.exports = router;
