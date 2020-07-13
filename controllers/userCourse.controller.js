const db = require('../models');
const { user, course, userCourse, outline } = require('../models');
const Course = db.course;
const User = db.user;
const Outline = db.outline;
const UserCourse = db.UserCourse;

exports.joinCourse = async (req, res, next) => {
 const {userId, courseId , expirationDate} = req.body;
 return await Course.findOne({
    where: {
        status: 'Published',
        id: courseId
    },
})
  .then((course) =>{
      if(!course) {
          console.log('Course not found!');
          res.status(401).json({message : {msgBody : "Course not found!", msgError: true}});
          return null;
      }
    return User.findByPk(userId)
      .then((user) =>{
          if(!user) {
              console.log('User not found!');
              res.status(401).json({message : {msgBody : "User not found!", msgError: true}});
              return null;
          }
          
          return Course.findByPk(courseId)
            .then((course) =>{
                if(!course) {
                    console.log('Course not found!');
                    res.status(401).json({message : {msgBody : "Course not found!", msgError: true}});
                    return null;
                }

                
                user.addSubscription(course, { through: { expirationDate: expirationDate }});
                console.log(`>>added Course title=${course.title} to User id=${user.id}`);
                res.status(200).json({message : {msgBody : "You have successfully registered for this course!", msgError: false}});
                return user;

            });
      })
      .catch((error) =>{
          console.log('>> Error while adding Course to User:', error);
      });
})};

exports.findAllSubscriptions  = async (req,res, next) =>{
    const userId= req.query.userId;
    var condition = userId ? {userId: {[Op.like]: `%${userId}%`}} : null;
    await userCourse.findAll({where: condition})
      .then(data=>{
        if(data == null){
          res.status(401).json({message : {msgBody : "no subscriptions found!", msgError: true}});
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

exports.userSubscriptions =  (req,res, next) =>{
const {id} = req.body;
 User.findByPk(id, {
     include: [{
         model: Course,
         as: 'subscriptions',
         attributes: ['title', 'description', 'duration', 'level','language', 'status'],
         through: {
            attributes: ['expirationDate'],
         }
     }]
 }).then((user) =>{
     if(!user){
        res.status(401).json({message : {msgBody : "No user found", msgError: true}});
     }
    if(user.subscriptions <= 0){
        res.status(400).json({message : {msgBody : "No Subscription found", msgError: true}});
    } else{
        res.status(200).send({
        
            subscriptions: user.subscriptions, 
            
              })
    }
 })
 .catch((err) => {
     console.log(err);
 })
};

exports.userActiveSubscriptions = async (req,res, next) =>{
    const id = req.body.id;
    await User.findByPk(id, {
         include: [{
             model: Course,
             as: 'subscriptions',
             attributes: ['title', 'description', 'duration', 'level','language', 'status', 'updatedAt', 'id', 'video'],
             through: {
                attributes: ['expirationDate'],
             }
         }
        ]
     }).then((user) =>{
         if(!user){
            res.status(401).json({message : {msgBody : "No user found", msgError: true}});
         }
        if(user.subscriptions <= 0){
            res.status(400).json({message : {msgBody : "No active subscription found", msgError: true}});
        } else{
            const today = new Date();
           const {subscriptions} = user;
           const activesubscriptions = subscriptions.filter(element => element.UserCourses.expirationDate > today);
            res.status(200).send({
                message: {msgBody : "Subscription found", msgError: false},
                activesubscriptions 
            })
    
           
        }
     })
     .catch((err) => {
         console.log(err);
     })
    };



      
      

