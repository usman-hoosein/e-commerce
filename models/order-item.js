const Sequelize = require('sequelize')

const sequelize = require('../util/database')

//Using a cartItem model to link a specific product to multiple
//  different carts and one cart with multiple different products
const OrderItem = sequelize.define("orderItem" , {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    quantity: Sequelize.INTEGER
})

module.exports = OrderItem