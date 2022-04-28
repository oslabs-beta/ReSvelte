import App from '../src/extension.ts';
import React from 'React';
import { render, screen, waitFor } from '@testing-library/react';
// import vscode from '../src/extension.ts';

describe('unit test for components', () => {
    let state;

    beforeEach(() => {
        let text;
        const props = {
          label: 'Svelte',
          text: 'Components',
        };
    
        beforeAll(() => {
          text = render(<LabeledText {...props} />);
        });
    
        test('Renders the passed-in text with the label', () => {
          expect(text.getByText("Svelte:").nextSibling).toHaveTextContent('Components');
        });
  
      });
      });
