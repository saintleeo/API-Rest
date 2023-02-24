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
        type: DataTypes.NUMBER,
        allowNull: false
    },

    CPF: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {timestamps: true});

Client.associate = function(models){
    Client.hasMany(models.Product);
};

module.exports = Client;