/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default">
        <Container>
         <nav>
            <ul>
              <li>
                <a
                 href="/about-page"
                //  target="_blank"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                 href="/career-page"
                  //target="_blank"
                >
                  Career
                </a>
              </li>
              <li>
                <a
                href="/contact-page"
                 // target="_blank"
                >
                  Contact us
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright">
            © {new Date().getFullYear()}, Designed by{" "}
            <a
              href="https://www.invisionapp.com?ref=nukr-default-footer"
              target="_blank"
            >
              Invision
            </a>
            . Coded by{" "}
            <a
              href="https://www.creative-tim.com?ref=nukr-default-footer"
              target="_blank"
            >
              Creative Tim
            </a>
            .
          </div>
        </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;
