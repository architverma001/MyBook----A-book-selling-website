import React, { useContext, useEffect, useRef ,useState} from 'react'
import './Navbar.css'
import {Link, useNavigate} from 'react-router-dom'
import { auth } from '../../firebase';
import { Country, State, City }  from 'country-state-city';
import logo from '../../img/logoLectures.png'
import { AuthContext } from '../../context/AuthContext';
function Navbar() {
  
  const navigate = useNavigate()
const handleit = () => {  
  navigate('/')
}

const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
const [login,setlogin] = useState(false)

const { currentUser } = useContext(AuthContext)

useEffect(() => {
  if (currentUser === null) {
   setlogin(false)
  } else {
    setlogin(true)
  }

}, [currentUser]);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 1000);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

const handlecart = () => {
navigate('/cart')
}

const handleNavigate = () => {
  navigate('/login')
}


const formRef = useRef(null);
const searchInputRef = useRef(null);
    const handlesub = (e)=>{
        e.preventDefault();
        const searchValue = searchInputRef.current.value;
        const Str = searchValue.toLowerCase();
        navigate(`/${Str}`);
    }

    const handlesign = (e) => {
      e.preventDefault();
    
      const confirmed = window.confirm("Are you sure you want to sign out?");
      if (confirmed) {
        auth
          .signOut()
          .then(() => {
            navigate('/');
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // Cancelled sign out
      }
    };
  return (


    <div className='main-class'>
     <nav className="navbar navbar-expand-lg colorbg">
  <div className="container-fluid">
    <div className="navbar-brand custom" onClick={handleit} >
      <img src = {logo}  className='logoManger' />
    </div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto  mb-2 mb-lg-0 align">
        <li className="nav-item">
          <Link className="nav-link Online" aria-current="page" to="/">Home</Link>
        </li>
    



  








        <li className="nav-item dropdown">
     

          <Link className="nav-link dropdown-toggle Online" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Online classes
          </Link>
          <ul className="dropdown-menu">

        
          <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle " to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CA
          </Link>
          <ul className="dropdown-menu">
          <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CA Foundation
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/cafoundationregular">Regular</Link></li>
          <li><Link className="dropdown-item" to="/cafoundationfastrack">Fastrack</Link></li>
        
          </ul>
        </li>





        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CA Intermediate
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/caintregular">Regular</Link></li>
          <li><Link className="dropdown-item" to="/caintfastrack">Fastrack</Link></li>
         
          </ul>
        </li>




        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CA Final
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/cafinalregular">Regular </Link></li>
          <li><Link className="dropdown-item" to="/cafinalfasstrack">Fastrack</Link></li>
         
          </ul>
        </li>

          </ul>
        </li>






        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CMA
          </Link>
          <ul className="dropdown-menu">
          <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CMA Foundation
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/cmsfoundationregular">Regular</Link></li>
          <li><Link className="dropdown-item" to="/cmsfoundationfastrack">Fastrack</Link></li>
      
          </ul>
        </li>
        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CMA Intermediate
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/cmsintermediateregular">Regular</Link></li>
          <li><Link className="dropdown-item" to="/cmsintermediatefastrack">Fastrack</Link></li>
         
          </ul>
        </li>
        
          </ul>
        </li>








        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CS
          </Link>
          <ul className="dropdown-menu">
          <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CSEET
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/cseetregular">Regular</Link></li>
          <li><Link className="dropdown-item" to="/cseetfastrack">Fastrack</Link></li>
          </ul>
        </li>

       <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CS Executive
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/csexecutiveregular">Regular</Link></li>
          <li><Link className="dropdown-item" to="/csexecutivefastrack">Fastrack</Link></li>
          </ul>
        </li>

        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CS Professional
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/csprofessionalregular">Regular</Link></li>
          <li><Link className="dropdown-item" to="/csprofessionalfastrack">Fastrack</Link></li>
       
          </ul>
        </li>
          </ul>
        </li>
        
           
          </ul>
        </li>


        








        <li className={`nav-item dropdown`}>
          <Link className="nav-link dropdown-toggle Online" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Offline classes
          </Link>
          <ul className="dropdown-menu">
         
          <li>   <Link className="nav-link" aria-current="page" to="/offline">Find in your city</Link></li>
           
          </ul>
        </li>





        
        <li className={`nav-item dropdown`}>
          <Link className="nav-link dropdown-toggle Online" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Test series
          </Link>
          <ul className="dropdown-menu">
          <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CA
          </Link>
          <ul className="dropdown-menu">
          <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CA Foundation
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/cafoundationregular/test">Regular</Link></li>
          <li><Link className="dropdown-item" to="/cafoundationfastrack/test">Fastrack</Link></li>
        
          </ul>
        </li>





        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CA Intermediate
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/caintregular/test">Regular</Link></li>
          <li><Link className="dropdown-item" to="/caintfastrack/test">Fastrack</Link></li>
         
          </ul>
        </li>




        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CA Final
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/cafinalregular/test">Regular </Link></li>
          <li><Link className="dropdown-item" to="/cafinalfasstrack/test">Fastrack</Link></li>
         
          </ul>
        </li>


        

          </ul>
        </li>






        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CMA
          </Link>
          <ul className="dropdown-menu">
          <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CMA Foundation
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/cmsfoundationregular/test">Regular</Link></li>
          <li><Link className="dropdown-item" to="/cmsfoundationfastrack/test">Fastrack</Link></li>
      
          </ul>
        </li>
        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CMA Intermediate
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/cmsintermediateregular/test">Regular</Link></li>
          <li><Link className="dropdown-item" to="/cmsintermediatefastrack/test">Fastrack</Link></li>
         
          </ul>
        </li>
        
          </ul>
        </li>
           




        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CS
          </Link>
          <ul className="dropdown-menu">
          <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CSEET
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/cseetregular/test">Regular</Link></li>
          <li><Link className="dropdown-item" to="/cseetfastrack/test">Fastrack</Link></li>
          </ul>
        </li>
        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CS Execuutive
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/csexecutiveregular/test">Regular</Link></li>
          <li><Link className="dropdown-item" to="/csexecutivefastrack/test">Fastrack</Link></li>
          </ul>
        </li>
        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CS Professional
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/csprofessionalregular/test">Regular</Link></li>
          <li><Link className="dropdown-item" to="/csprofessionalfastrack/test">Fastrack</Link></li>
       
          </ul>
        </li>
          </ul>
        </li>
       


          </ul>
        </li>
           

       
      </ul>

    

      <div className='d-flex justify-content-end'>
<div>
<form className="disply" role="search">
        <input ref={searchInputRef}  className="form-control" type="search" placeholder="book/teacher/all" aria-label="Search"/>
        <button className="btn ms-3 btn-sm btn-outline-success" onClick={handlesub}>Search</button>
      </form>
</div>
</div>

    
    
      <button className="btn btn-outline-primary ms-2  btn-sm float-end media " onClick={handlecart}>Your Books</button>
      {/* <button className="btn btn-outline-danger ms-2   btn-sm float-end media " onClick={handlesign}>logout</button> */}
      {login && <button className="btn btn-outline-danger ms-2   btn-sm float-end media " onClick={handlesign}>logout</button>}
      {!login && <button className="btn btn-outline-danger ms-2   btn-sm float-end media " onClick={handleNavigate}>login</button>}
    
    
    </div>
  </div>
  
</nav>
    </div>
  )
}

export default Navbar






/*


import React, { useEffect, useRef ,useState} from 'react'
import './Navbar.css'
import {Link, useNavigate} from 'react-router-dom'
import { auth } from '../../firebase';
import { Country, State, City }  from 'country-state-city';

function Navbar() {
  const navigate = useNavigate()
const handleit = () => {  
  navigate('/')
}

const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 1000);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

const handlecart = () => {
navigate('/cart')
}

const formRef = useRef(null);
const searchInputRef = useRef(null);
    const handlesub = (e)=>{
        e.preventDefault();
        const searchValue = searchInputRef.current.value;
        const Str = searchValue.toLowerCase();
        navigate(`/${Str}`);
    }

    const handlesign = (e) => {
      e.preventDefault();
    
      const confirmed = window.confirm("Are you sure you want to sign out?");
      if (confirmed) {
        auth
          .signOut()
          .then(() => {
            navigate('/login');
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // Cancelled sign out
      }
    };
  return (


    <div className='main-class'>
     <nav className="navbar navbar-expand-lg bg-white colorbg">
  <div className="container-fluid">
    <div className="navbar-brand custom" onClick={handleit} >Lecturesbasket.com</div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto  mb-2 mb-lg-0 align">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/">Home</Link>
        </li>
    
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Classes
          </Link>
        
        
          <ul className="dropdown-menu">

              <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>

          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Online classes
          </Link>
          <ul className="dropdown-menu">

        
          <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CA
          </Link>
          <ul className="dropdown-menu">
          <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CA Foundation
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/cafoundationregular">Regular</Link></li>
          <li><Link className="dropdown-item" to="/cafoundationfastrack">Fastrack</Link></li>
        
          </ul>
        </li>





        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CA Intermediate
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/caintregular">Regular</Link></li>
          <li><Link className="dropdown-item" to="/caintfastrack">Fastrack</Link></li>
         
          </ul>
        </li>




        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CA Final
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/cafinalregular">Regular </Link></li>
          <li><Link className="dropdown-item" to="/cafinalfasstrack">Fastrack</Link></li>
         
          </ul>
        </li>

          </ul>
        </li>






        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CMA
          </Link>
          <ul className="dropdown-menu">
          <li className="nav-item dropend">
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CMA Foundation
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/cmsfoundationregular">Regular</Link></li>
          <li><Link className="dropdown-item" to="/cmsfoundationfastrack">Fastrack</Link></li>
      
          </ul>
        </li>
        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CMA Intermediate
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/cmsintermediateregular">Regular</Link></li>
          <li><Link className="dropdown-item" to="/cmsintermediatefastrack">Fastrack</Link></li>
         
          </ul>
        </li>
        
          </ul>
        </li>








        <li className={`nav-item ${isMobile ? 'drop-down' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CS
          </Link>
          <ul className="dropdown-menu">
          <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CSEET
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/cseetregular">Regular</Link></li>
          <li><Link className="dropdown-item" to="/cseetfastrack">Fastrack</Link></li>
          </ul>
        </li>
        <li className={`nav-item ${isMobile ? 'drop-down' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CS Executive
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/csexecutiveregular">Regular</Link></li>
          <li><Link className="dropdown-item" to="/csexecutivefastrack">Fastrack</Link></li>
          </ul>
        </li>
        <li className={`nav-item ${isMobile ? 'drop-down' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CS Professional
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/csprofessionalregular">Regular</Link></li>
          <li><Link className="dropdown-item" to="/csprofessionalfastrack">Fastrack</Link></li>
       
          </ul>
        </li>
          </ul>
        </li>
        
           
          </ul>
        </li>


        








        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Offline classes
          </Link>
          <ul className="dropdown-menu">
         
          <li>   <Link className="nav-link" aria-current="page" to="/offline">Find in your city</Link></li>
           
          </ul>
        </li>


        
        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Test series
          </Link>
          <ul className="dropdown-menu">
          <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CA
          </Link>
          <ul className="dropdown-menu">
          <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CA Foundation
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/cafoundationregular/test">Regular</Link></li>
          <li><Link className="dropdown-item" to="/cafoundationfastrack/test">Fastrack</Link></li>
        
          </ul>
        </li>





        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CA Intermediate
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/caintregular/test">Regular</Link></li>
          <li><Link className="dropdown-item" to="/caintfastrack/test">Fastrack</Link></li>
         
          </ul>
        </li>




        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CA Final
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/cafinalregular/test">Regular </Link></li>
          <li><Link className="dropdown-item" to="/cafinalfasstrack/test">Fastrack</Link></li>
         
          </ul>
        </li>


        

          </ul>
        </li>






        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CMA
          </Link>
          <ul className="dropdown-menu">
          <li className="nav-item dropend">
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CMA Foundation
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/cmsfoundationregular/test">Regular</Link></li>
          <li><Link className="dropdown-item" to="/cmsfoundationfastrack/test">Fastrack</Link></li>
      
          </ul>
        </li>
        <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CMA Intermediate
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/cmsintermediateregular/test">Regular</Link></li>
          <li><Link className="dropdown-item" to="/cmsintermediatefastrack/test">Fastrack</Link></li>
         
          </ul>
        </li>
        
          </ul>
        </li>
           
       
        <li className={`nav-item ${isMobile ? 'drop-down' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CS
          </Link>
          <ul className="dropdown-menu">
          <li className={`nav-item ${isMobile ? 'dropdown' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CSEET
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/cseetregular/test">Regular</Link></li>
          <li><Link className="dropdown-item" to="/cseetfastrack/test">Fastrack</Link></li>
          </ul>
        </li>
        <li className={`nav-item ${isMobile ? 'drop-down' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CS Executive
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/csexecutiveregular/test">Regular</Link></li>
          <li><Link className="dropdown-item" to="/csexecutivefastrack/test">Fastrack</Link></li>
          </ul>
        </li>
        <li className={`nav-item ${isMobile ? 'drop-down' : 'dropend'}`}>
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           CS Professional
          </Link>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/csprofessionalregular/test">Regular</Link></li>
          <li><Link className="dropdown-item" to="/csprofessionalfastrack/test">Fastrack</Link></li>
       
          </ul>
        </li>
          </ul>
        </li>
       


          </ul>
        </li>
           
          </ul>
        </li>




        
       
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/about">About us</Link>
        </li>
       
      </ul>

    



    
    
      <button className="btn btn-outline-primary ms-2  btn-sm float-end media " onClick={handlecart}>Your Books</button>
      <button className="btn btn-outline-danger ms-2   btn-sm float-end media " onClick={handlesign}>logout</button>
    
    
    </div>
  </div>
  
</nav>
    </div>
  )
}

export default Navbar




*/