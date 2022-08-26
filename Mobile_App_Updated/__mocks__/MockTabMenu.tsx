import React, {ComponentType} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

interface propType {
  component: ComponentType<any>;
}

const MockTabMenu: React.FC<propType> = ({component}) => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="screen"
          component={component}
          options={{
            headerShown: true,
            title: 'Snacks',
            headerStyle: {backgroundColor: '#EFF1F7'},
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 'bold',
            },
            headerTitleAlign: 'left',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MockTabMenu;
