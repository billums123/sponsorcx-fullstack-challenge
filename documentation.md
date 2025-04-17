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

### API Endpoints

#### `GET /api/organizations`

Returns a list of all organizations.

**Response Example:**

```json
[
  {
    "id": 1,
    "name": "Acme Corp",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Globex Inc.",
    "created_at": "2024-01-02T00:00:00.000Z",
    "updated_at": "2024-01-02T00:00:00.000Z"
  }
]
```

---

### `GET /api/organizations/:organizationId/deals`

Returns all deals for a specific organization. Supports optional filtering by deal status and start year.

**Query Parameters:**

| Name   | Type   | Required | Description                                               |
| ------ | ------ | -------- | --------------------------------------------------------- |
| status | string | No       | Filter by deal status: `build`, `pitch`, or `negotiation` |
| year   | string | No       | Filter by start year (e.g., `2024`)                       |

**Example Request:**
GET /api/organizations/1/deals?status=build&year=2024

**Response Example:**

```json
{
  "deals": [
    {
      "id": 101,
      "name": "Summer Sponsorship",
      "account_id": 10,
      "account_name": "Nike",
      "start_date": "2024-05-01",
      "end_date": "2024-09-30",
      "value": 150000,
      "status": "build",
      "created_at": "2024-04-01T12:00:00.000Z",
      "updated_at": "2024-04-01T12:00:00.000Z"
    }
  ]
}
```
