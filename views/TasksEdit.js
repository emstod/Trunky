import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Card, Text, IconButton, useTheme, TextInput, Portal, Modal, RadioButton, List, Checkbox, Button, Divider, Surface } from 'react-native-paper'
import { DatePickerInput } from 'react-native-paper-dates'
import { useNavigation } from '@react-navigation/native'

export default function TasksEdit({ route }) {
  const navigation = useNavigation()
  const taskName = route.params['taskName']
  const theme = useTheme()
  const [title, setTitle] = React.useState(taskName)
  const [desc, setDesc] = React.useState('')
  const [date, setDate] = React.useState('')
  const [categoryVisible, setCategoryVisible] = React.useState(false)
  const [reminderVisible, setReminderVisible] = React.useState(false)
  const [deleteVisible, setDeleteVisible] = React.useState(false)
  const [repeatVisible, setRepeatVisible] = React.useState(false)
  const [goalsVisible, setGoalsVisible] = React.useState(false)
  const [checked, setChecked] = React.useState('')

  const showCategory = () => setCategoryVisible(true)
  const hideCategory = () => setCategoryVisible(false)
  const showReminder = () => setReminderVisible(true)
  const hideReminder = () => setReminderVisible(false)
  const showDelete = () => setDeleteVisible(true)
  const hideDelete = () => setDeleteVisible(false)
  const showRepeat = () => setRepeatVisible(true)
  const hideRepeat = () => setRepeatVisible(false)
  const showGoals = () => setGoalsVisible(true)
  const hideGoals = () => setGoalsVisible(false)

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
          <Divider style={{marginVertical:15}} />

          {/* Reminders */}
          <List.Item
            title='1 day before'
            left={() => <List.Icon icon='bell'/>}
            right={() => <IconButton icon='minus' style={{margin:0}} onPress={() => {}}/>}
            style={{marginVertical:-5}}
          />
          <List.Item
            title='10 minutes before'
            left={() => <List.Icon icon='bell' />}
            right={() => <IconButton icon='minus' style={{margin:0}} onPress={() => {}}/>}
            style={{marginVertical:-5}}
          />
          <List.Item
            title='Add reminder'
            left={() => <List.Icon icon='plus'/>}
            onPress={showReminder}
          />
          <Divider style={{marginVertical:15}} />

          {/* Reminder selection modal */}
          <Portal>
            <Modal visible={reminderVisible} onDismiss={hideReminder} style={{marginHorizontal:15}}>
              <Card>
                <Card.Content>
                  <List.Item
                    title='10 minutes before'
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
                    title='30 minutes before'
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
                    title='1 hour before'
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
                    title='2 hours before'
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
                    title='1 day before'
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
                </Card.Content>
                <Card.Actions>
                  <IconButton
                    icon='check'
                    mode='none'
                    onPress={hideReminder}
                  />
                </Card.Actions>
              </Card>
            </Modal>
          </Portal>

          {/* Repeats */}
          <List.Item
            title='Every day'
            left={() => <List.Icon icon='repeat'/>}
            right={() => <IconButton icon='pencil' style={{margin:0}} onPress={showRepeat}/>}
            style={{marginVertical:-5}}
          />
          <Divider style={{marginVertical:15}} />

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

          {/* Repeat modal */}
          <Portal>
            <Modal visible={repeatVisible} onDismiss={hideRepeat} style={{marginHorizontal:15}}>
              <Card>
              <Card.Content>
                  <List.Item
                    title='Does not repeat'
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
                    title='Every day'
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
                    title='Every week'
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
                    title='Every month'
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
                    title='Every year'
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
                </Card.Content>
                <Card.Actions>
                  <IconButton
                    icon='check'
                    mode='none'
                    onPress={hideReminder}
                  />
                </Card.Actions>
              </Card>
            </Modal>
          </Portal>

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
              onPress={() => navigation.navigate('Tasks')}
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
                  <Button mode='contained' buttonColor={theme.colors.error} onPress={() => navigation.navigate('Tasks')}>
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