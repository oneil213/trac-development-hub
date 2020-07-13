const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: bcrypt.hashSync(req.body.password, 12)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.status(200).send({message : {msgBody : "User was registered successfully!", msgError: false}});
          });


        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.status(200).send({message : {msgBody : " You registered successfully!", msgError: false}});
        });

      }
    })
    .catch(err => {
      res.status(500).send({message : {msgBody : err.message, msgError: true}});
    });

};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
         res.status(404).json({message : {msgBody : "User not found!", msgError: true}});
        //res.status(404).json({message : {msgBody : User not found!", msgError: true}});
        
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        res.status(401).send({
          accessToken: null,
          message: {msgBody : "Invalid password!", msgError: true}
        });
      }
      else {
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
        var authorities = [];
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            roles: authorities,
            accessToken: token,
            message: {msgBody : "User authenticated!", msgError: false}
            
          });
        });

      }
  
    })
    .catch(err => {
      console.log(err);
   //res.status(501).send({ message: err.message });
    res.status(501).json({message : {msgBody : err, msgError: true}});

    });
};

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(400).send({message : {msgBody : "No token provided!", msgError: true}});
    

  }}


exports.signout = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(200).send({message : {msgBody : "You are logged out", msgError: false}});
      
    }
    res.clearCookie(token);
    res.json({user:{username : "", role : ""},success : true})
      .catch(err => {
        res.status(500).send({message : {msgBody : err.message, msgError: true}});
      });
  };
exports.getAllUsers = async (req, res, next) =>{
  const id = req.query.id;
  var condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
  await User.findAll({where: condition})
    .then(data=>{
      if(data == null){
        res.status(401).json({message : {msgBody : "no user found!", msgError: true}});
      } else{
        res.status(200).send(data)
      }
    })
    .catch(err=>{
      res.status(500).send({
        message: err.message || 'some error occurred'
      });
    });
}

exports.getUser = async (req, res, next) =>{
   const id = req.body.id;
   await User.findByPk(id).then(data=>{
    if(data == null){
      res.status(401).json({message : {msgBody : "no user found!", msgError: true}});
    } else{
      res.status(200).send(data)
    }
   })
   .catch(err=>{
    res.status(500).send({
      message: err.message || 'some error occurred'
    });
  });
   
}


exports.deleteUser = async (req, res, next) =>{
  const id = req.body.id;
  await User.destroy({
    where: {id: id},
    force: true
  }).then(num=>{
   if(num !== 1){
     res.status(401).json({message : {msgBody : "no user found!", msgError: true}});
   } else{
    res.status(200).send({message : {msgBody : "User deleted", msgError: false}});
   }
  })
  .catch(err=>{
   res.status(500).send({
     message: err.message || 'some error occurred'
   });
 });

}

exports.resetPassword = async (req, res, next) => {
 await User.findOne({
    where: {
     resetPasswordToken: req.query.resetPasswordToken,
     resetPasswordExpires: {
       [Op.gt]: Date.now(),
     },
    },
  }).then((user) =>{
    if(user == null) {
      console.error('password reset link is invalid or has expired');
      res.status(403).send({message : {msgBody : "password reset link is invalid or has expired", msgError: true}});
    } else {
      res.status(200).send({username: user.username, message : {msgBody : "Please enter a new password", msgError: false}});
    }
  })
}

exports.updatePassword = async (req, res, next) => {
 await User.findOne({
    where: {
      username: req.body.username,
      resetPasswordToken: req.body.resetPasswordToken,
      resetPasswordExpires: {
        [Op.gt]: Date.now(),
      },

    },
  }).then(user =>{
    if(user == null) {
      console.error('password reset link is invalid or has expired');
      res.status(403).send({message : {msgBody : "password reset link is invalid or has expired", msgError: true}});

    } else if (user != null){
      console.log('user found');
      bcrypt.hash(req.body.password, 12).then(hashedPassword =>{
        user.update({
          password: hashedPassword,
          resetPasswordToken: null,
          resetPasswordExpires: null,
        });
      }).then(() =>{
        console.log('password updated');
        res.status(200).send({message : {msgBody : "Password updated", msgError: false}});

      });


    } else {
      console.log('no user exists in db to update');
      res.status(401).send({message : {msgBody : "o user found for update", msgError: true}});

    }

  })
}