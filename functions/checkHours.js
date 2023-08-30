exports.handler = (context, event, callback) => {
  // Grab the current date and time. Note that this is the local time where the
  // Function is being executed, not necessarily the time zone of your business!
  let { openTime, closeTime } = event;
  if (!openTime) openTime = '0600';
  if (!closeTime) closeTime = '1700'
  const openStr = openTime.replace(":", "").padStart(4, '0');
  const openMinutes = Number(openStr.substring(0, 2)) * 60 + Number(openStr.substring(2, 4));
  
  const closeStr = closeTime.replace(":", "").padStart(4, '0');
  const closeMinutes = Number(closeStr.substring(0, 2)) * 60 + Number(closeStr.substring(2, 4));
  
  const now = new Date();
  // Print the timezone of the instance that's running this code
  const functionTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log(`This Function is being executed in the ${functionTz} time zone`);
  // You should see: 'This Function is being executed in the UTC time zone'

  // Configure Intl.DateTimeFormat to return a date in the specified
  // time zone and in this format for parsing, for example: 'Monday, 18'
  const formatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    weekday: 'long',
    timeZone: 'America/New_York',
  };
  const formatter = new Intl.DateTimeFormat('en-US', formatOptions);

  // Get the current time and day of the week for your specific time zone
  const formattedDate = formatter.format(now);
  console.log('Date:', formattedDate);
  const dateArray = formattedDate.split(' ');
  const day = dateArray[0]; // ex. 'Monday'
  const time = dateArray[1]; // ex. 18:45
  
  const minutes = Number(time.substring(0, 2)) * 60 + Number(time.substring(3, 5));
  // Since we're given days as strings, we can use Array.includes to check
  // against a list of days we want to consider the business closed
  const isWeekend = ['Sunday', 'Saturday'].includes(day);

  const isOpen = !isWeekend && minutes >= openMinutes && minutes < closeMinutes;
  let result = { isOpen };
  return callback(null, result);
};
