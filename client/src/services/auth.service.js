import axios from "axios";

import authHeader from 'services/auth.header';
const API_URL = "http://localhost:8080/";

class AuthService {

  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
        return response
      }) 
     

      
  }

  logout(e) {
    localStorage.removeItem(e);
  }

  register(username, email,firstname, lastname, password, roles) {
    return axios.post(API_URL + "signup", { headers: authHeader() }, {
   
      
      username,
      email,
      firstname,
      lastname,
      password,
      roles
    });
  }


  userRegister(username, email,firstname, lastname, password) {
    return axios.post(API_URL + "usersignup", {
      username,
      email,
      firstname,
      lastname,
      password,
    
    });
  }


  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();