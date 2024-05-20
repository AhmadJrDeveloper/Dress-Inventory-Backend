export const createSellAccessoryModel = (sequelize, DataTypes) => {
    const SellAccessory = sequelize.define("SellAccessories", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sell_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Sells',
                key: 'id',
                as: 'sell_id',
            }
        },
        accessory_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Accessories',
                key: 'id',
                as: 'accessory_id',
            }
        },
        dress_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Dresses',
                key: 'id',
                as: 'dress_id',
            }
        },
    }, {
        timestamps: false,
        tableName: 'SellAccessories',
    });

    // Define association with Sells
    SellAccessory.associate = (models) => {
        SellAccessory.belongsTo(models.Sells, { foreignKey: 'sell_id', as: 'sell' });
    };

    return SellAccessory;
};
export default createSellAccessoryModel;