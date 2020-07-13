import React, {useEffect} from 'react';

// reactstrap components
import {
    Button,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    Col,
    UncontrolledTooltip
  } from "reactstrap";
import TracNavbar from 'components/Navbars/TracNavbar';
import AboutPageHeader from "components/Headers/AboutPageHeader";
import TacFooter from '../components/Footers/TracFooter';

function AboutPage(props) {
    const [pills, setPills] = React.useState("2");
 
 
 
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
        <AboutPageHeader />
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
            <h3 className="title">About us</h3>
            <h5 className="description">
              An artist of considerable range, Ryan — the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
              and records all of his own music, giving it a warm, intimate feel
              with a solid groove structure. An artist of considerable range.
            </h5>
            <Row>
              <Col className="ml-auto mr-auto" md="6">
                <h4 className="title text-center">Our Portfolio</h4>
                <div className="nav-align-center">
                  <Nav
                    className="nav-pills-info nav-pills-just-icons content-center"
                    pills

                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={pills === "1" ? "active" : "#EF6D1A"}
                        href="#pablo"
                        style={{backgroundColor:'#EF6D1A'}}
                        onClick={e => {
                          e.preventDefault();
                          setPills("1");
                        }}
                      >
                        <i className="now-ui-icons design_image"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "2" ? "active" : ""}
                        href="#pablo"
                        style={{backgroundColor:'#EF6D1A'}}
                        onClick={e => {
                          e.preventDefault();
                          setPills("2");
                        }}
                      >
                        <i className="now-ui-icons location_world"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "3" ? "active" : ""}
                        href="#pablo"
                        style={{backgroundColor:'#EF6D1A'}}
                        onClick={e => {
                          e.preventDefault();
                          setPills("3");
                        }}
                      >
                        <i className="now-ui-icons sport_user-run"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "4" ? "active" : ""}
                        href="#pablo"
                        style={{backgroundColor:'#EF6D1A'}}
                        onClick={e => {
                          e.preventDefault();
                          setPills("4");
                        }}
                      >
                        <i className="now-ui-icons sport_user-run"></i>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Col>
              <TabContent className="gallery" activeTab={"pills" + pills}>
                <TabPane tabId="pills1" >
                    <Row className='content-center'>
                        <Col md='4'>
                        <img src="https://res.cloudinary.com/dfszquucy/image/upload/v1591801971/animation_500_kb9dgkds_xuwval.gif" alt="" height='200px' />
                        </Col>
                        <Col md='8'>
                         <h3>Title Here</h3>   
                        <p>
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at. So when you get something that has
                        the name Kanye West on it, it’s supposed to be pushing
                        the furthest possibilities. I will be the leader of a
                        company that ends up being worth billions of dollars,
                        because I got the answers. I understand culture. I am
                        the nucleus.
                      </p>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="pills2">
                </TabPane>
                <TabPane tabId="pills3">  
                </TabPane>
                <TabPane tabId="pills3">  
                </TabPane>
              </TabContent>
            </Row>
          </Container>
        </div>
        <TacFooter/>
      </div>
            
        </>
    );
}

export default AboutPage;