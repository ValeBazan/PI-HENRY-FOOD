const { DataTypes, STRING } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    summary:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore:{
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100,
      },
      allowNull: true
    
    },
    steps:{
      type: DataTypes.ARRAY(DataTypes.STRING)
      
      
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  
};
