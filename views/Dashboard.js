import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { useNavigation, useFocusEffect, useTheme } from '@react-navigation/native'
import { useEffect, useState, useCallback } from 'react'
import { BACKEND_IP } from '@env'
import { TaskSingle } from './Tasks'
import { GoalSingle } from './Goals'

export default function Dashboard() {
  const navigation = useNavigation()
  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')
  const [tasks, setTasks] = useState([])
  const [goals, setGoals] = useState([])

  useEffect(() => {
    async function getQuote() {
      let response = await fetch('https://zenquotes.io/api/random')
      let data = await response.json()
      setQuote(data[0].q)
      setAuthor(data[0].a)
    }
    getQuote()
  }, [])

  useFocusEffect(
    useCallback(() => {
      async function fetchTasks() {
        let options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
        let today = new Date()
        try {
          console.log('Loading tasks data from server')
          const response = await fetch(`http://${BACKEND_IP}:3000/tasks/date/${today.toDateString()}`, options)
          let data = await response.json()
          setTasks(data.tasks)
        } catch(error) {
          console.error(error)
        }
      }
      async function fetchGoals() {
        let options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
        try {
          console.log('Loading goals data from server')
          const response = await fetch(`http://${BACKEND_IP}:3000/goals/daily`, options)
          let data = await response.json()
          setGoals(data.goals)
        } catch(error) {
          console.error(error)
        }
      }
      fetchTasks()
      fetchGoals()
      return () => {}
    }, [])
  )

  return (
    <View>
      <ScrollView style={{marginTop:50}}>
        <Text variant='displaySmall' style={{margin:15}}>Hi, Milly</Text>
        <Card style={{marginHorizontal:15, marginVertical:7}}>
          <Card.Content>
            <Text variant="bodyMedium">{quote}</Text>
            <Text variant="labelSmall" style={{marginTop:5}}>-{author}</Text>
          </Card.Content>
        </Card>
        {/*<View style={{display:'flex', flexDirection:'row', marginHorizontal:15, marginVertical:7, justifyContent: 'space-between'}}>
          <Card style={{flexBasis:'48%'}}>
            <Card.Title title='Happening Now' titleVariant='labelLarge' />
            <Card.Content>
              <Text variant='headlineMedium'>9:00 am</Text>
              <Text variant='bodyMedium'>Meeting w/ Abigail</Text>
            </Card.Content>
          </Card>
          <Card style={{flexBasis:'48%'}}>
            <Card.Title title='Next Up' titleVariant='labelLarge' />
            <Card.Content>
              <Text variant='headlineMedium'>10:30 am</Text>
              <Text variant='bodyMedium'>CS Class</Text>
            </Card.Content>
          </Card>
        </View> */}
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
        <Card style={{marginHorizontal:15, marginVertical:7}} onPress={() => navigation.navigate('GoalsStack')}>
          <Card.Title title='Daily Goals' titleVariant='labelLarge' />
          <Card.Content>
            {
              goals.map((goal) =>
                <GoalSingle key={goal.id} goal={goal} />
              )
            }
            {/* <List.Item
              title='0/1'
              left={() => <IconButton 
                icon="plus"
                mode="outlined"
                size={10}
                onPress={() => {}}
              />}
              description="30 Minute Walk Daily"
              style={{paddingVertical:0}}
            />
            <List.Item
              title='10/20'
              left={() => <IconButton 
                icon="plus"
                mode="outlined"
                size={10}
                onPress={() => {}}
              />}
              description="Read for 20 minutes"
              style={{paddingVertical:0}}
            />
            <List.Item
              title='3/8'
              left={() => <IconButton 
                icon="plus"
                mode="outlined"
                size={10}
                onPress={() => {}}
              />}
              description="Drink 8 glasses of water"
              style={{paddingVertical:0}}
            /> */}
          </Card.Content>
        </Card>
      </ScrollView>
      <StatusBar style='auto' />
    </View>
  )
}