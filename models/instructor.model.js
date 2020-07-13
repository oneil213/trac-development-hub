module.exports = (sequelize, Sequelize) => {
    const Instructor = sequelize.define("instructors", {
      name: {
          type: Sequelize.STRING,
          unique: true,
         
      },
      title: {
          type: Sequelize.STRING,
          set(title) {
              this.setDataValue('title', title.toUpperCase());
          }
      }
    
    },{
        paranoid: true,
    });
  
    return Instructor;
  };