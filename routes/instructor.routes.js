const {authJwt} = require('../middlewares');
const controller = require("../controllers/instructor.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      app.post('/createinstructor', [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
      controller.createInstructor);
      app.get('/instructors',  controller.findAllInstructors);
      app.post('/instructor',  controller.findInstructor);
      app.put('/updateinstructor', [authJwt.verifyToken, authJwt.isAdmin], controller.updateInstructor);
      app.delete('/deleteinstructor', [authJwt.verifyToken, authJwt.isAdmin], controller.deleteInstructor);

     
}