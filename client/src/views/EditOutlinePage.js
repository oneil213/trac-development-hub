import React, {useState, useEffect}from "react";
import {useParams} from 'react-router-dom';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import axios from "axios";
// import {EditorState, convertFromRaw} from "draft-js";
// import {Editor} from "react-draft-wysiwyg";

// reactstrap components
import { Button,
    Form,
    FormGroup,
    Input,
    Container,
 
         } from "reactstrap";
// core components
import TracNavbar from 'components/Navbars/TracNavbar';
import TacFooter from '../components/Footers/TracFooter';
import AuthService from 'services/auth.service';
import * as legoData from '../../src/twirl.json';
import Message from 'components/Message';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: legoData.default,
    rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
    }
  }
  

function EditOutlinePage(props) {
     
    let outlineId = new useParams({}).id;
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState('Loading outline');
    const [currentOutline] = useState({ id: null, title : '', description: '', updatedAt: ''});
    const [outline, setOutline] = useState(currentOutline);
    const [message,setMessage] = useState();


    const API_URL = "http://localhost:8080/";

    const onChange = e =>{
        setOutline({...outline,[e.target.name] : e.target.value});
       
       }

    // const onEditorStateChange = editorState =>{
    //   console.log(editorState)
    //     setEditorState(editorState);
       
    //    }   

       console.log(outline);

  useEffect(()=>{
    setCurrentUser(AuthService.getCurrentUser())
    
  },[]);



  const onSubmit = (e) =>{
    e.preventDefault();
    setIsLoading(true);
    setAlert('Updating outline...')
  setTimeout(() => {
    axios({
      method: 'put',
      url: API_URL + 'updateoutline',
       headers: {
          'x-access-token': currentUser.accessToken,
          'Content-Type': 'application/json'
      },
      
     data: {
        id: outline.id,
        title: outline.title,
        description: outline.description,
     
     }
  
  }).then(response =>{
    console.log(response)
    setMessage(response.data.message)
    setAlert('');
    setIsLoading(false);
  //  setTimeout(()=>{
  //   window.location.reload(false);
  //  }, 1500)
  },
  error => {
    console.log(error)
    const resMessage = error.response.data.message;
    setAlert('');

    setIsLoading(false);
    setMessage(resMessage)
  
  }
  ).catch(error =>{
    console.log(error)
    setMessage(error.message)
    setAlert('')
    setIsLoading(false);
 
  
    })

   
  }, 3000);

}


  useEffect(()=>{

    setTimeout(() => {
      try {
        axios({
          method: 'post',
          url: API_URL + 'getoutline',
          data: {
            id: outlineId
          },
          headers: {
    
            'Content-Type' : 'application/json'
          }
    
        }).then(response =>{
            console.log(response)
          setOutline(response.data);
            setAlert('');
            setIsLoading(false)
        },
        error => {
            console.log(error)
            const resMessage = error.response.data.message;
            setIsLoading(false);
            setMessage(resMessage)
          
          }
       )   
        
       } catch (error) {
        console.log(error)
        setMessage(error.message)
        setAlert('')
        setIsLoading(false);
       }

    }, 3000);
  
    },[outlineId]);
    // const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(JSON.parse(outline.description))));
    // console.log(editorState);
    
    // const [contentState] = useState(convertFromRaw(JSON.parseoutline.description));
    // const [newEditorState] = useState(EditorState.push(editorState,contentState));
    // console.log(contentState);

  useEffect(() => {
        document.body.classList.add("profile-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        return function cleanup() {
          document.body.classList.remove("profile-page");
          document.body.classList.remove("sidebar-collapse");
        };
      });



    return (
        <>
       <TracNavbar />
       <div className="wrapper">
           <div className="section content-center text-center ">
               <Container>
               {isLoading === true? (
           <FadeIn>
           <div className="container" >
            <p className="text-success content-center text-center">{alert}</p>
           <Lottie options={defaultOptions} height={200} width={200}   />
                               
           </div>
         </FadeIn>
        ) :(
          <div className="section content-center text-center" style={{margin:'10px'}}>
        <Form onSubmit={onSubmit}>
        <div style={{marginTop:'20px'}}>
          <h5 className="modal-title" id="myLargeModalLabel" >
            Please edit only the fields you choose to update.
          </h5>
          </div>
          
         <hr style={{height: '2px', }}/>
         <div className="form-row">
          <FormGroup className="col-md-6 offset-md-3 ">
            <label htmlFor="inputTitle">Title</label>
            <Input value={outline.title} onChange={onChange}  name='title' id="title" type="text" className="form-control"></Input>
          </FormGroup>
        </div><br/>
    
        <FormGroup className="">
            <label htmlFor="inputDescription">Description</label>
        
            <Input  value={outline.description}  onChange={onChange}  name='description' id="Description" type="textarea"cols="33" 
             rows="5"  multiline/>
          </FormGroup>
          {/* <div className='Editor'>
          <Editor
                editorState={newEditorState}
              onEditorStateChange={onEditorStateChange}    
              toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
          
              }}
            />

          </div> */}
               
        <br/>
        
        <Button color="primary" type="submit" style={{backgroundColor: '#EF6D1A'}}>
         Update outline
        </Button>
        {message ? <Message message={message}/> : null}
      </Form>
        </div>
                    )}
               </Container>
          
               
             
           </div>
    
       
       <TacFooter/>
       </div>
            
        </>
    );
}

export default EditOutlinePage;


