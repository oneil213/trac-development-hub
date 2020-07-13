const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
 
  };

app.use(cors(corsOptions));
  // parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./models");
const Role = db.role;


db.sequelize.sync();
// //force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to trac application." });
  });


// routes
require('./routes/mailer.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/course.routes')(app);
require('./routes/benefit.routes')(app);
require('./routes/outline.routes')(app);
require('./routes/instructor.routes')(app);
require('./routes/userCourse.routes')(app);
require('./routes/image.routes')(app);
require('./routes/courseInstructor.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "contributor"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });
  }

  



  