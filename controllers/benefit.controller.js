const db = require("../models");
const Benefit = db.benefit;
const Course = db.course;


exports.createBenefit = async (req, res) => {
    const data = {
      description: req.body.description,
      id: req.body.id
    };
   
    return await Course.findOne({
      where: {
          id: data.id
      },
  })
    .then((course) =>{
        if(!course) {
            console.log('Course not found!');
            res.status(401).json({message : {msgBody : "Course not found!", msgError: true}});
            return null;
        }
    
    return Benefit.findOne({
        where: {
            description: data.description
        },
    }).then(benefit =>{
  
      if(benefit)
      res.status(400).json({message : {msgBody : "Benefit already exists", msgError: true}});
      
      else {
          Benefit.create({

            courseId: data.id,
              description: data.description
          }).then(()=>{
              console.log('Benefit created in Db');
              res.status(201).json({message : {msgBody : "Benefit successfully created", msgError: false}});
          });
      }
    })
  
})};

exports.findCourseBenefits  = async (req,res, next) =>{
  const courseId = req.body.courseId; 
  return await Course.findOne({
    where: {
        id: courseId
    },
})
  .then((course) =>{
      if(!course) {
          console.log('Course not found!');
          res.status(401).json({message : {msgBody : "Course not found!", msgError: true}});
          return null;
      } 
  return Benefit.findAll({where: {courseId: courseId}})
    .then(data=>{
      if(data == null){
        res.status(401).json({message : {msgBody : "no benefit found!", msgError: true}});
      } else{
        const allBenefits = data;
        const courseBenefits = allBenefits.filter(element => element.courseId = courseId)
        res.status(200).send(courseBenefits)
      }
    })
    .catch(err=>{
      res.status(500).send({
        message: err.message || 'some error occurred'
      });
    });
})};


exports.deleteBenefit = async (req, res, next) =>{
  const id = req.body.id;
  await Benefit.destroy({
    where: {id: id}
  }).then(num=>{
   if(num !== 1){
     res.status(401).json({message : {msgBody : "no benefit found!", msgError: true}});
   } else{
    res.status(200).send({message : {msgBody : "Benefit deleted", msgError: false}});
   }
  })
  .catch(err=>{
   res.status(500).send({
     message: err.message || 'some error occurred'
   });
 });

}

