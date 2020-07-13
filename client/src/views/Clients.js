import React from 'react';

import { Container, 
    Row, 
    Col
 } from "reactstrap";

function Clients(props) {
    return (
        <>
         <div className="text-center content"   style={{marginTop:'50px', marginBottom:'50px'}}>
           <Container>
           <h2 className="title" style={{marginBottom:'50px'}}>Some of Our Clients</h2>
           <Row>
                 <Col>
                 <img src="https://res.cloudinary.com/dfszquucy/image/upload/v1592651443/twb-logo_h6z8gj.png" alt="Translators Without Boarders" />
                 </Col>
                 <Col>
                 <img src="    https://res.cloudinary.com/dfszquucy/image/upload/v1592651442/iom-logo_ua3wpw.png" alt="International Organization for Migration" /></Col>
                 <Col>
                 <img src="https://res.cloudinary.com/dfszquucy/image/upload/v1592651443/cpn2-logo_wxoig8.png" alt="Child Protection Network" /></Col>
                 <Col>
                 <img src="https://res.cloudinary.com/dfszquucy/image/upload/v1592651442/hollyhill-logo_tp8c8y.png" alt="Holly Hill Church" />
             
                 </Col>
             </Row>
           </Container>
             </div>   
        </>
    );
}

export default Clients;