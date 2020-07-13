const db = require("../models");
const Course = db.course;
const Outline = db.outline;


  exports.createCourse = (req, res) => {
      const data = {
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration,
        level: req.body.level,
        language: req.body.language,
        status: req.body.status,
        price: req.body.price,
        video: req.body.video,
        createdby: req.body.createdby

      };
      Course.findOne({
          where: {
              title: data.title
          },
      }).then(course =>{
        if(course)
        res.status(400).send({message : {msgBody : "Course Already exists", msgError: true}});
        else {
            Course.create({

                title: data.title,
                description: data.description,
                title: data.title,
                description: data.description,
                duration: data.duration,
                level: data.level,
                language: data.language,
                status: data.status,
                price: data.price,
                video: data.video,
                createdby: req.body.createdby
            }).then(()=>{
                console.log('Course Created in Db');
                res.status(200).send({message : {msgBody : "Course successfully created", msgError: false}});
            });
        }
      })
      .catch(err => {
    
         res.status(501).send({message : {msgBody : err, msgError: true}});
     
         });
    
  };

  exports.findAllCourses  = async (req,res, next) =>{
    const id = req.query.id;
    var condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
    await Course.findAll({where: condition})
      .then(data=>{
        if(data == null){
          res.status(401).json({message : {msgBody : "no course found!", msgError: true}});
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

  exports.findAllPublishedCourses = (req, res) => {
    Course.findAll({ where: { status: 'Published' } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving courses."
        });
      });
  };

  exports.findAllDraftCourses = (req, res) => {
    Course.findAll(
      { where: { status: 'Draft' } }
    )
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving courses."
        });
      });
  };

  exports.findAllUserDraftCourses = (req, res) => {
    const {createdby} = req.body;
    Course.findAll({ 
      where: { 
        createdby: createdby,
        status: 'Draft'
       }
     })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving courses."
        });
      });
  };

  exports.findAllUserPublishedCourses = (req, res) => {
    const {userId} = req.body;
    Course.findAll({ 
      where: { 
        createdby: userId,
        status: 'Published'
       },
     })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving courses."
        });
      });
  };
  
  
  
  exports.findCourse = async (req, res, next) =>{
    const id = req.body.id;
    await Course.findByPk(id).then(data=>{
     if(data == null){
       res.status(401).send({message : {msgBody : "no course found!", msgError: true}});
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


 exports.deleteCourse = async (req, res, next) =>{
    const id = req.body.id;
    await Course.destroy({
      where: {id: id}
    }).then(num=>{
     if(num !== 1){
       res.status(401).json({message : {msgBody : "Course not found!", msgError: true}});
     } else{
      res.status(200).send({message : {msgBody : "Course deleted", msgError: false}});
     }
    })
    .catch(err=>{
     res.status(500).send({
       message: err.message || 'some error occurred'
     });
   });
  
  }
  
  exports.updateCourse = async (req, res) => {
    const id = req.body.id;
  
    await Course.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send({message : {msgBody : 'Course updated successfully', msgError: false}});

        } else {
          res.status(401).send({message : {msgBody : "Cannot update course", msgError: true}});

        }
      })
      .catch(err => {
        res.status(500).send({
          message : {msgBody : err.message || 'some error occurred', msgError: true}
        });
      });
  };
 
 
 