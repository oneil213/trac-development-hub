
import React, {useState, useEffect}from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import axios from "axios";
// reactstrap components
import { Button,
    Form,
    FormText,
    FormGroup,
    Label,
    Input,Modal } from "reactstrap";
// core components
import AuthService from 'services/auth.service';
import * as legoData from '../../twirl.json';
import Message from '../Message';



const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
  preserveAspectRatio: "xMidYMid slice"
  }
}


function UploadInstructorsImage(){
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [uploadInstructorsImageModal, setUploadInstructorsImageModal] = useState(false);
  const [ instructor, setInstructor] = useState({instructorId: '', courseId: '', name:''})
  const [ image, setImage] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState('');
  const [message,setMessage] = useState(null);
  const API_URL = "http://localhost:8080/";

  const onChange = e =>{
    setInstructor({...instructor,[e.target.name] : e.target.value});
    };
  
    const onImageChange = e =>{
      setImage(e.target.files[0]);
      };
    console.log(currentUser);   


      console.log(image);

      
      useEffect(()=>{
        setCurrentUser(AuthService.getCurrentUser())
        
      },[]);  

      


      const onSubmit = async (e) =>{

      const formData = new FormData();
      formData.append('image', image);
      formData.append('instructorId', instructor.instructorId);
      formData.append('name', instructor.name);
      formData.append('courseId', instructor.courseId);
        e.preventDefault();
        try {
          setIsLoading(true);
        setAlert('uploading...')
        axios({
          method: 'post',
          url: API_URL + 'imageinstructor',
           headers: {
            'Content-Type': `multipart/form-data; boundary=${Form._boundary}`
          },

     
         data: formData

      }).then(response =>{
        console.log(response)
        setMessage(response.data.message)
        setAlert('')

        setIsLoading(false);
      },
      error => {
        console.log(error)
        setAlert('')

        setIsLoading(false);
        setMessage(error)
      
      }
      )
          
        } catch (error) {
          console.log(error)
        setMessage(error)
        setAlert('')
        setIsLoading(false);
        }  
       

    
    }
  
    

  return (
    <>
      <Button
        color="primary"
        style={{backgroundColor: '#EF6D1A'}}
        type="button"
        onClick={() => setUploadInstructorsImageModal(true)}
      >
        Upload Instructor Picture
      </Button>
     
      <Modal
        isOpen={uploadInstructorsImageModal}
        className="modal-lg"
        modalClassName="bd-example-modal-lg"
        toggle={() => setUploadInstructorsImageModal(false)}
      >
        <div className="modal-header no-border-header text-center">
          <h4 className="modal-title" id="myLargeModalLabel">
         Upload Instructors Picture
          </h4>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() => setUploadInstructorsImageModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        {isLoading === true? (
           <FadeIn>
           <div className="container" >
            <p className="text-success content-center text-center">{alert}</p>
           <Lottie options={defaultOptions} height={200} width={200}   />
                               
           </div>
         </FadeIn>
        ) :(
        <div className="section content-center text-center" style={{margin:'10px'}}>
        <Form  onSubmit={onSubmit}>
        <div className="form-row">
          
        <FormGroup className="col-md-6 offset-md-3 ">
            <label htmlFor="inputInstructorId">InstructorID</label>
            <Input
              name='instructorId'
              required
              id="inputInstructorId"
              placeholder="Enter instructor id"
              type="text"
            ></Input>
          </FormGroup>    
          <FormGroup className="col-md-6 offset-md-3 ">
            <label htmlFor="inputCourseId">CourseID</label>
            <Input
              name='courseId'
              required
              onChange={onChange} 
              id="inputCourseId"
              placeholder="Enter course id"
              type="text"
            ></Input>
          </FormGroup>    
        </div><br/>
        <div className="form-row">
        <FormGroup className="col-md-6 offset-md-3 ">
            <label htmlFor="inputName">Instructor Name</label>
            <Input
              name='name'
              onChange={onChange} 
              required
              id="inputname"
              placeholder="Enter Instructor's name"
              type="text"
            ></Input>
          </FormGroup>    

          <FormGroup className="col-md-6 offset-md-3 ">
            <Label htmlFor="inputFile">
                <Button color="primary" size="sm" style={{backgroundColor: '#EF6D1A'}}>Upload Picture</Button>
            </Label> 
            <Input 
            className="custom-file-input"
            required onChange={onImageChange}  
            name= 'image' 
            type="file"  
            id="exampleInputFile"></Input>

            <FormText >
            Picture dimension must be 200px by 200px.
          </FormText>
          </FormGroup>   
    
          
        </div><br/>
        
        <Button color="primary" type="submit" style={{backgroundColor: '#EF6D1A'}}>
          Submit
        </Button>
        {message ? <Message message={message}/> : null}
      </Form>
        </div>
        )}
        <div className="modal-body">...</div>
      </Modal>
    
    </>
    
  );
}

export default UploadInstructorsImage;