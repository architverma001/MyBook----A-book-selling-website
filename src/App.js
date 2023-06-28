import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar/Navbar';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Login from './auth/Login';
import Register from './auth/Register';
import Foundation from './pages/Foundation/Foundation';
import Intermediate from './pages/Intermediate/Intermediate';
import Final from './pages/Final/Final';
import Details from './Buy/Details';
import Cart from './component/cart/Cart';
import AboutUs from './RemainingPage/AboutUs';
import Footer from './RemainingPage/Footer';
import Privacy from './RemainingPage/Privacy';
import Refund from './RemainingPage/Refund';
import Terms from './RemainingPage/Terms';
import Offline from './pages/Offline/Offline';
import Cod from './payments/Cod/Cod';
import TopNav from './component/Navbar/TopNav';
import MAinCart from './component/cart/MAinCart';
import { useEffect, useState } from 'react';
import Profile from './RemainingPage/Profile';


function App() {

  const [showFooter, setShowFooter] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register';
    setShowFooter(!isLoginOrRegister);
  }, [location]);

  function SearchWrapper() {
    const location = useLocation();
    const searchStr = location.pathname.substring(1); // Extract the search string from the pathname
  
    return <Search searchStr={searchStr} />;
  }


 
    
  return (
    <div className="App">
      
      <div className='manager'>
        <TopNav/>
      <Navbar />
        <Routes>
         <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>

         <Route path='/cafoundationregular' element={<Search  searchStr="cafoundationregular" />}/>
         <Route path='/cafoundationfastrack' element={<Search  searchStr="cafoundationfastrack"/>}/>
         <Route path='/caintregular' element={<Search  searchStr="caintregular"/>}/>
         <Route path='/caintfastrack' element={<Search  searchStr="caintfastrack"/>}/>    
         <Route path='/cafinalregular' element={<Search  searchStr="cafinalregular"/>}/>
         <Route path='/cafinalfasstrack' element={<Search  searchStr="cafinalfasstrack"/>}/>
       
         <Route path='/cseetregular' element={<Search  searchStr="cseetregular"/>}/>
         <Route path='/cseetfastrack' element={<Search  searchStr="cseetfastrack"/>}/>
         <Route path='/csexecutiveregular' element={<Search  searchStr="csexecutiveregular"/>}/>
         <Route path='/csexecutivefastrack' element={<Search  searchStr="csexecutivefastrack"/>}/>
         <Route path='/csprofessionalregular' element={<Search  searchStr="csprofessionalregular"/>}/>
         <Route path='/csprofessionalfastrack' element={<Search  searchStr="csprofessionalfastrack"/>}/>

         <Route path='/cmsfoundationregular' element={<Search  searchStr="cmsfoundationregular" />}/>
         <Route path='/cmsfoundationfastrack' element={<Search  searchStr="cmsfoundationfastrack"/>}/>
         <Route path='/cmsintermediateregular' element={<Search  searchStr="cmsintermediateregular"/>}/>
         <Route path='/cmsintermediatefastrack' element={<Search  searchStr="cmsintermediatefastrack"/>}/>
        
         
         <Route path='/cafoundationregular/test' element={<Search  searchStr="cafoundationregulartest" />}/>
         <Route path='/cafoundationfastrack/test' element={<Search  searchStr="cafoundationfastracktest"/>}/>
         <Route path='/caintregular/test' element={<Search  searchStr="caintregulartest"/>}/>
         <Route path='/caintfastrack/test' element={<Search  searchStr="caintfastracktest"/>}/>    
         <Route path='/cafinalregular/test' element={<Search  searchStr="cafinalregulartest"/>}/>
         <Route path='/cafinalfasstrack/test' element={<Search  searchStr="cafinalfasstracktest"/>}/>
       
         <Route path='/cseetregular/test' element={<Search  searchStr="cseetregulartest"/>}/>
         <Route path='/cseetfastrack/test' element={<Search  searchStr="cseetfastracktest"/>}/>
         <Route path='/csexecutiveregular/test' element={<Search  searchStr="csexecutiveregulartest"/>}/>
         <Route path='/csexecutivefastrack/test' element={<Search  searchStr="csexecutivefastracktest"/>}/>
         <Route path='/csprofessionalregular/test' element={<Search  searchStr="csprofessionalregulartest"/>}/>
         <Route path='/csprofessionalfastrack/test' element={<Search  searchStr="csprofessionalfastracktest"/>}/>

         <Route path='/cmsfoundationregular/test' element={<Search  searchStr="cmsfoundationregulartest" />}/>
         <Route path='/cmsfoundationfastrack/test' element={<Search  searchStr="cmsfoundationfastracktest"/>}/>
         <Route path='/cmsintermediateregular/test' element={<Search  searchStr="cmsintermediateregulartest"/>}/>
         <Route path='/cmsintermediatefastrack/test' element={<Search  searchStr="cmsintermediatefastracktest"/>}/>

         <Route path = '/cod' element = {<Cod/>}  />   
 
         <Route path='/details' element={<Details/>}/>
         <Route path='/cart' element={<Cart/>}/>
         <Route path='/cartM' element={<MAinCart/>}/>
         <Route path='/profile' element={<Profile/>}/>
         <Route path='/about' element={<AboutUs/>}/>


         <Route path='/privacypolicy' element={<Privacy/>}/>
         <Route path='/refundpolicy' element={<Refund/>}/>
         <Route path='/termsandcond' element={<Terms/>}/>
         
         <Route path='/offline' element={<Offline/>}/>

         <Route path='/*' element={<SearchWrapper />} />
        </Routes>
        </div>
        {showFooter && <Footer />}
     
    </div>
  );
}

export default App;
