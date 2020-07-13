const {authJwt} = require('../middlewares');
const controller = require("../controllers/course.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      app.post('/createcourse', [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
      controller.createCourse);
      app.get('/courses',  controller.findAllCourses);
      app.post('/userdraftcourses', [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.findAllUserDraftCourses);
      app.post('/userpublishedcourses', [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.findAllUserPublishedCourses);
      app.get('/publishedcourses',  controller.findAllPublishedCourses);
      app.get('/draftcourses',  [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.findAllDraftCourses);
      app.post('/course',  controller.findCourse);
      app.delete('/deletecourse', [authJwt.verifyToken, authJwt.isAdmin], controller.deleteCourse);
      app.put('/updatecourse', [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
      controller.updateCourse);
      
     

     
}