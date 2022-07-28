## Prerequisites

- A development environment, such as [Visual Studio Code](https://code.visualstudio.com)
- [Node.JS 16+](https://nodejs.org/)

## Developing

Once you've installed dependencies, start a development server:

```bash
npm install
npm run dev
```

This development server can run while you are editing the project; any browser tabs will hot reload with your changes.

### Styles

This project imports [Bootstrap styles](https://getbootstrap.com/docs/5.2/getting-started/introduction/) through [Sass](https://sass-lang.com). These can be used through class names on any HTML element, and Sass utilities can be used by declaring a `<style lang="scss">` in any `.svelte` component.

### Unit tests

Any component can add unit tests by declaring a `(component).test.ts` file adjacent to its location. These are executed with [Vitest](https://vitest.dev/api/), and [svelte-testing-library](https://testing-library.com/docs/svelte-testing-library/api). For other available utilities and test conditions, see the [testing library documentation](https://testing-library.com/docs/).

The `npm test` command can be used to run all tests in the project and print the results.

## Creating a Pull Request

Once you have completed your changes, you can [create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork) to ask for your changes to be merged into this repository.
