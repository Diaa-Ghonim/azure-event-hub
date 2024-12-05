const { EventHubProducerClient } = require("@azure/event-hubs");
const { DefaultAzureCredential } = require("@azure/identity");

// Event hubs 
const eventHubsResourceName = "diaaeventtest";
const fullyQualifiedNamespace = `${eventHubsResourceName}.servicebus.windows.net`; 
const eventHubName = "createevent";

// Azure Identity - passwordless authentication
const credential = new DefaultAzureCredential();

async function main() {

  // Create a producer client to send messages to the event hub.
  const producer = new EventHubProducerClient(fullyQualifiedNamespace, eventHubName, credential);

  // Prepare a batch of three events.
  const batch = await producer.createBatch();
  batch.tryAdd({body: { message: "passwordless First event", id: "amazon.com" }});
  batch.tryAdd({body: { message: "passwordless Second event", id: "walmart.com" }});
  batch.tryAdd({body: { message: "passwordless Third event", id: "dell.com" }});    
  batch.tryAdd({body: { message: "diaa  1 event", id: "dell.com" }});    
  batch.tryAdd({body: { message: "diaa 2 event", id: "masraway.com" }});    
  batch.tryAdd({body: { message: "diaa 3 event", id: "alibaba.com" }});    
  batch.tryAdd({body: { message: "the last event in this batch" , id: "magneto.com"}});    


  // Send the batch to the event hub.
  await producer.sendBatch(batch);

  // Close the producer client.
  await producer.close();

  console.log("A batch of three events have been sent to the event hub");
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});