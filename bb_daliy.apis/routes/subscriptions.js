const express = require('express');
const router = express.Router();
const Subscription = require('../models/subscriptions');
const Product = require('../models/products');
//const models = require('../models');
//const db = require('../models/index');
const auth = require('../lib/auth');
require('dotenv').config();

router.get('/', auth.customer, (req, res) => {
  const customer = req.current_customer;
  Subscription.findAll({
    attributes: ['id', 'name'],
    where: { customer_id: customer.id },
    include: [{ model: Product }]
  })
    .then(subscriptions => {
      console.log('jsahgfe');
      // subscriptions.map(item => {
      // Product.findOne({where:{id:item.product_id}}).then()
      // if (item.name === oldName) {
      //   /* This is the part where I need the logic */
      // } else {
      //   return item;
      // }
      console.log(subscriptions);
      /*
      res.status(200).json({
        data: {
          subscriptions: [subscriptions]
        }
      });*/
    })
    .catch(error => res.status(400).json({ msg: 'sdfgfg' + error }));
});

router.post('/', auth.customer, (req, res) => {
  const customer = req.current_customer;
  const product_id = req.body.product_id;
  const frequency_type = req.body.frequency;
  const status = 'active';
  const quantity = req.body.quantity;
  Subscription.create({
    customer_id: customer.id,
    product_id,
    frequency_type,
    quantity,
    status
  })
    .then(subscription => {
      res.status(200).json({
        data: {
          subscription: {
            id: subscription.id,
            product_id: subscription.product_id,
            frequency_type: subscription.frequency,
            quantity: subscription.quantity
          }
        }
      });
    })
    .catch(error => res.status(400).json({ error }));
});

router.post('/:id/status', auth.customer, (req, res) => {
  const status = req.params.id;
  Subscription.findOne({
    where: { id: req.params.id }
  })
    .then(async subscription => {
      if (!subscription) {
        throw new Error('Invalid Subscription Id');
      }
      subscription.status = status;
      subscription.quantity = quantity;
      await subscription.save();
      res.status(200).json({
        data: {
          subscription: {
            subscription: {
              id: subscription.id,
              product_id: subscription.product_id,
              frequency_type: subscription.frequency,
              quantity: subscription.quantity
            }
          }
        }
      });
    })
    .catch(error => res.status(400).json({ error }));
});

router.delete('/:id', auth.customer, (req, res) => {
  Subscription.findOne({
    where: { id: req.params.id }
  })
    .then(subscription => {
      if (!subscription) {
        throw new Error('Invalid Subscription Id');
      }
      subscription.destroy().then(() =>
        res.status(200).json({
          msg: 'deleted'
        })
      );
    })
    .catch(error => res.status(400).json({ error }));
});

module.exports = router;
