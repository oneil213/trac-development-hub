const {authJwt} = require('../middlewares');
const controller = require("../controllers/courseInstructor.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      app.post('/takelecture', [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.joinCourse);
      app.post('/instructor/lectures', [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.instructorLectures);
      app.get('/lectures', [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.findAllLectures);
      app.post('/instructor/activelectures', [authJwt.verifyToken], controller.instructorActiveLectures);
      app.post('/instructor/draftlectures', [authJwt.verifyToken], controller.instructorDraftLectures);
      app.delete('/droplecture', [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.removeInstructor);


    }