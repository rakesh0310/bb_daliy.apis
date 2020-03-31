const jwt = require('jsonwebtoken');
const Session = require('../models/sessions');
const Customer = require('../models/customers');

auth = req => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(
        req.headers['access-token'],
        process.env.SECRET,
        (error, payload) => {
          if (error) {
            reject(error);
          } else {
            resolve(payload && payload.session_id);
          }
        }
      );
    } catch (error) {
      reject(new Error('Invalid Payload'));
    }
  })
    .then(session_id => {
      if (!session_id) {
        throw new Error('Invalid Session');
      }

      return Session.findOne({
        where: { id: session_id }
      });
    })
    .then(session => {
      if (!session) {
        throw new Error('Invalid Session');
      } else {
        return session;
      }
    });
};

module.exports.customer = (req, res, next) => {
  auth(req)
    .then(session => {
      if (session.user_type !== 'customer') {
        throw new Error('Invalid Session');
      }
      req.current_session = session;
      return session.user_id;
    })
    .then(customer_id => {
      return Customer.findOne({
        where: { id: customer_id }
      });
    })
    .then(customer => {
      if (!customer) {
        throw new Error('Invalid Session');
      }
      req.current_customer = customer;
      next();
    })
    .catch(error =>
      res
        .status(401)
        .send({ errors: [{ message: error.message || 'Invalid Session' }] })
    );
};
