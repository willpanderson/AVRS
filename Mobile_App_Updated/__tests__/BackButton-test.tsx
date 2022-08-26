import 'react-native';
import * as React from 'react';
import BackButton from '../src/components/BackButton';
import renderer from 'react-test-renderer';
import {fireEvent, render} from '@testing-library/react-native';

describe('Tests for BackButton component', () => {
  it('Renders correctly', () => {
    const tree = renderer.create(
      <BackButton backPress={() => console.log('hello')} />,
    );
    expect(tree).toMatchSnapshot();
  });

  it('Click button calls passed function', () => {
    const setInputType = jest.fn();
    const {getByText} = render(<BackButton backPress={setInputType} />);

    fireEvent.press(getByText('Back'));
    expect(setInputType).toBeCalled();
  });
});
