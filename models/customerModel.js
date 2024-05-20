// GoalModel.js
export const createCustomerModel = (sequelize, DataTypes) => {
    const Customer = sequelize.define("Customers", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            charset: 'utf8mb4', // Set character set to support Arabic characters
            collate: 'utf8mb4_unicode_ci', // Set collation for case-insensitive comparison
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            charset: 'utf8mb4', // Set character set to support Arabic characters
            collate: 'utf8mb4_unicode_ci', // Set collation for case-insensitive comparison
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address:{
            type: DataTypes.TEXT,
            allowNull:false
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
        tableName: 'Customers', // Specify your custom table name here
    });
    return Customer;
};

export default createCustomerModel;
