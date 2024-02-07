// Import Axios
import axios from 'axios';

class WSF {
  constructor(url) {
    this.url = url; // Initialize the object with a URL
  }

  // Method to update the URL if needed
  setUrl(newUrl) {
    this.url = newUrl;
  }

  // Async method to fetch data
  async fetch() {
    try {
      const response = await axios.get(this.url);
      this.data = {
        date: new Date().toISOString(),
        properties: response.data,
      };
      return this.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Allows the calling code to handle the error
    }
  }

  // Method to process the fetched data
  processData(processFunction) {
    if (this.data && typeof processFunction === 'function') {
      processFunction(this.data);
    } else {
      console.log('No data to process or no process function provided');
    }
  }
}

export default WSF;
