exports.handler = (context, event, callback) => {
  const phNumber = event.twilioPhoneNumber;
  console.log('EVENT:', event);
  const phNumbers = {
    "+18587588840" : {
      "campaign": "Promotion1"
    }
  };
  let result = { campaign: phNumbers[phNumber].campaign };
  return callback(null, result);
};
