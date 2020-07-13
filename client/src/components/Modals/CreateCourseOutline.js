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


function CreateCourseOutline(){
  const [createCourseOutlineModal, setCreateCourseOutlineModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState('');
  const [outline, setOutline] = useState({title : '', courseId : '', description : ''});
  const [message,setMessage] = useState(null);

  const API_URL = "http://localhost:8080/";

  const onChange = e =>{
    setOutline({...outline,[e.target.name] : e.target.value});
    console.log(outline);
   }

   const resetForm = ()=>{
    setOutline({title : '', courseId : '', description : ''});
  };
  
  useEffect(()=>{
    setCurrentUser(AuthService.getCurrentUser())
    
  },[]);


  const onSubmit = (e) =>{
    e.preventDefault();
    setIsLoading(true);
    setAlert('Creating Outline...')
  setTimeout(() => {
    axios({
      method: 'post',
      url: API_URL + 'createoutline',
       headers: {
          'x-access-token': currentUser.accessToken,
          'Content-Type': 'application/json'
      },

      data: {
          title: outline.title,
          courseId: outline.courseId,
          description: outline.description,
  
      }
  }).then(response =>{
    console.log(response)
    setMessage(response.data.message)
    setAlert('')
    resetForm();
    setIsLoading(false);
   setTimeout(()=>{
    window.location.reload(false);
   }, 1500)
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
        onClick={() => setCreateCourseOutlineModal(true)}
      >
        Create A Course Outline
      </Button>
     
      <Modal
        isOpen={createCourseOutlineModal}
        className="modal-lg"
        modalClassName="bd-example-modal-lg"
        toggle={() => setCreateCourseOutlineModal(false)}
      >
        <div className="modal-header no-border-header text-center">
          <h4 className="modal-title" id="myLargeModalLabel">
            Create a Course Outline
          </h4>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() => setCreateCourseOutlineModal(false)}
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
              <Input  required onChange={onChange} name ='courseId' id="courseId" placeholder="Enter the id of the course for this outline" type="text"></Input>
            </FormGroup>       
           <hr style={{height: '2px', }}/>
          <div className="form-row">
            <FormGroup className="col-md-6 offset-md-3 ">
              <label htmlFor="inputTitle">Title</label>
              <Input   required onChange={onChange}  name='title' id="title" placeholder="Enter a module title" type="text"></Input>
            </FormGroup>
          </div><br/>
      
          <FormGroup className="">
              <label htmlFor="inputDescription">Description</label>
              <Input  required onChange={onChange}  name='description' id="Description" type="textarea"cols="33" 
             rows="5"  placeholder="Enter  module outlines"  multiline></Input>
            </FormGroup>
          <br/>
  
          <Button color="primary" type="submit" style={{backgroundColor: '#EF6D1A'}}>
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

export default CreateCourseOutline;