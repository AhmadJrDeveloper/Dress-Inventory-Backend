// GoalModel.js
export const createDressModel = (sequelize, DataTypes) => {
    const Dress = sequelize.define("Dresses", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      },
      type: {
        type: DataTypes.ENUM('زفاف', 'سهرة'),
        allowNull: false,
      },
      size: {
        type: DataTypes.ENUM('Small', 'Medium', 'Large', 'XLarge'),
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      },
      dress_status: {
        type: DataTypes.ENUM("متاح", "تم البيع", "مأجر", "في المغسلة"),
        allowNull: true,
        defaultValue: "متاح",
      },
      rent_counter: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Branch',
          key: 'id',
          as: 'branch_id',
        }
      },
      // Add the counter field to the model
      counter: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    }, {
      timestamps: false,
      tableName: 'Dresses',
    });
  
    return Dress;
  };
  
  export default createDressModel;
  