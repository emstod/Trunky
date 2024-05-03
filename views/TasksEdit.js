import { useState, useEffect, useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Card, Text, IconButton, useTheme, TextInput, Portal, Modal, List, Checkbox, Button, Divider, Surface } from 'react-native-paper'
import { DatePickerInput } from 'react-native-paper-dates'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../App'
import { initial } from 'lodash'

export default function TasksEdit({ route }) {
  const navigation = useNavigation()
  const taskDetails = route.params['taskDetails']
  const theme = useTheme()
  const [title, setTitle] = useState(taskDetails.title)
  const [desc, setDesc] = useState(taskDetails.description)
  const [date, setDate] = useState(taskDetails.date ? new Date(taskDetails.date) : '')
  const [category, setCategory] = useState(taskDetails.category)
  const [completed, setCompleted] = useState(taskDetails.completed)
  const [tasksEditDeleteVisible, setTasksEditDeleteVisible] = useState(false)
  const [goalsVisible, setGoalsVisible] = useState(false)
  const [goalsList, setGoalsList] = useState([])
  const [allGoals, setAllGoals] = useState([])
  const [userContext, setUserContext] = useContext(UserContext)
  const [recur, setRecur] = useState(taskDetails.recur)

  // Get whether this is a recurring task initially
  let isRecurring = false
  for (let day in recur) {
    if (recur[day]) {
      isRecurring = true
    }
  }
  const [initialRecur, setInitialRecur] = useState(isRecurring ? true : false)
  const [initialDate, setInitialDate] = useState(taskDetails.date)
  const [recurDaily, setRecurDaily] = useState(isRecurring)

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

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
          'Content-Type': 'application/json',
          'Authorization': userContext
        }
      }
      try {
        let response = await fetch(`http://192.168.20.77:3000/tasks/${taskDetails.id}/goals`, options)
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
        <View style={{paddingHorizontal:15, paddingTop:20, paddingBottom:20}}>
          
          {/* Title */}
          <TextInput
            label='Title'
            value={title}
            mode='outlined'
            onChangeText={title => setTitle(title)}
            style={{marginVertical:8}}
          />

          <DatePickerInput
            locale='en'
            label='Due date'
            value={date}
            onChange={(date) => setDate(date)}
            inputMode='start'
            mode='outlined'
            style={{marginVertical:8}}
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

<View style={{display:'flex', flexDirection:'row', alignItems:'center', alignContent:'flex-start', marginHorizontal:-8, marginTop:10}}>
            <Checkbox
              status={completed ? 'checked' : 'unchecked'}
              style={{marginLeft:-5, paddingLeft:-5}}
              onPress={() => {
                setCompleted(!completed)
              }}
            />
            <Text variant='labelLarge'>Completed?</Text>
          </View>

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
              headers: {
                'Content-Type': 'application/json',
                'Authorization': userContext
              }
            }
            console.log('user context', userContext)
            const response = await fetch(`http://192.168.20.77:3000/goals?listtype=none`, options)
            const responseJson = await response.json()
            setAllGoals(responseJson)
            showGoals()
          }}
          />

          {/* Goals modal */}
          <Portal>
            <Modal visible={goalsVisible} onDismiss={hideGoals} dismissable={false} style={{marginHorizontal:15}}>
              <Surface style={{borderRadius:15, padding:20, display:'flex', gap:10}}>
                <ScrollView style={{maxHeight:500}}>
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
                </ScrollView>
                <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                  <IconButton
                    icon='check'
                    mode='none'
                    onPress={hideGoals}
                  />
                </View>
              </Surface>
            </Modal>
          </Portal>

          <Divider style={{marginVertical:15}} />

          {/* Recurring settings */}
          <Text variant='titleMedium'>Repeat task:</Text>
          <View style={{display:'flex', gap:-15}}>
            <List.Item
              title={'Every day'}
              key={'daily'}
              left={() => <Checkbox
                  status={recurDaily ? 'checked' : 'unchecked'}
                  onPress={() => {
                    // Set all days to true
                    setRecurDaily(!recurDaily)
                    const newRecur = {...recur}
                    for (let day in newRecur) {
                      newRecur[day] = !recurDaily
                    }
                    setRecur(newRecur)
                  }}
                />}
              />
            {
              daysOfWeek.map((day) => 
                <List.Item
                  title={day}
                  key={day}
                  left={() => <Checkbox
                    status={recur[day] ? 'checked' : 'unchecked'}
                    onPress={() => {
                      const newRecur = {...recur}
                      newRecur[day] = !recur[day]
                      if (!newRecur[day]) setRecurDaily(false)
                      setRecur(newRecur)
                    }}
                  />}
                />
              )
            }
            
            
          </View>

          <Divider style={{marginTop:15}} />

          {/* Buttons */}
          <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', marginTop:30}}>
          
          {/* Show the delete button only if this is an existing task */}
          { 
            taskDetails.id ?
              <IconButton
              icon='delete'
              mode='outlined'
              size={25}
              onPress={showDelete}
              /> : <></>
          }
            
            {/* Save button */}
            <Button
              mode='contained'
              disabled={!title || !date }
              onPress={async () => {
                // If this is an update, do a PUT and include the ID
                if (taskDetails.id) {
                  let bodyObject = {
                    id: taskDetails.id,
                    title: title,
                    date: date.toDateString(),
                    description: desc,
                    completed: completed,
                    category: category ? category : 'None',
                    recur: recur
                  }
                  let options = {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': userContext
                    },
                    body: JSON.stringify({...bodyObject, initial_date:initialDate})
                  }
                  try {
                    let response = await fetch(`http://192.168.20.77:3000/tasks/${taskDetails.id}`, options)
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
                    let response = await fetch(`http://192.168.20.77:3000/tasks/${taskDetails.id}/goals`, options)
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
                    completed: completed,
                    category: category ? category : 'None',
                    recur: recur
                  }
                  let options = {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': userContext
                    },
                    body: JSON.stringify(bodyObject)
                  }
                  try {
                    console.log('creating a task')
                    let response = await fetch(`http://192.168.20.77:3000/tasks`, options)
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
                    let response = await fetch(`http://192.168.20.77:3000/tasks/${newId}/goals`, options)
                    let success = await response.json()
                    console.log(success)
                    navigation.navigate('Tasks')
                  } catch (error) {
                    console.error(error)
                  }
                }
              }}
            >
              Save
            </Button>
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
                  {
                    initialRecur ? (
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