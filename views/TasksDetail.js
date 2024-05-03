import { useState, useEffect, useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Text, Divider, IconButton, useTheme, Portal, Modal, Card, Button, Surface, Chip, Checkbox } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../App'

export default function TasksDetail({ route }) {
  const navigation = useNavigation()
  const taskId = route.params.taskId
  const taskDate = route.params.taskDate
  const theme = useTheme()
  const [taskDetails, setTaskDetails] = useState({})
  const [userContext, setUserContext] = useContext(UserContext)
  const [recurStr, setRecurStr] = useState('')

  // Get the task details from the data source
  useEffect(() => {
    async function getTaskSingle() {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': userContext
        }
      }
      try {
        let response = await fetch(`http://192.168.20.77:3000/tasks/${taskId}/${taskDate}`, options)
        let jsonResponse = await response.json()
        setTaskDetails(jsonResponse.task)
        setCompleted(jsonResponse.task.completed)

        // Set a string to show when the task recurs
        let recur = jsonResponse.task.recur
        let newRecurStr = 'Repeats '
        for (let day in recur) {
          if (recur[day]) newRecurStr += `${day}, `
        }
        if (newRecurStr.length > 8) setRecurStr(newRecurStr.substring(0, newRecurStr.length - 2))
        else setRecurStr('')
      } catch (error) {
        console.error(error)
      }
    }
    getTaskSingle()
  }, [taskId])

  const [tasksDetailDeleteVisible, setTasksDetailDeleteVisible] = useState(false)
  const [goalsList, setGoalsList] = useState([])
  const tdShowDelete = () => setTasksDetailDeleteVisible(true)
  const tdHideDelete = () => setTasksDetailDeleteVisible(false)
  const [completed, setCompleted] = useState(taskDetails.completed)
  
  // Get whether this is a recurring task initially
  let isRecurring = false
  for (let day in taskDetails.recur) {
    if (taskDetails.recur[day]) {
      isRecurring = true
    }
  }
  const [initialRecur, setInitialRecur] = useState(isRecurring ? true : false)

  // Get the list of linked goals from the backend
  useEffect(() => {
    async function getGoals() {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': userContext
        }
      }
      try {
        let response = await fetch(`http://192.168.20.77:3000/tasks/${taskId}/goals?listtype=category`, options)
        let jsonResponse = await response.json()
        setGoalsList(jsonResponse.goals)
      } catch (error) {
        console.error(error)
      }
    }
    getGoals()
  }, [])

  return (
    <View>
      <ScrollView>
        <View style={{paddingHorizontal:15, paddingTop:20, paddingBottom:20}}>
        
          <Text variant='headlineLarge'>{taskDetails.title}</Text>
          <Text variant='labelLarge' style={{paddingVertical:8}}>{taskDetails.date/*.slice(4, 10)*/}</Text>
          <View style={{display:'flex', flexDirection:'row', alignItems:'center', alignContent:'flex-start', marginHorizontal:-8}}>
            <Checkbox
              status={completed ? 'checked' : 'unchecked'}
              style={{marginLeft:-5, paddingLeft:-5}}
              onPress={async () => {
                // Change the status
                setCompleted(!completed)
                taskDetails.completed = !taskDetails.completed

                // Create an object to send to the API update
                let payloadObject = {
                  id: taskDetails.id,
                  title: taskDetails.title,
                  date: taskDetails.date,
                  description: taskDetails.description,
                  completed: taskDetails.completed,
                  category: taskDetails.category
                }
                let options = {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': userContext
                  },
                  body: JSON.stringify({...payloadObject, initial_date:taskDetails.date})
                }
                try {
                  let response = await fetch(`http://192.168.20.77:3000/tasks/${payloadObject.id}`, options)
                  let jsonResponse = await response.json()
                  // Revert the change if the API call didn't work
                  if (jsonResponse.message != "Success") {
                    const taskDetailsTmp = {...taskDetails}
                    taskDetails.completed = !taskDetails.completed
                    setCompleted(!completed)
                    setTaskDetails(taskDetailsTmp)
                  }
                } catch(error) {
                  console.error(error)
                }
              }}
            />
            <Text variant='labelLarge'>Completed?</Text>
          </View>
          {taskDetails.description ? <Text variant='bodyLarge' style={{paddingVertical:8}}>{taskDetails.description}</Text> : <></>}
          <View style={{flexDirection:'row', marginVertical:15}}>
            <Chip><Text variant='labelLarge'>Category:</Text> <Text>{taskDetails.category}</Text></Chip>
          </View>
          <Text style={{display:recurStr ? 'flex' : 'none'}}>{recurStr}</Text>

          <Divider style={{marginVertical:15}} />

          {/* Goals */}
          <Text variant='headlineSmall'>Linked Goals</Text>
          <Surface
            style={{marginVertical:15, paddingHorizontal:15, paddingVertical:10, borderRadius:10, display:'flex', flexDirection:'column', alignItems:'flex-start'}}
            mode='flat'
            elevation='4'>
              { 
                goalsList.length > 0 ?
                goalsList.map((goal) => 
                  <Button
                    key={goal.id}
                    icon='bullseye-arrow'
                    onPress={() => {
                      navigation.navigate('GoalsStack', {
                        screen:'GoalsDetail',
                        initial: false,
                        params: {goalId: goal.id}
                      })
                    }}
                  >
                    {goal.title}
                  </Button>
                )
                :
                <Text>No linked goals</Text>
              }
          </Surface>

          <Divider style={{marginVertical:15}} />
          
          {/* Buttons */}
          <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
            <IconButton
              icon='delete'
              mode='outlined'
              size={25}
              onPress={tdShowDelete}
            />
            <Button
              icon='pencil'
              mode='outlined'
              onPress={() => navigation.navigate('TasksEdit', {taskDetails:taskDetails})}
            >Edit Task</Button>
          </View>

          {/* Delete confirmation modal */}
          <Portal>
            <Modal visible={tasksDetailDeleteVisible} onDismiss={tdHideDelete} style={{marginHorizontal:15}}>
              <Card style={{paddingVertical:20, paddingHorizontal:10}}>
                <Card.Content>
                  <Text variant='bodyLarge'>Are you sure?</Text>
                </Card.Content>
                <Card.Actions style={{paddingTop:15}}>
                  <Button mode='outlined' onPress={tdHideDelete}>
                    Cancel
                  </Button>
                  {
                    recurStr ? (
                      <Button 
                        mode='contained'
                        onPress={async () => {
                          let options = {
                            method: 'DELETE',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': userContext
                            }
                          }
                          try {
                            let response = await fetch(`http://192.168.20.77:3000/tasks/${taskDetails.id}/${taskDetails.date}?recur=true`, options)
                            navigation.navigate('Tasks')
                          } catch(error) {
                            console.error(error)
                          }
                        }}
                      >
                        Delete All
                      </Button>
                    ) : (
                      <></>
                    )
                  }
                  <Button
                    mode='contained'
                    buttonColor={theme.colors.error}
                    onPress={async () => {
                      let options = {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': userContext
                        },
                      }
                      try {
                        let response = await fetch(`http://192.168.20.77:3000/tasks/${taskDetails.id}/${taskDetails.date}`, options)
                        navigation.navigate('Tasks')
                      } catch(error) {
                        console.error(error)
                      }
                    }}
                  >
                    Delete
                  </Button>
                </Card.Actions>
              </Card>
            </Modal>
          </Portal>
        </View>
      </ScrollView>
      <StatusBar />
    </View>
  )
}