const { Client, logger } = require('camunda-external-task-client-js');
const { Variables } = require("camunda-external-task-client-js");
const open = require('open');

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
//  - 'asyncResponseTimeout': long polling timeout (then a new request will be issued)
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'charge-card'
client.subscribe('select-patient-id', async function({ task, taskService }) {
  // Put your business logic here

  // Get a process variable
  const pid = 2;
  var processVariables = new Variables();
  processVariables.set('pid', pid);

  console.log(`Select a patient with a pid of ${pid}..`);

  // Complete the task
  await taskService.complete(task, processVariables);
});
