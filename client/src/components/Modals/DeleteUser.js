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



function DeleteUser(){
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState('');
  const [user, setUser] = useState({id: ""})
  const [deleteUserModal,setDeleteUserModal] = useState(false);
  const [message,setMessage] = useState(null);

  const API_URL = "http://localhost:8080/";
  const onChange = e =>{
    setUser({...user,[e.target.name] : e.target.value});
   }
   console.log(user);
  
   const resetForm = ()=>{
    setUser({id: ''});
  };
 

  useEffect(()=>{
    setCurrentUser(AuthService.getCurrentUser())
    
  },[]);


  const onSubmit = (e) =>{
    e.preventDefault();
    setIsLoading(true);
    setAlert('Deleting user...')
  setTimeout(() => {
    axios({
      method: 'delete',
      url: API_URL + 'deleteuser',
       headers: {
          'x-access-token': currentUser.accessToken,
          'Content-Type': 'application/json'
      },

      data: {
          id: user.id
      
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
        onClick={() =>setDeleteUserModal(true)}
      >
      Delete A User
      </Button>
     
      <Modal
        isOpen={deleteUserModal}
        className="modal-lg"
        modalClassName="bd-example-modal-lg"
        toggle={() =>setDeleteUserModal(false)}
      >
        <div className="modal-header no-border-header text-center">
          <h4 className="modal-title" id="myLargeModalLabel">
            Delete a User
          </h4>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() =>setDeleteUserModal(false)}
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
            <label htmlFor="inputUserId">UserId</label>
            <Input  required id="id" name='id'  onChange={onChange}  placeholder="Enter the id of the user you want to delete" type="text"></Input>
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

export default DeleteUser;