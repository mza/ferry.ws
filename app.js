import WSF from './wsf.js';

// Instantiate the ThingFetcher with a URL
const wsf = new WSF('https://api.example.com/data');

// Define a custom function to process the fetched data
function customProcessData(data) {
  console.log('Processed Data:', data);
  // Further processing logic can go here
}

// Fetch and process the data
async function run() {
  try {
    await thingFetcher.fetch(); // Fetch the data
    thingFetcher.processData(customProcessData); // Process the fetched data
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

run();
