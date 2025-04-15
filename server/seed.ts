import initializeDatabase from "./db";

const db = initializeDatabase();

// Function for seeding db
function seed() {
  // Clear existing data from db
  db.prepare(`DELETE FROM deals`).run();
  db.prepare(`DELETE FROM accounts`).run();
  db.prepare(`DELETE FROM organizations`).run();
}

seed();
