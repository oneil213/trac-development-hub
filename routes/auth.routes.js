const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const {authJwt} = require('../middlewares');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/signup",[authJwt.verifyToken, authJwt.isAdmin],
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  app.post(
    "/usersignup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/signin", controller.signin);

  app.get("/signout", controller.signout);
  app.get("/resetpassword", controller.resetPassword);
  app.put("/updatepassword", controller.updatePassword);
  app.get('/users', [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.getAllUsers );
  app.post('/user', [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.getUser );
  app.delete('/deleteuser', [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser );

};