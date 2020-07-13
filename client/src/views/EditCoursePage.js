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
  

function EditCoursePage(props) {
     
    let courseId = new useParams({}).id;
   const id = courseId;
   console.log(id);
  
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState('Loading Course');
    const [currentCourse] = useState({ id: null, title : '', price : '', description : '', duration :  '', language : '', level : '', status : 'Draft', video : ''});
    const [course, setCourse] = useState(currentCourse);
    const [message,setMessage] = useState(null);
    const API_URL = "http://localhost:8080/";

    const onChange = e =>{
        setCourse({...course,[e.target.name] : e.target.value});
       
       }

       console.log(course);

  useEffect(()=>{
    setCurrentUser(AuthService.getCurrentUser())
    
  },[]);


  const onSubmit = (e) =>{
    e.preventDefault();
    setIsLoading(true);
    setAlert('Updating Course...')
  setTimeout(() => {
    axios({
      method: 'put',
      url: API_URL + 'updatecourse',
       headers: {
          'x-access-token': currentUser.accessToken,
          'Content-Type': 'application/json'
      },
      
     data: {
      id: course.id,
      title: course.title,
      price: course.price,
      description: course.description,
      duration: course.duration,
      language: course.language,
      level: course.level,
      status: currentCourse.status,
      video: course.video
     }
  
  }).then(response =>{
    console.log(response)
    setMessage(response.data.message)
    setAlert('');
    setIsLoading(false);
  //  setTimeout(()=>{
  //   window.location.reload(false);
  //  }, 1500)
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
    setMessage(error)
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
          url: API_URL + 'course',
          data: {
            id: courseId
          },
          headers: {
    
            'Content-Type' : 'application/json'
          }
    
        }).then(response =>{
            console.log(response)
          setCourse(response.data);
            setAlert('');
            setIsLoading(false)
        },
        error => {
            console.log(error.response.data.message)
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
  
    },[courseId]);




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
          <FormGroup className="col-md-6">
            <label htmlFor="inputTitle">Title</label>
            <Input value = {course.title} onChange={onChange}  name ='title' id="title" type="text"   className="form-control"></Input>
          </FormGroup>
          <FormGroup className="col-md-6">
            <label htmlFor="inputDuration">Duration</label>
            <Input
              id="inputDuration"
              value = {course.duration}
              onChange={onChange} 
              name='duration'
              type="text"
            ></Input>
          </FormGroup>
        </div><br/>
        <div className="form-row">
          <FormGroup className="col-md-6">
            <label htmlFor="inputLanguage">Language</label>
            <Input value = {course.language} onChange={onChange}  name='language' id="language"  type="text"></Input>
          </FormGroup>
        </div><br/>
        <div>
        <FormGroup className="">
            <label htmlFor="inputDescription">Description</label>
            <Input  value={course.description} onChange={onChange}  name='description' id="Description" type="textarea" ></Input>
          </FormGroup>
         
        </div> <br/>
        <div className="form-row">
          <FormGroup className="col-md-6">
            <label htmlFor="inputVideo">VideoLink</label>
            <Input value={course.video} onChange={onChange}  name='video' id="video" type="text"></Input>
          </FormGroup>
          <FormGroup className="col-md-4">
            <label htmlFor="inputLevel">Course Level</label>
            <Input value={course.level} onChange={onChange}  name='level' id="inputLevel" type="select">
              <option value='Beginner'>Beginner</option>
              <option value='Advance'>Advance</option>
              <option value='Intermediate'>Intermediate</option>
            </Input>
          </FormGroup>
          <FormGroup className="col-md-2">
            <label htmlFor="inputPrice">Price</label>
            <Input  value={course.price} onChange={onChange}  name='price' id="inputPrice" type="text" ></Input>
          </FormGroup>
        </div><br/>
        
        
        <Button color="primary" type="submit" style={{backgroundColor: '#EF6D1A'}}>
         Update Course
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

export default EditCoursePage;







