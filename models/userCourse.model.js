module.exports = (sequelize, Sequelize) => {
    const UserCourse = sequelize.define("UserCourses", {
       expirationDate: {
         type: Sequelize.DATE,
         isDate: true, 
     
        },

        subscriptionid: {
         unique: true,
          type:Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        }
 
    },{
       paranoid: true,
    });
  
    return UserCourse;
  };