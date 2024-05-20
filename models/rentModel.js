export const createRentModel = (sequelize, DataTypes) => {
    const Rent = sequelize.define("Rents", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount_payed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount_returning: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        end_date: {
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
        tableName: 'Rents',
    });
    return Rent;
};
export default createRentModel;
