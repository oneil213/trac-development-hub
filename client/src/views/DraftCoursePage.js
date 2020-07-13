import React,  {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import axios from "axios";

// reactstrap components
import {
  Button,
  Container,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  CardFooter,
  Col
} from "reactstrap";

// core components

import TrainingsPageHeader from "components/Headers/TrainingsPageHeader";
import TracNavbar from 'components/Navbars/TracNavbar';
import TacFooter from '../components/Footers/TracFooter';
import AuthService from '../services/auth.service';
import * as legoData from "../twirl.json";


const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
  preserveAspectRatio: "xMidYMid slice"
  }
}


function DraftCoursePage() {
  let history = useHistory();
  const [currentUser] = useState(AuthService.getCurrentUser());
  const [draftCourses, setDraftCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert , setAlert] = useState('');

  const API_URL = "http://localhost:8080/";

useEffect(()=>{
  setIsLoading(true);
   setAlert('Loading draft courses...')
  setTimeout(() => {
    try {
      axios({
        method: 'get',
        url: API_URL + 'draftcourses',
        headers: {
          'x-access-token': currentUser.accessToken,
          'Content-Type' : 'application/json'
        }
  
      }).then(response =>{
         if(response.data.length === 0){
           setAlert('There are no draft courses at the moment.');
           setIsLoading(false);
         } else{
           setDraftCourses(response.data);
           setAlert('');
           setIsLoading(false);

         }
     
      },
      error => {
        console.log(error)
        const resMessage = error.response.data.message.msgBody;
        console.log(resMessage)
        setIsLoading(false)
      })   
      
     } catch (error) {
       console.log(error)
       setIsLoading(false)
   
     }

  }, 5000);

  },[currentUser.accessToken, currentUser.id]);




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
        <TrainingsPageHeader />
        <div className="section section-about-us">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h2 className="title">Drafted Online Courses</h2>
                <h5 className="description">
                  Choose any of the courses and publish.
                </h5>
                 <p style={{marginTop:'50px'}} className="text-success content-center text-center">{alert}</p>

              </Col>
            </Row>
            {isLoading === true? (
           <FadeIn>
           <div className="container" >
         
           <Lottie options={defaultOptions} height={200} width={200}   />
                               
           </div>
         </FadeIn>
        ) :(
            <div>
            <Row>
              {draftCourses.map(draftCourse =>{
                return (
                  <Card className="text-center" key={draftCourse.id}>
                  <CardHeader className="mt-2">CourseId &nbsp;&nbsp;<span style={{color:'#EF6D1A'}}>{draftCourse.id}</span></CardHeader>
                  <CardBody>
                 <CardTitle tag="h4">{draftCourse.title}</CardTitle>
                 <Button
                  color="primary"
                  href="/course-page"
                  size ='sm'
                  onClick={e => {
                    e.preventDefault();
                    history.push('/admineditcourse-page/'+ draftCourse.id);
                  }}
                  style={{backgroundColor: '#EF6D1A'}}
                >
                Update Course
                </Button>
                  </CardBody>
                  <CardFooter className="text-muted mb-2">
          
                        <i className="now-ui-icons education_hat" >&nbsp;Level:<span style={{color: '#EF6D1A'}}>&nbsp;{draftCourse.level}&nbsp;&nbsp;</span></i>
                        <i className="now-ui-icons media-2_sound-wave">&nbsp;Language: <span style={{color: '#EF6D1A'}}>&nbsp;{draftCourse.language}&nbsp;&nbsp;</span></i>
                        <i className="now-ui-icons tech_tv">&nbsp;Type: <span style={{color: '#EF6D1A'}}>&nbsp;Online&nbsp;&nbsp;</span></i>
                        <i className="now-ui-icons ui-2_time-alarm">&nbsp;Duration: <span style={{color: '#EF6D1A'}}>&nbsp;{draftCourse.duration}&nbsp;&nbsp;</span>mins</i>
                  
                      <div style={{marginTop: '10px'}}>Last Revised: {draftCourse.updatedAt.slice(0,10)}</div>
                  </CardFooter>
                </Card>
                )
              })}
           
      
            </Row>
            </div>
            )}
             
          </Container>
        </div>
        
        <TacFooter/>
      </div>
    </>
  );
}

export default DraftCoursePage;
