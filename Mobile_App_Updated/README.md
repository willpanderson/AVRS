# AVRS Mobile App 2.0
Author: Noah Walker

These are updates to the mobile used in the AVRS project. The original app was my first major project in React Native, so I wanted to redsign it using the techniques I learned.

The major improvements came from using third-party libraries.
- react-navigation
- react-native-vector-icons
- react-native-encrypted-storage
- jest

In addition, due to time contraints, no automated testing was implemented, so adding formal unit testing was another focus of the update.

`Static Analysis`
ESlint was used to format code.
TypeScript was used to provide static type checking.

`Unit Tests`
All components and screens have associated render tests.
Each component has a corresponding test suit with unit tests.

Example:
Clicking + adds one to the count shown on screen.
Input: User clicks +
Output: The count after is greater than the count before