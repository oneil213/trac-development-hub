const {authJwt} = require('../middlewares');
const controller = require("../controllers/outline.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      app.post('/createoutline', [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
      controller.createOutline);
      app.post('/outlines',  controller.findCourseOutlines);
      app.post('/getoutline', controller.findOutline);
      app.put('/updateoutline', [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.updateCourseOutline);
      app.delete('/deleteoutline', [authJwt.verifyToken, authJwt.isAdmin], controller.deleteOutline);

     
}
