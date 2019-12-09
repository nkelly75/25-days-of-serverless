const client = require('./db.js');

const databaseDefinition = { id: "northpoledb" };
const collectionDefinition = { id: "services" };

const setupAndSeedDatabase = async ()  => {

  const { database: db } = await client.databases.create(databaseDefinition);
  console.log('Database created.');

  const { container } = await db.containers.create(collectionDefinition);
  console.log('Collection created.');

  await container.items.create({
    "id": "e0eb6e85-176d-4ce6-89ae-1f699aaa0bab",
    "service": "Letter Processing",
    "status": "closed",
    "description": "Service Operational",
    "changeDirection": "+"
  });

  await container.items.create({
    "id": "ebe2e863-bf84-439a-89f8-39975e7d6766",
    "service": "Sleigh Readiness",
    "status": "closed",
    "description": "Service Operational",
    "changeDirection": "+"
  });

  await container.items.create({
    "id": "80bc1751-3831-4749-99ea-5c6a63105ae7",
    "service": "Reindeer Health",
    "status": "closed",
    "description": "Service Operational",
    "changeDirection": "+"
  });

  console.log('Seed data added.');
};

setupAndSeedDatabase().catch(err => {
  console.error('Error setting up database:', err);
});
