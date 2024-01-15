import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MainScreen from '../../screens/MainScreen';

describe('MainScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<MainScreen />);
    expect(getByText('MainScreen')).toBeTruthy();
  });

  it('calls deleteItem on delete button press', () => {
    const deleteItem = jest.fn();
    const { getByTestId } = render(<MainScreen deleteItem={deleteItem} />);
    fireEvent.press(getByTestId('deleteButton'));
    expect(deleteItem).toHaveBeenCalled();
  });
});