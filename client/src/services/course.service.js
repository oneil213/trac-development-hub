import axios from "axios";
import authHeader from '../services/auth.header';
//const user = JSON.parse(localStorage.getItem('user'));
const API_URL = "http://localhost:8080/";
class CourseService {

  async createcourse(course) {
    const response = await axios({
          method: 'post',
          url: API_URL + 'createcourse',
           Header: {
              'x-access-token':  authHeader(),
              'Content-Type': 'application/json'
          },

          body: {
              title: course.title,
              price: course.price,
              description: course.description,
              duration: course.duration,
              language: course.language,
              level: course.level,
              status: course.status,
              video: course.video,
              createdby: course.createdby
          }
      });
      return response; 
     

      
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email,firstname, lastname, password, roles) {
    return axios.post(API_URL + "signup", {
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
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new CourseService();



