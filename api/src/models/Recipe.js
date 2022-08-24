const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.INTEGER,
        // defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      healthScore: {
        type: DataTypes.INTEGER,
      },

      steps: {
        type: DataTypes.TEXT,
      },

      dishTypes: {
        type: DataTypes.TEXT,
      },

      image: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
