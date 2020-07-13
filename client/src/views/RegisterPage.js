import React , {useState} from 'react';
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
import TracNavbar from "components/Navbars/TracNavbar";
import TransparentFooter from "components/Footers/TransparentFooter.js";
import * as legoData from "../twirl.json";
import AuthService from "services/auth.service";
import Message from 'components/Message';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
  preserveAspectRatio: "xMidYMid slice"
  }
}

function RegisterPage(props) {
    const [user,setUser] = useState({username: "", password : "",  email : "" , firstname: "", lastname: ""});
    const [firstnameFocus, setFirstnameFocus] = React.useState(false);
    const [lastnameFocus, setLastnameFocus] = React.useState(false);
    const [usernameFocus, setUsernameFocus] = React.useState(false);
    const [passwordFocus, setPasswordFocus] = React.useState(false);
    const [message,setMessage] = useState(null);
    const [alert, setAlert] = useState('');
    const [isLoading , setIsLoading] = useState(false);
    const [emailFocus, setEmailFocus] = React.useState(false);

    
    const onChange = e =>{
      setUser({...user,[e.target.name] : e.target.value});
      console.log(user);
     }
    const resetForm = ()=>{
      setUser({username: "",  email : "", firstname: "", lastname: "" , password : "" });
      }
               
  const onSubmit = e =>{       
    setIsLoading(true);
    e.preventDefault();
    setAlert('Attempting registration')

    setTimeout(() => {

      try {
        if(e){
          AuthService.userRegister(user.username,  user.email,  user.firstname, user.lastname, user.password).then(response =>{
            setAlert('Attempting registration');
            resetForm();
              props.history.push('login-page');
              setIsLoading(false)
          },
          error => {
              console.log(error);
              // const resMessage =
              //         (error.response &&
              //           error.response.data &&
              //           error.response.data.message) ||
              //         error.message ||
              //         error.toString();
                  setMessage(error.response.data.Message);
                  setAlert('');
                  setIsLoading(false);
           
                 
          }
          );
      } else {
        setAlert('Something is not right! try again.');
          setIsLoading(false);
      
        } 
        
      } catch (error) {
        setAlert('An error occurred');
        console.log(error)
        setIsLoading(false);
      }
    
    
    }, 3000);

    
    }


           

   



    React.useEffect(() => {
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
        <p className="text-success content-center text-center">{alert}</p>
        <div className="content">
          
          <Container>
          {isLoading === true? (
              
              <FadeIn>
 
              <div className="container"  style={{marginTop: '200px'}}>
              <Lottie options={defaultOptions} height={200} width={200}  style={{marginTop: '150px'}} />
       
                 
              </div>
            </FadeIn>
            

            ) : (
           
            <div>
             <h2 style={{marginTop: '100px'}}>Register</h2>  
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form onSubmit={onSubmit}  className="form"  >
                <CardHeader className="text-center" >
                    <div className="logo-container" style={{width: '150px', marginTop: '100px'}}>
                    <img src="https://res.cloudinary.com/dfszquucy/image/upload/v1592438821/TRAC-logo_wjje6h.png" alt="TRAClogo" />
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
                        required
                        onChange={onChange} 
                        name='username'
                        onFocus={() => setUsernameFocus(true)}
                        onBlur={() => setUsernameFocus(false)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstnameFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="firstName..."
                        type="text"
                        required
                        onChange={onChange} 
                        name='firstname'
                        onFocus={() => setFirstnameFocus(true)}
                        onBlur={() => setFirstnameFocus(false)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastnameFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="LastName..."
                        type="text"
                        required
                        name='lastname'
                        onChange={onChange} 
                        onFocus={() => setLastnameFocus(true)}
                        onBlur={() => setLastnameFocus(false)}
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
                        name='password'
                        required
                        type="password"
                        onChange={onChange} 
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                      ></Input>
                    </InputGroup>
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
                        name='email'
                        required
                        type="email"
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
                       color="warning"
                       type="submit"
                       style={{backgroundColor:'#EF6D1A'}}
                       size="lg"
                    >
                      Register
                    </Button>
                    {message ? <Message message={message}/> : null}
          
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
                          href="./contact-page"
                       
                        >
                          Need Help?
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
        
        <TransparentFooter />
      </div>
            
        </>
    );
}

export default RegisterPage;