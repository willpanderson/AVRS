import {jest} from '@jest/globals';
import 'react-native-gesture-handler/jestSetup';
// import './mock-react-native-encrypted-storage';
jest.useFakeTimers();

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-encrypted-storage', () => {
  const Reanimated = require('./mock-react-native-encrypted-storage');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// jest.mock('react-native-vector-icons/Ionicons', () => {
//   const Reanimated = require('react-native-vector-icons/Ionicons');
//   Reanimated.default.call = () => {};
//   return Reanimated;
// });
// jest.mock('react-native-vector-icons/Ionicons');

jest.useFakeTimers();
declare global {
  let __TEST__: any;
}
