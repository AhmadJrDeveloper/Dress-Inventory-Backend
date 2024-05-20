// ../Models/index.js
import { dbConfig } from "../config/dbConfig.js";
import { Sequelize, DataTypes } from "sequelize";
import { createBranchModel } from "./branchModal.js";
import { createUserModel } from './userModal.js' 
import {createAccessoryModel } from './accessoryModel.js';
import {createAccountModel } from './accountModel.js';
import {createDressModel } from './dressModel.js';
import {createSellModel } from './sellModel.js';
import {createRentModel } from './rentModel.js';
import { createRentLogModel } from "./rentLogModel.js";
import {createCustomerModel} from "./customerModel.js";
import createSellAccessoryModel from "./sellAccessoryModel.js";
import createLaundryModel from "./laundryModel.js";
import createLandModel from "./landModel.js";
import createRentAccessoryModel from "./rentAccessoryModel.js";

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);


sequelize.authenticate()
    .then(() => {
        console.log("connected to the database");
    })
    .catch(error => {
        console.error("error connecting: " + error);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Branch = createBranchModel(sequelize, DataTypes);
db.Users = createUserModel(sequelize, DataTypes);
db.Accessories = createAccessoryModel(sequelize, DataTypes);
db.Accounts = createAccountModel(sequelize, DataTypes);
db.Dresses = createDressModel(sequelize, DataTypes);
db.Sells = createSellModel(sequelize, DataTypes);
db.Rents = createRentModel(sequelize, DataTypes);
db.RentLog = createRentLogModel(sequelize, DataTypes);
db.Customers = createCustomerModel(sequelize, DataTypes);
db.SellAccessories = createSellAccessoryModel(sequelize, DataTypes);
db.Laundries = createLaundryModel(sequelize, DataTypes);
db.Lands = createLandModel(sequelize, DataTypes);
db.RentAccessories = createRentAccessoryModel(sequelize, DataTypes);








db.Branch.hasMany(db.Users, {
    foreignKey: "branch_id",
    as: "user"
});

db.Users.belongsTo(db.Branch, {
    foreignKey: "branch_id",
    as: "branch"
});

db.Branch.hasMany(db.Accounts, {
    foreignKey: "branch_id",
    as: "account"
});

db.Accounts.belongsTo(db.Branch, {
    foreignKey: "branch_id",
    as: "branch"
});

// Define the association for Branch to Dresses (one-to-one)
db.Branch.hasOne(db.Dresses, {
    foreignKey: "branch_id",
    as: "dress",
    unique: true, // Set the unique option to true for a one-to-one relationship
});

// Define the association for Dresses to Branch (one-to-one)
db.Dresses.belongsTo(db.Branch, {
    foreignKey: "branch_id",
    as: "branch",
    unique: true, // Set the unique option to true for a one-to-one relationship
});


//relations for sells model
db.Dresses.hasOne(db.Sells, {
    foreignKey: "dress_id",
    as: "dress",
    unique: true, // Set the unique option to true for a one-to-one relationship

});

db.Sells.belongsTo(db.Dresses, {
    foreignKey: "dress_id",
    as: "dress",
    unique: true, // Set the unique option to true for a one-to-one relationship

});

//relations for sells model with users
db.Users.hasMany(db.Sells, {
    foreignKey: "user_id",
    as: "sell"
});

db.Sells.belongsTo(db.Users, {
    foreignKey: "user_id",
    as: "user"
});

db.Branch.hasMany(db.Sells, {
    foreignKey: "branch_id",
    as: "sell",
});

// Define the association for Dresses to Branch (one-to-one)
db.Sells.belongsTo(db.Branch, {
    foreignKey: "branch_id",
    as: "branch",
});

db.Customers.hasOne(db.Sells, {
    foreignKey: "customer_id",
    as: "sell",
    unique: true, // Set the unique option to true for a one-to-one relationship

});

db.Sells.belongsTo(db.Customers, {
    foreignKey: "customer_id",
    as: "customer",
    unique: true, // Set the unique option to true for a one-to-one relationship

});
//relations for sells model with users


//relationship for rent table
db.Dresses.hasOne(db.Rents, {
    foreignKey: "dress_id",
    as: "rent",
    unique: true, // Set the unique option to true for a one-to-one relationship

});

db.Rents.belongsTo(db.Dresses, {
    foreignKey: "dress_id",
    as: "dress",
    unique: true, // Set the unique option to true for a one-to-one relationship

});

db.Branch.hasMany(db.Rents, {
    foreignKey: "branch_id",
    as: "rent",
});

db.Rents.belongsTo(db.Branch, {
    foreignKey: "branch_id",
    as: "branch",
});

db.Users.hasMany(db.Rents, {
    foreignKey: "user_id",
    as: "rent"
});

db.Rents.belongsTo(db.Users, {
    foreignKey: "user_id",
    as: "user"
});


db.Customers.hasOne(db.Rents, {
    foreignKey: "customer_id",
    as: "rent",
    unique: true, // Set the unique option to true for a one-to-one relationship

});

db.Rents.belongsTo(db.Customers, {
    foreignKey: "customer_id",
    as: "customer",
    unique: true, // Set the unique option to true for a one-to-one relationship

});
//relationship for rent table


//relationship for rentLog table
db.Rents.hasOne(db.RentLog, {
    foreignKey: "rent_id",
    as: "rentLog",
    unique: true, // Set the unique option to true for a one-to-one relationship

});

db.RentLog.belongsTo(db.Rents, {
    foreignKey: "rent_id",
    as: "rent",
    unique: true, // Set the unique option to true for a one-to-one relationship

});

db.Branch.hasOne(db.RentLog, {
    foreignKey: "branch_id",
    as: "rentLog",
    unique: true, // Set the unique option to true for a one-to-one relationship
});

// Define the association for Dresses to Branch (one-to-one)
db.RentLog.belongsTo(db.Branch, {
    foreignKey: "branch_id",
    as: "branch",
    unique: true, // Set the unique option to true for a one-to-one relationship
});
//relationship for rentLog table

//relationship for customer table
db.Branch.hasMany(db.Customers, {
    foreignKey: "branch_id",
    as: "customer"
});

db.Customers.belongsTo(db.Branch, {
    foreignKey: "branch_id",
    as: "branch"
});
//relationship for customer table



//relationship for laundry table
db.Dresses.hasMany(db.Laundries, {
    foreignKey: "dress_id",
    as: "laundry"
});

db.Laundries.belongsTo(db.Dresses, {
    foreignKey: "dress_id",
    as: "dress"
});
db.Lands.hasMany(db.Laundries, {
    foreignKey: "land_id",
    as: "laundry"
});

db.Laundries.belongsTo(db.Lands, {
    foreignKey: "land_id",
    as: "land"
});

db.Branch.hasOne(db.Laundries, {
    foreignKey: "branch_id",
    as: "laundry"
});

db.Laundries.belongsTo(db.Branch, {
    foreignKey: "branch_id",
    as: "branch"
});
//relationship for laundry table

//relationship for land table
db.Branch.hasOne(db.Lands, {
    foreignKey: "branch_id",
    as: "land"
});

db.Lands.belongsTo(db.Branch, {
    foreignKey: "branch_id",
    as: "branch"
});
//relationship for land table






















db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Database synchronization done!");
    });
export {db};