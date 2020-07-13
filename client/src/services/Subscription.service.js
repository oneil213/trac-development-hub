import axios from "axios";
import authHeader from './auth.service';
const API_URL = "http://localhost:8080/";





class SubscriptionService {

async getUserSubscription (id,  token) {

        return axios(API_URL + 'user/activesubscriptions', {
          method: 'post',
          body: id,
          headers: {
            'x-access-token':  token,
            'Content-Type' : 'application/json'
          }
           
        }).then(response => {
          return response
        })
          
    }

    getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));;
    }
  }
  
  export default new SubscriptionService();