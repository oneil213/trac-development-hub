const db = require("../models");
const Instructor = db.instructor;


exports.createInstructor = (req, res) => {
    const data = {
      name: req.body.name,
      title: req.body.title
    };
    Instructor.findOne({
        where: {
            name: data.name
        },
    }).then(instructor =>{
      if(instructor)
      res.status(400).send({message : {msgBody : "Instructor already exists", msgError: true}});
      else {
          Instructor.create({
            title: data.title,
              name: data.name
          }).then(()=>{
              console.log('Instructor created in Db');
              res.status(201).send({message : {msgBody : "Instructor successfully created", msgError: false}});
          });
      }
    }).catch(err=>{
      res.status(500).send({
        message: err.message || 'some error occurred'
      });
    });
  
};

exports.findAllInstructors  = async (req,res, next) =>{
    const id = req.query.id;
    var condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
    await Instructor.findAll({where: condition})
      .then(data=>{
        if(data == null){
          res.status(401).json({message : {msgBody : "no instructor found!", msgError: true}});
        } else{
          res.status(200).send(data)
        }
      })
      .catch(err=>{
        res.status(500).send({
          message: err.message || 'some error occurred'
        });
      });
  };
  
exports.findInstructor = async (req, res, next) =>{
    const id = req.body.id;
    await Instructor.findByPk(id).then(data=>{
     if(data == null){
       res.status(401).json({message : {msgBody : "no instructor found!", msgError: true}});
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
   
 exports.updateInstructor = async (req, res) => {
  const id = req.body.id;

  await Instructor.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({message : {msgBody : "Instructor was updated successfully.", msgError: false}});

      } else {
        res.status(400).send({message : {msgBody : "Cannot update instructor.", msgError: true}});
      }
    })
    .catch(err => {
      res.status(500).send({message : {msgBody : "Error updating instructor.", msgError: true}});

    });
};


exports.deleteInstructor = async (req, res, next) =>{
  const id = req.body.id;
  await Instructor.destroy({
    where: {id: id},
    force: true
  }).then(num=>{
   if(num !== 1){
     res.status(401).json({message : {msgBody : "No instructor found!", msgError: true}});
   } else{
    res.status(200).send({message : {msgBody : "Instructor deleted", msgError: false}});
   }
  })
  .catch(err=>{
   res.status(500).send({
     message: err.message || 'some error occurred'
   });
 });

}

