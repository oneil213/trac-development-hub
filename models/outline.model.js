module.exports = (sequelize, Sequelize) => {
    const Outline = sequelize.define("outlines", {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true
  

        }, 
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            required: true
  

        },    
    
    },{
        paranoid: true,
    });
  
    return Outline;
  };