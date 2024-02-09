import WSF from '../wsf.mjs';

const apiaccesscode = "333bb279-f90c-491b-88e3-f82cddb6599e";
const wsf = new WSF(apiaccesscode);

wsf.fetchCacheDate().then(data => {
  console.log(data);
});

var seasons = []

wsf.fetchActiveSeasons().then(data => {
  seasons = data;
});

var routes = [];

wsf.fetchScheduledRoutes().then(data => {
  routes = data;
});

var sailings = [];

wsf.fetchSailings(2359).then(data => {
  sailings = data;
});




// wsf.fetchRoutesForDate("2024-02-09").then(data => {
//   console.log(data);
// });

// wsf.fetchScheduledRoutes().then(data => {
//   console.log(JSON.stringify(data, null, 2));
// });

// wsf.fetchSailings(2359).then(data => {
//   // console.log(JSON.stringify(data.sailings, null, 2));
// });

// wsf.fetchValidDateRange().then(data => {
  // console.log(data);
// });

// wsf.fetchTerminalsForDate("2024-02-08").then(data => {
  // console.log(data);
// });

// wsf.fetchTerminalsAndMatesForDate("2024-02-08").then(data => {
  // console.log(data);
// });


// wsf.fetchActiveSeasons().then(data => {
//   console.log(data);
// });

// wsf.fetchScheduledRoutes().then(data => {
//   console.log(data);
// });

// // Last updated:

// // var action = "schedroutes";

// var action = "sailings/2359";
// var url = `${prefix}/${action}?${suffix}`;

// fetchJSONFromURL(url)
//   .then(data => 
//   {
//     // console.log(data[0]['Journs'][0]['TerminalTimes'][0]['Time']);
//     parseSailings(data);
//   })
//   .catch(error => console.error(error));
