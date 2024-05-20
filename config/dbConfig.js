// dbConfig.js
export const dbConfig = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "dressStore",
    PORT: "3306",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      freezeTableName: true, // Prevent Sequelize from pluralizing the table name
    },
  };
  