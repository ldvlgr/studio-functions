# studio-functions

Project created via https://www.twilio.com/docs/labs/serverless-toolkit/general-usage

CheckHours functions returns isOpen (= true/false) based on the current Day & Time (EST/EDT).

This function assumes a default Open time (6:00) and Closed time (17:00), unless specified in the request as follows:

https://studio-functions-xxxx-dev.twil.io/checkHours?openTime=0600&closeTime=1700

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