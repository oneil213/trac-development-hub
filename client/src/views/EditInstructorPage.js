import React, {useState, useEffect}from "react";
import {useParams} from 'react-router-dom';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import axios from "axios";

// reactstrap components
import { Button,
    Form,
    FormGroup,
    Input,
    Container,
 
         } from "reactstrap";
// core components
import TracNavbar from 'components/Navbars/TracNavbar';
import TacFooter from '../components/Footers/TracFooter';
import AuthService from 'services/auth.service';
import * as legoData from '../../src/twirl.json';
import Message from 'components/Message';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: legoData.default,
    rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
    }
  }
  

function EditInstructorPage(props) {
     
    let instructorId = new useParams({}).id;
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState('Loading instructor');
    const [currentInstructor] = useState({ id: null, title : '', name: ''});
    const [instructor, setInstructor] = useState(currentInstructor);
    const [message,setMessage] = useState();
    const API_URL = "http://localhost:8080/";

    const onChange = e =>{
        setInstructor({...instructor,[e.target.name] : e.target.value});
       
       }

       console.log(instructor);

  useEffect(()=>{
    setCurrentUser(AuthService.getCurrentUser())
    
  },[]);


  const onSubmit = (e) =>{
    e.preventDefault();
    setIsLoading(true);
    setAlert('Updating instructor...')
  setTimeout(() => {
    axios({
      method: 'put',
      url: API_URL + 'updateinstructor',
       headers: {
          'x-access-token': currentUser.accessToken,
          'Content-Type': 'application/json'
      },
      
     data: {
        id: instructor.id,
        title: instructor.title,
        name: instructor.name
     
     }
  
  }).then(response =>{
    console.log(response)
    setMessage(response.data.message)
    setAlert('');
    setIsLoading(false);
   },
  error => {
    console.log(error)
    const resMessage = error.response.data.message;
    setAlert('');

    setIsLoading(false);
    setMessage(resMessage)
  
  }
  ).catch(error =>{
    console.log(error)
    setMessage(error.message)
    setAlert('')
    setIsLoading(false);
 
  
    })

   
  }, 3000);

}


  useEffect(()=>{

    setTimeout(() => {
      try {
        axios({
          method: 'post',
          url: API_URL + 'instructor',
          data: {
            id: instructorId
          },
          headers: {
    
            'Content-Type' : 'application/json'
          }
    
        }).then(response =>{
            console.log(response)
          setInstructor(response.data);
            setAlert('');
            setIsLoading(false)
        },
        error => {
            console.log(error)
            const resMessage = error.response.data.message;
            setIsLoading(false);
            setMessage(resMessage)
          
          }
       )   
        
       } catch (error) {
        console.log(error)
        setMessage(error.message)
        setAlert('')
        setIsLoading(false);
       }

    }, 3000);
  
    },[instructorId]);




  useEffect(() => {
        document.body.classList.add("profile-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        return function cleanup() {
          document.body.classList.remove("profile-page");
          document.body.classList.remove("sidebar-collapse");
        };
      });



    return (
        <>
       <TracNavbar />
       <div className="wrapper">
           <div className="section content-center text-center ">
               <Container>
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
        <div style={{marginTop:'20px'}}>
          <h5 className="modal-title" id="myLargeModalLabel" >
            Please edit only the fields you choose to update.
          </h5>
          </div>
          
         <hr style={{height: '2px', }}/>
         <div className="form-row">
          <FormGroup className="col-md-6 offset-md-3 ">
            <label htmlFor="inputTitle">Title</label>
            <Input value={instructor.title} onChange={onChange}  name='title' id="title" type="text" className="form-control"></Input>
          </FormGroup>
        </div><br/>
    
        <FormGroup className="">
            <label htmlFor="inputName">Name</label>
            <Input value={instructor.name} onChange={onChange}  name='name' id="name" type="text" ></Input>
          </FormGroup>
        <br/>
        
        <Button color="primary" type="submit" style={{backgroundColor: '#EF6D1A'}}>
         Update Instructor
        </Button>
        {message ? <Message message={message}/> : null}
      </Form>
        </div>
                    )}
               </Container>
          
               
             
           </div>
    
       
       <TacFooter/>
       </div>
            
        </>
    );
}

export default EditInstructorPage;

