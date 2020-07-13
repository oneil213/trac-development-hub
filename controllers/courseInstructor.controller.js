const db = require('../models');
const Course = db.course;
const Instructor = db.instructor;
const CourseInstructor = db.courseInstructor;


exports.joinCourse = async (req, res, next) => {
 const {instructorId, courseId } = req.body;
    return await Instructor.findByPk(instructorId)
      .then((instructor) =>{
          if(!instructor) {
              console.log('Instructor not found!');
              res.status(401).json({message : {msgBody : "Instructor not found!", msgError: true}});
              return null;
          }
          
          return Course.findByPk(courseId)
            .then((course) =>{
                if(!course) {
                    console.log('Course not found!');
                    res.status(401).json({message : {msgBody : "Course not found!", msgError: true}});
                    return null;
                }

                
                instructor.addLecture(course);
                console.log(`>>added Course title=${course.title} to Lecturer id=${instructor.id}`);
                res.status(200).json({message : {msgBody : "You are now a facilitator on this course!", msgError: false}});
                return instructor;

            });
      })
      .catch((error) =>{
          console.log(' Error while adding course to instructor', error);
      });
}

exports.findAllLectures  = async (req,res, next) =>{
    const lectureid = req.query.lectureid;
    var condition = lectureid ? {lectureid: {[Op.like]: `%${lectureid}%`}} : null;
    await CourseInstructor.findAll({where: condition})
      .then(data=>{
        if(data == null){
          res.status(401).json({message : {msgBody : "no lecture found!", msgError: true}});
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


exports.instructorLectures =  (req,res, next) =>{
const {id} = req.body;
 Instructor.findByPk(id, {
     include: [{
         model: Course,
         as: 'lectures',
         attributes: [ 'title', 'description', 'duration', 'level','language', 'status'],
         through: {
            attributes: ['lectureid'],
         }
     }]
 }).then((instructor) =>{
     if(!instructor){
         console.log('No instructor found')
        res.status(401).json({message : {msgBody : "No instructor found", msgError: true}});
     }
    if(instructor.lectures <= 0){
        res.status(400).json({message : {msgBody : "No lectures found", msgError: true}});
    } else{
        res.status(200).send({
        
            lectures: instructor.lectures, 
            
              })
    }
 })
 .catch((err) => {
     console.log(err);
 })
};

exports.instructorActiveLectures = async (req,res, next) =>{
    const id = req.body.id;
    await Instructor.findByPk(id, {
         include: [{
             model: Course,
             as: 'lectures',
             attributes: [ 'title', 'description', 'duration', 'level','language', 'status'],
             through: {
                attributes: ['lectureid'],
             }
         }]
     }).then((instructor) =>{
         if(!instructor){
            res.status(401).json({message : {msgBody : "No instructor found", msgError: true}});
         }
        if(instructor.lectures <= 0){
            res.status(400).json({message : {msgBody : "No lectures found", msgError: true}});
        } else{
          
           const {lectures} = instructor;
           const activeLectures = lectures.filter(element => element.status == 'Published');
            res.status(200).send({
    
              activeLectures
            })
    
           
        }
     })
     .catch((err) => {
         console.log(err);
     })
    };

exports.instructorDraftLectures = async (req,res, next) =>{
        const id = req.body.id;
        await Instructor.findByPk(id, {
             include: [{
                 model: Course,
                 as: 'lectures',
                 attributes: [ 'title', 'description', 'duration', 'level','language', 'status'],
                 through: {
                    attributes: ['lectureid'],
                 }
             }]
         }).then((instructor) =>{
             if(!instructor){
                res.status(401).json({message : {msgBody : "No instructor found", msgError: true}});
             }
            if(instructor.lectures <= 0){
                res.status(400).json({message : {msgBody : "No lectures found", msgError: true}});
            } else{
              
               const {lectures} = instructor;
               const draftLectures = lectures.filter(element => element.status == 'Draft');
                res.status(200).send({
        
                  draftLectures
                })
        
               
            }
         })
         .catch((err) => {
             console.log(err);
         })
        };
    
exports.removeInstructor = async (req, res, next) =>{
            const lectureid = req.body.lectureid;
            await CourseInstructor.destroy({
              where: {
                lectureid: lectureid
              },
              force: true
            }).then(num=>{
             if(num !== 1){
               res.status(401).json({message : {msgBody : "No lecture found!", msgError: true}});
             } else{
              res.status(200).send({message : {msgBody : "You no longer facilitate this course.", msgError: false}});
             }
            })
            .catch(err=>{
             res.status(500).send({
               message: err.message || 'some error occurred'
             });
           });
          
          }

