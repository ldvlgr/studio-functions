exports.handler = (context, event, callback) => {
  const phNumber = event.twilioPhoneNumber;
  console.log('EVENT:', event);
  const phNumbers = {
    "+18587588840": {
      "campaign": "Campaign1",
      "TFN": "8001234567"
    },
    "+18123334455": {
      "campaign": "Campaign2",
      "TFN": "8005556789"
    }
  };
  let result = {
    campaign: phNumbers[phNumber].campaign,
    TFN: phNumbers[phNumber].TFN

  };
  return callback(null, result);
};
