import React, {useEffect} from 'react';
import TracNavbar from '../components/Navbars/TracNavbar';
import TacFooter from '../components/Footers/TracFooter';
import HomepageHeader from '../components/Headers/HomePageHeader';
import Concentrations from '../views/Concentrations';
import Solutions from '../views/Solutions';
import Training from '../views/Training';
import Publications from 'views/Publications'
import Clients from 'views/Clients';


function HomePage() {   
    useEffect(() => {
        document.body.classList.add("index-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
          document.body.classList.remove("index-page");
          document.body.classList.remove("sidebar-collapse");
        };
      });

    return (
        <>
            <TracNavbar />

            <div className="wrapper">
              <HomepageHeader/>
              <Concentrations />
              <Solutions />
              <Clients />
              <Training />
              <Publications />

              <TacFooter/>
            </div>
        </>
    );
}

export default HomePage;