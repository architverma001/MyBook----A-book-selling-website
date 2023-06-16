
import { City, State } from 'country-state-city';
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore"; 
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { app, storage, db } from '../../firebase';
import './Offline.css';
import CardOff from './CardOff';
function Offline() {
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
   
    useEffect(() => {
      fetchStates();
    }, []);
 
    const fetchStates = () => {
      const statesOfIndia = State.getStatesOfCountry('IN');
      const stateNames = statesOfIndia.map((state) => state.name);
      setStates(stateNames);
    };
  








    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        console.log(selectedState, selectedCity);
        if(!selectedState){
          setLoading(false);
            alert("Please select a state")
            return
        }
    
        if(!selectedCity){
            alert("Please select a city")
            setLoading(false);
            return
        }
        const StateCity = selectedState+selectedCity;
        setLoading(true);
      try {
        const querys = query(collection(db, StateCity));
        const querySnapshot = await getDocs(querys);
        const AddressData = querySnapshot.docs.map((doc) => doc.data());
         setAddress(AddressData);
         console.log(AddressData);
      
      } catch (error) {
        console.log('An error occurred while fetching books:', error);
      }
      setLoading(false);

  
        }









    const handleStateChange = (state) => {
      setSelectedState(state);
      setSelectedCity('');
     
      const citiesOfState = City.getCitiesOfCountry('IN', state);
      const cityNames = citiesOfState.map((city) => city.name);
      setCities(cityNames);
    };
  
    const handleCityChange = (city) => {
      setSelectedCity(city);
     
    };
  

    

  
  return (
    <div className='d-flex flex-column '>
        <div className='d-flex flex-column '>
    <div className=' mt-4 d-flex flex-column'>
        <div className='d-flex mb-2 justify-content-center text-align-center '>
      <p className='me-1 mt-1'>States</p>
      <select onChange={(e) => handleStateChange(e.target.value)}>
       <option value="">Select a state</option>
        {states.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>
      </div>

      <div className='d-flex justify-content-center text-align-center'>
      <p className='me-1 mt-1'>Cities</p>
      <select value={selectedCity} onChange={(e) => handleCityChange(e.target.value)}>
        <option value="">Select a city</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
      </div>
      </div>
      <div className='centrify'>
        <button className='btn mt-2 bg width ms-1'  onClick={handleSubmit}  >submit</button>
        </div>
        </div>
       {
        address && address.map((item) => {
          return(
            <CardOff Url={item.Url} Address={item.Address} />
          )
         
}
        )
       }
    </div>
  );
}

export default Offline
