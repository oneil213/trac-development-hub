import React,  {useState, useEffect} from 'react';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import axios from "axios";


// reactstrap components
import {
  
  Container,
  Row,
  Col
} from "reactstrap";

// core components

import TrainingPageHeader from "components/Headers/TrainingPageHeader";
import TacFooter from '../components/Footers/TracFooter';
import TracNavbar from 'components/Navbars/TracNavbar';
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

function InstructorsPage() {

  const [currentUser] = useState(AuthService.getCurrentUser());
  const [instructors, setInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert , setAlert] = useState('');
  


  const API_URL = "http://localhost:8080/";


useEffect(()=>{
  setIsLoading(true);
  setAlert('Loading instructors...')
  setTimeout(() => {
    try {
      axios({
        method: 'get',
        url: API_URL + 'instructors',
        headers: {
    
          'Content-Type' : 'application/json'
        }
  
      }).then(response =>{
        console.log(response.data)
         if(response.data.length === 0){
           setAlert('There are no instructors at the moment.');
           setIsLoading(false);
         } else{
           setInstructors(response.data);
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

  }, 3000);

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
        <TrainingPageHeader />
        <div className="section section-team text-center">
          <Container>
            <h2 className="title">Our Instructors</h2>
             <p style={{marginTop:'50px'}} className="text-success content-center text-center">{alert}</p>
            {isLoading === true? (
           <FadeIn>
           <div className="container" >
           <Lottie options={defaultOptions} height={200} width={200}   />
                               
           </div>
         </FadeIn>
        ) :(
            <div className="team">
              <Row>
               {instructors.map(instructor =>{
                 return (
                  <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("assets/img/ryan.jpg")}
                    ></img>
                    <h4 className="title">{instructor.name}</h4>
                    <p className="category " style={{color:'#EF6D1A'}}>{instructor.title}</p>
                 <p className="category "> Id:&nbsp;&nbsp;<span style={{color:'#EF6D1A'}}>{instructor.id}</span></p>
                  </div>
                </Col>  
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

export default InstructorsPage;
