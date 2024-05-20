// GoalModel.js
export const createAccessoryModel = (sequelize, DataTypes) => {
    const Accessory = sequelize.define("Accessories", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            charset: 'utf8mb4', // Set character set to support Arabic characters
            collate: 'utf8mb4_unicode_ci', // Set collation for case-insensitive comparison
        },
        price:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: false,
        tableName: 'Accessories', // Specify your custom table name here
    });
    return Accessory;
};

export default createAccessoryModel;
