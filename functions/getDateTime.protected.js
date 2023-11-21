exports.handler = async function (context, event, callback) {
  const client = context.getTwilioClient();
  const startSeconds = event.startSeconds; // optional
  const dt = new Date();
  const seconds = Math.floor(dt.getTime() / 1000);
  let ivr_time;
  // calc ivr_time if start time provided
  if (startSeconds) ivr_time = seconds - startSeconds;
  console.log('Date: ', dt, ' Seconds:', seconds, ' ivr_time:', ivr_time);
  const result = { dt, seconds, ivr_time };
  return callback(null, result);
}