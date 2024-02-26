# Sample App

Sample application that demonstrates a simple monorepo with:

- [Express.js API](https://expressjs.com/)
  - [Prisma ORM](https://www.prisma.io/docs/orm)
- [Vue UI](https://vuejs.org/)
- [Docker](https://docs.docker.com/get-started/overview/)

This application is not representative of a real production application attempt, rather it is intended to simply demonstrate the bare minimum required to use the UI to create new data and read data from the API to render in the UI.

Further refinement is required for this to model something that could be leveraged as a template for a production-ready application.

## Requirements

You will need to install:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (no account needed, yet)

It is also recommended to install:

- [nvm](https://github.com/nvm-sh/nvm) - similar to tooling for Ruby and Python, this allows you to install and manage multiple versions of Node independently
- Your IDE of Choice, such as [VSCode](https://code.visualstudio.com/)
- If developing on a Windows PC, consider [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)
  - If you install this after Docker Desktop, you may need to perform additional steps to configure Docker to work correctly with WSL.

## Development

You will want to set up an `.env` file in `packages/api/` with the value `DATABASE_URL="postgresql://<DB_USER>:<DB_PASSWORD>@<LOCALHOST_OR_CONTAINER_NAME>:5432/<DB_NAME>?schema=core"` for local development. This will be read by `prisma` if you run commands manually in your terminal.

### With Docker

You can begin developing by using Docker Compose to launch `api`, `ui`, and `postgres` containers. Simply run `docker compose up -d postgres` to run the database. You will need to follow this up with `docker compose watch` which will set up the `api` and `ui` containers in watch mode, which means that changes to files in `packages/api/src` and `packages/ui/src` respectively will be watched and synced with your running containers, allowing them to hot reload as changes are made.

Database migrations will run automatically as part start process for the `api` container.

### Without Docker

You will need to have Node installed in order to do local devleopment. The easiest way is to install `nvm` above and use `nvm` to install a recent version nof Node, for example Node v20. You will also want to make sure that you spin up the database container `postgres` by running `docker compose up -d postgres` which will launch the container in the background.

- With Node already installed, run `npm install`, which will install dependencies for the project.
- To run the API, you can run `npm run api:dev` from the project root. This will start up the API server with hot reloads on `http://localhost:3000`
- To run the UI, you can run `npm run ui:dev` from the project root. This will start up the UI server with hot reloads on `http://localhost:3007`

It is recommended to launch these in separate terminals if you plan to run both at the same time.

You can also set these up in VSCode to run as launch configurations in case you'd like to attach a debugger to the process. It may be more difficult as these both run using TS
directly, but you should be able to modify the `tsconfig.json` in the appropriate `packages/api` or `packages/ui` location to include the following property: `"sourceMap": true` which should allow it to properly attach to the code.

You will need to run migrations manually for the API by running `npx prisma migrate deploy`.

## Adding Migrations

You will need to have a database running to do this. You can simply run `docker compose up -d postgres` to run only the postgres DB container.

To add new migrations, modify the `schema.prisma` file with any additions or removals as desired. New tables can be added by creating a new `model` in this file. You can also add or remove fields from existing models.

To create the next migration file, navigate to the `packages/api` directory and run `npx prisma migrate dev --name <name_of_migration>`.

See [their documentation](https://www.prisma.io/docs/orm/prisma-migrate/getting-started) for more information.

## Starting Application

You can start the application by running `docker compose up -d` which will spin up the Docker containers for the Database, the API, and the UI. It _should_ wait to start the API until the Database has finished starting, but in case it does not, simply restart the API container.

Database migrations will be run automatically as part of the `docker compose up` command for the API container.

If you'd like to be able to make code changes while the containers are running without being forced to rebuild them, you can use `docker compose watch`, which will restart the containers and watch for changes to files in `packages/api/src` for the API, and `packages/ui/src` for the UI.

You should be able to navigate to `http://localhost:3007`. You should see a button to click that will create a default entry in the `Convention` table. In addition, the UI should render the data that was saved to the database. Clicking the button again will add another entry, and so on.
