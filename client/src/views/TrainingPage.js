import React , {useEffect, useState} from 'react';
import TacFooter from '../components/Footers/TracFooter';

// reactstrap components
import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Form,
  Col
} from "reactstrap";

// core components

import TrainingPageHeader from "components/Headers/TrainingPageHeader";
import TracNavbar from 'components/Navbars/TracNavbar';
import EmailService from "services/email.service";

function TrainingPage() {
  const [emails,setEmails] = useState({firstname: "", lastname: "",  email : "" , message: ""});
  const [alert, setAlert] = useState('');
  
  const onChange = e =>{
    setEmails({...emails,[e.target.name] : e.target.value});
    };
    console.log(emails);
  
  const resetForm = ()=>{
      setEmails({firstname: "", lastname: "",  email : "" , message: ""});
    };
  
    const onSubmit = e => {
      let email = emails.email;
      let firstname = emails.firstname;
      let lastname = emails.lastname;
      let message = emails.message;

      e.preventDefault();
      setAlert('Submitting message...')
     EmailService.sendMail(firstname, lastname, message, email).then(response =>{
       if(response.data.message.msgBody === 'Message sent'){
         setAlert('Message submitted');
         resetForm();
         setTimeout(() => {
          setAlert('');
        }, 3000);
        
      
       } else {
        setAlert('Something went wrong!');
        setTimeout(() => {
          setAlert('')

        }, 3000);
       }
     }).catch(error =>{
      setAlert('Something went wrong!');
      setTimeout(() => {
        setAlert('')

      }, 3000);
      
       console.log(error)
     })
    }


  
  
  
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
        <div className="section section-about-us">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h2 className="title">What you can learn</h2>
                <h5 className="description">
                  According to the National Oceanic and Atmospheric
                  Administration, Ted, Scambos, NSIDClead scentist, puts the
                  potentially record low maximum sea ice extent tihs year down
                  to low ice extent in the Pacific and a late drop in ice extent
                  in the Barents Sea.
                </h5>
              </Col>
            </Row>
            <div className="separator separator-primary"></div>
            <div className="section-story-overview">
              <Row>
                <Col md="6">
                  <div
                    className="image-container image-left"
                    style={{
                      backgroundImage:
                        "url(" + require("assets/img/login.jpg") + ")"
                    }}
                  >
                    <p className="blockquote " style={{border:'1px solid #EF6D1A', color:'#EF6D1A'}}> 
                      "Over the span of the satellite record, Arctic sea ice has
                      been declining significantly, while sea ice in the
                      Antarctichas increased very slightly" <br></br>
                      <br></br>
                      <small>-NOAA</small>
                    </p>
                  </div>
                  <div
                    className="image-container"
                    style={{
                      backgroundImage:
                        "url(" + require("assets/img/bg3.jpg") + ")"
                    }}
                  ></div>
                </Col>
                <Col md="5">
                  <div
                    className="image-container image-right"
                    style={{
                      backgroundImage:
                        "url(" + require("assets/img/bg1.jpg") + ")"
                    }}
                  ></div>
                  <h3>
                    So what does the new record for the lowest level of winter
                    ice actually mean
                  </h3>
                  <p>
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens with climate change. Even if the
                    Arctic continues to be one of the fastest-warming regions of
                    the world, it will always be plunged into bitterly cold
                    polar dark every winter. And year-by-year, for all kinds of
                    natural reasons, there’s huge variety of the state of the
                    ice.
                  </p>
                  <p>
                    For a start, it does not automatically follow that a record
                    amount of ice will melt this summer. More important for
                    determining the size of the annual thaw is the state of the
                    weather as the midnight sun approaches and temperatures
                    rise. But over the more than 30 years of satellite records,
                    scientists have observed a clear pattern of decline,
                    decade-by-decade.
                  </p>
                  <p>
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens with climate change. Even if the
                    Arctic continues to be one of the fastest-warming regions of
                    the world, it will always be plunged into bitterly cold
                    polar dark every winter. And year-by-year, for all kinds of
                    natural reasons, there’s huge variety of the state of the
                    ice.
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <div className="section section-team text-center">
          <Container>
            <h2 className="title">Here is our team</h2>
            <div className="team">
              <Row>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("assets/img/avatar.jpg")}
                    ></img>
                    <h4 className="title">Romina Hadid</h4>
                    <p className="category " style={{color:'#EF6D1A'}}>Model</p>
                    <p className="description">
                      You can write here details about one of your team members.
                      You can give more details about what they do. Feel free to
                      add some{" "}
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        links
                      </a>{" "}
                      for people to be able to follow them outside the site.
                    </p>
                    <Button
                      className="btn-icon btn-round"
                   
                      style={{backgroundColor:'#EF6D1A', color:'#107E85'}}
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"

                      style={{backgroundColor:'#EF6D1A', color:'#107E85'}}
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-instagram"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                    
                      style={{backgroundColor:'#EF6D1A', color:'#107E85'}}
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-facebook-square"></i>
                    </Button>
                  </div>
                </Col>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("assets/img/ryan.jpg")}
                    ></img>
                    <h4 className="title">Ryan Tompson</h4>
                    <p className="category " style={{color:'#EF6D1A'}}>Designer</p>
                    <p className="description">
                      You can write here details about one of your team members.
                      You can give more details about what they do. Feel free to
                      add some{" "}
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        links
                      </a>{" "}
                      for people to be able to follow them outside the site.
                    </p>
                    <Button
                      className="btn-icon btn-round"
                
                      style={{backgroundColor:'#EF6D1A', color:'#107E85'}}
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      
                      style={{backgroundColor:'#EF6D1A', color:'#107E85'}}
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-linkedin"></i>
                    </Button>
                  </div>
                </Col>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("assets/img/eva.jpg")}
                    ></img>
                    <h4 className="title">Eva Jenner</h4>
                    <p className="category"style={{color:'#EF6D1A'}}>Fashion</p>
                    <p className="description">
                      You can write here details about one of your team members.
                      You can give more details about what they do. Feel free to
                      add some{" "}
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        links
                      </a>{" "}
                      for people to be able to follow them outside the site.
                    </p>
                    <Button
                      className="btn-icon btn-round"
                      
                      style={{backgroundColor:'#EF6D1A', color:'#107E85'}}
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-google-plus"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
           
                      style={{backgroundColor:'#EF6D1A', color:'#107E85'}}
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-youtube"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
               
                      style={{backgroundColor:'#EF6D1A', color:'#107E85'}}
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <div className="section section-contact-us text-center">
          <Container>
            <h2 className="title">Want to work with us?</h2>
            <p className="description">Your project is very important to us.</p>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h3 className="text-center">Tell us about it.</h3>
                <Form className="contact-form" onSubmit={onSubmit}>
                  <Row>
                    <Col md="6">
                      <label>FirstName</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                      placeholder="First Name..."
                      type="text"
                      name='firstname'
                      value={emails.firstname}
                      onChange={onChange} 
                    ></Input>
                      </InputGroup>
                    </Col>
                    <Col md="6">
                      <label>LastName</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                      placeholder="Last Name..."
                      name='lastname'
                      value={emails.lastname}
                      onChange={onChange} 
                      type="text"
                    ></Input>
                      </InputGroup>
                    </Col>
                    <Col md="12">
                      <label>Email</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-email-85" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                      placeholder="Email..."
                      type="text"
                      name='email'
                      value={emails.email}
                      onChange={onChange} 
                    ></Input>
                      </InputGroup>
                    </Col>
                  </Row>
                  <label>Message</label>
                  <Input
                    placeholder="Tell us your thoughts and feelings..."
                    type="textarea"
                    name='message'
                    rows="4"
                    onChange={onChange} 
                    value={emails.message}
                  />
                  <Row>
                    <Col className="ml-auto mr-auto" md="4">
                      <Button className="btn-fill"  type='submit' color="danger" size="lg" style={{backgroundColor:'#EF6D1A'}}>
                        Send Message
                      </Button>
                      <p className="text-success content-center text-center">{alert}</p>

                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
        <TacFooter/>
      </div>
    </>
  );
}

export default TrainingPage;
