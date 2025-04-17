# SponsorCX Fullstack Challenge Documentation

## How to Run the Application

- From the root of the directory run the command `npm i`
- Run `npm run dev` to spin up both the Express server and Vite dev server
- Run `npm run dev:frontend` to spin up only the Vite dev server
- Run `npm run dev:server` to spin up only the Express dev server
- Run `npm run seed` to seed the sqlite db.
  - ⚠️ Running this command will delete any existing data and re-seed the database with new randomized data.
- The seed data is generated using [faker.js](https://fakerjs.dev/), and the configuration can be customized via constants at the top of [server/seed.ts file](server/seed.ts#L7).

## API Endpoints

## Implementation Decisions

## Assumptions Made

## Future Improvements

## Questions and Feedback

## Additional Details

### Database Structure

The SQLite database contains 3 core tables:

---

#### `organizations`

| Column     | Type     | Description                    |
| ---------- | -------- | ------------------------------ |
| id         | INTEGER  | Primary key (auto-incremented) |
| name       | TEXT     | Organization name              |
| created_at | DATETIME | Timestamp                      |
| updated_at | DATETIME | Timestamp                      |

---

#### `accounts`

| Column          | Type     | Description                       |
| --------------- | -------- | --------------------------------- |
| id              | INTEGER  | Primary key (auto-incremented)    |
| name            | TEXT     | Account name                      |
| organization_id | INTEGER  | Foreign key to `organizations.id` |
| created_at      | DATETIME | Timestamp                         |
| updated_at      | DATETIME | Timestamp                         |

---

#### `deals`

| Column     | Type     | Description                                     |
| ---------- | -------- | ----------------------------------------------- |
| id         | INTEGER  | Primary key (auto-incremented)                  |
| name       | TEXT     | Deal name                                       |
| account_id | INTEGER  | Foreign key to `accounts.id`                    |
| start_date | DATE     | Start date of the deal                          |
| end_date   | DATE     | End date of the deal                            |
| value      | REAL     | Monetary value of the deal                      |
| status     | TEXT     | Deal status: `build`, `pitch`, or `negotiation` |
| created_at | DATETIME | Timestamp                                       |
| updated_at | DATETIME | Timestamp                                       |

---

