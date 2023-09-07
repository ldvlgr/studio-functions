exports.handler = async function (context, event, callback) {
  const client = context.getTwilioClient();
  console.log('updateIVRTask event:', event);
  const { callStatus, digits, taskSid } = event;
  const IVR_end = new Date();

  const task = await client.taskrouter.v1.workspaces(context.TWILIO_WORKSPACE_SID)
    .tasks(taskSid)
    .fetch();
  console.log('updateIVRTask:', task);
  let attributes = { ...JSON.parse(task.attributes) };
  let IVR_time = Math.round((IVR_end - attributes.conversations.IVR_time_start) / 1000);

  attributes.conversations.queue_time = 0;
  attributes.conversations.ivr_path = digits;
  attributes.conversations.ivr_time = IVR_time;

  //was the call abandoned?
  if (callStatus == "completed") {
    attributes.conversations.abandoned = "Yes";
    attributes.conversations.abandoned_phase = "IVR";
  } else {
    attributes.conversations.abandoned = "No";
    attributes.conversations.abandoned_phase = null;
  }

  //update the task
  try {
    const task = await client.taskrouter.v1.workspaces(context.TWILIO_WORKSPACE_SID)
      .tasks(taskSid)
      .update({
        assignmentStatus: 'canceled',
        reason: 'IVR task',
        attributes: JSON.stringify(attributes)
      });
    const result = { taskSid: task.sid };
    return callback(null, result);
  }
  catch (error) {
    console.log(error);
    return callback(error);
  };

}