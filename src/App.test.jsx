import { render, fireEvent, screen } from '@testing-library/react';

import App from "./App";

describe('rendering App', () => {

  test('renders upload project text', () => {
    render(<App />);
    const element = screen.getByText(/Upload Project/i);
    expect(element).toBeInTheDocument();
  });

});
