import initializeDatabase from "./db";
import { faker } from "@faker-js/faker";
import { DealStatus } from "../shared/types";

// Default values for seeding script **ADJUST AS NEEDED**
// organizations
const MIN_ORGS = 2;
const MAX_ORGS = 10;

// accounts
const MIN_ACCOUNTS = 1;
const MAX_ACCOUNTS = 5;

// deals
const MIN_DEALS = 1;
const MAX_DEALS = 3;
const MIN_DEAL_VALUE = 100;
const MAX_DEAL_VALUE = 1000000;

const db = initializeDatabase();

function getRandomStatus(): DealStatus {
  const values = Object.values(DealStatus);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex] as DealStatus;
}

// Function for seeding db
function seed() {
  // Clear existing data
  db.prepare(`DELETE FROM deals`).run();
  db.prepare(`DELETE FROM accounts`).run();
  db.prepare(`DELETE FROM organizations`).run();

  // Reset AUTOINCREMENT counters
  db.prepare(`DELETE FROM sqlite_sequence WHERE name='deals'`).run();
  db.prepare(`DELETE FROM sqlite_sequence WHERE name='accounts'`).run();
  db.prepare(`DELETE FROM sqlite_sequence WHERE name='organizations'`).run();

  // sql statements
  const insertOrg = db.prepare(`INSERT INTO organizations (name) VALUES (?)`);
  const insertAccount = db.prepare(
    `INSERT INTO accounts (name, organization_id) VALUES (?, ?)`
  );
  const insertDeal = db.prepare(
    `INSERT INTO deals (name, account_id, start_date, end_date, value, status) 
     VALUES (?, ?, ?, ?, ?, ?)`
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
      const accountId = account.lastInsertRowid as number;
      const numDeals = faker.number.int({ min: MIN_DEALS, max: MAX_DEALS });
      for (let d = 0; d < numDeals; d++) {
        const start = faker.date.between({
          from: "2022-01-01",
          to: "2025-01-01",
        });
        const end = faker.date.between({ from: start, to: "2026-12-31" });

        insertDeal.run(
          faker.commerce.productName() + " Deal",
          accountId,
          start.toISOString().split("T")[0],
          end.toISOString().split("T")[0],
          faker.number.float({
            min: MIN_DEAL_VALUE,
            max: MAX_DEAL_VALUE,
            multipleOf: 100,
          }),
          getRandomStatus()
        );
      }
    }
  }
}

seed();
