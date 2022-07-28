/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import Index from './index.svelte';

/**
 * This is an example test that only checks if
 * the document renders.
 */
describe('Index', () => {
  test('should render the component', () => {
    const { container } = render(Index);

    expect(container).toBeInTheDocument();
  });
});
