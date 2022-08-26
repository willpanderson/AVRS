import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MenuItem from '../src/components/MenuItem';
import {fireEvent, render} from '@testing-library/react-native';
// import * as firebase from 'firebase/storage';

describe('Tests for MenuItem component', () => {
  const snack = {
    Name: 'snack',
    Reserved: 2,
    Total: 2,
    image: 'file.png',
  };

  const onSnackPress = jest.fn((name: string) => {
    console.log(name);
  });

  jest.mock('firebase/storage', () => ({
    getStorage: jest.fn(),
    getDownloadURL: jest.fn(),
    ref: jest.fn(),
  }));

  it('Renders correctly', () => {
    const tree = renderer
      .create(<MenuItem snack={snack} onSnackPress={() => onSnackPress} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Click snack to add to cart', () => {
    // jest.spyOn(firebase, 'getDownloadURL').mockImplementation(() => {
    //   return new Promise(() => {
    //     return 'hello';
    //   });
    // });

    const {getByText} = render(
      <MenuItem snack={snack} onSnackPress={onSnackPress} />,
    );

    fireEvent.press(getByText(snack.Name));
    expect(onSnackPress).toBeCalled();
    expect(true).toBe(true);
  });
});
