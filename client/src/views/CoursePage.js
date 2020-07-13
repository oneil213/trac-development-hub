import React, {useEffect, useState} from "react";
import axios from "axios";
import TacFooter from '../components/Footers/TracFooter';
import { Video, CloudinaryContext} from 'cloudinary-react';
import AuthService from '../services/auth.service';
// import OutlineService from '../services/outline.service'
import {useParams} from 'react-router-dom';

// reactstrap components
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Row,
  CardFooter,
  Col,
  CardSubtitle
} from "reactstrap";

// core components

import TracNavbar from 'components/Navbars/TracNavbar';


function CoursePage() {
  
  let courseTitle = new useParams({}).id;
  // const [isLoading , setIsLoading] = useState(true);
  const [currentUser] = useState(AuthService.getCurrentUser());
  const [Subscriptions, setSubscriptions] = useState([]);
  const [outlines, setOutlines] = useState([]);





  const API_URL = "http://localhost:8080/";

  useEffect(()=>{
    axios({
      method: 'post',
      url: API_URL + 'user/activesubscriptions',
      data: {
        id: currentUser.id
      },
      headers: {
        'x-access-token': currentUser.accessToken,
        'Content-Type' : 'application/json'
      }

    }).then(response =>{
      
      const {activesubscriptions } = response.data;
     
      for(let i = 0; i < activesubscriptions.length; i++){
        if(activesubscriptions[i].title === courseTitle){
          setSubscriptions(activesubscriptions[i])
        }
      }
   
    },
    error => {
      console.log(error)
      // const resMessage = error.response.data.message.msgBody;
      // console.log(resMessage)
      // setIsLoading(false)
    })   
    },[courseTitle, currentUser.accessToken, currentUser.id]);
    
  useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });


  useEffect(()=>{
    const courseId = Subscriptions.id
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
  
      }).then(response=>{
        setOutlines(response.data.CourseOutlines)
      })
     
    } catch (error) {
      
    }
    },[Subscriptions.id]);
    
  console.log(outlines);
  console.log(Subscriptions.video)
 
  const videoId = "samples/elephants";

  // const myCourses = outline;
  // console.log(myCourses)
  // console.log(Subscriptions);
  return (
    <>
      <TracNavbar />
      <div className="wrapper">
     
        <div className="section section-about-us">
     
          <Container>
            <Row>,
              <Col className="ml-auto mr-auto text-center" md="8">
  <h2 className="title">{Subscriptions.title}</h2>
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
          {outlines.map(outline =>{
            return (
              <CardSubtitle key={outline.title}>
              <i className="now-ui-icons education_paper" style={{color: '#EF6D1A'}}><span>&nbsp;&nbsp;{outline.title}</span></i>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',   }}>
              <p style={{whiteSpace:"pre-line", textAlign:'start',  lineHeight: '2.5em'}}>
                 {outline.description}
                </p>
              </div>
              
              </CardSubtitle>
        
             
            )
          })}
      
        </CardBody>
        <CardFooter className="text-muted mb-2">

  <i className="now-ui-icons education_hat" >&nbsp;Level:<span style={{color: '#EF6D1A'}}>&nbsp;{Subscriptions.level}&nbsp;&nbsp;</span></i>
              <i className="now-ui-icons media-2_sound-wave">&nbsp;Language: <span style={{color: '#EF6D1A'}}>&nbsp;{Subscriptions.language}&nbsp;&nbsp;</span></i>
              <i className="now-ui-icons tech_tv">&nbsp;Type: <span style={{color: '#EF6D1A'}}>&nbsp;Online&nbsp;&nbsp;</span></i>
              <i className="now-ui-icons ui-2_time-alarm">&nbsp;Duration: <span style={{color: '#EF6D1A'}}>&nbsp;{Subscriptions.duration}&nbsp;&nbsp;</span>mins</i>
        

        </CardFooter>
      </Card>
            </Row>
    
          </Container>
        </div>
        
        <TacFooter/>
      </div>
    </>
  );
}

export default CoursePage;
