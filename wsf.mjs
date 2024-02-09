import axios from 'axios';
import { parseAndConvertTimestamp, convertToTime, convertToDepartureArrivalIndicator, convertToAnnotation } from './lib/dateConverter.mjs';

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

  async fetchValidDateRange() {
    var action = "validdaterange";
    const response = await this.fetch(action);

    this.data = {
      date_from: parseAndConvertTimestamp(response.DateFrom),
      date_thru: parseAndConvertTimestamp(response.DateThru),
    };

    return this.data;
  }

  async fetchTerminalsForDate(date) {
    var action = "terminals/" + date;
    const response = await this.fetch(action);
    var terminals = []

    response.forEach(terminal => {
      terminals.push({
        id: terminal.TerminalID,
        name: terminal.Description
      });
    });

    this.data = {
      terminals: terminals
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
        // console.log(`Schedule ID: ${schedule.ScheduleID}, Route ID: ${schedule.RouteID}, Description: ${schedule.SailingDescription}`);
        schedule.Journs.forEach(journey => {
            journey.TerminalTimes.forEach(terminalTime => {              
                if (!terminalTime.IsNA) {
                  var xml_response = "";
                  xml_response += "<sailing>";
                  xml_response += "<direction>" + schedule.SailingDescription + "</direction>";
                  xml_response += "<vessel>" + journey.VesselName + "</vessel>";
                  xml_response += "<terminal>" + terminalTime.TerminalDescription + "</terminal>";
                  xml_response += "<time>" + convertToTime(terminalTime.Time) + "</time>";
                  xml_response += "<type>" + convertToDepartureArrivalIndicator(terminalTime.DepArrIndicator) + "</type>";
                  xml_response += "<notes>" + convertToAnnotation(terminalTime.Annotations) + "</notes>";
                  xml_response += "</sailing>"
                  console.log(xml_response);
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
