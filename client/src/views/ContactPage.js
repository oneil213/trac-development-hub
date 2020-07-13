import React , {useState, useEffect} from 'react';
import TacFooter from '../components/Footers/TracFooter';

// reactstrap components
import {
    Button,
    Container,
    Row,
    Col,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,

  } from "reactstrap";

  import ContactPageHeader from "components/Headers/ContactPageHeader";
  import TracNavbar from 'components/Navbars/TracNavbar';
  import EmailService from "services/email.service";


function ContactPage(props) {
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
        <ContactPageHeader />
        <div className="section content-center text-center ">
          <Container>
            <h3 className="title">Need to get in touch?</h3>
            <h5 className="description">
              We are here to answer any of your questions.
              Why not get in touch with us from any of the 
              contact channels below and a team member will
              reach out to you.
            </h5>
            <h3 className="title">Drop a mail</h3>
            <div className="section landing-section">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="text-center">Keep in touch?</h2>
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
            <h3 className="title">Call</h3>
            <h5 className="description">
              Please call <a href='tel:+2348064377446'>+2348064377446</a><br/>
              or call <a href='tel:+4470833274307'>+4470833274307</a>
            </h5>
            <h3 className="title">Addresses</h3>
            <h4 className="sub-title">Nigeria</h4>
            <h5 className="description">
             5, Banjul Street ,<br/>
             Wuse2, Abuja <br/>
             Nigeria.
            </h5>
            <h4 className="sub-title">Uk</h4>
            <h5 className="description">
             10 Consort road<br/>
             SE15 2PU<br/>
             London, Uk
            </h5>       
          </Container>
        </div>
        <TacFooter/>
      </div> 
        </>
    );
}

export default ContactPage;