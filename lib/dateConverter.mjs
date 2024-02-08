// dateConverter.js

export function parseAndConvertTimestamp(inputString) {
  console.log(inputString);
  // Use a regular expression to extract the timestamp and timezone offset
  const regex = /\/Date\((\d+)([-+]\d{4})\)\//;
  const matches = inputString.match(regex);

  if (matches) {
    const timestamp = matches[1];

    const date = new Date(parseInt(timestamp));

    return formatAsNaturalLanguageWithTime(date);
  } else {
    console.log(inputString);
    throw new Error("Invalid input format");
  }
}

function formatAsNaturalLanguageWithTime(date) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const inputDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // Formatting the time
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  const formattedTime = `${hours}:${minutesStr} ${ampm}`;

  // Check for Today, Yesterday, or Tomorrow and append the time
  if (inputDate.getTime() === today.getTime()) {
    return `Today at ${formattedTime}`;
  } else if (inputDate.getTime() === yesterday.getTime()) {
    return `Yesterday at ${formattedTime}`;
  } else if (inputDate.getTime() === tomorrow.getTime()) {
    return `Tomorrow at ${formattedTime}`;
  } else {
    // Otherwise, format as "Month day, Year at Time"
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} at ${formattedTime}`;
  }
}

