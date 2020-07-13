module.exports = (sequelize, Sequelize) => {
    const courseInstructor = sequelize.define("courseInstructors", {
        lectureid: {
         unique: true,
          type:Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        }
 
    },{
       paranoid: true,
    });
  
    return courseInstructor;
  };