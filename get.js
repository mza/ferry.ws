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

// Example usage
const url = 'https://www.wsdot.wa.gov/Ferries/API/Schedule/rest/alerts?apiaccesscode=333bb279-f90c-491b-88e3-f82cddb6599e';
fetchJSONFromURL(url)
  .then(data => console.log(data))
  .catch(error => console.error(error));
