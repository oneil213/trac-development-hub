import axios from "axios";

const API_URL = "http://localhost:8080/";

class EmailService {

  sendMail(firstname, lastname, message, email) {
    return axios(API_URL + "sendmail", {
      method: 'post',  
      data: {
        email,
        firstname,
        lastname,
        message,
      }
    });
  }

}

export default new EmailService();