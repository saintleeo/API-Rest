const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const Client = sequelize.define("Client", {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    address: {
        type: DataTypes.STRING,
        allowNull: false
    },

    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },

    CPF: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

Client.associate = function(models){
    clearInterval.hasMany(models.Product);
};

module.exports = Client;