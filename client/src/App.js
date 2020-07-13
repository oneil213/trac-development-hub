import React from 'react';

import { BrowserRouter as Router , Switch , Route,Redirect} from 'react-router-dom';
import { useHistory, useLocation} from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import NucleoIcons from "views/NucleoIcons.js";

import Homepage from 'views/HomePage';
import TrainingPage from 'views/TrainingPage';
import ResearchPage from 'views/ResearchPage';
import AdvocacyPage from 'views/AdvocacyPage';
import ChangePage from 'views/ChangePage';
import AboutPage from 'views/AboutPage';
import CareerPage from 'views/CareerPage';
import ContactPage from 'views/ContactPage';
import TrainingsPage from 'views/TrainingsPage';
import CoursePage from 'views/CoursePage';
import UserPage from 'views/UserPage';
import ContributorPage from 'views/ContributorPage';
import AdminPage from 'views/AdminPage';
import DraftCoursePage from 'views/DraftCoursePage';
import InstructorsPage from 'views/InstructorsPage';
import SubscriptionsPage from 'views/SubscriptionsPage';
import LoginPage from 'views/LoginPage';
import RegisterPage from 'views/RegisterPage';
import CourseView from 'views/Courseview';
import EditCoursePage from 'views/EditCoursePage';
import EditOutlinePage from 'views/EditOutlinePage';
import CourseOutlinePage from 'views/CourseOutlinePage';
import EditInstructorPage from 'views/EditInstructorPage';
import AdminEditCoursePage from 'views/AdminEditCoursePage';
import ForgotPasswordPage from 'views/ForgotPasswordPage';
import ResetPasswordPage from 'views/ResetPasswordPage';
import CpHubPage from 'views/CpHubPage';

function App() {
   let history = useHistory();
  console.log(history)
    let location = useLocation()
  console.log(location);

 return(
    <>

    <Router>
    
         <Route
      render={({ location }) => (
        <AnimatePresence exitBeforeEnter initial={false}>
          <Switch location={location} key={location.path}>
           <Route path="/home" render={props => <Homepage {...props} />} />
        <Route
          path="/nucleo-icons"
          render={props => <NucleoIcons {...props} />}
        />
    
         <Route
          path="/courseview-page/:id"
          render={props => <CourseView {...props} />}
        />
          <Route
          path="/register-page"
          render={props => <RegisterPage {...props} />}
        />
         <Route
          path="/login-page"
          render={props => <LoginPage {...props} />}
        />
          <Route
          path="/cphub-page"
          render={props => <CpHubPage {...props} />}
        />
         <Route
          path="/forgotpassword-page"
          render={props => <ForgotPasswordPage {...props} />}
        />
        
        <Route
          path="/subscriptions-page"
          render={props => <SubscriptionsPage {...props} />}
        />
        <Route
          path="/instructors-page"
          render={props => <InstructorsPage {...props} />}
        />
         <Route
          path="/draftcourse-page"
          render={props => <DraftCoursePage {...props} />}
        />
          <Route
          path="/admin-page"
          render={props => <AdminPage {...props} />}
        />
         <Route
          path="/contributor-page"
          render={props => <ContributorPage {...props} />}
        />
         <Route
          path="/user-page"
          render={props => <UserPage {...props} />}
        />
     
         <Route
          path="/course-page/:id"
          render={props => <CoursePage {...props} />}
        />
         <Route
          path="/editcourse-page/:id"
          render={props => <EditCoursePage {...props} />}
        />
         <Route
          path="/admineditcourse-page/:id"
          render={props => <AdminEditCoursePage {...props} />}
        />
         <Route
          path="/editoutline-page/:id"
          render={props => <EditOutlinePage {...props} />}
        />
         <Route
          path="/courseoutline-page/:id"
          render={props => <CourseOutlinePage {...props} />}
        />
        <Route
          path="/editinstructor-page/:id"
          render={props => <EditInstructorPage {...props} />}
        />
          <Route
          path="/resetpassword-page/:token"
          render={props => <ResetPasswordPage {...props} />}
        />
         <Route
          path="/training-page"
          render={props => <TrainingPage {...props} />}
        />
         <Route
          path="/trainings-page"
          render={props => <TrainingsPage {...props} />}
        />
         <Route
          path="/career-page"
          render={props => <CareerPage {...props} />}
        />
          <Route
          path="/contact-page"
          render={props => <ContactPage {...props} />}
        />
         <Route
          path="/about-page"
          render={props => <AboutPage {...props} />}
        />
         <Route
          path="/advocacy-page"
          render={props => <AdvocacyPage {...props} />}
        />
         <Route
          path="/change-page"
          render={props => <ChangePage {...props} />}
        />
         <Route
          path="/research-page"
          render={props => <ResearchPage {...props} />}
        />
        <Route path="/login-page" render={props => <LoginPage {...props} />} />
        <Redirect to="/home" />
        <Redirect from="/" to="/home" />
           
          </Switch>
        </AnimatePresence>
      )}
    />
  
    </Router>

    </>
 )
}

export default App;

