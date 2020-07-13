import React, {useState, useEffect}from "react";import { useHistory } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import axios from "axios";

// reactstrap components
import { Button,
  Card,
  Container,
  CardBody,
  CardTitle,
  CardText,
  CardHeader,
  CardFooter} from "reactstrap";
// core components
import TracNavbar from 'components/Navbars/TracNavbar';
import TacFooter from '../components/Footers/TracFooter';
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
  

function CourseOutlinePage(props) {
  let history = useHistory();
     
    let courseId = new useParams({}).id;
    const [isLoading, setIsLoading] = useState(true);
    const [empty, setEmpty] = useState(false);
    const [alert2, setAlert2] = useState('Loading Course Outline');
    const [currentOutline] = useState([]);
    const [outlines, setOutlines] = useState(currentOutline);
    const [message,setMessage] = useState(null);
    const API_URL = "http://localhost:8080/";




  
    useEffect(()=>{

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
              let result = response.data.CourseOutlines;
              if(result.length === 0){
                setEmpty(true);
                    setAlert2('This course has no outline yet!');
                    setIsLoading(false)
              }
              else {
                setOutlines(result); 
                setAlert2('');
                setIsLoading(false)
              }
                   
              
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
            setAlert2('')
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
          <p className="text-success content-center text-center">{alert2}</p>
          <Lottie options={defaultOptions} height={200} width={200}   />
                              
          </div>
        </FadeIn>
        ) :(
            
        <div>
            {empty === true? (
                <p className="text-muted content-center text-center">{alert2}</p>
            ):(
                <div className="section content-center text-center" style={{margin:'10px'}}>
                {outlines.map(outline =>{
                    return (      
              <Card className="text-center" key={outline.courseId}>
              <CardHeader className="mt-2" ><span style={{fontWeight:'200'}}>Outline Id:&nbsp;&nbsp;</span>{outline.id}</CardHeader>
              <CardBody>
              <CardTitle tag="h4"><span style={{fontWeight:'200'}}>Outline Title:&nbsp;&nbsp;</span>{outline.title}</CardTitle>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',   }}>
              <CardText style={{whiteSpace:"pre-line", textAlign:'start', justifyItems: 'center', lineHeight: '2.5em'}}>
                 {outline.description}
                </CardText>
              </div>
              
                <Button
            color="primary"
            onClick={e => {
              e.preventDefault();
              history.push('/editoutline-page/'+ outline.id);
            }}
            style={{backgroundColor: '#EF6D1A'}}
          >
            Edit Outline
          </Button>
              </CardBody>
              <CardFooter className="text-muted mb-2">
              {message ? <Message message={message}/> : null}
              </CardFooter>
            </Card>
              )
                })}
                </div>
            )}
        </div>
                  )} 
               </Container>
               
             
           </div>
    
       
       <TacFooter/>
       </div>
            
        </>
    );
}

export default CourseOutlinePage;






