import { parseAndConvertTimestamp } from './dateConverter.js';

const axios = require('axios');

async function fetchJSONFromURL(url) {
  try {
    const response = await axios.get(url);
    return response.data; // This will be the JSON data
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow or handle as needed
  }
}

const apiaccesscode = "333bb279-f90c-491b-88e3-f82cddb6599e"
const tripDate = "2024-02-07"
const prefix = "https://www.wsdot.wa.gov/Ferries/API/Schedule/rest";
const suffix = `apiaccesscode=${apiaccesscode}`;
var action = "alerts";

// Last updated:

action = "cacheflushdate";
url = `${prefix}/${action}?${suffix}`;

fetchJSONFromURL(url)
  .then(data => 
  {
    const dateObject = parseAndConvertTimestamp(data);
    console.log(`Last updated: ${dateObject.getFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getDate()} ${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`);
  })
  .catch(error => console.error(error));
