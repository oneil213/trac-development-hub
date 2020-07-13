module.exports = (sequelize, Sequelize) => {
    const Benefit = sequelize.define("benefits", {
      
        description: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true
  

        },    
    
    },{
        paranoid: true,
    });
  
    return Benefit;
  };