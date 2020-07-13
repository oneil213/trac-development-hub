import React, {useState, useEffect}  from 'react';
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
  CardFooter,
  Container,
  CardHeader,
  } from "reactstrap";
import TracNavbar from 'components/Navbars/TracNavbar';
import AdminPageHeader from "components/Headers/AdminPageHeader";
import TacFooter from '../components/Footers/TracFooter';
import DeleteCourse from 'components/Modals/DeleteCourse';
import DeleteInstructor from 'components/Modals/DeleteInstructor';
import CreateInstructor from 'components/Modals/CreateInstructor';
import DeleteCourseOutline from 'components/Modals/DeleteCourseOutline';

import UploadInstructorsImage from 'components/Modals/UploadInstructorsImage';


import AddCourseInstructor from 'components/Modals/AddCourseInstructor';
import RemoveCourseInstructor from 'components/Modals/RemoveCourseInstructor';
import CreateUser from 'components/Modals/CreateUser';
import CreateContributor from 'components/Modals/CreateContributor';
import CreateAdmin from 'components/Modals/CreateAdmin';
import DeleteUser from 'components/Modals/DeleteUser';
import AuthService from  'services/auth.service'



function AdminPage(props) {
  let history = useHistory();
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [alert, setAlert] = useState('');
  const  [createdInstructors, setCreatedInstructors] = useState([]); 
  const [lectures, setLectures] = useState([]);
  const [alert2, setAlert2] = useState('');
  const API_URL = "http://localhost:8080/";


  useEffect(()=>{
      setCurrentUser(AuthService.getCurrentUser())
      
    },[]);  

  useEffect(()=>{
    try {
      axios({
        method: 'get',
        url: API_URL + 'instructors',
        headers: {

          'Content-Type' : 'application/json'
        }
  
      }).then(response =>{

        if(response.data.length === 0){
          setAlert('There are no instructors at the moment.')
       }
        console.log(response.data);
        setCreatedInstructors(response.data)   
       },
      error => {
        console.log(error)
        const resMessage = error.response.data.message.msgBody;
        console.log(resMessage)
   
      })   
      
     } catch (error) {
       console.log(error)   
     }



  },[]);



  useEffect(()=>{
    try {
      axios({
        method: 'get',
        url: API_URL + 'lectures',
        headers: {
          'x-access-token': currentUser.accessToken,
          'Content-Type' : 'application/json'
        }
  
      }).then(response =>{

        if(response.data.length === 0){
          setAlert2('There are no lectures at the moment.')
       } else {
         setAlert2('');
          setLectures(response.data)   
       }
      
       },
      error => {
        console.log(error)
        const resMessage = error.response.data.message.msgBody;
        console.log(resMessage)
   
      })   
      
     } catch (error) {
       console.log(error)   
     }



  },[currentUser.accessToken]);


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
        <AdminPageHeader />
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
              <CardTitle tag="h4">User options</CardTitle>
              <CardText>
                Select any of the user options below.
              </CardText>
              <CreateUser />
              <CreateContributor />
              <CreateAdmin />
              <DeleteUser />
            </CardBody>
            <CardFooter className="text-muted mb-2">
            </CardFooter>
          </Card>
  
            </Row>
            <Row>
            <Card className="text-center" >
        <CardBody>
          <CardTitle tag="h4">Course options</CardTitle>
          <CardText>
            Select any of the course options below.
          </CardText>


          <DeleteCourse />
          <DeleteCourseOutline />
          <AddCourseInstructor />
          <RemoveCourseInstructor />
        
        </CardBody>
        <CardFooter className="text-muted mb-2">
        </CardFooter>
      </Card>
  
            </Row>
            <h5 className="title"> Created Lectures</h5>
            <h4 style={{marginBottom: '50px'}}>{alert2}</h4>
             <Row>
               {lectures.map(lecture =>{
      
                 return (
               <Card key={lecture.lectureid}>
                <CardBody>
                 <CardText><span style={{fontWeight:'200'}}>Id:&nbsp;&nbsp;</span>{lecture.lectureid}</CardText>
                  <CardText><span style={{fontWeight:'200'}}>CourseId:&nbsp;&nbsp;</span>{lecture.courseId}</CardText>
                  <CardText><span style={{fontWeight:'200'}}>InstructorId:&nbsp;&nbsp;</span>{lecture.instructorId}</CardText>
                
                </CardBody>
              </Card>
                 )
               })}
             
             </Row>
            <Row>
            <Card className="text-center" >
        <CardBody>
          <CardTitle tag="h4">Instructor options</CardTitle>
          <CardText>
            Select any of the Instructor options below.
          </CardText>
          <CreateInstructor />
          <DeleteInstructor />
          <UploadInstructorsImage />

          
        </CardBody>
        <CardFooter className="text-muted mb-2">
        </CardFooter>
      </Card>
  
            </Row>
            <h5 className="title"> Created Instructors</h5>
            <h4>{alert}</h4>
            <Row>
              {createdInstructors.map(createdInstructor =>{
                return (
                  <Card key={createdInstructor.id}>
                  <CardHeader className="mt-2" ><span style={{fontWeight:'200'}}>Id:&nbsp;&nbsp;</span>{createdInstructor.id}</CardHeader>
                  <CardBody>
                  <CardTitle tag="h4" style={{marginTop: '5px'}}>{createdInstructor.name}</CardTitle>
                  <CardText>
                  {createdInstructor.title}
                  </CardText>

                  <Button
                    color="primary"
                    href="/course-page"
                    size ='sm'
                    onClick={e => {
                      e.preventDefault();
                      history.push('/editinstructor-page/'+ createdInstructor.id );
                    }}
                    style={{backgroundColor: '#EF6D1A'}}
                  >
                  Edit Instructor
                  </Button>
                  </CardBody>
                </Card>
                )
              })}
             
            </Row>
                
          </Container>
        </div>
        <TacFooter/>
      </div>
            
            
        </>
    );
}



export default AdminPage;