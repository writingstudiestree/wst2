## Prerequisites

- A development environment, such as [Visual Studio Code](https://code.visualstudio.com)
- [Node.JS 16+](https://nodejs.org/)
- [Docker](https://www.docker.com/get-started/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Developing

Once you've installed dependencies, start a development server:

```bash
npm install
npm run dev
```

This development server can run while you are editing the project; any browser tabs will hot reload with your changes.

### Database

The database connection URL must be specified in a `.env` file under the `DATABASE_URL=` parameter.

```shell
DATABASE_URL=mysql://root:abcdefg123@localhost:3306/wst
```

The above URL will work in a local environment, but needs to be changed when SvelteKit runs in a docker container. In production, the password should also be different from what is publicly available in our testing environment.

#### Starting the database server with docker

Any MYSQL-compatible server can be used with this application, as long as it is accessible through the `DATABASE_URL` and is initialized with the correct schema. The provided Docker container does this by default, using the script in `db/init.sql`.

To start this server, use the below command with [docker-compose](https://docs.docker.com/compose/):

```shell
docker-compose up -d db
```

The database files will be stored persistently in `db/app`. To reset this database, simply stop the application, delete the folder, and restart the server:

```shell
docker-compose down
rm -rf db/app
docker-compose up -d db
```

#### Editing the database schema

To make changes to the database schema, edit the entries in `db/init.sql`.

The data types used in the database API are generated using [mysql-schema-ts](https://www.npmjs.com/package/mysql-schema-ts). **While the database is running,** the `npm run build:types` command can be used to re-generate these TypeScript definitions from the SQL schema. These generated types are stored in `src/api/types.ts`.

### Styles

This project imports [Bootstrap styles](https://getbootstrap.com/docs/5.2/getting-started/introduction/) through [Sass](https://sass-lang.com). These can be used through class names on any HTML element, and Sass utilities can be used by declaring a `<style lang="scss">` in any `.svelte` component.

### Unit tests

Any component can add unit tests by declaring a `(component).test.ts` file adjacent to its location. These are executed with [Vitest](https://vitest.dev/api/), and [svelte-testing-library](https://testing-library.com/docs/svelte-testing-library/api). For other available utilities and test conditions, see the [testing library documentation](https://testing-library.com/docs/).

The `npm test` command can be used to run all tests in the project and print the results.

### Docker

To test the server with the database in a production environment, `docker-compose up` can be used to start both the SvelteKit app and the database.

If the SvelteKit application is changed, use `docker-compose up --build` to rebuild the `app` container.

## Creating a Pull Request

Once you have completed your changes, you can [create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork) to ask for your changes to be merged into this repository.
