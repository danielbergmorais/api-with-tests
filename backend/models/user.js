const Sequelize = require('sequelize');
const database = require('../config/db');
const uuid = require('uuid');

const User = database.define('user', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
}, {
    timestamps: false
})
User.beforeCreate((user, _) => {
    return user.id = uuid.v4();
});
module.exports = User;