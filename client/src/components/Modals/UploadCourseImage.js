import React, {useState}from "react";
// reactstrap components
import { Button,
    Form,
    FormText,
    FormGroup,
    Input,Modal } from "reactstrap";
// core components

function UploadCourseImage(){
  const [uploadCourseImageModal, setUploadCourseImageModal] = useState(false);

  return (
    <>
      <Button
        color="primary"
        style={{backgroundColor: '#EF6D1A'}}
        type="button"
        onClick={() => setUploadCourseImageModal(true)}
      >
        Upload Course Banner
      </Button>
     
      <Modal
        isOpen={uploadCourseImageModal}
        className="modal-lg"
        modalClassName="bd-example-modal-lg"
        toggle={() => setUploadCourseImageModal(false)}
      >
        <div className="modal-header no-border-header text-center">
          <h4 className="modal-title" id="myLargeModalLabel">
         Upload Course Banner
          </h4>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() => setUploadCourseImageModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="section content-center text-center" style={{margin:'10px'}}>
        <Form>
        <div className="form-row">
        <FormGroup className="col-md-6 offset-md-3 ">
            <label htmlFor="inputCourseId">CourseId</label>
            <Input
              id="inputCourseId"
              placeholder="Enter Course id"
              type="text"
            ></Input>
          </FormGroup>    
        </div><br/>
        <div className="form-row">

          <FormGroup className="col-md-6 offset-md-3 ">
            <label htmlFor="inputImage">
                <Button color="primary" size="sm" style={{backgroundColor: '#EF6D1A'}}>Upload Banner</Button>
            </label>
            <Input name= 'file' type="file"  id="exampleFile"></Input>
            <FormText >
            Picture dimension must be 500 by 500px.
          </FormText>
          </FormGroup>   
          
        </div><br/>
        
        <Button color="primary" type="submit" style={{backgroundColor: '#EF6D1A'}}>
          Submit
        </Button>
      </Form>
        </div>
        <div className="modal-body">...</div>
      </Modal>
    </>
  );
}

export default UploadCourseImage;