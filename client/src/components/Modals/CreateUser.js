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


function CreateUser(){
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [createUserModal, setCreateUserModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState('');
  const [user,setUser] = useState({username: "", password : "P@55w0rd305",  email : "" , firstname: "", lastname: "" });
  const [message,setMessage] = useState(null);

  const API_URL = "http://localhost:8080/";
  const onChange = e =>{
    setUser({...user,[e.target.name] : e.target.value});
  
    };

    console.log(user);
  
    const resetForm = ()=>{
      setUser({username: "",  email : "", firstname: "", lastname: "" , password : "P@55w0rd305" });
    }

  useEffect(()=>{
      setCurrentUser(AuthService.getCurrentUser())
      
    },[]);  
   



    const onSubmit = (e) =>{
      e.preventDefault();
      setIsLoading(true);
      setAlert('Creating user...')
    setTimeout(() => {
      axios({
        method: 'post',
        url: API_URL + 'signup',
         headers: {
            'x-access-token': currentUser.accessToken,
            'Content-Type': 'application/json'
        },
  
        data: {
            firstname: user.firstname,
            username: user.username,
            email: user.email,
            roles: ["user"],
            lastname: user.lastname,
            password: user.password

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
        onClick={() => setCreateUserModal(true)}
      >
        Create A User
      </Button>
     
      <Modal
        isOpen={createUserModal}
        className="modal-lg"
        modalClassName="bd-example-modal-lg"
        toggle={() => setCreateUserModal(false)}
      >
        <div className="modal-header no-border-header text-center">
          <h4 className="modal-title" id="myLargeModalLabel">
            Create a User
          </h4>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() => setCreateUserModal(false)}
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
        <Form onSubmit={onSubmit} multiple>
        <div className="form-row">
          <FormGroup className="col-md-6">
            <label htmlFor="inputFirstname">FirstName</label>
            <Input required name='firstname' onChange={onChange}  id="firstname" placeholder="Enter user firstname" type="text"></Input>
          </FormGroup>
          <FormGroup className="col-md-6">
            <label htmlFor="inputLastName">LastName</label>
            <Input
              id="inputLastname"
              name="lastname"
           
              onChange={onChange} 
              placeholder="Enter user lastname"
              type="text"
              required
            ></Input>
          </FormGroup>
        </div><br/>
        <div className="form-row">
          <FormGroup className="col-md-6">
            <label htmlFor="inputUsername">Username</label>
            <Input required onChange={onChange}  name= 'username' id="username" placeholder="Enter username" type="text"></Input>
          </FormGroup>
          <FormGroup className="col-md-6">
            <label htmlFor="inputEmail">Email</label>
            <Input
              onChange={onChange} 
              id="inputEmail"
              name="email"

              type="email"
              placeholder="Enter user email"
              required
            ></Input>
          </FormGroup>
        </div><br/>
        
        <div className="form-row">
          <FormGroup className="col-md-6">
            <label htmlFor="inputPassword">Password</label>
            <Input required value='P@55w0rd305' onChange={onChange}  name='password' id="password" type="password"></Input>
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

export default CreateUser;