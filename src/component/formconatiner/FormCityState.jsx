import React, { useEffect, useState } from 'react';
import { Country, State, City } from 'country-state-city';
import './formcont.css'
function FormCityState() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [stateCityData, setStateCityData] = useState([]);
  

  const handleclick = () => {

    if (selectedState === '' || selectedCity === '') {
      alert('Please select state and city');
    } else {
      alert(`You selected ${selectedCity} in ${selectedState}`);
    }
  };
  useEffect(() => {
    const generateStateCityData = () => {
      // Assuming we want data for India
      const india = Country.getAllCountries().find((country) => country.isoCode === 'IN');
      
      const states = State.getStatesOfCountry(india.isoCode);
     
      const data = states.map((state) => {
        const cities = City.getCitiesOfState(india.isoCode, state.isoCode);
        return {
          state: state.name,
          cities: cities.map((city) => city.name)
        };
      });

   

      setStateCityData(data);
    };

    generateStateCityData();
  }, []);

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedCity('');
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
  };

  const cityOptions = stateCityData.find((data) => data.state === selectedState)?.cities || [];

  return (
    <div>
      <h3>Find in your city</h3>
      <label htmlFor="state">State:</label>
      <select id="state" value={selectedState} onChange={handleStateChange} className='me-3 mb-2 ms-1 mng'>
        <option value="" className='background-deco '>Select a state</option>
        {stateCityData.map((data, index) => (
          <option key={index} value={data.state}>
            {data.state}
          </option>
        ))}
      </select>

      <label htmlFor="city">City:</label>
      <select id="city" value={selectedCity} onChange={handleCityChange} disabled={!selectedState} className='me-3 mb-2 ms-1 mng'>
        <option value="">Select a city</option>
        {cityOptions.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>

      <div>
        <button className='btn backgnd' onClick={handleclick}>Search</button>
      </div>
    </div>
  );
}

export default FormCityState;