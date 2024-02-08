import axios from 'axios';

export async function fetchJSONFromURL(url) {
    try {
      const response = await axios.get(url);
      return response.data; // This will be the JSON data
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Rethrow or handle as needed
    }
  }
  