import React, {useState, useEffect}from "react";
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


function DeleteCourse(){
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState('');
  const [course, setCourse] = useState({id: ""});
  const [message,setMessage] = useState(null);
  const [deleteCourseModal,setDeleteCourseModal] = useState(false);

  const API_URL = "http://localhost:8080/";

  const onChange = e =>{
    setCourse({...course,[e.target.name] : e.target.value});
   }
   console.log(course);

   const resetForm = ()=>{
    setCourse({id: ''});
  };

    useEffect(()=>{
      setCurrentUser(AuthService.getCurrentUser())
      
    },[]);

    const onSubmit = (e) =>{
      e.preventDefault();
      setIsLoading(true);
      setAlert('Deleting course...')
    setTimeout(() => {
      axios({
        method: 'delete',
        url: API_URL + 'deletecourse',
         headers: {
            'x-access-token': currentUser.accessToken,
            'Content-Type': 'application/json'
        },
  
        data: {
            id: course.id
        
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
        onClick={() =>setDeleteCourseModal(true)}
      >
      Delete A Course
      </Button>
     
      <Modal
        isOpen={deleteCourseModal}
        className="modal-lg"
        modalClassName="bd-example-modal-lg"
        toggle={() =>setDeleteCourseModal(false)}
      >
        <div className="modal-header no-border-header text-center">
          <h4 className="modal-title" id="myLargeModalLabel">
            Delete a Course
          </h4>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() =>setDeleteCourseModal(false)}
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
        <FormGroup className="col-md-6 offset-md-3 ">
            <label htmlFor="inputTitle">CourseId</label>
            <Input onChange={onChange}  id="id" name='id' required placeholder="Enter the id of the course you want to delete" type="text"></Input>
          </FormGroup>
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

export default DeleteCourse;