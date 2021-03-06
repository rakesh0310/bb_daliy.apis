const Sequelize = require('sequelize');

module.exports = sequelize.define('sessions', {
  id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.literal('uuid_generate_v4()'),
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdAt: {
    field: 'created_at',
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updatedAt: {
    field: 'updated_at',
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
});
