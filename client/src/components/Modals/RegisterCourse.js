import React, {useState, useEffect}from "react";
import {useParams} from 'react-router-dom';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import axios from "axios";

// reactstrap components
import { Button, Modal, UncontrolledTooltip, UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";
// core components
import AuthService from 'services/auth.service';
import * as legoData from '../../twirl.json';
import Message from 'components/Message';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: legoData.default,
    rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
    }
  }


function RegisterCourse(){
  const [modalTooltips, setModalTooltips] = React.useState(false);

  return (
    <>
      <Button
        color="primary"
        type="button"
        onClick={() => setModalTooltips(true)}
      >
        Launch demo modal
      </Button>
      <Modal isOpen={modalTooltips} toggle={() => setModalTooltips(false)}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalPopoversLabel">
            Modal title
          </h5>
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() => setModalTooltips(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <h5>Popover in a modal</h5>
          <p>
            This{" "}
            <Button
              className="popover-test"
              color="secondary"
              href="#pablo"
              onClick={e => e.preventDefault()}
              role="button"
              id="popover-test"
            >
              button
            </Button>
            <UncontrolledPopover target="popover-test">
              <PopoverHeader>Popover title</PopoverHeader>
              <PopoverBody>Popover body content is set here.</PopoverBody>
            </UncontrolledPopover>
            triggers a popover on click.
          </p>
          <hr></hr>
          <h5>Tooltips in a modal</h5>
          <p>
            <a
              className="tooltip-test"
              href="#pablo"
              onClick={e => e.preventDefault()}
              id="tooltip-test1"
            >
              This link
            </a>
            <UncontrolledTooltip target="tooltip-test1">
              Tooltip
            </UncontrolledTooltip>
            and{" "}
            <a
              className="tooltip-test"
              href="#pablo"
              onClick={e => e.preventDefault()}
              id="tooltip-test2"
            >
              that link
            </a>
            <UncontrolledTooltip target="tooltip-test2">
              Tooltip
            </UncontrolledTooltip>
            have tooltips on hover.
          </p>
        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            type="button"
            onClick={() => setModalTooltips(false)}
          >
            Close
          </Button>
          <Button
            color="primary"
            type="button"
            onClick={() => setModalTooltips(false)}
          >
            Save changes
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default RegisterCourse;
