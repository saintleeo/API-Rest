const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const Product = sequelize.define("Product", {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    freight: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },

    total_price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

Product.associate = function(models) {
    Product.belongsTo(models.Client);
};

module.exports = Product;