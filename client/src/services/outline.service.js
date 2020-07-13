import axios from "axios";

const API_URL = "http://localhost:8080/";

class OutlineService {

  getOutlines(courseId) {
    return axios
      .post(API_URL + "outlines", {
        body: courseId
      })
      .then(response => {
        return response
      }) 
     

      
  }

}

export default new OutlineService();