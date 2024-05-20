// GoalModel.js
export const createLandModel = (sequelize, DataTypes) => {
    const Land = sequelize.define("Lands", {
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
        ,
        branch_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Branch',
                key: 'id',      
                as:'branch_id',
            }
        },
    }, {
        timestamps: false,
        tableName: 'Lands', // Specify your custom table name here
    });
    return Land;
};

export default createLandModel;
