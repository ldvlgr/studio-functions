# studio-functions


Project created via https://www.twilio.com/docs/labs/serverless-toolkit/general-usage

### CheckHours Function
CheckHours functions returns isOpen (= true/false) based on the current Day & Time (EST/EDT).

This function assumes a default Open time (6:00) and Closed time (17:00), unless specified in the request as follows:

https://studio-functions-xxxx-dev.twil.io/checkHours?openTime=0600&closeTime=1700

This function is a modified version of the example provided here:
https://www.twilio.com/docs/serverless/functions-assets/quickstart/time-of-day-routing

### Phone Number Lookup
This function does a basic lookup in a static Json object to retrieve attributes associated with the inbound Twilio Phone number

### Create & Update IVR Tasks

These are updated versions of the functions from this [blog post](https://www.twilio.com/blog/ivr-with-flex-insights) to be able to track IVR tasks.

Note: The updateIVRTask function was modified to pass in the taskSid that is returned from the createIVRTask function call.

Function parameters:

taskSid = {{widgets.createIVRTask.parsed.taskSid}}

## Deployment

It is recommended to [set the Visibility of functions](https://www.twilio.com/docs/serverless/functions-assets/visibility) used by Studio as "protected" by prepending the extension with `protected`, for example: 
```
lookup.protected.js
```

[Deploy these functions](https://www.twilio.com/docs/labs/serverless-toolkit/general-usage#deploy-a-project) to your account using
```
twilio serverless:deploy
```

To debug the [serverless logs](https://www.twilio.com/docs/serverless/api/resource/logs#serverless-toolkit-usage) use:
```
twilio serverless:logs --tail --service-sid=ZSxxx
```