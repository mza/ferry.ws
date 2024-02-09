import WSF from '../wsf.mjs';

const apiaccesscode = "333bb279-f90c-491b-88e3-f82cddb6599e";
const wsf = new WSF(apiaccesscode);

wsf.fetchCacheDate().then(data => {
  console.log(data);
});

// wsf.fetchSailings(2359).then(data => {
//   // console.log(JSON.stringify(data.sailings, null, 2));
// });

wsf.fetchValidDateRange().then(data => {
  console.log(data);
});

wsf.fetchTerminalsForDate("2024-02-08").then(data => {
  console.log(data);
});


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
