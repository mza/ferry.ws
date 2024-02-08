import axios from 'axios';
import { parseAndConvertTimestamp } from './lib/dateConverter.mjs';
import { fetchJSONFromURL } from './lib/fetch.mjs';

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
    const response = await this.fetch(action);
    this.data = {
      last_updated: parseAndConvertTimestamp(response)
    };
    return this.data;
  }

  async fetch(action) {

    const prefix = "https://www.wsdot.wa.gov/Ferries/API/Schedule/rest";
    const suffix = `apiaccesscode=${this.api_key}`;

    var url = `${prefix}/${action}?${suffix}`;
    console.log(url);
    try {
      const response = await axios.get(url);
      return response.data;
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
