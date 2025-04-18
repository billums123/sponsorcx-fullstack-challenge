# SponsorCX Fullstack Challenge Documentation

## Thank You!

I had a great time working through this take-home — it was super fun to build, and I appreciated the balance of backend and frontend work. Thanks again for putting together such a thoughtful challenge!

I'm really looking forward to connecting with the team and hearing your thoughts. If there’s anything you’d like me to walk through or expand on, I’m always happy to dive deeper.

— Tanner  
📞 801-641-2708  
✉️ tannerhesterman@gmail.com

## How to Run the Application

- From the root of the project, run npm install to install all dependencies (frontend, backend, and root)
- Run `npm run dev` to spin up both the Express server and Vite dev server
- Run `npm run dev:frontend` to spin up only the Vite dev server
- Run `npm run dev:server` to spin up only the Express dev server
- Run `npm run seed` to seed the sqlite db.
  - ⚠️ Running this command will delete any existing data and re-seed the database with new randomized data.
- The seed data is generated using [faker.js](https://fakerjs.dev/), and the configuration can be customized via constants at the top of [server/seed.ts file](server/seed.ts#L7).

## Implementation Decisions

- Database
  - Updated the data models for both the `accounts` and `deals` tables, and implemented a flexible seeding script.
  - I originally considered using a static dataset but switched to [faker.js](https://fakerjs.dev/) so I could easily control the volume of data and increase the likelihood of surfacing edge cases through randomized inputs.
  - This was also my first time working with SQLite — it ended up being a great opportunity to get more comfortable with it.
- Server
  - Structured the Express server using separate routers and controllers for `organizations` and `deals`.
  - While this level of separation might be more than necessary for a project of this size, I wanted to demonstrate my inclination toward organizing server-side code in a scalable, maintainable way — even for small apps.
  - I structured the endpoints to reflect the natural relationship between resources — for example, deals are scoped under organizations (`/api/organizations/:organizationId/deals`). This follows REST conventions around resource nesting, makes the API more intuitive, and makes it easier to scope future endpoints by organization.
  - Used Postman for rapid testing of API endpoints during development
- Frontend
  - Added support for selecting different organizations — it felt like a natural UX improvement and gave the app more of an "admin view" feel, where a SponsorCX team member could explore accounts and deals scoped to any organization.
  - Used a modular file structure to separate concerns (e.g., components, hooks, api, pages).
  - Utilized [MUI's](https://mui.com/material-ui/getting-started/) component library to speed up UI construction (simplify styling, theming, etc.)
  - Built a custom useFetch hook to standardize data fetching across the app. It was probably overkill for just two requests 🙃, but I wanted to demonstrate how custom hooks can improve structure and reusability — especially as the app scales and more endpoints are added.
- Created a shared `types.ts` file to maintain strong type safety between the frontend and backend.

## Assumptions Made

- All deals belong to an account, and all accounts belong to a single organization
- There are only 3 different states that a deal can be in (I struggled with deciding on this at first, but decided to just use what was shown in the example image): `build`, `pitch`, or `negotiation`.
- Each deal always has a start and end date (and start will be before end date)
- Filtering by status or year is optional, if no filtering options are provided, all returns are made
- Filtering by year uses the startingDate for the deal to determine if should be included or not

## Future Improvements

- Add pagination support on both the backend and frontend to improve UI performance with large datasets and not overwork the server
- Add authentication and authorization for multi-user support.
- Add unit tests and integration, and e2e testing as the project scales.
- Extend filtering sorting support:
  - Filtering by a range of dates rather than just a single year.
  - Filter by value
  - Filter by Account
- Add indexing to SQLite db to optimize queries
- If moving to more of production environment, migrate from SQLite to Postgres to better support concurrent access and overall scalability.
- For deployment, I’d consider using Terraform in a CI/CD pipeline to provision infrastructure and automate deployment on AWS or another cloud platform.

## Questions and Feedback

Thanks for taking the time to review my project, I really enjoyed making it! I would love to chat more about it if you have any questions/comments!

## Additional Details

### Frontend Structure

- [pages/DealsPage.tsx](frontend/src/pages/DealsPage.tsx): Main page where organizations are selected and deals are displayed.
- [components/OrganizationSelect.tsx](frontend/src/components/OrganizationSelect.tsx): Dropdown for switching orgs.
- [components/DealsFilter.tsx](frontend/src/components/DealsFilter.tsx): Filter popup for year/status.
- [hooks/useFetch.ts](frontend/src/hooks/useFetch.ts): Shared custom hook to manage fetch, loading, and error state.
- [api/](frontend/src/api/): Contains fetch helpers for `organizations` and `deals`.

### Backend Structure

- [index.ts](server/index.ts): Main entry point of the Express server.
- [controllers/](server/controllers/): Contains logic for handling incoming HTTP requests.
  - [dealsController.ts](server/controllers/dealsController.ts): Fetches and filters deals scoped to a specific organization.
  - [organizationsController.ts](server/controllers/organizationsController.ts): Returns a list of all organizations.
- [routes/](server/routes/): Defines the server's route structure and connects routes to controllers.
  - [dealsRouter.ts](server/routes/dealsRouter.ts): Handles `/api/organizations/:id/deals` endpoint.
  - [organizationsRouter.ts](server/routes/organizationsRouter.ts): Handles `/api/organizations` endpoint.
- [db.ts](server/db.ts): Initializes the SQLite database and defines the schema for organizations, accounts, and deals.
- [seed.ts](server/seed.ts): Clears and repopulates the database using randomized data generated with `faker.js`.

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

## Acknowledgments

I used ChatGPT during this challenge to help brainstorm solutions, improve my documentation, and clarify technical decisions. It was good as a sounding board, but every implementation decision and line of code was written and reviewed by me.
