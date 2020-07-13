const {authJwt} = require('../middlewares');
const controller = require("../controllers/benefit.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      app.post('/createbenefit', [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
      controller.createBenefit);
      app.post('/benefits',  controller.findCourseBenefits);
      app.delete('/deletebenefit', [authJwt.verifyToken, authJwt.isAdmin], controller.deleteBenefit);

     
}