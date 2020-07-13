import React, {useEffect} from 'react';
// reactstrap components
import {
    Button,

    Container,
 
    UncontrolledTooltip
  } from "reactstrap";

import TracNavbar from 'components/Navbars/TracNavbar';
import CareerPageHeader from "components/Headers/CareerPageHeader";
import TacFooter from '../components/Footers/TracFooter';

function CareerPage(props) {

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
        <CareerPageHeader />
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
            <h3 className="title">Why you should join us</h3>
            <h5 className="description">
              An artist of considerable range, Ryan — the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
              and records all of his own music, giving it a warm, intimate feel
              with a solid groove structure. An artist of considerable range.
            </h5>
            <h3 className="title">Mentorship</h3>
            <h5 className="description">
              An artist of considerable range, Ryan — the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
              and records all of his own music, giving it a warm, intimate feel
              with a solid groove structure. An artist of considerable range.
              Please send your CV to <a href='mailto:Mentorship@tracdevelopmenthub.com'>Mentorship@tracdevelopmenthub.com</a>
            </h5>
            <h3 className="title">Coaching</h3>
            <h5 className="description">
              An artist of considerable range, Ryan — the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
              and records all of his own music, giving it a warm, intimate feel
              with a solid groove structure. An artist of considerable range.
              Please send your CV to <a href='mailto:Coachin@tracdevelopmenthub.com'>Coaching@tracdevelopmenthub.com</a>
            </h5>
            <h3 className="title">Open Positions</h3>
            <h3 className="title">Send us your CV</h3>
            <h5 className="description">
              Please send your CV to <a href='mailto:careers@tracdevelopmenthub.com'>careers@tracdevelopmenthub.com</a>
            </h5>
            
          </Container>
        </div>
        <TacFooter/>
      </div>
            
            
        </>
    );
}

export default CareerPage;