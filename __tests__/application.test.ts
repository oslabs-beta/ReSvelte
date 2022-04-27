import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react'
import '@testing-library/jest-dom'

import App from '../src/App.jsx';


  test('renders upload project text', () => {
  render(<App />)
  const Element = screen.getByText(/Upload Project/i);
  expect(Element).toBeInTheDocument();
})


describe('rendering App' () => {
  
  const {Element} = await screen.getByText(/Upload Project/i);
  
})
expect(Element).toBeInTheDocument();
})


//rendering APP should either show imported components, component tree, and <PerformanceDisplay />, and new project OR please import your project folder below 



function sum(a, b) {
  const array = [1,2,3]
  return a + b;
}

describe('App.jsx', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(4);
  });
});

