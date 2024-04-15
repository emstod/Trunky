import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Card, Text, IconButton, useTheme, TextInput, Portal, Modal, RadioButton, List, Checkbox, Button, Divider, Chip, Icon } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default function GoalsEdit({ route }) {
  const navigation = useNavigation()
  const goalName = route.params['goalName']
  const theme = useTheme()
  const [title, setTitle] = React.useState(goalName)
  const [desc, setDesc] = React.useState('')
  const [quantity, setQuanitity] = React.useState('0')
  const [categoryVisible, setCategoryVisible] = React.useState(false)
  const [frequencyVisible, setFrequencyVisible] = React.useState(false)
  const [deleteVisible, setDeleteVisible] = React.useState(false)
  const [tasksVisible, setTasksVisible] = React.useState(false)
  const [checked, setChecked] = React.useState('')
  const [frequency, setFrequency] = React.useState('daily')
  const [taskList, setTaskList] = React.useState([])

  const showCategory = () => setCategoryVisible(true)
  const hideCategory = () => setCategoryVisible(false)
  const showFrequency = () => setFrequencyVisible(true)
  const hideFrequency = () => setFrequencyVisible(false)
  const showDelete = () => setDeleteVisible(true)
  const hideDelete = () => setDeleteVisible(false)
  const showTasks = () => setTasksVisible(true)
  const hideTasks = () => setTasksVisible(false)

  return (
    <View>
      <ScrollView>
        <View style={{paddingHorizontal:15, paddingTop:75, paddingBottom:20}}>
          {/* Title and category */}
          <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <TextInput
              label='Title'
              value={title}
              mode='outlined'
              onChangeText={title => setTitle(title)}
              style={{flexShrink:1, flexBasis:'80%'}}
            />
            <IconButton
              mode='contained'
              icon='pencil'
              containerColor={theme.colors.tertiaryContainer}
              iconColor={theme.colors.tertiary}
              onPress={showCategory}
            />

            {/* Category modal */}
            <Portal>
              <Modal visible={categoryVisible} onDismiss={hideCategory} style={{marginHorizontal:15}}>
                <Card>
                  <Card.Title
                    title='Category'
                    titleVariant='titleLarge'
                    style={{marginTop:10}}
                  />
                  <Card.Content>
                    <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                      <RadioButton
                        value="School"
                        status={ checked === 'School' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('School')}
                        uncheckedColor={theme.colors.tertiaryContainer}
                        color={theme.colors.tertiaryContainer}
                        style={{color:'red'}}
                      />
                      <Text variant='titleMedium'>School</Text>
                    </View>
                    
                    <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                      <RadioButton
                        value='Work'
                        status={ checked === 'Work' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('Work')}
                        uncheckedColor={theme.colors.primaryContainer}
                        color={theme.colors.primaryContainer}
                      />
                      <Text variant='titleMedium'>Work</Text>
                    </View>

                    <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                      <RadioButton
                        value='Social'
                        status={ checked === 'Social' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('Social')}
                        uncheckedColor={theme.colors.surfaceVariant}
                        color={theme.colors.surfaceVariant}
                      />
                      <Text variant='titleMedium'>Social</Text>
                    </View>
                  </Card.Content>
                  <Card.Actions>
                    <IconButton
                      icon='check'
                      mode='none'
                      onPress={hideCategory}
                    />
                  </Card.Actions>
                </Card>
              </Modal>
            </Portal>
          </View>

          {/* Description */}
          <TextInput
            label='Description'
            value={desc}
            mode='outlined'
            multiline={true}
            onChangeText={desc => setDesc(desc)}
            style={{marginVertical:8}}
          />
          <Divider style={{marginVertical:15}} />

          {/* Quantity and frequency */}
          <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:15}}>
            <TextInput
              label='Quantity'
              value={quantity}
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
              onPress={() => navigation.navigate('Goals')}
            />
          </View>

          {/* Delete confirmation modal */}
          <Portal>
            <Modal visible={deleteVisible} onDismiss={hideDelete} style={{marginHorizontal:15}}>
              <Card style={{paddingVertical:20, paddingHorizontal:10}}>
                <Card.Content>
                  <Text variant='bodyLarge'>Are you sure?</Text>
                </Card.Content>
                <Card.Actions style={{paddingTop:15}}>
                  <Button mode='outlined' onPress={hideDelete}>
                    Cancel
                  </Button>
                  <Button mode='contained' buttonColor={theme.colors.error} onPress={() => navigation.navigate('Goals')}>
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