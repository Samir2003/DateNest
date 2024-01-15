import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import VDataScreen from '../../screens/VDataScreen';

describe('VDataScreen', () => {
  it('renders correctly', () => {
    const route = {
      params: {
        item: {
          date: '2022-03-01'
        }
      }
    };
    const { getByText } = render(<VDataScreen route={route} />);
    expect(getByText('2022-03-01')).toBeTruthy();
  });

  it('navigates to MainScreen on press', () => {
    const route = {
      params: {
        item: {
          date: '2022-03-01'
        }
      }
    };
    const navigation = { navigate: jest.fn() };
    const { getByTestId } = render(<VDataScreen route={route} navigation={navigation} />);
    fireEvent.press(getByTestId('onPress'));
    expect(navigation.navigate).toHaveBeenCalledWith('MainScreen');
  });
});