import * as React from 'react'
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
  const [title, setTitle] = React.useState(taskDetails.title)
  const [desc, setDesc] = React.useState(taskDetails.description)
  const [date, setDate] = React.useState(taskDetails.date ? new Date(taskDetails.date) : '')
  const [category, setCategory] = React.useState(taskDetails.category)
  const [tasksEditDeleteVisible, setTasksEditDeleteVisible] = React.useState(false)
  const [goalsVisible, setGoalsVisible] = React.useState(false)
  const [checked, setChecked] = React.useState('')

  const showDelete = () => setTasksEditDeleteVisible(true)
  const hideDelete = () => setTasksEditDeleteVisible(false)
  const showGoals = () => setGoalsVisible(true)
  const hideGoals = () => setGoalsVisible(false)

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

          {/* Goals modal */}
          <Portal>
            <Modal visible={goalsVisible} onDismiss={hideGoals} style={{marginHorizontal:15}}>
              <Card>
              <Card.Content>
                  <List.Accordion title='School'>
                    <List.Item
                      title='Finish homework before Netflix'
                      left={() => 
                        <Checkbox
                          status={checked ? 'checked' : 'unchecked'}
                          onPress={() => {
                            setChecked(!checked)
                          }}
                        />
                      }
                      style={{marginVertical:-8}}
                    />
                    <List.Item
                    title='Get A&apos;s this semester'
                    left={() => 
                      <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setChecked(!checked)
                        }}
                      />
                    }
                    style={{marginVertical:-8}}
                  />
                  </List.Accordion>

                  <List.Accordion title='Work'>
                    <List.Item
                      title='Finish homework before Netflix'
                      left={() => 
                        <Checkbox
                          status={checked ? 'checked' : 'unchecked'}
                          onPress={() => {
                            setChecked(!checked)
                          }}
                        />
                      }
                      style={{marginVertical:-8}}
                    />
                    <List.Item
                    title='Get A&apos;s this semester'
                    left={() => 
                      <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setChecked(!checked)
                        }}
                      />
                    }
                    style={{marginVertical:-8}}
                  />
                  </List.Accordion>

                  <List.Accordion title='Social'>
                    <List.Item
                      title='Finish homework before Netflix'
                      left={() => 
                        <Checkbox
                          status={checked ? 'checked' : 'unchecked'}
                          onPress={() => {
                            setChecked(!checked)
                          }}
                        />
                      }
                      style={{marginVertical:-8}}
                    />
                    <List.Item
                    title='Get A&apos;s this semester'
                    left={() => 
                      <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setChecked(!checked)
                        }}
                      />
                    }
                    style={{marginVertical:-8}}
                  />
                  </List.Accordion>
                  
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

          {/* Goals */}
          <List.Item
          title='Finish homework before Netflix'
          left={() => <List.Icon icon='bullseye-arrow'/>}
          right={() => <IconButton icon='minus' style={{margin:0}} onPress={() => {}}/>}
          style={{marginVertical:-5}}
          />
          <List.Item
          title='Get A&apos;s this semester'
          left={() => <List.Icon icon='bullseye-arrow'/>}
          right={() => <IconButton icon='minus' style={{margin:0}} onPress={() => {}}/>}
          style={{marginVertical:-5}}
          />
          <List.Item
          title='Add goal'
          left={() => <List.Icon icon='plus'/>}
          onPress={showGoals}
          />

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
                    navigation.navigate('Tasks')
                  } catch(error) {
                    console.error(error)
                  }
                } else {
                  // This is a newly-created task, so do a POST
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
                    console.log(success)
                    navigation.navigate('Tasks')
                  } catch(error) {
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