import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Text, Divider, IconButton, useTheme, Portal, Modal, Card, Button, Surface, Chip, Checkbox } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { BACKEND_IP } from '@env'

export default function TasksDetail({ route }) {
  const navigation = useNavigation()
  const taskDetails = route.params['taskDetails']
  const theme = useTheme()

  const [tasksDetailDeleteVisible, setTasksDetailDeleteVisible] = useState(false)
  const [goalsList, setGoalsList] = useState([])
  const [completed, setCompleted] = useState(taskDetails.completed)
  const tdShowDelete = () => setTasksDetailDeleteVisible(true)
  const tdHideDelete = () => setTasksDetailDeleteVisible(false)

  // Get the list of linked goals from the backend
  useEffect(() => {
    async function getGoals() {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      try {
        let response = await fetch(`http://${BACKEND_IP}:3000/tasks/${taskDetails.id}/goals`, options)
        let jsonResponse = await response.json()
        setGoalsList(jsonResponse.goals)
        console.log(goalsList)
      } catch (error) {
        console.error(error)
      }
    }
    getGoals()
  }, [])

  return (
    <View>
      <ScrollView>
        <View style={{paddingHorizontal:15, paddingTop:75, paddingBottom:20}}>
        
          <Text variant='headlineLarge'>{taskDetails.title}</Text>
          <Text variant='labelLarge' style={{paddingVertical:8}}>{taskDetails.date.slice(4, 10)}</Text>
          <View style={{display:'flex', flexDirection:'row', alignItems:'center', alignContent:'flex-start', marginHorizontal:-8}}>
            <Checkbox
              status={completed ? 'checked' : 'unchecked'}
              style={{marginLeft:-5, paddingLeft:-5}}
              onPress={async () => {
                let payloadObject = {
                  id: taskDetails.id,
                  title: taskDetails.title,
                  date: taskDetails.date,
                  description: taskDetails.description,
                  completed: taskDetails.completed,
                  category: taskDetails.category
                }
                payloadObject.completed = !payloadObject.completed
                let options = {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(payloadObject)
                }
                try {
                  let response = await fetch(`http://${BACKEND_IP}:3000/tasks/${payloadObject.id}`, options)
                  let jsonResponse = await response.json()
                  taskDetails.completed = !taskDetails.completed
                  setCompleted(taskDetails.completed)
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
                        params: {goalDetails: goal}
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
          <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
            <IconButton
              icon='delete'
              mode='outlined'
              size={20}
              onPress={tdShowDelete}
            />
            <IconButton
              icon='pencil'
              mode='outlined'
              size={20}
              onPress={() => navigation.navigate('TasksEdit', {taskDetails:taskDetails})}
            />
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
                  <Button
                    mode='contained'
                    buttonColor={theme.colors.error}
                    onPress={async () => {
                      console.log('calling the right function')
                      let options = {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                      }
                      try {
                        let response = await fetch(`http://${BACKEND_IP}:3000/tasks/${taskDetails.id}`, options)
                        console.log(await response.json())
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