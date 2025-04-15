import initializeDatabase from "./db";
import { faker } from "@faker-js/faker";

// Default values for seeding script **ADJUST AS NEEDED**
// organizations
const MIN_ORGS = 2;
const MAX_ORGS = 10;

// accounts
const MIN_ACCOUNTS = 1;
const MAX_ACCOUNTS = 5;

const db = initializeDatabase();

// Function for seeding db
function seed() {
  // Clear existing data from db

  db.prepare(`DELETE FROM deals`).run();
  db.prepare(`DELETE FROM accounts`).run();
  db.prepare(`DELETE FROM organizations`).run();

  // sql statements
  const insertOrg = db.prepare(`INSERT INTO organizations (name) VALUES (?)`);
  const insertAccount = db.prepare(
    `INSERT INTO accounts (name, organization_id) VALUES (?, ?)`
  );

  const numOrgs = faker.number.int({ min: MIN_ORGS, max: MAX_ORGS });

  for (let o = 0; o < numOrgs; o++) {
    const orgName = faker.company.name();
    const org = insertOrg.run(orgName);
    const orgId = org.lastInsertRowid as number;

    const numAccounts = faker.number.int({
      min: MIN_ACCOUNTS,
      max: MAX_ACCOUNTS,
    });
    for (let a = 0; a < numAccounts; a++) {
      const accountName = faker.company.name();
      const account = insertAccount.run(accountName, orgId);
    }
  }
}

seed();
