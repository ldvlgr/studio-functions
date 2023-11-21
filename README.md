# studio-functions

This Serverless functions project was created via https://www.twilio.com/docs/labs/serverless-toolkit/general-usage.

It is recommended to [set the Visibility of functions](https://www.twilio.com/docs/serverless/functions-assets/visibility) used by Studio as "protected" by prepending the extension with `protected`.

### CheckHours Function
The CheckHours function returns isOpen (= true/false) based on the current Day & Time (EST/EDT).

This function assumes a default Open time (6:00) and Closed time (17:00), unless specified in the request as follows:

https://studio-functions-xxxx-dev.twil.io/checkHours?openTime=0600&closeTime=1700

This function is a modified version of the example provided here:
https://www.twilio.com/docs/serverless/functions-assets/quickstart/time-of-day-routing

### Phone Number Lookup
This function does a basic lookup in a static Json object to retrieve attributes associated with the inbound Twilio Phone number. These attributes can be added to the Task in the SendToFlex widget in Studio.

### Get Time Function ###

If you just need to capture the `ivr_time` measure for inbound calls, you can use this function to capture the Start Time at the top of the Studio flow (GetStartTime function call widget) and the End Time (GetEndTime function call widget) just before the SendToFlex widget.

On the final invocation (GetEndTime), make sure to set function parameter (input):

`startSeconds = {{widgets.GetStartTime.parsed.seconds}}`

to make sure it calculates the duration.

And in the SendToFlex widget attributes section add:
```
  "conversations": {
    "ivr_time": "{{widgets.GetEndTime.parsed.ivr_time}}"
  }
```

### Create & Update IVR Tasks

These are updated versions of the functions from this [blog post](https://www.twilio.com/blog/ivr-with-flex-insights) to be able to track IVR tasks.

Note: The updateIVRTask function was modified to pass in the taskSid that is returned from the createIVRTask function call.

Studio Run Function widget > Function parameters:

taskSid = {{widgets.createIVRTask.parsed.taskSid}}

## Deployment

Create the Serverless config file by copying `.env.sample` to `.env`.

```bash
cp .env.example .env
```
Edit `.env` and set the `TWILIO_WORKSPACE_SID` variable to your Twilio TaskRouter Workspace Sid. Set `TWILIO_NOBODY_WORKFLOW_SID` to the workflow Sid for the special "Nobody" workflow as outlined in the blog post.

Next, [deploy these functions](https://www.twilio.com/docs/labs/serverless-toolkit/general-usage#deploy-a-project) to your account using:
```
twilio serverless:deploy
```

To debug the [serverless logs](https://www.twilio.com/docs/serverless/api/resource/logs#serverless-toolkit-usage) use:
```
twilio serverless:logs --tail --service-sid=ZSxxx
```