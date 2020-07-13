import React, {useState, useEffect}from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import axios from "axios";

// reactstrap components
import { Button,
    Form,
    FormGroup,
    Input,Modal} from "reactstrap";
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

function CreateCourse(){
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [createCourseModal, setCreateCourseModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState('');
  const [course, setCourse] = useState({title : '', price : '', description : '', duration :  '', language : '', level : '', status : 'Draft', video : '', createdby : currentUser.id});
  const [message,setMessage] = useState(null);

  

  const API_URL = "http://localhost:8080/";
  const onChange = e =>{
    setCourse({...course,[e.target.name] : e.target.value});
 
   }
   console.log(course);

   const resetForm = ()=>{
    setCourse({title: '', price: '', description: '', duration: '',language: '',level: '',status: '',video: '',createdby: ''});
  };


  useEffect(()=>{
    setCurrentUser(AuthService.getCurrentUser())
    
  },[]);


  const onSubmit = (e) =>{
      e.preventDefault();
      setIsLoading(true);
      setAlert('Creating Course...')
    setTimeout(() => {
      axios({
        method: 'post',
        url: API_URL + 'createcourse',
         headers: {
            'x-access-token': currentUser.accessToken,
            'Content-Type': 'application/json'
        },
  
        data: {
            title: course.title,
            price: course.price,
            description: course.description,
            duration: course.duration,
            language: course.language,
            level: course.level,
            status: course.status,
            video: course.video,
            createdby: course.createdby
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
        onClick={() => setCreateCourseModal(true)}
      >
        Create A Course
      </Button>
     
      <Modal
        isOpen={createCourseModal}
        className="modal-lg"
        modalClassName="bd-example-modal-lg"
        toggle={() => setCreateCourseModal(false)}
      >
        <div className="modal-header no-border-header text-center">
          <h4 className="modal-title" id="myLargeModalLabel">
            Create a Course
          </h4>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() => setCreateCourseModal(false)}
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
              <FormGroup className="col-md-6">
                <label htmlFor="inputTitle">Title</label>
                <Input    required onChange={onChange} id="title" name='title' placeholder="Enter course title" type="text"></Input>
              </FormGroup>
              <FormGroup className="col-md-6">
                <label htmlFor="inputDuration">Duration(mins)</label>
                <Input
                  id="inputDuration"
                  required
                  name="duration"
                  onChange={onChange} 
                  placeholder="Enter course video duration eg 120.00"
                  type="text"
                ></Input>
              </FormGroup>
            </div><br/>
            <div className="form-row">
              <FormGroup className="col-md-6">
                <label htmlFor="inputLanguage">Language</label>
                <Input   required onChange={onChange}  name="language" id="language" placeholder="Enter course delivery language" type="text"></Input>
              </FormGroup>
              <FormGroup className="col-md-6">
                <label htmlFor="inputStatus">Status</label>
                <Input   required onChange={onChange}   value ='Draft' name="status" id="status" type="text"></Input>
              </FormGroup>

            </div><br/>
            <div className="form-row">
              <FormGroup className="col-md-6">
                <label htmlFor="inputCreatedby">Createdby</label>
                <Input    required onChange={onChange} value= {currentUser.id} name="createdby" id="createdby" type="text"></Input>
              </FormGroup>
              <FormGroup className="col-md-6">
                <label htmlFor="inputVideo">VideoLink</label>
                <Input  required onChange={onChange}  name="video" id="video" placeholder="Enter course video link"    type="url"></Input>
              </FormGroup>
            </div><br/>
            <div>
            <FormGroup className="">
                <label htmlFor="inputDescription">Description</label>
                <Input   required  onChange={onChange}  name="description" id="Description" type="textarea" placeholder="Enter course description" ></Input>
              </FormGroup>
            </div> <br/>
            <div className="form-row">
              <FormGroup className="col-md-4">
                <label htmlFor="inputLevel">Course Level</label>
                <Input  onChange={onChange}  name="level" id="inputLevel" type="select" required >
                <option selected="" value=''>Choose...</option>
                  <option  value='Beginner'>Beginner</option>
                  <option  value='Advance'>Advance</option>
                  <option  value='Intermediate'>Intermediate</option>
                </Input>
              </FormGroup>
             
              <FormGroup className="col-md-2">
                <label htmlFor="inputPrice">Price</label>
                <Input  required onChange={onChange}  name="price"id="inputPrice" type="text" placeholder="Enter price" ></Input>
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
                  
                    <div className="modal-body"></div>
                  </Modal>
                </>
  );
}

export default CreateCourse;



