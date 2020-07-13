import React from 'react';
// reactstrap components
import { Button, Container, Row, Col, UncontrolledTooltip } from "reactstrap";

function Publications(props) {
    return (
        <>
         <div
        className="section section-download"
        style={{backgroundColor:'#107E85'}}
        id="download-section"
      >
        <Container>
          <Row className="justify-content-md-center">
            <Col className="text-center" lg="8" md="12">
      
              <h3 className="title" style={{color:'white'}}>Are you a development enthusiast?</h3>
              <h5 className="description" style={{color:'white'}}>
                if you are, then you will love our monthly publications!
                Visit here every month and download a copy of our publication.
                get insight & get ahead!
              </h5>
            </Col>
            <Col className="text-center" lg="8" md="12">
              <Button
                className="btn-round mr-1"
                color="info"
                style={{backgroundColor: '#EF6D1A', color:'white'}}
                href="/home"
                role="button"
                size="lg"
              >
                Download Trac
              </Button>
              <Button
                className="btn-round"
                style={{color:'white'}}
                href="/home"
                outline
                role="button"
                size="lg"
                target="_blank"
              >
                Join us
              </Button>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <br></br>
          <Row className="text-center mt-5">
            <Col className="ml-auto mr-auto" md="8">
              <h2 style={{color:'white'}}> Group training?</h2>
              <h5 className="description" style={{color:'white'}}>
                We've have started{" "}
                <a
                 href="/training-page"
                  style={{color:'#EF6D1A', fontWeight:'800'}}
                >
                  Group Training
                </a>
                .The services is provided for organization with demand,
                and need to train large group of individuals. You you run such an 
                organization, why not discuss your need with us
              </h5>
            </Col>
            <Col md="12">
              <Button
                className=" btn-round"
                style={{backgroundColor: '#EF6D1A', }}
       
                href="/home"
                size="lg"
          
              >
                <i className="now-ui-icons arrows-1_share-66 mr-1"></i>
                Call us
              </Button>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row className="justify-content-md-center sharing-area text-center">
            <Col className="text-center" lg="8" md="12">
              <h3 style={{color:'white'}}>Check us out on social media!</h3>
            </Col>
            <Col className="text-center" lg="8" md="12">
              <Button
                className="btn-neutral btn-icon btn-round"
                color="twitter"
                href="/home"
                id="tooltip86114138"
                size="lg"
                target="_blank"
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip86114138">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-neutral btn-icon btn-round"
                color="facebook"
                href="/home"
                id="tooltip735272548"
                size="lg"
                target="_blank"
              >
                <i className="fab fa-facebook-square"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip735272548">
                Like us
              </UncontrolledTooltip>
              <Button
                className="btn-neutral btn-icon btn-round"
                color="linkedin"
                href="/home"
                id="tooltip647117716"
                size="lg"
                target="_blank"
              >
                <i className="fab fa-linkedin"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip647117716">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-neutral btn-icon btn-round"
                color="instagram"
                href="/home"
                id="tooltip331904895"
                size="lg"
                target="_blank"
              >
                <i className="fab fa-instagram"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip331904895">
                like on Instagram
              </UncontrolledTooltip>
            </Col>
          </Row>
        </Container>
      </div>
            
        </>
    );
}

export default Publications;