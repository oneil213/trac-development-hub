import React , {useState} from 'react';

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row
  } from "reactstrap";

  import EmailService from "services/email.service";

function Training(props) {
    const [firstFocus, setFirstFocus] = useState(false);
    const [lastFocus, setLastFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [emails,setEmails] = useState({firstname: "", lastname: "",  email : "" , message: "Add me to news letter"});
    const [alert, setAlert] = useState('');

    const onChange = e =>{
      setEmails({...emails,[e.target.name] : e.target.value});
      };
      console.log(emails);
    
    const resetForm = ()=>{
        setEmails({firstname: "", lastname: "",  email : "" , message: "Add me to news letter"});
      };



    const onSubmit = e => {
      let email = emails.email;
      let firstname = emails.firstname;
      let lastname = emails.lastname;
      let message = emails.message;

      e.preventDefault();
      setAlert('Submitting details...')
     EmailService.sendMail(firstname, lastname, message, email).then(response =>{
       if(response.data.message.msgBody === 'Message sent'){
         setAlert('Details submitted');
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

    return (
        <>
        <div
        className="section section-signup"
        style={{
          backgroundImage: "url(" + require("assets/img/bg1.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "700px"
        }}
      >
           <h2 className=" title text-center" style={{color:'white'}}>Want to get latest development news?</h2>
        <Container>
          <Row>
            <Card className="card-signup" style={{backgroundColor: '#EF6D1A', color:'white'}}>
              <Form className="form" onSubmit={onSubmit}>
                <CardHeader className="text-center">
                  <CardTitle className="title-up" tag="h3">
                   Sign up for <br/>our newsletters
                  </CardTitle>
                  
                </CardHeader>
                <CardBody>
                  <InputGroup
                    className={
                      "no-border" + (firstFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons users_circle-08"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="First Name..."
                      type="text"
                      name='firstname'
                      value={emails.firstname}
                      onChange={onChange} 
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                    ></Input>
                  </InputGroup>
                  <InputGroup
                    className={
                      "no-border" + (lastFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons text_caps-small"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Last Name..."
                      name='lastname'
                      value={emails.lastname}
                      onChange={onChange} 
                      type="text"
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                    ></Input>
                  </InputGroup>
                  <InputGroup
                    className={
                      "no-border" + (emailFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons ui-1_email-85"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email..."
                      type="text"
                      name='email'
                      value={emails.email}
                      onChange={onChange} 
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                    ></Input>
                  </InputGroup>
                </CardBody>
                <CardFooter className="text-center">
                  <Button
                    className="btn-neutral btn-round"
                    style={{color:'#EF6D1A'}}
                    type='submit'    
                    size="lg"
                  >
                   Signup
                  </Button>
                  <p className="muted-success content-center text-center">{alert}</p>
                </CardFooter>
              </Form>
            </Card>
          </Row>
          {/* <div className="col text-center">
            <Button
              className="btn-round btn-white"
              color="default"
              to="/login-page"
              outline
              size="lg"
              tag={Link}
            >
              View Login Page
            </Button>
          </div> */}
        </Container>
      </div>
            
        </>
    );
}

export default Training;