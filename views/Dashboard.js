import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Card, Text, Button } from 'react-native-paper'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { useEffect, useState, useCallback, useContext } from 'react'
import { TaskSingle } from './Tasks'
import { GoalSingle } from './Goals'
import { UserContext } from '../App'
import { UserNameContext } from '../App'

export default function Dashboard() {
  const [userContext, setUserContext] = useContext(UserContext)
  const [userNameContext, setUserNameContext] = useContext(UserNameContext)
  const navigation = useNavigation()
  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')
  const [tasks, setTasks] = useState([])
  const [goals, setGoals] = useState([])

  // Get a random quote from an API
  useEffect(() => {
    async function getQuote() {
      let response = await fetch('https://zenquotes.io/api/random')
      let data = await response.json()
      setQuote(data[0].q)
      setAuthor(data[0].a)
    }
    getQuote()
  }, [])

  // Fetch the tasks and goals when the page is focused
  useFocusEffect(
    useCallback(() => {
      // Fetch today's tasks
      async function fetchTasks() {
        let options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': userContext
          }
        }
        let today = new Date()
        try {
          const response = await fetch(`http://192.168.20.77:3000/tasks?listtype=none&date=${today.toDateString()}&user=${userContext}`, options)
          let data = await response.json()
          setTasks(data.tasks)
        } catch(error) {
          console.error(error)
        }
      }
      
      // Fetch all daily goals
      async function fetchGoals() {
        let options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': userContext
          }
        }
        try {
          const response = await fetch(`http://192.168.20.77:3000/goals?listtype=none&frequency=daily`, options)
          let data = await response.json()
          setGoals(data)
        } catch(error) {
          console.error(error)
        }
      }
      
      // Call the two fetch functions
      fetchTasks()
      fetchGoals()
      return () => {}
    }, [])
  )

  return (
    <View>
      <ScrollView>
        <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginLeft:15, marginTop:30, marginBottom:15}}>
          <Text variant="displaySmall">Hi, {userNameContext}</Text>
          <Button
            mode='contained-tonal'
            icon=''
            style={{marginBottom:10, marginHorizontal:15}}
            onPress={() => {
              setGoals([])
              setTasks([])
              setUserNameContext('')
              setUserContext('')
            }}
          >
            Log Out
          </Button>
        </View>
        <Card style={{marginHorizontal:15, marginVertical:7}}>
          <Card.Content>
            <Text variant="bodyMedium">{quote}</Text>
            <Text variant="labelSmall" style={{marginTop:5}}>-{author}</Text>
          </Card.Content>
        </Card>
        <Card style={{marginHorizontal:15, marginVertical:7}} onPress={() => navigation.navigate('TasksStack')}>
          <Card.Title title='Today&apos;s To Do' titleVariant='labelLarge' />
          <Card.Content>
            {
              tasks.map((task) =>
                <TaskSingle key={task.id} task={task} categoryMode={false} />
              )
            }
          </Card.Content>
        </Card>
        <Card style={{marginHorizontal:15, marginTop:7, marginBottom:20}} onPress={() => navigation.navigate('GoalsStack')}>
          <Card.Title title='Daily Goals' titleVariant='labelLarge' />
          <Card.Content>
            {
              goals.map((goal) =>
                <GoalSingle key={goal.id} goal={goal} />
              )
            }
          </Card.Content>
        </Card>
      </ScrollView>
      <StatusBar style='auto' />
    </View>
  )
}