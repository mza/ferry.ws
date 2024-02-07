// dateConverter.js

export function parseAndConvertTimestamp(inputString) {
  // Use a regular expression to extract the timestamp and timezone offset
  const regex = /\/Date\((\d+)([-+]\d{4})\)\//;
  const matches = inputString.match(regex);

  if (matches) {
    const timestamp = matches[1];
    const offset = matches[2];
    const offsetHours = parseInt(offset.substring(0, 3), 10); // Includes sign
    const offsetMinutes = parseInt(offset.substring(3), 10);

    // Convert timestamp to milliseconds to create a Date object
    const date = new Date(parseInt(timestamp, 10));
    
    return date;
  } else {
    throw new Error("Invalid input format");
  }
}

