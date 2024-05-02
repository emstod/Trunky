import 'expo-dev-client'
import { PaperProvider, Icon, Button, TextInput, MD3LightTheme as DefaultTheme, Text } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import Tasks from './views/Tasks.js'
import TasksDetail from './views/TasksDetail.js'
import TasksEdit from './views/TasksEdit.js'
import Goals from './views/Goals.js'
import GoalsDetail from './views/GoalsDetail.js'
import GoalsEdit from './views/GoalsEdit.js'
import Dashboard from './views/Dashboard.js'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { en, registerTranslation } from 'react-native-paper-dates'
import * as React from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Register translation for date picker
registerTranslation('en', en)

// User context
export const UserContext = React.createContext('')
export const UserNameContext = React.createContext('')

// Username
let userName = ''

// Theme
const trunkyColorScheme = {
  "colors": {
    "primary": "rgb(0, 103, 131)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(177, 208, 217)",
    "primaryTabNavigation": "rgb(127, 177, 191)",
    "onPrimaryContainer": "rgb(0, 31, 42)",
    "secondary": "rgb(77, 97, 107)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(208, 230, 242)",
    "onSecondaryContainer": "rgb(8, 30, 39)",
    "tertiary": "rgb(92, 91, 125)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(226, 223, 255)",
    "onTertiaryContainer": "rgb(25, 24, 54)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(250, 253, 252)",
    "onBackground": "rgb(25, 28, 28)",
    "surface": "rgb(250, 253, 252)",
    "onSurface": "rgb(25, 28, 28)",
    "surfaceVariant": "rgb(235, 240, 241)",
    "onSurfaceVariant": "rgb(63, 72, 73)",
    "outline": "rgb(111, 121, 122)",
    "outlineVariant": "rgb(190, 200, 201)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(45, 49, 49)",
    "inverseOnSurface": "rgb(239, 241, 241)",
    "inversePrimary": "rgb(76, 217, 227)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(238, 246, 245)",
      "level2": "rgb(230, 241, 241)",
      "level3": "rgb(223, 237, 237)",
      "level4": "rgb(220, 235, 235)",
      "level5": "rgb(215, 232, 232)"
    },
    "surfaceDisabled": "rgba(25, 28, 28, 0.12)",
    "onSurfaceDisabled": "rgba(25, 28, 28, 0.38)",
    "backdrop": "rgba(41, 50, 51, 0.4)",
    "goals": "rgb(56, 106, 31)",
    "onGoals": "rgb(255, 255, 255)",
    "goalsContainer": "rgb(190, 200, 180)",
    "goalsTabNavigation": "rgb(140, 158, 122)",
    "onGoalsContainer": "rgb(7, 33, 0)",
    "tasks": "rgb(117, 91, 0)",
    "onTasks": "rgb(255, 255, 255)",
    "tasksContainer": "rgb(210, 193, 170)",
    "tasksTabNavigation": "rgb(178, 149, 110)",
    "onTasksContainer": "rgb(36, 26, 0)"
  }
}
const theme = {
  ...DefaultTheme,
  colors: trunkyColorScheme.colors
}

// Create the auth navigation stack
const AuthStack = createNativeStackNavigator()
function AuthStackScreen() {
  return (
    <AuthStack.Navigator
      initialRouteName='Login'>
        <AuthStack.Screen
          name='Login'
          children={() => <LoginScreen />}
        />
        <AuthStack.Screen
          name='Signup'
          children={() => <SignupScreen />}
        />
    </AuthStack.Navigator>
  )
}

// Create the navigation stacks for each tab as needed
const TasksStack = createNativeStackNavigator()

function TasksStackScreen() {
  return (
    <TasksStack.Navigator 
      initialRouteName='Tasks'
      screenOptions={{headerStyle: {backgroundColor: theme.colors.tasksContainer}}}>
      <TasksStack.Screen
        name='Tasks'
        component={Tasks}
      />
      <TasksStack.Screen
        name='TasksDetail'
        component={TasksDetail}
        options={{title: 'Task Details'}}
        screenOptions={{headerStyle: {backgroundColor: theme.colors.tasksContainer}}}
      />
      <TasksStack.Screen
        name='TasksEdit'
        component={TasksEdit}
        options={{title: 'Edit Task'}}
        screenOptions={{headerStyle: {backgroundColor: theme.colors.tasksContainer}}}
      />
    </TasksStack.Navigator>
  )
}

const GoalsStack = createNativeStackNavigator()

function GoalsStackScreen() {
  return (
    <GoalsStack.Navigator
      initialRouteName='Goals'
      screenOptions={{headerStyle: {backgroundColor: theme.colors.goalsContainer}}}
    >
      <GoalsStack.Screen
        name='Goals'
        component={Goals}
      />
      <GoalsStack.Screen
        name='GoalsDetail'
        component={GoalsDetail}
        options={{title: 'Goal Details'}}
        screenOptions={{headerStyle: {backgroundColor: theme.colors.goalsContainer}}}
      />
      <GoalsStack.Screen
        name='GoalsEdit'
        component={GoalsEdit}
        options={{title: 'Edit Goal'}}
        screenOptions={{headerStyle: {backgroundColor: theme.colors.goalsContainer}}}
      />
    </GoalsStack.Navigator>
  )
}

const DashboardStack = createNativeStackNavigator()
function DashboardStackScreen() {
  return (
    <DashboardStack.Navigator
      initialRouteName='Dashboard'
      screenOptions={{headerStyle: {backgroundColor: theme.colors.primaryContainer}}}
    >
      <DashboardStack.Screen
        name='Dashboard'
        component={Dashboard}
      />
    </DashboardStack.Navigator>
  )
}

// Tab navigation
const Tab = createBottomTabNavigator()

// Signup Screen
export function SignupScreen() {
  const [userContext, setUserContext] = React.useContext(UserContext)
  const [userNameContext, setUserNameContext] = React.useContext(UserNameContext)
  const [username, setUsername] = React.useState('')
  const [password, setPassword]  = React.useState('')

  async function onSignUp() {
    let bodyObject = {
      username: username,
      password: password
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'pending'
      },
      body: JSON.stringify(bodyObject)
    }
    const response = await fetch(`${process.env.EXPO_PUBLIC_DB_URL_TEST}/users`, options)
    // const response = await fetch(`https://trunky.site/users`, options)
    const responseJson = await response.json()
    if (response.status==201) {
      console.log('setting user')
      setUserContext(responseJson.token)
      setUserNameContext(username)
    }
  }

  return (
    <View style={{paddingHorizontal:25, paddingVertical:50}}>
      <TextInput
        label='Username'
        value={username}
        mode='outlined'
        onChangeText={un => setUsername(un)}
        style={{marginVertical:8}}
      />
      <TextInput
        label='Password'
        value={password}
        mode='outlined'
        onChangeText={pw => setPassword(pw)}
        style={{marginVertical:8}}
        secureTextEntry
      />
      
      <Button mode='contained' style={{marginTop:30}} onPress={onSignUp}>Sign up</Button>
    </View>
  )
}

// Login Screen
export function LoginScreen() {
  const navigation = useNavigation()
  const [userContext, setUserContext] = React.useContext(UserContext)
  const [userNameContext, setUserNameContext] = React.useContext(UserNameContext)

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [invalid, setInvalid] = React.useState(false)

  async function onPress() {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'pending'
      }
    }
    const response = await fetch(`${process.env.EXPO_PUBLIC_DB_URL_TEST}/users/${username}/${password}`, options)
    // const response = await fetch(`https://trunky.site/users/${username}`, options)
    const responseJson = await response.json()
    if (responseJson.token) {
      setInvalid(false)
      setUserContext(responseJson.token)
      setUserNameContext(username)
    } else {
      setInvalid(true)
    }
  }

  return (
    <View style={{paddingHorizontal:25, paddingVertical:50}}>
      <TextInput
        label='Username'
        value={username}
        mode='outlined'
        onChangeText={un => setUsername(un)}
        style={{marginVertical:8}}
      />
      <TextInput
        label='Password'
        value={password}
        mode='outlined'
        onChangeText={pw => setPassword(pw)}
        style={{marginVertical:8}}
        secureTextEntry
      />
      <Text variant='labelLarge' style={{color:theme.colors.error}}>{invalid ? 'Invalid username or password' : ''}</Text>
      <Button mode='contained' style={{marginTop:30}} onPress={onPress}>Log in</Button>
      <Button mode='outlined' style={{marginTop:10}} onPress={() => navigation.navigate('Signup')}>Sign up</Button>
    </View>
  )
}

export default function App() {
  const [userContext, setUserContext] = React.useState('')
  const [userNameContext, setUserNameContext] = React.useState('')

  return (
    <PaperProvider theme={theme}>
      <UserNameContext.Provider value={[userContext, setUserContext]}>
        <UserContext.Provider value={[userNameContext, setUserNameContext]}>
          <NavigationContainer>
            {userContext ? (
              <Tab.Navigator
              initialRouteName='DashboardStack'
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName

                  switch (route.name) {
                    case 'DashboardStack':
                      iconName = 'home'
                      break
                    case 'TasksStack':
                      iconName='format-list-checks'
                      break
                    case 'GoalsStack':
                      iconName='bullseye-arrow'
                      break
                  }

                  return <Icon source={iconName} color={color} size={size} />
                }
              })}
            >
              <Tab.Screen 
                name="DashboardStack"
                component={DashboardStackScreen}
                options={{headerShown:false, title: 'Dashboard', tabBarActiveTintColor: theme.colors.primaryTabNavigation}}
              />
              <Tab.Screen
                name="TasksStack"
                component={TasksStackScreen}
                options={{headerShown:false, title: 'Tasks', tabBarActiveTintColor: theme.colors.tasksTabNavigation}}
              />
              <Tab.Screen
                name="GoalsStack"
                component={GoalsStackScreen}
                options={{headerShown:false, title: 'Goals', tabBarActiveTintColor: theme.colors.goalsTabNavigation}}
              />
            </Tab.Navigator>
            ) : (
              <AuthStackScreen />
            )}
            
          </NavigationContainer>
        </UserContext.Provider>
      </UserNameContext.Provider>
    </PaperProvider>
  )
}
