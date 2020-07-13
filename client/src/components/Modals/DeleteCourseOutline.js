import React, {useState}from "react";
// reactstrap components
import { Button,
    Form,
    FormGroup,
    Input,Modal } from "reactstrap";
// core components

function DeleteCourseOutline(){
  const [deleteCourseOutline,setDeleteCourseOutlineModal] = useState(false);

  return (
    <>
      <Button
        color="primary"
        style={{backgroundColor: '#EF6D1A'}}
        type="button"
        onClick={() =>setDeleteCourseOutlineModal(true)}
      >
      Delete A Course Outline
      </Button>
     
      <Modal
        isOpen={deleteCourseOutline}
        className="modal-lg"
        modalClassName="bd-example-modal-lg"
        toggle={() =>setDeleteCourseOutlineModal(false)}
      >
        <div className="modal-header no-border-header text-center">
          <h4 className="modal-title" id="myLargeModalLabel">
            Delete a Course Outline
          </h4>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() =>setDeleteCourseOutlineModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="section content-center text-center" style={{margin:'10px'}}>
        <Form>
        <FormGroup className="col-md-6 offset-md-3 ">
            <label htmlFor="inputTitle">Course Outline Id</label>
            <Input id="courseOutlineId" placeholder="Enter the id of the course outline you want to delete" type="text"></Input>
          </FormGroup>
        
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

export default DeleteCourseOutline;