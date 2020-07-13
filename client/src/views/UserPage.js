import React,  {useState, useEffect, useRef} from 'react';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import axios from "axios";
import { useHistory } from 'react-router-dom';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  UncontrolledTooltip,
  CardText,
  CardFooter,
  Container,
  } from "reactstrap";
import TracNavbar from 'components/Navbars/TracNavbar';
import UserPageHeader from "components/Headers/UserPageHeader";
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


function UserPage(props) {
  let history = useHistory();


  const [currentUser] = useState(AuthService.getCurrentUser());
  const [Subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert , setAlert] = useState('');
  let timerID = useRef(null);


  

  useEffect(()=>{
    return ()=>{
        clearTimeout(timerID);
    }
    },[]);

  const API_URL = "http://localhost:8080/";

  useEffect(()=>{
    setIsLoading(true);
    setTimeout(() => {
      try {
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
          if(activesubscriptions.length !== 0 ){
            setSubscriptions(activesubscriptions);
            setIsLoading(false)
           }
       
        },
        error => {
          console.log(error)
          const resMessage = error.response.data.message.msgBody;
          console.log(resMessage)
          setAlert(resMessage)
          setIsLoading(false)
        })   
        
       } catch (error) {
         console.log(error)
         setIsLoading(false)
     
       }

    }, 5000);
  
    },[currentUser.accessToken, currentUser.id]);


  const UserCourses = Subscriptions;
  console.log(UserCourses)
  console.log(alert);




    useEffect(() => {
      document.body.classList.add("profile-page");
      document.body.classList.add("sidebar-collapse");
      document.documentElement.classList.remove("nav-open");
      return function cleanup() {
        document.body.classList.remove("profile-page");
        document.body.classList.remove("sidebar-collapse");
      };
    });

    function validity (e){
      let msDiff = new Date(e.slice(0,10))- new Date()
      return Math.floor(msDiff / (1000 * 60 * 60 * 24))
    }
    return (
        <>
         <TracNavbar />
      <div className="wrapper">
        <UserPageHeader />
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
         
            {isLoading === true? (
              <FadeIn>
              <div className="container" >
                  
              <Lottie options={defaultOptions} height={200} width={200}   />
                                  
              </div>
            </FadeIn>
            ):(
            <div>
                 <h3 className="title">Your Registered Course(s)</h3>
            <h4>{alert}</h4>
            {alert === 'No active subscription found' ? <Button
                color="primary"
                href="/trainings-page"    
                style={{backgroundColor: '#EF6D1A'}}
            >Subscribe</Button> : null}
            <Row>
             {UserCourses.map(course =>{
                return (
                  <Card className="text-center" key={course.title}>
        
                  <CardBody>
                <CardHeader className="mt-2">Expires on: &nbsp;&nbsp;<span style={{color:'#EF6D1A'}}>{course.UserCourses.expirationDate.slice(0, 10)}</span></CardHeader>
                <CardHeader className="mt-2"> &nbsp;&nbsp;<span style={{color:'#EF6D1A'}}>{validity(course.UserCourses.expirationDate.slice(0, 10))}&nbsp; day(s)&nbsp;left</span></CardHeader>
                <CardTitle tag="h4">{course.title}</CardTitle>
                    <CardText>
                       {course.description}
                    </CardText>
                    <Button
                      color="primary"
                      href="/course-page"
                      onClick={e => {
                        e.preventDefault();
                        history.push('/course-page/'+ course.title);
                      }}
                  
                      style={{backgroundColor: '#EF6D1A'}}
                    >
                     Watch
                    </Button>
                  </CardBody>
                  <CardFooter className="text-muted mb-2">
          
                <i className="now-ui-icons education_hat" >&nbsp;Level:<span style={{color: '#EF6D1A'}}>&nbsp;{course.level}&nbsp;&nbsp;</span></i>
                        <i className="now-ui-icons media-2_sound-wave">&nbsp;Language: <span style={{color: '#EF6D1A'}}>&nbsp;{course.language}&nbsp;&nbsp;</span></i>
                        <i className="now-ui-icons tech_tv">&nbsp;Type: <span style={{color: '#EF6D1A'}}>&nbsp;Online&nbsp;&nbsp;</span></i>
                        <i className="now-ui-icons ui-2_time-alarm">&nbsp;Duration: <span style={{color: '#EF6D1A'}}>&nbsp;{course.duration}&nbsp;&nbsp;</span>mins</i>
                  
                      <div style={{marginTop: '10px'}}>Last Revised: <span>{course.updatedAt.slice(0, 10)}</span></div>
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

export default UserPage;