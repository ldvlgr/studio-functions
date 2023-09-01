# studio-functions

Project created via https://www.twilio.com/docs/labs/serverless-toolkit/general-usage

CheckHours functions returns isOpen (= true/false) based on the current Day & Time (EST/EDT).

This function assumes a default Open time (6:00) and Closed time (17:00), unless specified in the request as follows:

https://studio-functions-xxxx-dev.twil.io/checkHours?openTime=0600&closeTime=1700

Deploy these functions to your account using
```
twilio serverless:deploy
```

To see the serverless logs use:
```
twilio serverless:logs --tail --service-sid=ZSxxx
```