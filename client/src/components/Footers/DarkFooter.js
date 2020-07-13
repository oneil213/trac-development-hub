/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function DarkFooter() {
  return (
    <footer className="footer" style={{backgroundColor:'#EF6D1A'}}>
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
            href="/home"
       
            >
              HostGidi
            </a>
            . Coded by{" "}
            <a
             href="/home"

            >
              Hostgidi
            </a>
            .
          </div>
        </Container>
    </footer>
  );
}

export default DarkFooter;
