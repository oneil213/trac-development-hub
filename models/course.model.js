module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("courses", {
        title: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            required: true    
          
        },
        createdby: {
            type: Sequelize.STRING,
            allowNull: false,
            required: true    
          
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            required: true
  

        },
     
        duration: {
            type: Sequelize.STRING,
            required: true

        },
        level:{
            type: Sequelize.ENUM,
            values: ['Beginner', 'Intermediate', 'Advance'],
            required: true

        },

        language: {
            type: Sequelize.STRING,
            required: true
           

        },

        video:{
            type: Sequelize.STRING,
            isUrl: true, 
            required: true 

        },
        price:{
            type: Sequelize.STRING,
             

        },

        status:{
            type: Sequelize.ENUM,
            values: ['Published', 'Draft'],
            required: true

        },

    
    },{
        paranoid: true,
    });
  
    return Course;
  };