import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";

// core components

function TrainingPageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
      
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/training.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container>
            <h1 className="title">Training Services</h1>
            <div className="text-center">
              <Button
                className="btn-icon btn-round"
        
                style={{backgroundColor:'#EF6D1A', color:'#107E85'}}
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-facebook-square"></i>
              </Button>
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
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default TrainingPageHeader;
