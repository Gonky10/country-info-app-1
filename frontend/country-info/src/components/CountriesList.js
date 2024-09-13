import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2em',
    color: 'white',
    border: '5px solid black',
    backgroundColor: 'black'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  listItem: {
    margin: '30px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'background-color 1s ease',
    backgroundColor:'black',
    border: '2px solid black',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    padding: '10px',
    display: 'inline-block',
  },
  link_select: {
    textDecoration: 'none',
    color: 'black',
    padding: '10px',
    display: 'inline-block',
  },
  listItemHover: {
    backgroundColor: 'white',
  },
  listItemSelected: {
    backgroundColor: 'black',
  },
};

const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/countries`)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  const handleMouseEnter = (code) => {
    console.log("ACAAAAAA ARG_: ", code);
    
    setHoveredCountry(code.countryCode);
  };

  const handleMouseLeave = () => {
    setHoveredCountry(null);
  };

  const handleClick = (code) => {
    setSelectedCountry(code.countryCode);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Countries List</h1>
      <ul style={styles.list}>
        {countries.map((country) => (
          <li
            key={country.countryCode}
            style={{
              ...styles.listItem,
              ...(hoveredCountry === country.countryCode? styles.listItemHover : {}),
              ...(selectedCountry === country.countryCode ? styles.listItemSelected : {}),
            }}
            onMouseEnter={() => handleMouseEnter(country)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(country)}
          >
            <Link to={`/country/${country.countryCode}`} style={{
              ...styles.link,
              ...(hoveredCountry === country.countryCode? styles.link_select : {})
            }}>
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountriesList;
