'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class asset extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            asset.belongsTo(models.user, {
                through: 'users',
                foreignKey: 'userId'
            });
        }
    }
    asset.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            amout: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'asset'
        }
    );
    return asset;
};
