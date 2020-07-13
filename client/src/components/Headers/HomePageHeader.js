import React , {useEffect, createRef}from 'react';
import Lottie from "react-lottie";
import * as legoData from "../../lf30_editor_xb9z2j.json";
import { Container, Button} from "reactstrap";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: legoData.default,
    rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
    }
  }
function HomePageHeader(props) {

    let pageHeader = createRef();
     useEffect(() => {
        if (window.innerWidth > 991) {
          const updateScroll = () => {
            // if(!!e.deltaY) {
            //   setState((currentState)=>{
            //        const delta = Math.sign(e.deltaY) * 10.0;
            //        const val = Math.max(0, currentState.scrollTop + delta);
            //        return {scrollTop:val}   
            //   })            
            // }
          };
          window.addEventListener("scroll", updateScroll);
          return function cleanup() {
            window.removeEventListener("scroll", updateScroll);
          };
        }
      });

    return (
        <>
       <div className="page-header clear-filter" filter-color="red">
       <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/TracBackground.png") + ")",
       
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="content-center brand" style={{marginTop:'100px'}}>
          <Lottie options={defaultOptions}  width={200}  style={{marginTop: '10px'}} />
          <img src="https://res.cloudinary.com/dfszquucy/image/upload/v1592438821/TRAC-logo_wjje6h.png" alt="Receipts"  width='350px' />
            <h2 className="h1-seo" style={{color:'black', marginBottom:'10px'}}>DEVELOPMENT HUB</h2>
            <h3 style={{color:'#EF6D1A'}} >International Development Experts</h3>
            <Button
                color="primary"
                href="/trainings-page"    
                style={{backgroundColor: '#EF6D1A'}}
            >Trainings</Button>
          </div>
        
        </Container>
      </div>
            
        </>
    );
}

export default HomePageHeader;
