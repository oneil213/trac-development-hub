const db = require("../models");
const {cloudinary} = require('../middlewares');
const { request, response } = require("express");
const Image = db.image;




exports.uploadCourseImage = async (req, res) =>{
        console.log(req.file);
        const imageUrl= req.file.path;
        const originalName = req.file.originalname;
        const {instructorId, userId, courseId, name} = req.body
      try {
        return await Image.findOne({
          where: {
           courseId: courseId
          },
        })
         .then((image) =>{
           if(image){
            console.log('Course has an image already');
            res.status(401).json({message : {msgBody : "Course banner exist already!", msgError: true}});
            return null;
           } else{
             return Image.create({
               courseId: courseId,
               url: imageUrl,
               instructorId: instructorId,
               userId: userId,
               name: name
             }).then(() =>{
              console.log('Image created in Db');
              res.status(201).json({message : {msgBody : "Image successfully uploaded", msgError: false}});
               
             })
           }
          
         })
     
      } catch (error) {
      console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
      }
  

};


exports.uploadInstructorImage = async (req, res) =>{
  console.log(req.file);
  const imageUrl= req.file.path;
  const originalName = req.file.originalname;
  const {instructorId, userId, courseId, name} = req.body
try {
  return await Image.findOne({
    where: {
    instructorId: instructorId,
    courseId: courseId
    },
  })
   .then((image) =>{
     if(image){
      console.log('user has an image already');
      return res.status(401).json({message : {msgBody : "Instructor image  exist already for this course!", msgError: true}});

     } else{
       return Image.create({
         courseId: courseId,
         url: imageUrl,
         instructorId: instructorId,
         userId: userId,
         name: name
       }).then(() =>{
        console.log('Image created in Db');
        res.status(201).json({message : {msgBody : "Image successfully uploaded", msgError: false}});
         
       })
     }
    
   })

} catch (error) {
console.error(error);
res.status(500).json({ message : {msgBody : "Something went wrong", msgError: true} });
}


};

exports.getInstructorImageUrl = async (req, res) =>{
 const {instructorId} = req.body;
try {
  return await Image.findOne({
    where:{
      instructorId: instructorId,
    }
  })
   .then((image) =>{
     if(!image) {
       console.log('Image not found');
       res.status(401).json({message : {msgBody : "Image not found!", msgError: true}});
       return null;
     }
     else {
       res.status(200).send({
        message : {msgBody : "Image found!", msgError: true},
        url: image.url
       })
     }
   })
  
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Something went wrong' }); 
}

}

exports.getCourseImageUrl = async (req, res) =>{
 const {courseId} = req.body;
try {
  return await Image.findOne({
    where:{
      courseId: courseId,
    }
  })
   .then((image) =>{
     if(!image) {
       console.log('Image not found');
       res.status(401).json({message : {msgBody : "Image not found!", msgError: true}});
       return null;
     }
     else {
       res.status(200).send({
        message : {msgBody : "Image found!", msgError: true},
        url: image.url
       })
     }
   })
  
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Something went wrong' }); 
}

}



exports.getCourseInstructor = async (req, res) =>{
  const {courseId} = req.body;
 try {
   return await Image.findOne({
     where:{
       courseId: courseId,
     }
   })
    .then((image) =>{
      if(!image) {
        console.log('Image not found');
        res.status(401).json({message : {msgBody : "Image not found!", msgError: true}});
        return null;
      }
      else {
        res.status(200).send({
         message : {msgBody : "Image found!", msgError: true},
         url: image.url,
         name: image.name,
         courseId: image.courseId,
         instructor: image.instructorId
        })
      }
    })
   
 } catch (error) {
   console.error(error);
   res.status(500).json({ error: 'Something went wrong' }); 
 }
 
 }