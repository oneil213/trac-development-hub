import React from 'react';
import { Container, 
    Row, 
    Col,
    Card,
    CardFooter,
    CardHeader,
    CardBody,
    CardText, 
    Button} from "reactstrap";

function Solutions(props) {
    return (
        <>
         <div className="section">

        <Container className="text-center" >
        <h2 className="title">What we do</h2>
          <Row className="justify-content-md-center">
          <Col lg='3' md='3'>
            <Card style={{ width: "15rem" }}>
            <img src="https://res.cloudinary.com/dfszquucy/image/upload/v1592573465/placeholer_ahqffk.jpg"  width= '250px' alt="Receipts"  />
            <CardHeader>Training</CardHeader>
            <CardBody>
            <CardText>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
            </CardText>
            </CardBody>
            <CardFooter>
            <Button size="sm"  href='/training-page' style={{backgroundColor: '#EF6D1A', color:'white'}}>
                Read More
                </Button>
            </CardFooter>

            </Card>
            </Col>
            <Col lg='3' md='3'>
            <Card style={{ width: "15rem" }}>
            <img src="https://res.cloudinary.com/dfszquucy/image/upload/v1592573465/placeholer_ahqffk.jpg"  width= '250px' alt="Receipts"  />
            <CardHeader>Research</CardHeader>
            <CardBody>
            <CardText>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
            </CardText>
            </CardBody>
            <CardFooter>
            <Button size="sm" href='/research-page' style={{backgroundColor: '#EF6D1A', color:'white'}}>
                Read More
                </Button>
            </CardFooter>

            </Card>
            </Col>
            <Col lg='3' md='3'>
            <Card style={{ width: "15rem" }}>
            <img src="https://res.cloudinary.com/dfszquucy/image/upload/v1592573465/placeholer_ahqffk.jpg"  width= '250px' alt="Receipts"  />
            <CardHeader>Advocacy</CardHeader>
            <CardBody>
            <CardText>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
            </CardText>
            </CardBody>
            <CardFooter>
            <Button size="sm" href='/advocacy-page' style={{backgroundColor: '#EF6D1A', color:'white'}}>
                Read More
                </Button>
            </CardFooter>

            </Card>
            </Col>
            <Col lg='3' md='3'>
            <Card style={{ width: "15rem" }}>
            <img src="https://res.cloudinary.com/dfszquucy/image/upload/v1592573465/placeholer_ahqffk.jpg"  width= '250px' alt="Receipts"  />
            <CardHeader>Change</CardHeader>
            <CardBody>
            <CardText>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
            </CardText>
            </CardBody>
            <CardFooter>
            <Button size="sm" href='/change-page' style={{backgroundColor: '#EF6D1A', color:'white'}}>
                Read More
                </Button>
            </CardFooter>

            </Card>
            </Col>
          </Row>
        </Container>
      </div>

            
        </>
    );
}

export default Solutions;