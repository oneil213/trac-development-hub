import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import AuthService from 'services/auth.service';
// reactstrap components

import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
 
} from "reactstrap";


function TracNavbar(props) {
  let history = useHistory();

   const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    const [showContributorBoard, setShowContributorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
   const [navbarColor, setNavbarColor] = React.useState("navbar-warning");
  const [collapseOpen, setCollapseOpen] = React.useState(false);

    
 useEffect(() =>{
   const user = AuthService.getCurrentUser();
    if(user){
      setCurrentUser(user);
      setShowContributorBoard(user.roles.includes("ROLE_CONTRIBUTOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
    
  }, [])


console.log(currentUser)



    const onClickLogoutHandler = (e)=>{
      e.preventDefault()
       const user = "user";
       AuthService.logout(user);
       history.push('/login-page'); 
  }
  

    useEffect(() => {
        const updateNavbarColor = () => {
          if (
            document.documentElement.scrollTop > 399 ||
            document.body.scrollTop > 399
          ) {
            setNavbarColor("");
          } else if (
            document.documentElement.scrollTop < 400 ||
            document.body.scrollTop < 400
          ) {
            setNavbarColor("navbar-warning");
          }
        };
        window.addEventListener("scroll", updateNavbarColor);
        return function cleanup() {
          window.removeEventListener("scroll", updateNavbarColor);
        };
      });


    return (
        <>
              {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} expand="lg"  style={{backgroundColor: '#107E85'}}>
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              href="/"
              id="navbar-brand"
            >
              Trac Development Hub
            </NavbarBrand>
            {/* <UncontrolledTooltip target="#navbar-brand">
              Designed by 
            </UncontrolledTooltip> */}
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
            <NavItem>
                     <NavLink
                     href="/cphub-page" >
                     <i className="now-ui-icons ui-2_favourite-28"></i>
                     <p>CpHub</p>
                    </NavLink>
                  </NavItem>
            <NavItem>
                        <NavLink
                          href="/training-page"
                          
                        >
                      <i className="now-ui-icons education_hat"></i>
                      <p>Trainings</p>
                      </NavLink>
                    </NavItem>

                {showAdminBoard && (
                <UncontrolledDropdown nav>

                 <DropdownToggle
                  caret
                  color="default"
                  href="#pablo"
                  nav
                  onClick={e => e.preventDefault()}
                >
                  <i className="now-ui-icons design_app mr-1"></i>
                  <p>Admin</p>
                </DropdownToggle>
                <DropdownMenu>
                  {/* <DropdownItem to="/trainings-page" tag={Link}>
                    <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                    Available Trainings
                  </DropdownItem> */}

                  <DropdownItem
                   to="/admin-page" tag={Link}
                   >                
                    <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
                    AdminBoard
                  </DropdownItem>
                  <DropdownItem
                   to="/draftcourse-page" tag={Link}
                   >                
                    <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
                    DraftCourses
                  </DropdownItem>
                  {/* <DropdownItem
                   to="/instructors-page" tag={Link}
                   >                
                    <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
                    Instructors
                  </DropdownItem> */}
                
                  <DropdownItem
                   to="/subscriptions-page" tag={Link}
                   >                
                    <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
                    Subscriptions
                  </DropdownItem>

                </DropdownMenu>
              
                </UncontrolledDropdown>  )}  
                   
                  <NavItem>
                    {showContributorBoard && (
                       <NavLink
                        href="/contributor-page"
                        
                      >
                        <i className="now-ui-icons files_single-copy-04"></i>
                        <p>Contribute</p>
                      </NavLink>
                    )}       
                 </NavItem>
         
                              <NavItem>
                              {currentUser && (
                                <NavLink
                                  href="/user-page"   
                                >
                                  <i className="now-ui-icons users_circle-08"></i>
                                  <p>{currentUser.username}'s &nbsp;&nbsp;Profile</p>
                                </NavLink>
                              )}
  
                              </NavItem>
                          
               {currentUser? (
                  <div>
                    <NavItem>
                     <NavLink
                       onClick={onClickLogoutHandler}>
                      <i className="now-ui-icons ui-1_lock-circle-open"></i>
                      <p>Logout</p>
                    </NavLink>
                     </NavItem>
           
                 
               </div>):(
                 <>
                  <NavItem>
                     <NavLink
                     href="/login-page" >
                     <i className="now-ui-icons objects_key-25"></i>
                     <p>Login</p>
                    </NavLink>
                  </NavItem>
                
                  <NavItem>
                     <Button
                      className="nav-link btn-neutral"
                      style={{backgroundColor: '#EF6D1A'}}
                      
                      href="/register-page"
                      id="upgrade-to-pro"
              
                    >
                      <i className="now-ui-icons users_single-02"></i>
                      <p style={{color:'white'}}>Register</p>
                     </Button>
                  </NavItem>
                 </>
               )}
                  <NavItem>
                    <NavLink
                      href="https://twitter.com"
                      target="_blank"
                      id="twitter-tooltip"
                    >
                      <i className="fab fa-twitter"></i>
                      <p className="d-lg-none d-xl-none">Twitter</p>
                    </NavLink>
                    <UncontrolledTooltip target="#twitter-tooltip">
                      Follow us on Twitter
                    </UncontrolledTooltip>
                  </NavItem>
              <NavItem>
                <NavLink
                  href="https://www.facebook.com/"
                  target="_blank"
                  id="facebook-tooltip"
                >
                  <i className="fab fa-facebook-square"></i>
                  <p className="d-lg-none d-xl-none">Facebook</p>
                </NavLink>
                <UncontrolledTooltip target="#facebook-tooltip">
                  Like us on Facebook
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://www.instagram.com/"
                  target="_blank"
                  id="instagram-tooltip"
                >
                  <i className="fab fa-instagram"></i>
                  <p className="d-lg-none d-xl-none">Instagram</p>
                </NavLink>
                <UncontrolledTooltip target="#instagram-tooltip">
                  Follow us on Instagram
                </UncontrolledTooltip>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
        </>
    );
}

export default TracNavbar;