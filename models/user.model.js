module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        required:true

      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        required:true

      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
        required:true

      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
        required:true
   
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        required:true
   
      },
      resetPasswordToken: {
         type: Sequelize.STRING
      },

      resetPasswordExpires: {
        type: Sequelize.DATE
      },
  

    }, {
      paranoid: true,
    });
  
    return User;
  };