// GoalModel.js
export const createRentLogModel = (sequelize, DataTypes) => {
    const RentLog = sequelize.define("RentLog", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        rent_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Rents',
                key: 'id',      
                as:'rent_id',
            }
        },
        branch_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Branch',
                key: 'id',      
                as:'branch_id',
            }
        }
    }, {
        timestamps: false,
        tableName: 'RentLog', // Specify your custom table name here
    });
    return RentLog;
};

export default createRentLogModel;
