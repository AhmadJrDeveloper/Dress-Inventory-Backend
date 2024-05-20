// GoalModel.js
import bcrypt from "bcrypt"
export const createUserModel = (sequelize, DataTypes) => {
    const User = sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_type: {
            type: DataTypes.ENUM('بائع', 'مسؤول'),
            allowNull: false,
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
        tableName: 'Users', // Specify your custom table name here
    });
    User.comparePassword = async function (pass,passdb) {
        return await bcrypt.compare(pass,passdb)      };
    return User;
};

export default createUserModel;
