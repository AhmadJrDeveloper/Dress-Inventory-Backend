export const createRentAccessoryModel = (sequelize, DataTypes) => {
    const RentAccessory = sequelize.define("RentAccessories", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        rent_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Rents',
                key: 'id',
                as: 'rent_id',
            }
        },
        accessory_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
        tableName: 'RentAccessories',
    });

    // Define association with Sells
    RentAccessory.associate = (models) => {
        RentAccessory.belongsTo(models.Rents, { foreignKey: 'rent_id', as: 'rent' });
    };

    return RentAccessory;
};
export default createRentAccessoryModel;