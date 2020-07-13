import React , {useState, useEffect, useRef} from "react";
import {useParams} from 'react-router-dom';

import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import axios from "axios";


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col
} from "reactstrap";

// core components
import TracNavbar from "components/Navbars/TracNavbar";
import TransparentFooter from "components/Footers/TransparentFooter.js";
import Message from 'components/Message';
import * as legoData from "../twirl.json";


function ResetPasswordPage(props) {
  let token = useParams({}).token;
  console.log(token)  
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [user,setUser] = useState({password : ""});
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let timerID = useRef(null);
  const API_URL = "http://localhost:8080/";

  useEffect(()=>{
    return ()=>{
        clearTimeout(timerID);
    }
    },[]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: legoData.default,
    rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
    }
  }

  const onChange = e =>{
    setUser({...user,[e.target.name] : e.target.value});
    console.log(user);
  }


  useEffect(()=>{
    setIsLoading(true)
    setAlert('validating request...')
    try {
        axios({
            method: 'get',
            url: API_URL + 'resetpassword',
            params: {
            resetPasswordToken: token
            },
      
          }).then(response =>{
              console.log(response);
              if(response.data.message.msgBody === 'Please enter a new password'){
                  setUsername(response.data.username);
                  setIsLoading(false)
                  setAlert('Please enter a new Password')
              }

          },
          error => {
            console.log(error.response.data.message)
            const resMessage = error.response.data.message;
            setIsLoading(false);
            setAlert('');
            setMessage(resMessage)
          
          }
          )
    } catch (error) {
        console.log(error)
        setMessage(error.message)
        setAlert('Something went wrong!')
        setIsLoading(false);

        
    }
    },[token]);
  
  const onSubmit = async (e) =>{
        e.preventDefault();
        setIsLoading(true);
        setAlert('Attempting update...');
        try {
           await setTimeout(() => {
             axios({
            method: 'put',
            url: API_URL + 'updatepassword',
             headers: {
                'Content-Type': 'application/json'
            },
            
           data: {
            password: user.password,
            username: username,
            resetPasswordToken: token
           },
        
         }).then(response =>{
             console.log(response);
             if(response.data.message.msgBody === 'Password updated'){
                 setMessage(response.data.message);
                 setAlert('');
                 setIsLoading(false);
                 setTimeout(() =>{
                     props.history.push('/login-page');
                 }, 2000)
             }
         },  error => {
            console.log(error)
            const resMessage = error.response.data.message;
            setAlert('');
            setIsLoading(false);
            setMessage(resMessage)
          
          })
   
            }, 3000);

        } catch (error) {
            console.log(error)
            setMessage(error)
            setAlert('')
            setIsLoading(false);
        }
    
    }
    




  useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  return (
    <>
      <TracNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/login.jpg") + ")"
          }}
        ></div>
        <div className="content">
            <p className="text-success content-center text-center">{alert}</p>
          <Container>
        
          {isLoading === true? (
              
              <FadeIn>
               
              <div className="container"  style={{marginTop: '200px'}}>
              <Lottie options={defaultOptions} height={200} width={200}  style={{marginTop: '150px'}} />
       
                 
              </div>
            </FadeIn>
            

            ) : (
            <div>
            <h2 >Reset Password</h2>
            <div>
                
            </div>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form onSubmit={onSubmit}  className="form" >
                  <CardHeader className="text-center" >
                    <div className="logo-container" style={{width: '150px', marginTop: '100px'}}>
                    <img src="https://res.cloudinary.com/dfszquucy/image/upload/v1592438821/TRAC-logo_wjje6h.png" alt="TRAClogo" />
                    </div>
                  </CardHeader>
                  <CardBody>
                  <div>{message ? <Message message={message}/> : null}</div>
                  {alert === 'Please enter a new Password' ? (
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (passwordFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password..."
                        name="password"
                        type="password"
                        onChange={onChange} 
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                      ></Input>
                    </InputGroup>
                  ): null}  
                  </CardBody>
                  <CardFooter className="text-center">
                  {alert === 'Please enter a new Password' ? (
                     <Button
                       block
                       className="btn-round"
                       style={{backgroundColor:'#107E85'}}
                       color="warning"
                       type="submit"
    
                       size="lg"
                    >
                      Reset
                    </Button>
           
                  ): null}
                   
              
                    <div className="pull-left">
                      <h6>
                        <a
                          className="link"
                          href="/login-page"
                   
                        >
                      Login
                        </a>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link"
                          href="/forgotpassword-page"
                      
                        >
                          Forgot Password?
                        </a>
                      </h6>
                    </div>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
            </div>
            )}
          </Container>
        </div>
        <TransparentFooter/>
      </div>
    </>
  );
}

export default ResetPasswordPage;
