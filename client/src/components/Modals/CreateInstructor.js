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


function CreateInstructor(){
  const [createInstructor, setCreateInstructorModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState('');
  const [instructor, setInstructor] = useState({name: "", title: ""});
  const [message,setMessage] = useState(null);


  const API_URL = "http://localhost:8080/";
  const onChange = e =>{
    setInstructor({...instructor,[e.target.name] : e.target.value});
   }
   console.log(instructor);

   const resetForm = ()=>{
    setInstructor({title: '', name: ''});
    };

    useEffect(()=>{
      setCurrentUser(AuthService.getCurrentUser())
      
    },[]);

    const onSubmit = (e) =>{
      e.preventDefault();
      setIsLoading(true);
      setAlert('Creating Instructor...')
    setTimeout(() => {
      axios({
        method: 'post',
        url: API_URL + 'createinstructor',
         headers: {
            'x-access-token': currentUser.accessToken,
            'Content-Type': 'application/json'
        },
  
        data: {
            title: instructor.title,
            name: instructor.name
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
        onClick={() => setCreateInstructorModal(true)}
      >
        Create An Instructor
      </Button>
     
      <Modal
        isOpen={createInstructor}
        className="modal-lg"
        modalClassName="bd-example-modal-lg"
        toggle={() => setCreateInstructorModal(false)}
      >
        <div className="modal-header no-border-header text-center">
          <h4 className="modal-title" id="myLargeModalLabel">
            Create an Instructor
          </h4>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() => setCreateInstructorModal(false)}
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
            <label htmlFor="inputName">Name</label>
            <Input
              id="name"
              required
              name='name'
              onChange={onChange} 
              placeholder="Enter instructors name"
              type="text"
            ></Input>
          </FormGroup>    
        </div><br/>
        <div className="form-row">
          <FormGroup className="col-md-6 offset-md-3 ">
            <label htmlFor="inputTitle">Title</label>
            <Input name="title" required onChange={onChange}  id="title" placeholder="Enter instructors title" type="text"></Input>
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

export default CreateInstructor;