import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('Behavior testing', () => {
    render(<App />);

    const display = screen.getByTestId('display');
    const redo = screen.getByTestId('redo');
    const undo = screen.getByTestId('undo');
    const input = screen.getByTestId('input');

    fireEvent.change(input, { target: { value: '#00FF00' } });
    console.log(input.value);
    expect(input.value).toBe('#00ff00');

    fireEvent.click(undo);
    expect(input.value).toBe('#ff0000');

    fireEvent.click(redo);
    expect(input.value).toBe('#00ff00');

  });
});
