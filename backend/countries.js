import axios from "axios";

export const allCountries = () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://date.nager.at/api/v3/AvailableCountries',
    headers: {}
  };

  return axios.request(config)
    .then((response) => response.data)
    .catch((error) => { throw error });
};

export const countryDetail = (code) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://date.nager.at/api/v3/CountryInfo/' + code,
    headers: {}
  };

  return axios.request(config)
    .then((response) => response.data)
    .catch((error) => { throw error });
};

export const getPopulationData = (country) => {
  let data = JSON.stringify({
    "country": country
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://countriesnow.space/api/v0.1/countries/population',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios.request(config)
    .then((response) => response.data)
    .catch((error) => { throw error });
};

export const getFlag = (country) => {
  let data = JSON.stringify({
    "iso2": country
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://countriesnow.space/api/v0.1/countries/flag/images',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios.request(config)
    .then((response) => response.data)
    .catch((error) => { throw error });
};
