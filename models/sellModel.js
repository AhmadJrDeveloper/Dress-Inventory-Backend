export const createSellModel = (sequelize, DataTypes) => {
    const Sell = sequelize.define("Sells", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Customers',
                key: 'id',
                as: 'customer_id',
            }
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
                as: 'user_id',
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
        branch_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Branch',
                key: 'id',
                as: 'branch_id',
            }
        }
    }, {
        timestamps: false,
        tableName: 'Sells',
    });

    // Define association with SellAccessories
    Sell.associate = (models) => {
        Sell.hasMany(models.SellAccessories, { foreignKey: 'sell_id', as: 'sell_accessories' });
    };

    return Sell;
};