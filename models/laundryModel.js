// GoalModel.js
export const createLaundryModel = (sequelize, DataTypes) => {
    const Laundry = sequelize.define("Laundries", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        land_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Lands',
                key: 'id',
                as: 'land_id',
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
                as:'branch_id',
            }
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        
    }, {
        timestamps: false,
        tableName: 'Laundries', // Specify your custom table name here
    });
    return Laundry;
};

export default createLaundryModel;
