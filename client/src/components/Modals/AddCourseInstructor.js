import React , {useEffect, useState}from 'react';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import axios from "axios";
// reactstrap components
import { Button,
    Form,
    FormGroup,
    Input,Modal } from "reactstrap";
// core components
import AuthService from 'services/auth.service';
import * as legoData from '../../twirl.json';
import Message from '../Message';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
  preserveAspectRatio: "xMidYMid slice"
  }
}


function AddCourseInstructor(){
  const [addCourseInstructorModal, setAddCourseInstructorModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState('');
  const [lecture, setLecture] = useState({courseId : '', instructorId: ''});
  const [message,setMessage] = useState(null);
  const API_URL = "http://localhost:8080/";
  const onChange = e =>{
    setLecture({...lecture,[e.target.name] : e.target.value});
 
   }
   console.log(lecture);

   const resetForm = ()=>{
    setLecture({courseId : '', instructorId: ''});
  };

  useEffect(()=>{
    setCurrentUser(AuthService.getCurrentUser())
    
  },[]);

  const onSubmit = (e) =>{
    e.preventDefault();
    setIsLoading(true);
    setAlert('Creating Lecture...')
  setTimeout(() => {
    axios({
      method: 'post',
      url: API_URL + 'takelecture',
       headers: {
          'x-access-token': currentUser.accessToken,
          'Content-Type': 'application/json'
      },

      data: {
        instructorId: lecture.instructorId,
        courseId: lecture.courseId
      }
  }).then(response =>{
    console.log(response)
    setMessage(response.data.message)
    setAlert('')
    resetForm();
    setIsLoading(false);
  },
  error => {
    console.log(error)
    const resMessage = error.response.data.message;
    setAlert('')
    resetForm();
    setIsLoading(false);
    setMessage(resMessage)
  
  }
  ).catch(error =>{
    console.log(error)
    setMessage(error)
    setAlert('')
    setIsLoading(false);
 
  
    })

   
  }, 3000);

}

  return (
    <>
      <Button
        color="primary"
        style={{backgroundColor: '#EF6D1A'}}
        type="button"
        onClick={() => setAddCourseInstructorModal(true)}
      >
        Add Course Instructor
      </Button>
     
      <Modal
        isOpen={addCourseInstructorModal}
        className="modal-lg"
        modalClassName="bd-example-modal-lg"
        toggle={() => setAddCourseInstructorModal(false)}
      >
        <div className="modal-header no-border-header text-center">
          <h4 className="modal-title" id="myLargeModalLabel">
            Add an Instructor to a Course
          </h4>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() => setAddCourseInstructorModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        {isLoading === true? (
           <FadeIn>
           <div className="container" >
            <p className="text-success content-center text-center">{alert}</p>
           <Lottie options={defaultOptions} height={200} width={200}   />
                               
           </div>
         </FadeIn>
        ) :(
        <div className="section content-center text-center" style={{margin:'10px'}}>
        <Form onSubmit={onSubmit}>
        <div className="form-row">
        <FormGroup className="col-md-6 offset-md-3 ">
            <label htmlFor="inputInstructorId">InstructorId</label>
            <Input
              id="inputInstructorId"
              name='instructorId'
              onChange={onChange} 
              placeholder="Enter instructor id"
              type="text"
            ></Input>
          </FormGroup>    
        </div><br/>
        <div className="form-row">
          <FormGroup className="col-md-6 offset-md-3 ">
            <label htmlFor="inputCourseId">CourseId</label>
            <Input onChange={onChange}  required name ='courseId' id="courseId" placeholder="Enter course id" type="text"></Input>
          </FormGroup>      
        </div><br/>
        <Button 
            color="primary" 
            type="submit" 
            style={{backgroundColor: '#EF6D1A'}}>
              Submit
            </Button>
            {message ? <Message message={message}/> : null}
      </Form>
      
        </div>
        )}
                  
        <div className="modal-body">...</div>
      </Modal>
    </>
  );
}

export default AddCourseInstructor;