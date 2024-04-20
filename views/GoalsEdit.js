import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Card, Text, IconButton, useTheme, TextInput, Portal, Modal, RadioButton, List, Checkbox, Button, Divider, Chip, Icon } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import {BACKEND_IP} from '@env'

export default function GoalsEdit({ route }) {
  const navigation = useNavigation()
  const goalDetails = route.params['goalDetails']
  const theme = useTheme()
  const [title, setTitle] = React.useState(goalDetails.title)
  const [desc, setDesc] = React.useState(goalDetails.description)
  const [category, setCategory] = React.useState(goalDetails.category)
  const [quantity, setQuanitity] = React.useState(goalDetails.quantity)
  const [frequencyVisible, setFrequencyVisible] = React.useState(false)
  const [goalsEditDeleteVisible, setGoalsEditDeleteVisible] = React.useState(false)
  const [tasksVisible, setTasksVisible] = React.useState(false)
  const [frequency, setFrequency] = React.useState(goalDetails.frequency)
  const [taskList, setTaskList] = React.useState([])

  const showFrequency = () => setFrequencyVisible(true)
  const hideFrequency = () => setFrequencyVisible(false)
  const showDelete = () => setGoalsEditDeleteVisible(true)
  const hideDelete = () => setGoalsEditDeleteVisible(false)
  const showTasks = () => setTasksVisible(true)
  const hideTasks = () => setTasksVisible(false)

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

          <Divider style={{marginTop:15}} />

          {/* Tasks */}
          <List.Item
            title='Set screen time rules'
            left={() => <List.Icon icon='format-list-checks' />}
            right={() => <IconButton icon='minus' style={{margin:0}} onPress={() => {}}/>}
            style={{marginVertical:-5}}
          />
          <List.Item
            title='Module 11 homework'
            left={() => <List.Icon icon='format-list-checks' />}
            right={() => <IconButton icon='minus' style={{margin:0}} onPress={() => {}}/>}
            style={{marginVertical:-5}}
          />
          <List.Item
            title='Add task'
            left={() => <List.Icon icon='plus'/>}
            onPress={showTasks}
          />

          {/* Tasks modal */}
          <Portal>
            <Modal visible={tasksVisible} onDismiss={hideTasks} dismissable={false} style={{marginHorizontal:15}}>
              <Card>
              <Card.Content>
                  <List.Accordion title='School'>
                    <List.Item
                      title='Module 11 homework'
                      left={() => 
                        <Checkbox
                          status={
                            taskList.includes('Module 11 homework') ? true : false
                          }
                          onPress={() => {
                            if (taskList.includes('Module 11 homework')) {
                              tempList = taskList
                              index = tempList.indexOf('Module 11 homework')
                              tempList.splice(index, 1)
                              setTaskList(tempList)
                            } else {
                              setTaskList(taskList.concat(['Module 11 homework']))
                            }
                          }}
                        />
                      }
                      style={{marginVertical:-8}}
                    />
                    <List.Item
                      title='English essay'
                      left={() => 
                        <Checkbox
                          status={
                            taskList.includes('English essay') ? true : false
                          }
                          onPress={() => {
                            if (taskList.includes('English essay')) {
                              index = taskList.indexOf('English essay')
                              taskList.splice(index, 1)
                            }
                          }}
                        />
                      }
                      style={{marginVertical:-8}}
                    />
                  </List.Accordion>

                  <List.Accordion title='Work'>
                    <List.Item
                      title='Finish reports for Q3'
                      left={() => 
                        <Checkbox
                          status={
                            taskList.includes('Finish reports for Q3') ? true : false
                          }
                          onPress={() => {
                            if (taskList.includes('Finish reports for Q3')) {
                              index = taskList.indexOf('Finish reports for Q3')
                              taskList.splice(index, 1)
                            }
                          }}
                        />
                      }
                      style={{marginVertical:-8}}
                    />
                    <List.Item
                      title='Create meeting agenda'
                      left={() => 
                        <Checkbox
                          status={
                            taskList.includes('Create meeting agenda') ? true : false
                          }
                          onPress={() => {
                            if (taskList.includes('Create meeting agenda')) {
                              index = taskList.indexOf('Create meeting agenda')
                              taskList.splice(index, 1)
                            }
                          }}
                        />
                      }
                      style={{marginVertical:-8}}
                    />
                  </List.Accordion>

                  <List.Accordion title='Social'>
                    <List.Item
                      title='Text Amy about lunch on Friday'
                      left={() => 
                        <Checkbox
                          status={
                            taskList.includes('Text Amy about lunch on Friday') ? true : false
                          }
                          onPress={() => {
                            if (taskList.includes('Text Amy about lunch on Friday')) {
                              index = taskList.indexOf('Text Amy about lunch on Friday')
                              taskList.splice(index, 1)
                            }
                          }}
                        />
                      }
                      style={{marginVertical:-8}}
                    />
                    <List.Item
                      title='Visit Grandma'
                      left={() => 
                        <Checkbox
                          status={
                            taskList.includes('Visit Grandma') ? true : false
                          }
                          onPress={() => {
                            if (taskList.includes('Visit Grandma')) {
                              index = taskList.indexOf('Visit Grandma')
                              taskList.splice(index, 1)
                            }
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
                    onPress={hideTasks}
                  />
                </Card.Actions>
              </Card>
            </Modal>
          </Portal>

          <Divider style={{marginTop:15}} />

          {/* Buttons */}
          <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-end', marginTop:30}}>
            <IconButton
              icon='delete'
              mode='outlined'
              size={25}
              onPress={showDelete}
            />
            <IconButton
              icon='check-bold'
              mode='contained'
              size={25}
              onPress={async () => {
                // If this is an update, do a PUT and include the ID
                if (goalDetails.id) {
                  let bodyObject = {
                    id: goalDetails.id,
                    title: title,
                    description: desc,
                    frequency: frequency,
                    quantity: quantity,
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
                    let response = await fetch(`http://${BACKEND_IP}:3000/goals/${goalDetails.id}`, options)
                    let success = await response.json()
                    console.log(success)
                    navigation.navigate('Goals')
                  } catch(error) {
                    console.error(error)
                  }
                } else {
                  // This is a newly-created goal, so do a POST
                  let bodyObject = {
                    title: title,
                    description: desc,
                    frequency: frequency,
                    quantity: quantity,
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
                    console.log('creating a goal')
                    // Home IP address
                    let response = await fetch(`http://${BACKEND_IP}:3000/goals`, options)
                    let success = await response.json()
                    console.log(success)
                    navigation.navigate('Goals')
                  } catch(error) {
                    console.error(error)
                  }
                }
                
              }}
            />
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