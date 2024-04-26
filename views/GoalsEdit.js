import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Card, Text, IconButton, useTheme, TextInput, Portal, Modal, RadioButton, List, Checkbox, Button, Divider, Chip, Surface } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import {BACKEND_IP} from '@env'

export default function GoalsEdit({ route }) {
  const navigation = useNavigation()
  const goalDetails = route.params['goalDetails']
  const theme = useTheme()
  const [title, setTitle] = useState(goalDetails.title)
  const [desc, setDesc] = useState(goalDetails.description)
  const [category, setCategory] = useState(goalDetails.category)
  const [quantity, setQuanitity] = useState(goalDetails.quantity)
  const [frequencyVisible, setFrequencyVisible] = useState(false)
  const [goalsEditDeleteVisible, setGoalsEditDeleteVisible] = useState(false)
  const [tasksVisible, setTasksVisible] = useState(false)
  const [frequency, setFrequency] = useState(goalDetails.frequency)
  const [tasksList, setTasksList] = useState([])
  const [allTasks, setAllTasks] = useState([])

  const showFrequency = () => setFrequencyVisible(true)
  const hideFrequency = () => setFrequencyVisible(false)
  const showDelete = () => setGoalsEditDeleteVisible(true)
  const hideDelete = () => setGoalsEditDeleteVisible(false)
  const showTasks = () => setTasksVisible(true)
  const hideTasks = () => setTasksVisible(false)

   // Get the list of linked tasks from the backend
  useEffect(() => {
    async function getTasks() {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      try {
        let response = await fetch(`http://${BACKEND_IP}:3000/goals/${goalDetails.id}/tasks`, options)
        let jsonResponse = await response.json()
        setTasksList(jsonResponse.tasks)
        console.log(jsonResponse.tasks)
        console.log(tasksList)
      } catch (error) {
        console.error(error)
      }
    }
    if (goalDetails.id) {
      getTasks()
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
            style={{flexShrink:1, flexBasis:'80%', marginVertical:8}}
          />

          {/* Description */}
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
            multiline={true}
            onChangeText={c => setCategory(c)}
            style={{marginVertical:8}}
          />
          <Divider style={{marginVertical:15}} />

          {/* Quantity and frequency */}
          <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:15}}>
            <TextInput
              label='Quantity'
              value={`${quantity}`}
              mode='outlined'
              onChangeText={quantity => setQuanitity(quantity)}
            />
            <Chip
              icon='pencil'
              onPress={showFrequency}
            >
              {frequency}
            </Chip>
          </View>

          {/* Frequency modal */}
          <Portal>
            <Modal visible={frequencyVisible} onDismiss={hideFrequency} dismissable={false} style={{marginHorizontal:15}}>
              <Card>
                <Card.Content>
                  <List.Item
                    title='Daily'
                    left={ () =>
                      <RadioButton
                        value='daily'
                        status={ frequency === 'daily' ? 'checked' : 'unchecked'}
                        onPress={() => setFrequency('daily')}
                      />
                    }
                    style={{marginVertical:-8}}
                  />
                  <List.Item
                    title='Weekly'
                    left={ () =>
                      <RadioButton
                        value='weekly'
                        status={ frequency === 'weekly' ? 'checked' : 'unchecked'}
                        onPress={() => setFrequency('weekly')}
                      />
                    }
                    style={{marginVertical:-8}}
                  />
                  <List.Item
                    title='Monthly'
                    left={ () =>
                      <RadioButton
                        value='monthly'
                        status={ frequency === 'monthly' ? 'checked' : 'unchecked'}
                        onPress={() => setFrequency('monthly')}
                      />
                    }
                    style={{marginVertical:-8}}
                  />
                  <List.Item
                    title='Once'
                    left={ () =>
                      <RadioButton
                        value='once'
                        status={ frequency === 'once' ? 'checked' : 'unchecked'}
                        onPress={() => setFrequency('once')}
                      />
                    }
                    style={{marginVertical:-8}}
                  />
                </Card.Content>
                <Card.Actions>
                  <IconButton
                    icon='check'
                    mode='none'
                    onPress={hideFrequency}
                  />
                </Card.Actions>
              </Card>
            </Modal>
          </Portal>

          <Divider style={{marginVertical:15}} />

          {/* Tasks */}
          {
            tasksList.map((task) =>
              <List.Item
                key={task.id}
                title={task.title}
                left={() => <List.Icon icon='bullseye-arrow'/>}
                right={() => <IconButton
                  icon='minus'
                  style={{margin:0}}
                  onPress={() => {
                    let tempTasksList = []
                    for (let item of tasksList) {
                      if (item.id != task.id) tempTasksList.push(item)
                    }
                    setTasksList(tempTasksList)
                  }}
                />}
                style={{marginVertical:-5}}
              />
            )
          }
          <List.Item
            title='Add task'
            left={() => <List.Icon icon='plus'/>}
            onPress={async () => {
              const options = {
                method: 'GET',
                'Content-Type': 'application/json'
              }
              const response = await fetch(`http://${BACKEND_IP}:3000/tasks?listtype=none`)
              const responseJson = await response.json()
              setAllTasks(responseJson.tasks)
              showTasks()
            }}
          />

          {/* Tasks modal */}
          <Portal>
            <Modal visible={tasksVisible} onDismiss={hideTasks} dismissable={false} style={{marginHorizontal:15}}>
              <Surface style={{borderRadius:15, padding:20, display:'flex', gap:10}}>
                  <ScrollView style={{maxHeight:500}}>
                  {
                    allTasks.length > 0 ?
                    allTasks.map((task) => 
                      <List.Item
                        key={task.id}
                        title={task.title}
                        left={() => <Checkbox
                          status={
                            // Check whether this goal is already linked
                            tasksList.some((e) => e.title==task.title) ? 'checked' : 'unchecked'
                          }
                          onPress={() => {
                            // If the goal is already linked, remove it from goalsList
                            if (tasksList.some((e) => e.title==task.title)) {
                              const tmpTasksList = []
                              for (item of tasksList) {
                                if (item.id != task.id) tmpTasksList.push(item)
                              }
                              setTasksList(tmpTasksList)
                            } else {
                              // If the goal isn't already linked, add it to goalsList
                              const tmpTasksList = [...tasksList]
                              tmpTasksList.push(task)
                              setTasksList(tmpTasksList)
                            }
                          }}
                        />}
                      />
                    )
                    :
                    <Text>No tasks yet!</Text>
                  }
                  </ScrollView>
                  <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                    <IconButton
                      icon='check'
                      mode='none'
                      onPress={hideTasks}
                    />
                  </View>
              </Surface>
            </Modal>
          </Portal>

          <Divider style={{marginTop:15}} />

          {/* Buttons */}
          <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-end', alignItems:'center', marginTop:30}}>
            {/* Show the delete button only if this is an existing goal */}
            {
              goalDetails.id ?
              <IconButton
                icon='delete'
                mode='outlined'
                size={25}
                onPress={showDelete}
              />
              :
              <></>
            }
            {/* Save button */}
            <Button
              mode='contained'
              disabled={!title}
              onPress={async () => {
                // If this is an update, do a PUT and include the ID
                if (goalDetails.id) {
                  let bodyObject = {
                    id: goalDetails.id,
                    title: title,
                    description: desc,
                    frequency: frequency,
                    quantity: quantity,
                    category: category ? category : 'None'
                  }
                  let options = {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyObject)
                  }
                  try {
                    let response = await fetch(`http://${BACKEND_IP}:3000/goals/${goalDetails.id}`, options)
                    let success = await response.json()
                    console.log(success)
                  } catch(error) {
                    console.error(error)
                    return
                  }

                  // Update linked tasks
                  let taskIds = []
                  for (let task of tasksList) {
                    taskIds.push(task.id)
                  }
                  options.body = JSON.stringify({ taskIds: taskIds })
                  try {
                    let response = await fetch(`http://${BACKEND_IP}:3000/goals/${goalDetails.id}/tasks`, options)
                    let success = await response.json()
                    console.log(success)
                    navigation.navigate('Goals')
                  } catch (error) {
                    console.error(error)
                  }
                } else {
                  // This is a newly-created goal, so do a POST
                  let bodyObject = {
                    title: title,
                    description: desc,
                    frequency: frequency,
                    quantity: quantity,
                    category: category ? category : 'None'
                  }
                  let options = {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyObject)
                  }
                  try {
                    console.log('creating a goal')
                    // Home IP address
                    let response = await fetch(`http://${BACKEND_IP}:3000/goals`, options)
                    let success = await response.json()
                    newId = success.id
                    console.log(success)
                  } catch(error) {
                    console.error(error)
                    return
                  }

                  // Update linked goals
                  let taskIds = []
                  for (let task of tasksList) {
                    taskIds.push(task.id)
                  }
                  options.body = JSON.stringify({ taskIds: taskIds })
                  options.method= 'PUT'
                  try {
                    let response = await fetch(`http://${BACKEND_IP}:3000/goals/${newId}/tasks`, options)
                    let success = await response.json()
                    console.log(success)
                    navigation.navigate('Goals')
                  } catch (error) {
                    console.error(error)
                  }
                } // else
              }}
            >
              Save
            </Button>
          </View>

          {/* Delete confirmation modal */}
          <Portal>
            <Modal visible={goalsEditDeleteVisible} onDismiss={hideDelete} style={{marginHorizontal:15}}>
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
                    onPress={ async () => {
                      console.log('sending delete')
                      let options = {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                      }
                      try {
                        let response = await fetch(`http://${BACKEND_IP}:3000/goals/${goalDetails.id}`, options)
                        console.log(await response.json())
                        navigation.navigate('Goals')
                      } catch(error) {
                        console.log(error)
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