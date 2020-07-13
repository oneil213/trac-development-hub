import React, {useState, useEffect, useRef}from "react";

import {useParams} from 'react-router-dom';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import axios from "axios";

// reactstrap components
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Row,
  Button,
  CardText,
  CardFooter,
  Col,
  CardHeader
} from "reactstrap";

// core components

import TracNavbar from 'components/Navbars/TracNavbar';
import TacFooter from '../components/Footers/TracFooter';
import { Video, CloudinaryContext} from 'cloudinary-react';
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
const today = new Date();
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
let thirtyDaysValidity = addDays(today, 30);
let sixtyDaysValidity = addDays(today, 60);
let ninetyDaysValidity = addDays(today, 90);



function CoursePage(props) {
const videoId = "samples/elephants";
let courseId = new useParams({}).id;
const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
const [isLoading, setIsLoading] = useState(true);
const [alert, setAlert] = useState('Loading Course');
const [alert2, setAlert2] = useState('');
const [alert3, setAlert3] = useState('');
const [alert4, setAlert4] = useState('');
const [currentCourse, setCurrentCourse] = useState({ id: '', title : '', price : '', updatedAt: '', description : '', duration :  '', language : '', level : '', status : 'Draft', video : ''});
const [currentOutline, setCurrentOutline] = useState([]);
const [login, setLogin] = useState(false);
const [register, setRegister] = useState(false);
const [instructors, setInstructors] = useState([]);
const [message,setMessage] = useState(null);
let timerID = useRef(null);



const API_URL = "http://localhost:8080/";

useEffect(()=>{
  return ()=>{
      clearTimeout(timerID);
  }
  },[]);

  
useEffect(()=>{
  setCurrentUser(AuthService.getCurrentUser())
  
},[]);

console.log(currentUser);

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
        setCurrentCourse(response.data);
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

  },[courseId]);


useEffect(()=>{
setAlert2('Loading course outlines...')
    setTimeout(() => {
      try {
        axios({
          method: 'post',
          url: API_URL + 'outlines',
          data: {
            courseId: courseId
          },
          headers: {
    
            'Content-Type' : 'application/json'
          }
    
        }).then(response =>{
          
            console.log(response.data.CourseOutlines)
      
          if(response.data.CourseOutlines.length === 0){
            setAlert2('No outline found for this course')
            setIsLoading(false)
          } else {
            setCurrentOutline(response.data.CourseOutlines);
            setAlert2('');
            setIsLoading(false)
          }
           
           
        },
        error => {
            console.log(error)
            const resMessage = error.response.data.message;
            // setAlert2('');
            setIsLoading(false);
            setMessage(resMessage)
          
          }
       )   
        
       } catch (error) {
        console.log(error)
        setMessage(error.message)
        // setAlert2('')
        setIsLoading(false);
       }

    }, 3000);
  
    },[courseId]);


useEffect(()=>{
      setAlert3('Loading instructor...')
          setTimeout(() => {
            try {
              axios({
                method: 'post',
                url: API_URL + 'courseinstructor',
                data: {
                  courseId: courseId
                },
                headers: {
          
                  'Content-Type' : 'application/json'
                }
          
              }).then(response =>{
                
                  console.log(response.data)
                  if(response.data.message.msgBody === 'Image found!'){
                    setInstructors(response.data);
                    setAlert3('');
                    setIsLoading(false)
                  } else{
                    setIsLoading(false)
                    setAlert('No instructor found');
                   
                  }

                 
                 
              },
              error => {
                  console.log(error)
                  setAlert3('No instructor found');
                  setIsLoading(false);
          
                
                }
             )   
              
             } catch (error) {
              console.log(error)

              setAlert3('No instructor found');
              setIsLoading(false);
             }
      
          }, 3000);
        
          },[courseId]);

const onClick30days = (e) =>{
  e.preventDefault();
  setIsLoading(true);
  if(currentUser === null){
    setIsLoading(false);
    setAlert4('Please login or register');
    setLogin(true);
    setRegister(true);
    props.history.push('/login-page');   
  } else{
    setAlert4('registering Course...');
    setIsLoading(true);
    setTimeout(() => {
    axios({
      method: 'post',
      url: API_URL + 'registercourse',
        headers: {
          'x-access-token': currentUser.accessToken,
          'Content-Type': 'application/json'
      },
      
      data: {
        courseId: courseId,
        userId: currentUser.id,
        expirationDate: thirtyDaysValidity
      }

  }).then(response =>{
    console.log(response)
    if(response.data.message.msgBody === 'You have successfully registered for this course!'){
      setIsLoading(false);
      setAlert4('You have successfully registered for this course!');
      props.history.push('/user-page');   
      // timerID = setTimeout(()=>{
      //   props.history.push('/user-page');   
            
      // },1000)
        
  
    } else {
      setMessage(response.data.message)
      setAlert4('');
      setIsLoading(false);
    }
    setMessage(response.data.message)
    setAlert4('');
    setIsLoading(false);
  //  setTimeout(()=>{
  //   window.location.reload(false);
  //  }, 1500)
  },
  error => {
    console.log(error)
    const resMessage = error.response.data.message;
    setAlert4('');

    setIsLoading(false);
    setMessage(resMessage)

  }
  ).catch(error =>{
    console.log(error)
    setMessage(error)
    setAlert4('')
    setIsLoading(false);


    })

    
    }, 3000);

  }

  

  }

const onClick60days = (e) =>{
    e.preventDefault();
    setIsLoading(true);
    if(currentUser === null){
      setIsLoading(false);
      setAlert4('Please login or register');
      setLogin(true);
      setRegister(true);
      props.history.push('/login-page');   
    } else{
      setAlert4('registering Course...');
      setIsLoading(true);
      setTimeout(() => {
      axios({
        method: 'post',
        url: API_URL + 'registercourse',
          headers: {
            'x-access-token': currentUser.accessToken,
            'Content-Type': 'application/json'
        },
        
        data: {
          courseId: courseId,
          userId: currentUser.id,
          expirationDate: sixtyDaysValidity
        }
  
    }).then(response =>{
      console.log(response)
      if(response.data.message.msgBody === 'You have successfully registered for this course!'){
        setIsLoading(false);
        setAlert4('You have successfully registered for this course!');
        props.history.push('/user-page');   
        // timerID = setTimeout(()=>{
        //   props.history.push('/user-page');   
              
        // },1000)
          
    
      } else {
        setMessage(response.data.message)
        setAlert4('');
        setIsLoading(false);
      }
      setMessage(response.data.message)
      setAlert4('');
      setIsLoading(false);
    //  setTimeout(()=>{
    //   window.location.reload(false);
    //  }, 1500)
    },
    error => {
      console.log(error)
      const resMessage = error.response.data.message;
      setAlert4('');
  
      setIsLoading(false);
      setMessage(resMessage)
  
    }
    ).catch(error =>{
      console.log(error)
      setMessage(error)
      setAlert4('')
      setIsLoading(false);
  
  
      })
  
      
      }, 3000);
  
    }
  
    
  
    }

const onClick90days = (e) =>{
      e.preventDefault();
      setIsLoading(true);
      if(currentUser === null){
        setIsLoading(false);
        setAlert4('Please login or register');
        setLogin(true);
        setRegister(true);
        props.history.push('/login-page');   
      } else{
        setAlert4('registering Course...');
        setIsLoading(true);
        setTimeout(() => {
        axios({
          method: 'post',
          url: API_URL + 'registercourse',
            headers: {
              'x-access-token': currentUser.accessToken,
              'Content-Type': 'application/json'
          },
          
          data: {
            courseId: courseId,
            userId: currentUser.id,
            expirationDate: ninetyDaysValidity
          }
    
      }).then(response =>{
        console.log(response)
        if(response.data.message.msgBody === 'You have successfully registered for this course!'){
          setIsLoading(false);
          setAlert4('You have successfully registered for this course!');
          props.history.push('/user-page');   
          // timerID = setTimeout(()=>{
          //   props.history.push('/user-page');   
                
          // },1000)
            
      
        } else {
          setMessage(response.data.message)
          setAlert4('');
          setIsLoading(false);
        }
        setMessage(response.data.message)
        setAlert4('');
        setIsLoading(false);
      //  setTimeout(()=>{
      //   window.location.reload(false);
      //  }, 1500)
      },
      error => {
        console.log(error)
        const resMessage = error.response.data.message;
        setAlert4('');
    
        setIsLoading(false);
        setMessage(resMessage)
    
      }
      ).catch(error =>{
        console.log(error)
        setMessage(error)
        setAlert4('')
        setIsLoading(false);
    
    
        })
    
        
        }, 3000);
    
      }
    
      
    
      }
    

      
      

const imgUrl = instructors.url;
const bPlan = parseFloat(currentCourse.price.replace(/,/g, '')) * 1.5
const cPlan = parseFloat(currentCourse.price.replace(/,/g, '')) * 2
console.log(login);
console.log(register);



  useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });


  return (
    <>
      <TracNavbar />
      <div className="wrapper">
     
        <div className="section section-about-us">
     
          <Container>
          
            {isLoading === true? (

           <FadeIn>
           <div className="container" >
            <p className="text-success content-center text-center">{alert}</p>
           <Lottie options={defaultOptions} height={200} width={200}   />
                               
           </div>
         </FadeIn>
        ) :(
            <div>
              <Row>,
              <Col className="ml-auto mr-auto text-center" md="8">
                <h2 className="title">{currentCourse.title}</h2>
               
                <div style={{position: 'relative' }}>
                </div>
              <CloudinaryContext cloudName="trac-development-hub" >
              <Video publicId = {videoId} width='100%' height='100%' style={{ position: 'absolute', top:'0', left:'0'}}>
              </Video>             
              </CloudinaryContext>         
              </Col>
            </Row>
            <Row>
            <Card className="text-center">
        <CardBody>
                 <CardTitle tag="h3">CourseOutline</CardTitle>
          <p className="text-success content-center text-center">{alert2}</p>
          {currentOutline.map(outline =>{
            return (
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',   }}>
                         <CardText key={outline.id}>
              <i className="now-ui-icons education_paper" style={{color: '#EF6D1A'}}><span>&nbsp;&nbsp;{outline.title}</span></i>
                <p style={{whiteSpace:"pre-line", textAlign:'start', justifyItems: 'center', lineHeight: '2.5em'}}>
                 {outline.description}
                </p>
              </CardText>
            
              </div>
   
            )
          })}
         
        </CardBody>
        <CardFooter className="text-muted mb-2">

              <i className="now-ui-icons education_hat" >&nbsp;Level:<span style={{color: '#EF6D1A'}}>&nbsp;{currentCourse.level}&nbsp;&nbsp;</span></i>
              <i className="now-ui-icons media-2_sound-wave">&nbsp;Language: <span style={{color: '#EF6D1A'}}>&nbsp;{currentCourse.language}&nbsp;&nbsp;</span></i>
              <i className="now-ui-icons tech_tv">&nbsp;Type: <span style={{color: '#EF6D1A'}}>&nbsp;Online&nbsp;&nbsp;</span></i>
              <i className="now-ui-icons ui-2_time-alarm">&nbsp;Duration: <span style={{color: '#EF6D1A'}}>&nbsp;{currentCourse.duration}&nbsp;&nbsp;</span>mins</i>
        
                             
              <div style={{marginTop: '10px'}}>Last Revised: {currentCourse.updatedAt.slice(0,10)}</div>
        </CardFooter>
      </Card>
    
            </Row>
           
            <div style={{display: 'grid', justifyContent: 'center', alignItems: 'center'}}>
           
            <h3 className="title content-center">Course Instructor</h3>
            </div>
            {alert3 === 'No instructor found'?  (
         
              <p className="text-success content-center text-center">{alert3}</p>
            
            ):(<div>
              <Row  className="row justify-content-md-center">
              <Col className="col-md-auto col-sm-auto " >
 
                    <div className="team-player"   style={{width:"150px"}}>
                      <img
                        alt="..."
                        style={{width:"150px"}}
                        className="rounded-circle img-fluid img-raised"
                        src= {imgUrl}
                      ></img> 
                  
                    </div>
               
              
                  </Col>
             
              </Row>
              <h4 style={{textAlign:'center', fontWeight:"500"}}>{instructors.name}</h4>
              </div>

            )}
             </div>
             )}
          </Container>
          <p className="text-success content-center text-center">{alert4}</p>
          {isLoading === true? (
              
              <FadeIn>
             
              <div className="container"  style={{marginTop: '200px'}}>
              <Lottie options={defaultOptions} height={200} width={200}  style={{marginTop: '150px'}} />
       
                 
              </div>
            </FadeIn>
            

            ) : (
          <div className='section content-center text-center' style={{margin: '50px'}}>
          <h3 className="title">Choose a subscription plan</h3>
            <Row>
              <Col>
              <Container>
          <Row>
            <Card className="card-signup" data-background-color="#107E85" style={{color:'black'}}>
            {/* <CardHeader className="mt-2">Price <span style={{color:'#EF6D1A'}}>₦</span>{training.price}</CardHeader> */}
                <CardHeader className="text-center">
                  <CardTitle  tag="h4" style={{color:'#107E85'}}>
                    30 days
                  </CardTitle>
                  Price <span style={{color:'#EF6D1A'}}>₦</span>{currentCourse.price}
                  <div className="social-line">
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="facebook"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-facebook-square"></i>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="twitter"
                  
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="lg"
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="google"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-google-plus"></i>
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <CardText style={{color:'#EF6D1A'}}> Benefits</CardText>
                  <p style={{color:'black'}}>Have access to course video</p>
                  <p style={{color:'black'}}>Have access to course video</p>
                  <p style={{color:'black'}}>Have access to course video</p>
                  <p style={{color:'black'}}>Have access to course video</p>
                  <p style={{color:'black'}}>Have access to course video</p>
                  <p style={{color:'black'}}>Have access to course video</p>
                        
                </CardBody>
                <CardFooter className="text-center">
                </CardFooter>
      
            </Card>
          </Row>
          <div className="col text-center">
            <Button
              className="btn-round btn-white"
              color="default"
              onClick={onClick30days}
              outline
              size="lg"
     
            >
            Register
            </Button>
          </div>
        </Container>
              </Col>
              <Col>
              <Container>
          <Row>
            <Card className="card-signup" data-background-color="#107E85" style={{color:'black'}}>
            {/* <CardHeader className="mt-2">Price <span style={{color:'#EF6D1A'}}>₦</span>{training.price}</CardHeader> */}
                <CardHeader className="text-center">
                  <CardTitle  tag="h4" style={{color:'#EF6D1A'}}>
                    60 days
                  </CardTitle>
                  Price <span style={{color:'#EF6D1A'}}>₦</span>{bPlan}
                  <div className="social-line">
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="facebook"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-facebook-square"></i>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="twitter"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="lg"
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="google"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-google-plus"></i>
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <CardText style={{color:'#EF6D1A'}}> Benefits</CardText>
                  <p style={{color:'black'}}>Have access to course video</p>
                  <p style={{color:'black'}}>Have access to course video</p>
                  <p style={{color:'black'}}>Have access to course video</p>
                  <p style={{color:'black'}}>Have access to course video</p>
                  <p style={{color:'black'}}>Have access to course video</p>
                  <p style={{color:'black'}}>Have access to course video</p>
                        
                </CardBody>
                <CardFooter className="text-center">
                </CardFooter>
      
            </Card>
          </Row>
          <div className="col text-center">
            <Button
              className="btn-round btn-white"
              style={{color:'#EF6D1A'}}
              to="/login-page"
              outline
              size="lg"
              onClick={onClick60days}
     
            >
            Register
            </Button>
          </div>
        </Container>
              </Col>
              <Col>
              <Container>
          <Row>
            <Card className="card-signup" data-background-color="#107E85" style={{color:'black'}}>
            {/* <CardHeader className="mt-2">Price <span style={{color:'#EF6D1A'}}>₦</span>{training.price}</CardHeader> */}
                <CardHeader className="text-center">
                  <CardTitle  tag="h4" style={{color:'#107E85', fontWeight:'800px'}}>
                    90 days
                  </CardTitle>
                  Price <span style={{color:'#EF6D1A'}}>₦</span>{cPlan}
                  <div className="social-line">
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="facebook"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-facebook-square"></i>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="twitter"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="lg"
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="google"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-google-plus"></i>
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <CardText style={{color:'#EF6D1A'}}> Benefits</CardText>
                  <p style={{color:'black'}}>Have access to course video</p>
                  <p style={{color:'black'}}>Have access to course video</p>
                  <p style={{color:'black'}}>Have access to course video</p>
                  <p style={{color:'black'}}>Have access to course video</p>
                  <p style={{color:'black'}}>Have access to course video</p>
                  <p style={{color:'black'}}>Have access to course video</p>
                        
                </CardBody>
                <CardFooter className="text-center">
                </CardFooter>
      
            </Card>
          </Row>
          <div className="col text-center">
            <Button
              className="btn-round btn-white"
              color="default"
              to="/login-page"
              onClick={onClick90days}
              outline
              size="lg"
     
            >
            Register
            </Button>
          </div>
        </Container></Col>
        
            </Row>
          </div>
          )}
        </div>
        {message ? <Message message={message}/> : null}
        <TacFooter/>
      </div>
    </>
  );
}

export default CoursePage;
