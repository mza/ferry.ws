import { fetchJSONFromURL } from '../lib/fetch.mjs';
import { parseSailings } from './sailings.mjs';

const apiaccesscode = "333bb279-f90c-491b-88e3-f82cddb6599e";
const tripDate = "2024-02-07"
const prefix = "https://www.wsdot.wa.gov/Ferries/API/Schedule/rest";
const suffix = `apiaccesscode=${apiaccesscode}`;

// Last updated:

// var action = "schedroutes";

var action = "sailings/2359";
var url = `${prefix}/${action}?${suffix}`;

fetchJSONFromURL(url)
  .then(data => 
  {
    // console.log(data[0]['Journs'][0]['TerminalTimes'][0]['Time']);
    parseSailings(data);
  })
  .catch(error => console.error(error));
