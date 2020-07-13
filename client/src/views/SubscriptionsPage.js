import React,  {useState, useEffect} from 'react';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import axios from "axios";

// reactstrap components
import {
  
  Container,
  Table,

} from "reactstrap";

// core components

import TrainingPageHeader from "components/Headers/TrainingPageHeader";
import TacFooter from '../components/Footers/TracFooter';
import TracNavbar from 'components/Navbars/TracNavbar';
import AuthService from '../services/auth.service';
import * as legoData from "../twirl.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
  preserveAspectRatio: "xMidYMid slice"
  }
}


function SubscriptionsPage() {

  const [currentUser] = useState(AuthService.getCurrentUser());
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert , setAlert] = useState('');
  
  
  const API_URL ="http://localhost:8080/";

  useEffect(()=>{
    setIsLoading(true);
    setAlert('Loading subscriptions');
    setTimeout(() => {
      try {
        axios({
          method: 'get',
          url: API_URL + 'user/allsubscriptions',
          headers: {
            'x-access-token': currentUser.accessToken,
            'Content-Type' : 'application/json'
          }
    
        }).then(response =>{
           if(response.data.length === 0){
             setAlert('There are no active subscriptions at the moment.');
             setIsLoading(false);
           } else{
             setSubscriptions(response.data);
             setAlert('');
             setIsLoading(false);
  
           }
       
        },
        error => {
          console.log(error)
          
          console.log(error)
          setIsLoading(false)
        })   
        
       } catch (error) {
         console.log(error)
         setIsLoading(false)
     
       }
  
    }, 3000);
  
    },[currentUser.accessToken, currentUser.id]);
  
    
  function validity (e){
    let msDiff = new Date(e.slice(0,10))- new Date()
    return Math.floor(msDiff / (1000 * 60 * 60 * 24))
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
        <TrainingPageHeader />
        <div className="section section-team text-center">
          <Container>
            <h2 className="title">Subscriptions</h2>
            <p style={{marginTop:'50px'}} className="text-success content-center text-center">{alert}</p>

            {isLoading === true? (
           <FadeIn>
           <div className="container" >
       
           <Lottie options={defaultOptions} height={200} width={200}   />
                               
           </div>
         </FadeIn>
        ) :(
            <div className="section content-center" >
          {alert === 'There are no active subscriptions at the moment.'? (
            null
           ):(
            <Table responsive>
            <thead className=" text-primary">
              <tr>
              <th>
                  SubscriptionId
                </th>
                <th>
                  UserId
                </th>
                <th>
                CourseId
                </th>
                <th>
                  Subscription Date
                </th>
                <th >
                Expiry Date
                </th>
                <th className="text-right">
              Validity     
                </th>

              </tr>
            </thead>

            <tbody>
            {subscriptions.map(subscription =>{
              
            
              return (
                <tr key={subscription.subscriptionid}>
                <td>
                {subscription.subscriptionid}
                </td>
                <td>
                {subscription.userId}
                </td>
                <td>
                {subscription.courseId}
                </td>
                <td>
                {subscription.createdAt.slice(0,10)}
                </td>
                <td className>
                {subscription.expirationDate.slice(0,10)}
                </td>
                <td className="text-right">
                {    validity(subscription.expirationDate)} Daysleft
                </td>
              
              
              </tr>
              )
            })}
              
            
            </tbody>
          </Table>
          )} 
          
            </div>
            )}
          </Container>
        </div>
       
        <TacFooter/>
      </div>
    </>
  );
}

export default SubscriptionsPage;



