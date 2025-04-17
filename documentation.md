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
