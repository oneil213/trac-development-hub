module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("images", {
        id: {
            unique: true,
            type:Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
      
        name: {
            type: Sequelize.STRING,
            unique: true,
         
        }, 
        url: {
            type: Sequelize.STRING,
            isUrl: true, 
            allowNull:false
 
        },
    
        
        instructorId: {
            type: Sequelize.STRING,
            allowNull: true,
        },

       userId: {
        type: Sequelize.STRING,
        allowNull: true,
       },

       courseId: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true

       }
    
    },{
        paranoid: true,
    });
  
    return Image;
  };