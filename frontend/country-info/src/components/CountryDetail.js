import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'chart.js/auto';
const styles = {
  container: {
    padding: '20px',
    textAlign: 'center'
  },
  title: {
    backgroundColor: 'black'
  },
  heading: {
    fontSize: '2em',
    color: '#333',
    border: '5px solid black',
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
    width: '150px',
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
const CountryDetail = () => {
  const { code } = useParams();
  const [countryInfo, setCountryInfo] = useState(null);
  const [populationData, setPopulationData] = useState(null);
  const [flag, setFlag] = useState(null);

  useEffect(() => {
    if (!code) return;

    // Petición para obtener los detalles del país
    fetch(`${process.env.REACT_APP_API_URL}/countries/${code}`)
      .then((response) => response.json())
      .then((data) => {
        // Aquí debes asegurarte de qué propiedad estás recibiendo.
        console.log(data.borders);
        
        setCountryInfo(data);
      })
      .catch((error) => console.error('Error fetching country details:', error));
    
    // Petición para obtener los datos de población
    fetch(`${process.env.REACT_APP_API_URL}/countries/population`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: code })
    })
      .then((response) => response.json())
      .then((data) => {
        // Asegúrate de que `data` tiene la estructura correcta
          setPopulationData(data.populationData);
      })
      .catch((error) => console.error('Error fetching population data:', error));


      fetch('http://localhost:5001/api/countries/flag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ iso2: code })
      })
        .then((response) => response.json())
        .then((data) => {
          // Asegúrate de que `data` tiene la estructura correcta
          console.log("FLAGGG: ",data.data);
          
          if (data) {
            setFlag(data);
          }
        })
        .catch((error) => console.error('Error fetching flaggggggg data:', error));
  }, [code]);

  // Renderizado del gráfico de población cuando los datos están disponibles
  useEffect(() => {
    if (!populationData || !populationData.years || !populationData.values) return;

    const ctx = document.getElementById('populationChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: populationData.years, // Asegúrate de que los años estén aquí
        datasets: [{
          label: 'Population over Time',
          data: populationData.values, // Asegúrate de que los valores estén aquí
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }, [populationData]);

  if (!countryInfo) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.title}>
      <h1 style={{padding: '5px', color: 'white'}}>{countryInfo.commonName || countryInfo.name}</h1> {/* Ajusta esto según la estructura */}
      </div>
      <img src={flag == null ?'':flag.data.flag} alt={`Flag of ${countryInfo.commonName || countryInfo.name}`} />
      <div style={styles.title}>
      <h2 style={{padding: '5px', color: 'white'}}>Border Countries</h2>
      </div>
      <ul>
      {countryInfo.borders && countryInfo.borders.length > 0 ? (
        <div>
          <div style={styles.title}>

          <h3 style={{padding: '5px', color: 'white'}}>Border Countries:</h3>
          </div>
          <ul>
            {countryInfo.borders.map((borderCountry, index) => (
              <div style={styles.title}>
                <li key={index} style={{padding: '5px', color: 'white'}}>{borderCountry.commonName}</li>
              </div>             
            ))}
          </ul>
        </div>
      ) : (
        <p>No border countries.</p>
      )}
      </ul>

      <h2>Population Chart</h2>
      <canvas id="populationChart"></canvas>
    </div>
  );
};

export default CountryDetail;
