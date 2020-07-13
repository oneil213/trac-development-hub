import React , {useEffect, useState}from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Row,
  UncontrolledTooltip,
  CardText,
  CardHeader,
  CardFooter,
  Container,
  } from "reactstrap";
import TracNavbar from 'components/Navbars/TracNavbar';
import ContributorPageHeader from "components/Headers/ContributorPageHeader";
import TacFooter from '../components/Footers/TracFooter';
import Createcourse from '../components/Modals/CreateCourse';
import CreateCourseOutline from 'components/Modals/CreateCourseOutline';

import AuthService from '../services/auth.service';

function ContributorPage(props) {
  let history = useHistory();
  const [draftCourses, setDraftCourses] = useState([]);
  const [publishedCourses, setPublishedCourses] = useState([]);
  const [alert, setAlert] = useState('');
  const [alert2, setAlert2] = useState('');

  const [currentUser] = useState(AuthService.getCurrentUser());
  const API_URL ="http://localhost:8080/";


  useEffect(()=>{
    try {
      axios({
        method: 'post',
        url: API_URL + 'userdraftcourses',
        data: {
          createdby: currentUser.id
        },
        headers: {
          'x-access-token': currentUser.accessToken,
          'Content-Type' : 'application/json'
        }
  
      }).then(response =>{

        if(response.data.length === 0){
          setAlert('You have no draft courses')
       }
        console.log(response.data);
        setDraftCourses(response.data)
       
      },
      error => {
        console.log(error)
        const resMessage = error.response.data.message.msgBody;
        console.log(resMessage)
   
      })   
      
     } catch (error) {
       console.log(error)
       
   
     }



  },[currentUser.accessToken, currentUser.id]);

  useEffect(()=>{
    try {
      axios({
        method: 'post',
        url: API_URL + 'userpublishedcourses',
        data: {
          userId: currentUser.id
        },
        headers: {
          'x-access-token': currentUser.accessToken,
          'Content-Type' : 'application/json'
        }
  
      }).then(response =>{

        if(response.data.length === 0){
          setAlert2('You have no published courses')
       }
        console.log(response.data);
        setPublishedCourses(response.data)
       
      },
      error => {
        console.log(error)
   
      })   
      
     } catch (error) {
       console.log(error)
       
   
     }



  },[currentUser.accessToken, currentUser.id]);


console.log(publishedCourses)
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
        <ContributorPageHeader />
        <div className="section content-center text-center ">
          <Container>
            <div className="button-container content-center">
              <Button className="btn-round" color="info" size="lg" style={{backgroundColor: '#EF6D1A'}}>
                Follow
              </Button>
              <Button
                className="btn-round btn-icon"
                color="default"
                style={{backgroundColor: '#107E85'}}
                id="tooltip515203352"
                size="lg"
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip515203352">
                Follow me on Twitter
              </UncontrolledTooltip>
              <Button
                className="btn-round btn-icon"
                color="default"
                style={{backgroundColor: '#107E85'}}
                id="tooltip340339231"
                size="lg"
              >
                <i className="fab fa-instagram"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip340339231">
                Follow us on Instagram
              </UncontrolledTooltip>
            </div>
            <h3 className="title">What you can do</h3>
            <Row>
            <Card className="text-center" >
        <CardBody>
          <CardTitle tag="h4">Course options</CardTitle>
          <CardText>
            Select any of the course options below.
          </CardText>
          <Createcourse />
          <CreateCourseOutline />
        </CardBody>
        <CardFooter className="text-muted mb-2">
        </CardFooter>
      </Card>
  
            </Row>
            <h3 className="title"> Your Drafted Courses</h3>
            <h4>{alert}</h4>
              <Row>
                {draftCourses.map(course =>{
                  return (
              <Card className="text-center" key={course.title} >
        <CardHeader className="mt-2">Price <span style={{color:'#EF6D1A'}}>₦</span>{course.price}</CardHeader>
        <CardBody>
          <CardTitle tag="h6"><span style={{fontWeight:'200'}}>Course Title:&nbsp;&nbsp;</span>{course.title}</CardTitle>
          <CardTitle tag="h6"><span style={{fontWeight:'200'}}>Course Id:&nbsp;&nbsp;</span>{course.id}</CardTitle>
          <CardTitle tag="h6"><span style={{fontWeight:'200'}}>Course Status:&nbsp;&nbsp;</span>{course.status}</CardTitle>
      
          <row>
         <Button
            color="primary"
            href="/course-page"
            size ='sm'
            onClick={e => {
              e.preventDefault();
              history.push('/courseoutline-page/'+ course.id);
            }}
            style={{backgroundColor: '#EF6D1A'}}
          >
           View Course Outline
          </Button>
         </row>
         <row>
            <Button
            color="primary"
            href="/course-page"
            onClick={e => {
              e.preventDefault();
              history.push('/editcourse-page/'+ course.id);
            }}
            style={{backgroundColor: '#EF6D1A'}}
          >
            Edit Course
          </Button>
         </row>
        </CardBody>
        <CardFooter className="text-muted mb-2">

              <i className="now-ui-icons education_hat" >&nbsp;Level:<span style={{color: '#EF6D1A'}}>&nbsp;{course.level}&nbsp;&nbsp;</span></i>
              <i className="now-ui-icons media-2_sound-wave">&nbsp;Language: <span style={{color: '#EF6D1A'}}>&nbsp;{course.language}&nbsp;&nbsp;</span></i>
              <i className="now-ui-icons tech_tv">&nbsp;Type: <span style={{color: '#EF6D1A'}}>&nbsp;Online&nbsp;&nbsp;</span></i>
              <i className="now-ui-icons ui-2_time-alarm">&nbsp;Duration: <span style={{color: '#EF6D1A'}}>&nbsp;{course.duration}&nbsp;&nbsp;</span>mins</i>
        
            <div style={{marginTop: '10px'}}>Last Revised: <span>{course.updatedAt.slice(0, 10)}</span></div>
        </CardFooter>
      </Card>

      )})}
            </Row>
            
            <h3 className="title"> Your Published Courses</h3>
            <h4>{alert2}</h4>
            <Row>
            {publishedCourses.map(course =>{
                  return (
              <Card className="text-center" key={course.title} >
        <CardHeader className="mt-2">Price <span style={{color:'#EF6D1A'}}>₦</span>{course.price}</CardHeader>
        <CardBody>
          <CardTitle tag="h6"><span style={{fontWeight:'200'}}>Course Title:&nbsp;&nbsp;</span>{course.title}</CardTitle>
          <CardTitle tag="h6"><span style={{fontWeight:'200'}}>Course Id:&nbsp;&nbsp;</span>{course.id}</CardTitle>
          <CardTitle tag="h6"><span style={{fontWeight:'200'}}>Course Status:&nbsp;&nbsp;</span>{course.status}</CardTitle>
         <row>
         <Button
            color="primary"
            href="/course-page"
            size ='sm'
            onClick={e => {
              e.preventDefault();
              history.push('/courseoutline-page/'+ course.id);
            }}
            style={{backgroundColor: '#EF6D1A'}}
          >
           View Course Outline
          </Button>
         </row>
         <row>
            <Button
            color="primary"
            href="/course-page"
            onClick={e => {
              e.preventDefault();
              history.push('/editcourse-page/'+ course.id);
            }}
            style={{backgroundColor: '#EF6D1A'}}
          >
            Edit Course
          </Button>
         </row>
        
        
        </CardBody>
        <CardFooter className="text-muted mb-2">
              <i className="now-ui-icons education_hat" >&nbsp;Level:<span style={{color: '#EF6D1A'}}>&nbsp;{course.level}&nbsp;&nbsp;</span></i>
              <i className="now-ui-icons media-2_sound-wave">&nbsp;Language: <span style={{color: '#EF6D1A'}}>&nbsp;{course.language}&nbsp;&nbsp;</span></i>
              <i className="now-ui-icons tech_tv">&nbsp;Type: <span style={{color: '#EF6D1A'}}>&nbsp;Online&nbsp;&nbsp;</span></i>
              <i className="now-ui-icons ui-2_time-alarm">&nbsp;Duration: <span style={{color: '#EF6D1A'}}>&nbsp;{course.duration}&nbsp;&nbsp;</span>mins</i>
        
            <div style={{marginTop: '10px'}}>Last Revised: <span>{course.updatedAt.slice(0, 10)}</span></div>
        </CardFooter>
      </Card>

      )})}

  
            </Row>
        
    
         
            
          </Container>
        </div>
        <TacFooter/>
      </div>
            
            
        </>
    );
}

export default ContributorPage;








