import React , {useState, useEffect, useRef} from "react";
import axios from "axios";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";


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

function ForgotPasswordPage(props) {
  const [emailFocus, setEmailFocus] = useState(false);
  const [user,setUser] = useState({email: ""});
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
   
    }
  console.log(user);

  const onSubmit = (e) =>{
    e.preventDefault();
    setIsLoading(true);
    setAlert('Requesting reset...')
  setTimeout(() => {
    axios({
      method: 'post',
      url: API_URL + 'forgotpassword',
       headers: {
          'Content-Type': 'application/json'
      },
      
     data: {
      email: user.email
      
     }
  
  }).then(response =>{
    console.log(response)
    setMessage(response.data.message)
    setAlert('');
    setIsLoading(false);
  //  setTimeout(()=>{
  //   window.location.reload(false);
  //  }, 1500)
  },
  error => {
    console.log(error)
    const resMessage = error.response.data.message;
    setAlert('');

    setIsLoading(false);
    setMessage(resMessage)
  
  }
  ).catch(error =>{
    console.log(error)
    setMessage(error)
    setAlert('')
    setIsLoading(false);
 
  
    })

   
  }, 3000);

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
          <Container>
          {isLoading === true? (
              
              <FadeIn>
                <p className="text-success content-center text-center">{alert}</p>
              <div className="container"  style={{marginTop: '200px'}}>
              <Lottie options={defaultOptions} height={200} width={200}  style={{marginTop: '150px'}} />
       
                 
              </div>
            </FadeIn>
            

            ) : (
            <div>
            <h2 >Forgot Password</h2>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form   className="form"  onSubmit={onSubmit}>
                  <CardHeader className="text-center" >
                    <div className="logo-container" style={{width: '150px', marginTop: '100px'}}>
                    <img src="https://res.cloudinary.com/dfszquucy/image/upload/v1592438821/TRAC-logo_wjje6h.png" alt="TRAClogo" />
                    </div>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (emailFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_email-85"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email..."
                        required
                        type="email"
                        name="email"
                        onChange={onChange} 
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                       block
                       className="btn-round"
                       style={{backgroundColor:'#107E85'}}
                       color="warning"
                       type="submit"
    
                       size="lg"
                    >
                      Submit
                    </Button>
                    {message ? <Message message={message}/> : null}
                    <div className="pull-left">
                      <h6>
                        <a
                          className="link"
                          href="/register-page"
                   
                        >
                      Register
                        </a>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
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

export default ForgotPasswordPage;