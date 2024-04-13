import { PaperProvider, Icon, useTheme } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import Tasks from './views/Tasks.js'
import TasksCategory from './views/TasksCategory.js'
import TasksDetail from './views/TasksDetail.js'
import TasksEdit from './views/TasksEdit.js'
import Goals from './views/Goals.js'
import Dashboard from './views/Dashboard.js'
import Schedule from './views/Schedule.js'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { en, registerTranslation } from 'react-native-paper-dates'

// Register translation for date picker
registerTranslation('en', en)

// Create the navigation stacks for each tab as needed
const TasksStack = createNativeStackNavigator()

function TasksStackScreen() {
  return (
    <TasksStack.Navigator initialRouteName='Tasks'>
      <TasksStack.Screen
        name='Tasks'
        component={Tasks}
      />
      <TasksStack.Screen
        name='TasksDetail'
        component={TasksDetail}
        options={{headerShown:false}}
      />
      <TasksStack.Screen
        name='TasksCategory'
        component={TasksCategory}
        options={{title:'School'}}
      />
      <TasksStack.Screen
        name='TasksEdit'
        component={TasksEdit}
        options={{headerShown:false}}
      />
    </TasksStack.Navigator>
  )
}



const Tab = createBottomTabNavigator()

export default function App() {
  const theme = useTheme()
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='Dashboard'
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName

              switch (route.name) {
                case 'Dashboard':
                  iconName = 'home'
                  break
                case 'Schedule':
                  iconName='calendar-blank'
                  break
                case 'TasksStack':
                  iconName='format-list-checks'
                  break
                case 'Goals':
                  iconName='bullseye-arrow'
                  break
              }

              return <Icon source={iconName} color={color} size={size} />
            },
            tabBarActiveTintColor: theme.colors.primary
          })}
        >
          <Tab.Screen 
            name="Dashboard"
            component={Dashboard}
            options={{headerShown:false}}
          />
          <Tab.Screen
            name="Schedule"
            component={Schedule}
          />
          <Tab.Screen
            name="TasksStack"
            component={TasksStackScreen}
            options={{headerShown:false, title: 'Tasks'}}
          />
          <Tab.Screen
            name="Goals"
            component={Goals}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
