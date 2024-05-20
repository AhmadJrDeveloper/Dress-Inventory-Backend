// GoalModel.js
export const createAccountModel = (sequelize, DataTypes) => {
    const Account = sequelize.define("Accounts", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        expenses: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        incomes: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,
            charset: 'utf8mb4', // Set character set to support Arabic characters
            collate: 'utf8mb4_unicode_ci', // Set collation for case-insensitive comparison
        },
        branch_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Branch',
                key: 'id',      
                as:'branch_id',
            }
        }
        
    }, {
        timestamps: false,
        tableName: 'Accounts', // Specify your custom table name here
    });
    return Account;
};

export default createAccountModel;
