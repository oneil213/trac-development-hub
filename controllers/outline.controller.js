const db = require("../models");
const Outline = db.outline;
const Course = db.course;


exports.createOutline = async (req, res) => {
    const data = {
      title: req.body.title,
      description: req.body.description,
      courseId: req.body.courseId
    };
    return await Course.findOne({
      where: {
          id: data.courseId
      },
  })
    .then((course) =>{
        if(!course) {
            console.log('Course not found!');
            res.status(401).send({message : {msgBody : "Course not found!", msgError: true}});
            return null;
        }
    return Outline.findOne({
        where: {
            description: data.description
        },
    }).then(description =>{
      if(description)
      res.status(400).send({message : {msgBody : "Outline already exists", msgError: true}});
      else {
          Outline.create({

            courseId: data.courseId,
            title: data.title,
            description: data.description
          }).then(()=>{
              console.log('Outline created in Db');
              res.status(201).send({message : {msgBody : "Outline successfully created", msgError: false}});
          });
      }
    }).catch(err => {
    
      res.status(501).send({message : {msgBody : err, msgError: true}});
  
      });
  
})};

exports.findCourseOutlines  = async (req,res, next) =>{
  const courseId = req.body.courseId;  
  
  return await Course.findOne({
        where: {
            id: courseId
        },
    })
  .then((course) =>{
      if(!course) {
          console.log('Course not found!');
          res.status(401).send({message : {msgBody : "Course not found!", msgError: true}});
          return null;
      }
  return Outline.findAll({where: {courseId: courseId}})
    .then(data=>{
      if(data == null){
        res.status(401).send({message : {msgBody : "No outline found!", msgError: true}});
      } else{
        res.status(200).send({
          CourseOutlines : data
        })
      }
    })
    .catch(err=>{
      res.status(500).send({
        message: err.message || 'some error occurred'
      });
    });
})}

exports.updateCourseOutline = async (req, res) => {
  const id = req.body.id;

  await Outline.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({message : {msgBody : 'Outline updated successfully', msgError: false}});
        
      } else {
        res.status(401).send({message : {msgBody : "Could not update outline", msgError: true}});

      }
    })
    .catch(err => {
      res.status(500).send({
        message : {msgBody : err.message || 'some error occurred', msgError: true}
      });
    });
};

  
exports.findOutline = async (req, res, next) =>{
  const id = req.body.id;
  await Outline.findByPk(id).then(data=>{
   if(data == null){
     res.status(401).send({message : {msgBody : "No outline found!", msgError: true}});
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


exports.deleteOutline = async (req, res, next) =>{
  const id = req.body.id;
  await Outline.destroy({
    where: {id: id}
  }).then(num=>{
   if(num !== 1){
     res.status(401).json({message : {msgBody : "No outline found!", msgError: true}});
   } else{
    res.status(200).send({message : {msgBody : "Outline deleted", msgError: false}});
   }
  })
  .catch(err=>{
   res.status(500).send({
     message: err.message || 'some error occurred'
   });
 });

}

