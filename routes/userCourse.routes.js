const {authJwt} = require('../middlewares');
const controller = require("../controllers/userCourse.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      app.post('/registercourse', [authJwt.verifyToken], controller.joinCourse);
      app.get('/subscriptions', [authJwt.verifyToken], controller.userSubscriptions);
      app.post('/user/subscriptions', [authJwt.verifyToken], controller.userSubscriptions);
      app.post('/user/activesubscriptions', [authJwt.verifyToken], controller.userActiveSubscriptions);
      app.get('/user/allsubscriptions', [authJwt.verifyToken, authJwt.isAdmin], controller.findAllSubscriptions);
     
}