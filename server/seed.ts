import initializeDatabase from "./db";
import { faker } from "@faker-js/faker";

// Default values for seeding script **ADJUST AS NEEDED**
const MIN_ORGS = 2;
const MAX_ORGS = 10;

const db = initializeDatabase();

// Function for seeding db
function seed() {
  // Clear existing data from db

  db.prepare(`DELETE FROM deals`).run();
  db.prepare(`DELETE FROM accounts`).run();
  db.prepare(`DELETE FROM organizations`).run();

  // sql statements
  const insertOrg = db.prepare(`INSERT INTO organizations (name) VALUES (?)`);

  const numOrgs = faker.number.int({ min: 2, max: 5 });

  for (let o = 0; o < numOrgs; o++) {
    const orgName = faker.company.name();
    const org = insertOrg.run(orgName);
  }
}

seed();
