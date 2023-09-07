exports.handler = async function (context, event, callback) {
  const client = context.getTwilioClient();
  const from_number = event.from;
  const timestamp = new Date();
  
  let conversations = {};
  conversations.conversation_id = event.callSid;
  conversations.virtual = "Yes";
  conversations.abandoned = "Yes";
  conversations.abandoned_phase = "IVR";
  conversations.channel = "IVR";
  conversations.IVR_time_start = timestamp.getTime();
  try {
  const task = await client.taskrouter.v1.workspaces(context.TWILIO_WORKSPACE_SID)
    .tasks.create({
      attributes: JSON.stringify({ "from": from_number, conversations }),
      workflowSid: context.TWILIO_NOBODY_WORKFLOW_SID,
      timeout: 300
    });
    console.log('createIVRTask:', task);
    const result = { taskSid: task.sid };
    return callback(null, result);
  } catch (error) {
    return callback(error);
  }
}