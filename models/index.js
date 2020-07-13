const config = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.course = require("../models/course.model")(sequelize, Sequelize);
db.benefit = require("../models/benefit.model")(sequelize, Sequelize);
db.outline = require("../models/outline.model")(sequelize, Sequelize);
db.instructor = require("../models/instructor.model")(sequelize, Sequelize);
db.image = require("../models/image.model")(sequelize, Sequelize);
db.courseInstructor = require("../models/courseInstructor.model")(sequelize, Sequelize);
db.userCourse =require("../models/userCourse.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});



db.benefit.belongsTo(db.course);
db.outline.belongsTo(db.course);
db.course.belongsToMany(db.user, {
  through: db.userCourse,
  as: 'subscribers'

});

db.user.belongsToMany(db.course, {
  through: db.userCourse,
  as: 'subscriptions'
});
db.course.belongsToMany(db.instructor,{
  through: db.courseInstructor,
  as: 'facilitators'
});
db.instructor.belongsToMany(db.course,{
  through: db.courseInstructor,
  as: 'lectures'
});

db.user.hasMany(db.userCourse, {

});
db.userCourse.belongsTo(db.user,{

});
db.course.hasMany(db.userCourse,{

});
db.userCourse.belongsTo(db.course,{

});



db.ROLES = ["user", "admin", "contributor"];

module.exports = db;