// GoalModel.js
export const createBranchModel = (sequelize, DataTypes) => {
    const Branch = sequelize.define("Branch", {
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
        }
    }, {
        timestamps: false,
        tableName: 'Branch', // Specify your custom table name here
    });
    return Branch;
};

export default createBranchModel;
