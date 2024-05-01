import React, { useState, useEffect } from "react";
import "./App.css";

function XStates() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchStates(selectedCountry);
    }
  }, [selectedCountry]);

  useEffect(() => {
    // Fetch cities when selectedState changes
    if (selectedState) {
      fetchCities(selectedCountry, selectedState);
    }
  }, [selectedState]);

  const fetchCountries = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://crio-location-selector.onrender.com/countries"
      );
      const data = await response.json();
      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching countries:", error);
      setIsLoading(false);
    }
  };

  const fetchStates = async (countryName) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${countryName}/states`
      );
      const data = await response.json();
      setStates(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching states:", error);
      setIsLoading(false);
    }
  };

  const fetchCities = async (countryName, stateName) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`
      );
      const data = await response.json();
      setCities(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setIsLoading(false);
    }
  };

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    setSelectedState(""); // Reset state when country changes
    setSelectedCity(""); // Reset city when country changes
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    setSelectedCity(""); // Reset city when state changes
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
  };

  return (
    <div className="container">
      <h2>Location Selector</h2>
      <form className="form">
        <div className="input-group">
          <select
            id="country"
            onChange={handleCountryChange}
            value={selectedCountry}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {selectedCountry && (
            <select
              id="state"
              onChange={handleStateChange}
              value={selectedState}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          )}
          {selectedState && (
            <select id="city" onChange={handleCityChange} value={selectedCity}>
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          )}
        </div>
      </form>
      {selectedCity && (
        <p>
          You selected <span className="selected-city">{selectedCity}</span>,{" "}
          <span className="selected-state">{selectedState}</span>,{" "}
          <span className="selected-country">{selectedCountry}</span>
        </p>
      )}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default XStates;
