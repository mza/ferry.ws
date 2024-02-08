import axios from 'axios';
import { parseAndConvertTimestamp, convertToTime } from './lib/dateConverter.mjs';

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

  async fetchSailings(routeId) {
    var action = "sailings/" + routeId;
    const response = await this.fetch(action);

    this.parseSailings(response);

    this.data = {
      sailings: response
    };
    
    return this.data;
  }

  parseSailings(schedules) {
    schedules.forEach((schedule, index) => {
        console.log(`Schedule ID: ${schedule.ScheduleID}, Route ID: ${schedule.RouteID}, Description: ${schedule.SailingDescription}`);
        schedule.Journs.forEach(journey => {
            console.log(journey.VesselName);
            journey.TerminalTimes.forEach(terminalTime => {
                if (!terminalTime.IsNA) {
                  console.table([ terminalTime.TerminalDescription, convertToTime(terminalTime.Time)]);
                }
            });
        });
    });
  };

  async fetch(action) {

    const prefix = "https://www.wsdot.wa.gov/Ferries/API/Schedule/rest";
    const suffix = `apiaccesscode=${this.api_key}`;

    var url = `${prefix}/${action}?${suffix}`;

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
