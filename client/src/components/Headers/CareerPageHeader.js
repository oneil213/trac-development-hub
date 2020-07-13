import React from 'react';
// reactstrap components
import { Container } from "reactstrap";
// core components


function CareerPageHeader(props) {
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
        <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/bg5.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="photo-container">
            <img alt="..." src={require("assets/img/userplaceholder.png")}></img>
          </div>
          <h3 className="title">Career</h3>
          <p className="category">Join the hub</p>
          {/* <div className="content">
            <div className="social-description">
              <h2>26</h2>
              <p>Comments</p>
            </div>
            <div className="social-description">
              <h2>26</h2>
              <p>Comments</p>
            </div>
            <div className="social-description">
              <h2>48</h2>
              <p>Bookmarks</p>
            </div>
          </div> */}
        </Container>
      </div> 
            
        </>
    );
}

export default CareerPageHeader;