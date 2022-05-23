const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    resumen: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image : {
      type: DataTypes.STRING,
      defaultValue : 'https://www.objetivobienestar.com/uploads/s1/36/60/12/Recetas-ingredientes-basicos-portada_1_780x462.jpg'
    },
    puntuacion:{
      type: DataTypes.INTEGER,
      allowNull:true,
    },
    healty:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    instrucciones:{
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  });
};
