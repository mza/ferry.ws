// All the helper functions to parse the WSF API output

// Arrival departure indicator

export function convertToDepartureArrivalIndicator(indicator) {
  if (indicator == 1) {
    return "Departure";
  } else if (indicator == 2) {
    return "Arrival";
  } else {
    return "Unknown";
  }
}

// Annotations for sailing journeys

export function convertToAnnotation(annotations) {
  var annotationString = "";

  if (annotations) {
    annotations.forEach(annotation => {
      annotationString += annotation.AnnotationIVRText;
    });
  }

  return annotationString;
}

// WSF Epoch date handling

Date.prototype.stdTimezoneOffset = function() {
  var jan = new Date(this.getFullYear(), 0, 1);
  var jul = new Date(this.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}
Date.prototype.printLocalTimezone = function() {
  if (typeof moment !== "undefined") {
      var md = moment(this);
      return "GMT" + md.format("Z");
  }
  return '';
}
Date.prototype.relativeDate = function() {
  if (typeof moment !== "undefined") {
      moment.locale('en');
      var md = moment(this);
      return md.fromNow();
  }
  return '';
}
Date.prototype.epochConverterLocaleString = function(disabletz) {
  disabletz = disabletz || false;
  if (typeof moment === "undefined") {
      return this.toDateString() + " " + this.toTimeString();
  }
  moment.locale(locale);
  var md = moment(this);
  if (!md.isValid()) {
      return 'Invalid input.';
  }
  var currentLocaleData = moment.localeData();
  var myLocaleData = moment.localeData(locale);
  var myFormat = ecFixFormat(myLocaleData.longDateFormat('LLLL'));
  if (md.format("SSS") != '000') {
      myFormat = myFormat.replace(":mm", ":mm:ss.SSS");
      myFormat = myFormat.replace(".mm", ".mm.ss.SSS");
  } else {
      myFormat = myFormat.replace(":mm", ":mm:ss");
      myFormat = myFormat.replace(".mm", ".mm.ss");
  }
  if (!disabletz) {
      myFormat += " [GMT]Z";
  }
  var customDate = md.format(myFormat);
  return customDate;
}
Date.prototype.epochConverterGMTString = function() {
  if (typeof moment === "undefined") {
      return this.toUTCString();
  }
  moment.locale('en');
  var md = moment(this);
  if (!md.isValid()) {
      return 'Invalid input.';
  }
  var myLocaleData = moment.localeData(locale);
  var myFormat = ecFixFormat(myLocaleData.longDateFormat('LLLL')).replace(/\[([^\]]*)\]/g, " ");
  if (md.format("SSS") != '000') {
      myFormat = myFormat.replace(":mm", ":mm:ss.SSS");
  } else {
      myFormat = myFormat.replace(":mm", ":mm:ss");
  }
  return md.utc().format(myFormat);
}
Date.prototype.epochConverterGMTDate = function() {
  if (typeof locale == 'string' && locale.substring(0, 2) == 'en') {
      moment.locale(locale);
  } else {
      moment.locale('en');
  }
  var md = moment(this);
  if (!md.isValid()) {
      return 'Invalid input.';
  }
  return md.utc().format('dddd, LL');
}

export function parseAndConvertTimestamp(inputString) {
  const regex = /\/Date\((\d+)([-+]\d{4})\)\//;
  const matches = inputString.match(regex);
  // console.log(inputString);
  if (matches) {
    const timestamp = matches[1];

    const date = new Date(parseInt(timestamp));

    return formatAsNaturalLanguageWithTime(date);
  } else {
    throw new Error("Invalid input format");
  }
}
function cleanTimestamp(ts) {
  if (!ts) {
      return "";
  }
  ts = ts.replace(/[`'"\s\,]+/g, '');
  if (ts.charAt(ts.length - 1) == "L") {
      ts = ts.slice(0, -1);
  }
  return ts;
}
function Ax() {
    return 0;
}
function isValidDate(d) {
  if (Object.prototype.toString.call(d) !== "[object Date]")
      return false;
  return !isNaN(d.getTime());
}

function convertEpoch(iorg) {
  var inputtext = cleanTimestamp(iorg);
  var outputtext = "";
  var locale = "en";
  var notices = "";
  var hr = "";
  if (inputtext && inputtext != iorg.trim()) {
      outputtext += "Converting " + inputtext + ":<br/>";
  }
  if ((inputtext.length === 0) || isNaN(inputtext)) {
      if (isHex(inputtext)) {
          inputtext = '0x' + inputtext;
      } else {
          $("#result1").html(errormessage + hr);
          return;
      }
  }
  if (inputtext.substring(0, 2) == '0x') {
      outputtext += "Converting <a href=\"/hex?q=" + inputtext.substring(2) + "\">hexadecimal timestamp</a> to decimal: " + parseInt(inputtext) + "<br/>";
  }
  inputtext = inputtext * 1;

  // if (!Ax())
  //     inputtext -= inputtext;

  var epoch = inputtext;
  var cn = '';
  if (locale.substring(0, 2) == 'en') {
      cn = ' class="utcal"';
  }
  if ((inputtext >= 10E7) && (inputtext < 18E7)) {
      notices += '<br/>Expected a more recent date? You are missing 1 digit.';
  }

  if ((inputtext >= 1E16) || (inputtext <= -1E16)) {
      outputtext += "Assuming that this timestamp is in <b>nanoseconds (1 billionth of a second)</b>:<br/>";
      inputtext = Math.floor(inputtext / 1000000);
  } else if ((inputtext >= 1E14) || (inputtext <= -1E14)) {
      outputtext += "Assuming that this timestamp is in <b>microseconds (1/1,000,000 second)</b>:<br/>";
      inputtext = Math.floor(inputtext / 1000);
  } else if ((inputtext >= 1E11) || (inputtext <= -3E10)) {
      outputtext += "Assuming that this timestamp is in <b>milliseconds</b>:<br/>";
  } else {
      outputtext += "Assuming that this timestamp is in <b>seconds</b>:<br/>";
      if ((inputtext > 1E11) || (inputtext < -1E10)) {
          notices += "<br>Remove the last 3 digits if you are trying to convert milliseconds.";
      }
      inputtext = (inputtext * 1000);
  }
  if (inputtext < -68572224E5) {
      notices += "<br/>Dates before 14 september 1752 (pre-Gregorian calendar) are not accurate.";
  }
  var datum = new Date(inputtext);
  if (isValidDate(datum)) {
      var convertedDate = datum.epochConverterGMTString();
      var relativeDate = datum.relativeDate();
      outputtext += "<b" + cn + ">GMT</b>: " + convertedDate;
      outputtext += "<br/><b" + cn + ">Your time zone</b>: <span title=\"" + datum.toDateString() + " " + datum.toTimeString() + "\">" + datum.epochConverterLocaleString(1) + "</span>";
      if (typeof moment !== "undefined") {
          outputtext += " <a title=\"convert to other time zones\" href=\"https://www.epochconverter.com/timezones?q=" + epoch + "\">" + datum.printLocalTimezone() + "</a>";
          var md = moment(datum);
          if (md.isDST()) {
              outputtext += ' <span class="help" title="daylight saving/summer time">DST</span>';
              if (datum.getFullYear() < 1908)
                  notices += '<br/>DST (Daylight Saving Time) was first used around 1908.<br/>Your browser uses the current DST rules for all dates in history.';
          }
      }
      if (relativeDate) {
          outputtext += "<br/><b" + cn + ">Relative</b>: " + relativeDate.capitalize();
      }
      if (notices)
          outputtext += "<br/><br/>Note: " + notices;
  } else {
      outputtext += errormessage;
  }
  
  const finalDateTime = datum.toDateString() + " " + datum.toTimeString() + " " + datum.epochConverterLocaleString(1);
  const finalTime = datum.toLocaleTimeString();
  return finalTime;
  
}

export function convertToTime(timestamp) {
  const matches = timestamp.match(/\/Date\((-?\d+)([+-])(\d{2})(\d{2})\)\/$/);
  let [, epochTime, sign, hoursOffset, minutesOffset] = matches;
  return convertEpoch(epochTime);
}

export function convertToDateObject(timestamp) {
  // Extract the timestamp, timezone parts from the input, handling negative values for time only
  const matches = timestamp.match(/\/Date\((-?\d+)([+-])(\d{2})(\d{2})\)\/$/);
  if (!matches) {
      throw new Error('Invalid timestamp format');
  }

  let [, epochTime, sign, hoursOffset, minutesOffset] = matches;
  const isTimeOnly = epochTime.startsWith('-');
  if (isTimeOnly) {
      epochTime = epochTime.substring(1); // Remove the minus sign for time-only values
  }

  // Calculate the total offset in minutes
  const timezoneOffset = parseInt(hoursOffset, 10) * 60 + parseInt(minutesOffset, 10);
  const timezoneOffsetMs = timezoneOffset * 60 * 1000 * (sign === '+' ? 1 : -1);

  // For time-only values, set the date part to a specific date, here using epoch as default
  const baseDate = isTimeOnly ? new Date(0) : new Date(parseInt(epochTime, 10));

  // Adjust for the timezone offset
  const adjustedTimeMs = baseDate.getTime() + timezoneOffsetMs;

  // If it's not time-only, we also need to account for the local timezone offset to match the intended timezone
  const finalDate = new Date(adjustedTimeMs - (isTimeOnly ? 0 : baseDate.getTimezoneOffset() * 60000));

  return finalDate;
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

