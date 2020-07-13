import React , {useState, useEffect, useRef} from "react";
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
import AuthService from 'services/auth.service';

function LoginPage(props) {
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [user,setUser] = useState({username: "", password : ""});
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState('');
  let timerID = useRef(null);


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

const onSubmit = e =>{
  setAlert('Attempting login...')
  e.preventDefault();
  setIsLoading(true);
  timerID = setTimeout(()=>{
    AuthService.login(user.username, user.password).then((user) => {
     const userDetails = user.data;
     const {roles} = userDetails;
     setRoles(roles);
     props.history.push('/user-page');   
     
   
    },
    error => {
      console.log(error)
      const resMessage = error.response.data.message;
      console.log(resMessage)
      setMessage(resMessage)
      setIsLoading(false)
    }).catch(error =>{
      console.log(error);
      setIsLoading(false)
    })
            
  },2000)
    
 
}
 
console.log(roles);



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
            <h2 style={{marginTop: '100px'}}>Login</h2>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form onSubmit={onSubmit}  className="form" >
                  <CardHeader className="text-center" >
                    <div className="logo-container" style={{width: '150px', marginTop: '100px'}}>
                    <img src="https://res.cloudinary.com/dfszquucy/image/upload/v1592438821/TRAC-logo_wjje6h.png" alt="TRAC-logo" />
                    </div>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (usernameFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="UserName..."
                        type="text"
                        name="username"
                        onChange={onChange} 
                        onFocus={() => setUsernameFocus(true)}
                        onBlur={() => setUsernameFocus(false)}
                      ></Input>
                    </InputGroup>
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
                      Login
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

export default LoginPage;
