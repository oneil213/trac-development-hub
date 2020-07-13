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
  CardText,
  CardFooter,
  Col
} from "reactstrap";

// core components

import TrainingsPageHeader from "components/Headers/TrainingsPageHeader";
import TacFooter from '../components/Footers/TracFooter';
import TracNavbar from 'components/Navbars/TracNavbar';
import * as legoData from "../twirl.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
  preserveAspectRatio: "xMidYMid slice"
  }
}


function TrainingsPage() {
  let history = useHistory();
  const [trainings, setTrainings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert , setAlert] = useState('');
  
  
  const API_URL = "http://localhost:8080/";

    
  useEffect(()=>{
    setIsLoading(true);
    setAlert('Loading courses...')
    setTimeout(() => {
      try {
        axios({
          method: 'get',
          url: API_URL + 'publishedcourses',
          headers: {
  
            'Content-Type' : 'application/json'
          }
    
        }).then(response =>{
                  console.log(response.data);
           if(response.data.length === 0){
             setAlert('There are no active courses at the moment.');
             setIsLoading(false);
           } else{
             setTrainings(response.data);
             setAlert('');
             setIsLoading(false);
  
           }
       
        },
        error => {
          console.log(error)
          
          console.log(error)
          setIsLoading(false)
        })   
        
       } catch (error) {
         console.log(error)
         setIsLoading(false)
     
       }
  
    }, 3000);
  
    },[]);
  
  





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
                <h2 className="title">Online Courses</h2>
                <h5 className="description">
                  Choose from any of our online courses and
                   take your career to the next level.
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
             {trainings.map(training =>{
                return (
                  <Card className="text-center"  key={training.id}>
                  <CardHeader className="mt-2">Price <span style={{color:'#EF6D1A'}}>₦</span>{training.price}</CardHeader>
                  <CardBody>
                    <CardTitle tag="h4">{training.title}</CardTitle>
                    <CardText>
                    {training.description}
                    </CardText>
                    <Button
                    color="primary"
                    href="/course-page"
                    size ='sm'
                    onClick={e => {
                      e.preventDefault();
                      history.push('courseview-page/'+ training.id );
                    }}
                    style={{backgroundColor: '#EF6D1A'}}
                  >
                  More Details
                  </Button>
                  </CardBody>
                  <CardFooter className="text-muted mb-2">
          
                        <i className="now-ui-icons education_hat" >&nbsp;Level:<span style={{color: '#EF6D1A'}}>&nbsp;{training.level}&nbsp;&nbsp;</span></i>
                        <i className="now-ui-icons media-2_sound-wave">&nbsp;Language: <span style={{color: '#EF6D1A'}}>&nbsp;{training.language}&nbsp;&nbsp;</span></i>
                        <i className="now-ui-icons tech_tv">&nbsp;Type: <span style={{color: '#EF6D1A'}}>&nbsp;Online&nbsp;&nbsp;</span></i>
                        <i className="now-ui-icons ui-2_time-alarm">&nbsp;Duration: <span style={{color: '#EF6D1A'}}>&nbsp;{training.duration}&nbsp;&nbsp;</span>mins</i>
                  
                      <div style={{marginTop: '10px'}}>Last Revised: {training.updatedAt.slice(0,10)}</div>
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

export default TrainingsPage;
