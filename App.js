import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Tasks from './views/Tasks.js';
import Goals from './views/Goals.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Tasks"
            component={Tasks}
          />
          <Stack.Screen
            name="Goals"
            component={Goals}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
