## Prerequisites

- A development environment, such as [Visual Studio Code](https://code.visualstudio.com)
- [Node.JS 16+](https://nodejs.org/)
- [Docker](https://www.docker.com/get-started/)
- [Docker Compose](https://docs.docker.com/compose/install/)


"Node" and "NPM" (the Node Package Manager) are tools for building JavaScript applications; [SvelteKit](https://kit.svelte.dev) is a front-end framework that runs on Node. *The article ["WebDev 101: How to use npm and Yarn"](https://unicorn-utterances.com/posts/how-to-use-npm) might be useful as an introduction to this tooling.*

Docker allows us to "containerize" and run our application as if it were being hosted in its production environment. We have provided a [docker-compose.yml](./docker-compose.yml) configuration in this repository for hosting both the MySQL "db" server and the SvelteKit "app" server.

> **Note**: On most systems, it is recommended to install [Docker Desktop](https://www.docker.com/products/docker-desktop/), which includes both "Docker" and "Docker Compose".

## Developing

1. First, [clone the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) from GitHub, and open the root folder:

	```bash
	# Clone the git repository
	git clone https://github.com/writingstudiestree/wst2
  
	# Change Directory into the cloned folder
	cd wst2
	```

2. To start the database server with the provided `docker-compose` configuration, run the following command in the cloned repo:

	```bash
	# Start the "wst2-db" container
	docker-compose up -d db
	```

3. Use NPM to install the SvelteKit application's dependencies and start a development server:

	```bash
	# Installs dependencies
	npm install
  
	# Runs a SvelteKit development server
	npm run dev
	```

	This will host the website on `localhost`, which you can open in a local browser: see the address ouput by the final command above. You can keep this site running while you are editing the project; any browser tabs will "hot reload" with your changes when you save them.

Once you have completed your changes, you can [create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork) to ask for your changes to be merged into this repository.

### Declaring styles

This project imports [Bootstrap styles](https://getbootstrap.com/docs/5.2/getting-started/introduction/) through [Sass](https://sass-lang.com). These can be used through class names on any HTML element, and Sass utilities can be used by declaring a `<style lang="scss">` in any `.svelte` component.

### Writing unit tests

Any component can add unit tests by declaring a `(component).test.ts` file adjacent to its location. These are executed with [Vitest](https://vitest.dev/api/), and [svelte-testing-library](https://testing-library.com/docs/svelte-testing-library/api). For other available utilities and test conditions, see the [testing library documentation](https://testing-library.com/docs/).

See [src/routes/index.test.ts](./src/routes/index.test.ts) for an example test that runs on the site's homepage.

The `npm test` command can be used to run all tests in the project and print the results.


## Database Management

The database files will be stored persistently in a [Docker volume](https://docs.docker.com/storage/volumes/). To reset this database, simply stop the application with the `-v` flag to remove the volume, and restart the server:

```shell
# Stop the docker container(s) and remove the volume
docker-compose down -v

# Re-start the database container (re-creating an empty volume)
docker-compose up -d db
```

> **Warning**: This will permanently erase any data in your local `wst2-db` server!

### Editing the database schema

To make changes to the database schema, edit the entries in `db/init.sql`.

The data types used in the database API are generated using [mysql-schema-ts](https://www.npmjs.com/package/mysql-schema-ts). **While the database is running,** the `npm run build:types` command can be used to re-generate these TypeScript definitions from the SQL schema. These generated types are stored in `src/api/types.ts`.


### Using a different MySQL server

By default, the application is configured to use the database server provided through `docker-compose`. However, it can be configured to use a different server by changing its `DATABASE_URL`.

- Ensure that your MySQL server has the correct schema defined in [db/init.sql](./db/init.sql)
- Copy the [`.env.example`](./.env.example) file to a new file named `.env`
- Change the URL after `DATABASE_URL=` to point to your MySQL server
- Restart the application server using `npm run dev`

The database connection URL must be specified in a `.env` file under the `DATABASE_URL=` parameter.


## Running the full Docker configuration

To test the server with the database in a production environment, `docker-compose up` can be used to start both the SvelteKit app and the database. This will host the SvelteKit site at `http://localhost:3000`.

If the SvelteKit application is changed, use `docker-compose up --build app` to rebuild the `app` container.
