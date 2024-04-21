import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Card, Text, IconButton, useTheme, TextInput, Portal, Modal, RadioButton, List, Checkbox, Button, Divider, Surface } from 'react-native-paper'
import { DatePickerInput } from 'react-native-paper-dates'
import { useNavigation } from '@react-navigation/native'
import { BACKEND_IP } from '@env'

export default function TasksEdit({ route }) {
  const navigation = useNavigation()
  const taskDetails = route.params['taskDetails']
  const theme = useTheme()
  const [title, setTitle] = useState(taskDetails.title)
  const [desc, setDesc] = useState(taskDetails.description)
  const [date, setDate] = useState(taskDetails.date ? new Date(taskDetails.date) : '')
  const [category, setCategory] = useState(taskDetails.category)
  const [tasksEditDeleteVisible, setTasksEditDeleteVisible] = useState(false)
  const [goalsVisible, setGoalsVisible] = useState(false)
  const [goalsList, setGoalsList] = useState([])
  const [checked, setChecked] = useState('')
  const [allGoals, setAllGoals] = useState([])

  const showDelete = () => setTasksEditDeleteVisible(true)
  const hideDelete = () => setTasksEditDeleteVisible(false)
  const showGoals = () => setGoalsVisible(true)
  const hideGoals = () => setGoalsVisible(false)

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
      } catch (error) {
        console.error(error)
      }
    }
    if (taskDetails.id) {
      getGoals()
    }
  }, [])

  return (
    <View>
      <ScrollView>
        <View style={{paddingHorizontal:15, paddingTop:75, paddingBottom:20}}>
          
          {/* Title */}
          <TextInput
            label='Title'
            value={title}
            mode='outlined'
            onChangeText={title => setTitle(title)}
          />

          <DatePickerInput
            locale='en'
            label='Due date'
            value={date}
            onChange={(date) => setDate(date)}
            inputMode='start'
            mode='outlined'
            style={{marginTop:8}}
          />
          <TextInput
            label='Description'
            value={desc}
            mode='outlined'
            multiline={true}
            onChangeText={desc => setDesc(desc)}
            style={{marginVertical:8}}
          />
          {/* Category */}
          <TextInput
            label='Category'
            value={category}
            mode='outlined'
            onChangeText={c => setCategory(c)}
            style={{marginVertical:8}}
          />
          <Divider style={{marginVertical:15}} />          

          {/* Goals */}
          {
            goalsList.map((goal) =>
              <List.Item
                key={goal.id}
                title={goal.title}
                left={() => <List.Icon icon='bullseye-arrow'/>}
                right={() => <IconButton
                  icon='minus'
                  style={{margin:0}}
                  onPress={() => {
                    let tempGoalsList = []
                    for (let item of goalsList) {
                      if (item.id != goal.id) tempGoalsList.push(item)
                    }
                    setGoalsList(tempGoalsList)
                  }}
                />}
                style={{marginVertical:-5}}
              />
            )
          }
          <List.Item
          title='Add goal'
          left={() => <List.Icon icon='plus'/>}
          onPress={async () => {
            const options = {
              method: 'GET',
              'Content-Type': 'application/json'
            }
            const response = await fetch(`http://${BACKEND_IP}:3000/goals/list`)
            const responseJson = await response.json()
            console.log('heres your response')
            setAllGoals(responseJson.goals)
            console.log(allGoals)
            showGoals()
          }}
          />

          {/* Goals modal */}
          <Portal>
            <Modal visible={goalsVisible} onDismiss={hideGoals} style={{marginHorizontal:15}}>
              <Card>
              <Card.Content>
                  {
                    allGoals.length > 0 ?
                      allGoals.map((goal) => 
                        <List.Item
                          key={goal.id}
                          title={goal.title}
                          left={() => <Checkbox
                            status={
                              // Check whether this goal is already linked
                              goalsList.some((e) => e.title==goal.title) ? 'checked' : 'unchecked'
                            }
                            onPress={() => {
                              // If the goal is already linked, remove it from goalsList
                              if (goalsList.some((e) => e.title==goal.title)) {
                                const tmpGoalsList = []
                                for (item of goalsList) {
                                  if (item.id != goal.id) tmpGoalsList.push(item)
                                }
                                setGoalsList(tmpGoalsList)
                              } else {
                                // If the goal isn't already linked, add it to goalsList
                                const tmpGoalsList = [...goalsList]
                                tmpGoalsList.push(goal)
                                setGoalsList(tmpGoalsList)
                              }
                            }}
                          />}
                        />
                      )
                    :
                    <Text>No goals yet!</Text>
                  }                  
                </Card.Content>
                <Card.Actions>
                  <IconButton
                    icon='check'
                    mode='none'
                    onPress={hideGoals}
                  />
                </Card.Actions>
              </Card>
            </Modal>
          </Portal>

          <Divider style={{marginTop:15}} />

          {/* Buttons */}
          <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-end', marginTop:30}}>
          { 
            taskDetails.id ?
              <IconButton
              icon='delete'
              mode='outlined'
              size={25}
              onPress={showDelete}
              /> : <></>
          }
            
            <IconButton
              icon='check-bold'
              mode='contained'
              size={25}
              onPress={async () => {
                // If this is an update, do a PUT and include the ID
                if (taskDetails.id) {
                  let bodyObject = {
                    id: taskDetails.id,
                    title: title,
                    date: date.toDateString(),
                    description: desc,
                    completed: taskDetails.completed,
                    category: category
                  }
                  let options = {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyObject)
                  }
                  try {
                    let response = await fetch(`http://${BACKEND_IP}:3000/tasks/${taskDetails.id}`, options)
                    let success = await response.json()
                    console.log(success)
                  } catch(error) {
                    console.error(error)
                    return
                  }

                  // Update linked goals
                  let goalIds = []
                  for (let goal of goalsList) {
                    goalIds.push(goal.id)
                  }
                  options.body = JSON.stringify({ goalIds: goalIds })
                  try {
                    let response = await fetch(`http://${BACKEND_IP}:3000/tasks/${taskDetails.id}/goals`, options)
                    let success = await response.json()
                    console.log(success)
                    navigation.navigate('Tasks')
                  } catch (error) {
                    console.error(error)
                  }
                } else {
                  // This is a newly-created task, so do a POST
                  let newId = ''
                  let bodyObject = {
                    title: title,
                    date: date.toDateString(),
                    description: desc,
                    completed: taskDetails.completed,
                    category: category
                  }
                  let options = {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyObject)
                  }
                  try {
                    console.log('creating a task')
                    let response = await fetch(`http://${BACKEND_IP}:3000/tasks`, options)
                    let success = await response.json()
                    newId = success.id
                    console.log(success)
                  } catch(error) {
                    console.error(error)
                    return
                  }

                  // Update linked goals
                  let goalIds = []
                  for (let goal of goalsList) {
                    goalIds.push(goal.id)
                  }
                  options.body = JSON.stringify({ goalIds: goalIds })
                  options.method= 'PUT'
                  try {
                    let response = await fetch(`http://${BACKEND_IP}:3000/tasks/${newId}/goals`, options)
                    let success = await response.json()
                    console.log(success)
                    navigation.navigate('Tasks')
                  } catch (error) {
                    console.error(error)
                  }
                }
              }}
            />
          </View>

          {/* Delete confirmation modal */}
          <Portal>
            <Modal visible={tasksEditDeleteVisible} onDismiss={hideDelete} style={{marginHorizontal:15}}>
              <Card style={{paddingVertical:20, paddingHorizontal:10}}>
                <Card.Content>
                  <Text variant='bodyLarge'>Are you sure?</Text>
                </Card.Content>
                <Card.Actions style={{paddingTop:15}}>
                  <Button mode='outlined' onPress={hideDelete}>
                    Cancel
                  </Button>
                  <Button
                    mode='contained'
                    buttonColor={theme.colors.error}
                    onPress={async () => {
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