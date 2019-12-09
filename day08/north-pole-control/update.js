const client = require('./db.js');

const databaseDefinition = { id: "northpoledb" };
const collectionDefinition = { id: "services" };

const init = async () => {
  const { database } = await client.databases.createIfNotExists(databaseDefinition);
  const { container } = await database.containers.createIfNotExists(collectionDefinition);
  return { database, container };
}

const getServiceChangeValues = (existingService) => {
  let newStatus = (existingService.status);
  let newDesc = "";
  let isChangePositive = true;

  if (existingService.status === "closed") {
    newStatus = "open";
    newDesc = "Service Disruption";
    isChangePositive = false;
  } else if (existingService.status === "open") {
    newStatus = "ongoing";
    newDesc = "Under investigation";
    isChangePositive = false;
  } else if (existingService.status === "ongoing") {
    newStatus = "closed";
    newDesc = "Service Operational";
  }

  return {
    "status": newStatus,
    "description": newDesc,
    "changeDirection": isChangePositive ? '+' : '-'
  };
};

const updateData = async ()  => {

  const { container } = await init();

  console.log('Read data from database.\n\n');
  
  const doc = await container.item('e0eb6e85-176d-4ce6-89ae-1f699aaa0bab');

  const { body: existingService } = await doc.read();

  const updates = getServiceChangeValues(existingService);

  Object.assign(existingService, updates);

  await doc.replace(existingService);

  console.log(`Data updated: ${JSON.stringify(existingService)}`);
};

updateData().catch(err => {
  console.error(err);
});
