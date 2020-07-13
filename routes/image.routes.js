const {authJwt, cloudinaryMutter} = require('../middlewares');
const controller = require("../controllers/image.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
        
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      app.post('/imagecourses',cloudinaryMutter.parser.single("image"), controller.uploadCourseImage);
      app.post('/imageinstructor',cloudinaryMutter.parser.single("image"), controller.uploadInstructorImage);
      app.post('/instructorimage', controller.getInstructorImageUrl);
      app.post('/courseimage', controller.getCourseImageUrl);
      app.post('/courseinstructor', controller.getCourseInstructor);
  
    }
