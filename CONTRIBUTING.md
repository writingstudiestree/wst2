## Prerequisites

- A development environment, such as [Visual Studio Code](https://code.visualstudio.com)
- [Node.JS 16+](https://nodejs.org/), a JavaScript runtime framework for scalable network applications
- [Docker](https://www.docker.com/get-started/), a containerizing tool to ensure cross-platform function
- [Docker Compose](https://docs.docker.com/compose/install/), a companion to Docker that manages multi-container configurations. (NB: If you installed the Docker Desktop app, the Docker Compose plugin is already included.)


#### Starting the database server with docker

While any MYSQL-compatible server can be used with this application, as long as it is accessible through the `DATABASE_URL` and is initialized with the correct schema, the way to start it with the fewest steps is to use Docker. The provided Docker container does this by default, using the script in `db/init.sql`.

To test the server with the database in a production-like environment, navigate to the repository and run the following Docker Compose command to start both the SvelteKit app and the database.

```shell
docker-compose up
```

Note that, depending on how you installed Docker and Docker Compose, you may need to have the Docker Desktop application running to enable this command.

If the SvelteKit application is changed, use `docker-compose up --build app` to rebuild the `app` container.

### Storage

The database files will be stored persistently in a [Docker volume](https://docs.docker.com/storage/volumes/). To reset this database, simply stop the application with the `-v` flag to remove the volume, and restart the server:

```shell
docker-compose down -v
docker-compose up -d db
```


### Flexible development

To avoid having to restart when you make changes to the app, you can also use Docker only for the database, and rely on Node.js to hot-reload your changes.

In this case, skip the above steps and run the following commands within the repository folder to start a Sveltekit development server:

```bash
npm install
npm run dev
```

This development server can run while you are editing the project; any browser tabs will hot reload with your changes.

In this case, you will need to manually connect to a separate database server. The database connection URL must be specified in a file called `.env` file, using the `DATABASE_URL=` parameter. By default, that file contains the following:

```shell
DATABASE_URL=mysql://root:abcdefg123@localhost:3306/wst
```

The above URL will work in a local environment, but needs to be changed when SvelteKit runs in a docker container. In production, the password should also be different from what is publicly available in our testing environment.

Once you've confirmed the contents of the `.env` file, to start just the database server, use the below command with [docker-compose](https://docs.docker.com/compose/):

```shell
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


## Creating a Pull Request

Once you have completed your changes, you can [create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork) to ask for your changes to be merged into this repository.
