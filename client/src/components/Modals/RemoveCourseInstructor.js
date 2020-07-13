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

function RemoveCourseInstructor(){
  const [removeCourseInstructorModal, setRemoveCourseInstructorModal] = useState(false);
  const [lectureId, setLectureId] = useState({id: ''});
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);
  const [message,setMessage] = useState(null);
  const [alert, setAlert] = useState('');
  

  const API_URL = "http://localhost:8080/";
  const onChange = e =>{
    setLectureId({...lectureId,[e.target.name] : e.target.value});
   }
   console.log(lectureId);

   const resetForm = ()=>{
    setLectureId({id: ''});
  };
 

   

   useEffect(()=>{
    setCurrentUser(AuthService.getCurrentUser())
    
  },[]);
 
  
  const onSubmit = (e) =>{
    e.preventDefault();
    setIsLoading(true);
    setAlert('Deleting lecture...')
  setTimeout(() => {
    axios({
      method: 'delete',
      url: API_URL + 'droplecture',
       headers: {
          'x-access-token': currentUser.accessToken,
          'Content-Type': 'application/json'
      },

      data: {
        lectureid: lectureId.id
      
      }
  }).then(response =>{
    console.log(response)
    setMessage(response.data.message)
    setAlert('')
    resetForm();
    setIsLoading(false);
    setTimeout(()=>{
      window.location.reload(false);
     }, 1000)
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
        onClick={() => setRemoveCourseInstructorModal(true)}
      >
       Remove lecture
      </Button>
     
      <Modal
        isOpen={removeCourseInstructorModal}
        className="modal-lg"
        modalClassName="bd-example-modal-lg"
        toggle={() => setRemoveCourseInstructorModal(false)}
      >
        <div className="modal-header no-border-header text-center">
          <h4 className="modal-title" id="myLargeModalLabel">
            Sure you want to remove course?
          </h4>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() => setRemoveCourseInstructorModal(false)}
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
        <Form  onSubmit={onSubmit}>
        <div className="form-row">
        <FormGroup className="col-md-6 offset-md-3 ">
            <label htmlFor="lectureId">LectureId</label>
            <Input
              id="id"
              name='id'
              onChange={onChange} 
              required
              type="text"
            ></Input>
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

export default RemoveCourseInstructor;