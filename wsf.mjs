import axios from 'axios';
import { parseAndConvertTimestamp } from './dateConverter.mjs';
import { fetchJSONFromURL } from './fetch.mjs';

class WSF {
  constructor(api_key) {
    this.api_key = api_key; // Initialize the object with a URL
  }

  // Method to update the URL if needed
  // setUrl(newUrl) {
  //   this.url = newUrl;
  // }

  async fetchCacheDate() {
    var action = "cacheflushdate";
    return this.fetch(action);
  }

  async fetch(action) {

    const prefix = "https://www.wsdot.wa.gov/Ferries/API/Schedule/rest";
    const suffix = `apiaccesscode=${this.api_key}`;

    var url = `${prefix}/${action}?${suffix}`;
    
    try {
      const response = await axios.get(url);
      this.data = {
        last_updated: parseAndConvertTimestamp(response.data)
      };
      return this.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  }

  // Method to process the fetched data
  // processData(processFunction) {
  //   if (this.data && typeof processFunction === 'function') {
  //     processFunction(this.data);
  //   } else {
  //     console.log('No data to process or no process function provided');
  //   }
  // }
}

export default WSF;
