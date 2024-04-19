import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Text, Chip, IconButton, useTheme, Portal, Modal, Card, Button, Surface, List } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default function GoalsDetail({ route }) {
  const navigation = useNavigation()
  const goalDetails = route.params['goalDetails']
  const theme = useTheme()

  const [deleteVisible, setDeleteVisible] = React.useState(false)
  const [completed, setCompleted] = React.useState(goalDetails.completed)
  const showDelete = () => setDeleteVisible(true)
  const hideDelete = () => setDeleteVisible(false)

  return (
    <View>
      <ScrollView>
        <View style={{paddingHorizontal:15, paddingTop:75, paddingBottom:20}}>
          <Text variant='headlineLarge' style={{flexShrink:1, flexBasis:'80%'}}>{goalDetails.title}</Text>
          {goalDetails.decription ? <Text variant='bodyLarge' style={{paddingVertical:15}}>{goalDetails.description}</Text> : <></>}
          <View style={{flexDirection:'row', marginVertical:15}}>
            <Chip><Text variant='labelLarge'>Category:</Text> <Text>{goalDetails.category}</Text></Chip>
          </View>
          <View style={{display:'flex', flexDirection:'row', gap:15, alignItems:'center'}}>
            <View style={{display:'flex', flexDirection:'row'}}>
              <IconButton 
                icon="plus"
                mode="outlined"
                size={10}
                onPress={async () => {
                  let today = new Date()
                  let newCompleted = completed + 1
                  console.log(`the new value is ${newCompleted}, ${typeof newCompleted}`)
                  let options = {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({completed: newCompleted})
                  }
                  try {
                    console.log('about to send fetch')
                    let response = await fetch(`http://192.168.1.178:3000/goalcomplete/${goalDetails.id}/${today.toDateString()}`, options)
                    console.log('returned')
                    console.log(await response.json())
                    console.log('got response')
                    goalDetails.completed++
                    setCompleted(goalDetails.completed)
                  } catch(error) {
                    console.error(error)
                  }
                }}
              />
              <IconButton 
                icon="minus"
                mode="outlined"
                size={10}
                onPress={async () => {
                  let today = new Date()
                  if (completed == 0) {
                    return
                  }
                  let newCompleted = completed - 1
                  console.log(`the new value is ${newCompleted}, ${typeof newCompleted}`)
                  let options = {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({completed: newCompleted})
                  }
                  try {
                    console.log('about to send fetch')
                    let response = await fetch(`http://192.168.1.178:3000/goalcomplete/${goalDetails.id}/${today.toDateString()}`, options)
                    console.log('returned')
                    console.log(await response.json())
                    console.log('got response')
                    goalDetails.completed--
                    setCompleted(goalDetails.completed)
                  } catch(error) {
                    console.error(error)
                  }
                }}
              />
            </View>
            <Text variant='titleMedium'>{`${goalDetails.completed}/${goalDetails.quantity} ${goalDetails.frequency}`}</Text>
          </View>
          

          {/* Tasks */}
          <Surface
            style={{marginVertical:15, paddingHorizontal:15, paddingVertical:10, borderRadius:10, display:'flex', flexDirection:'column', alignItems:'flex-start'}}
            mode='flat'
            elevation='4'>
              <Button
                icon='format-list-checks'
                onPress={() => {
                  navigation.navigate('TasksStack', {
                    screen:'TasksDetail',
                    initial: false,
                    params: {taskName: 'Email professor about extra credit'}
                  })
                }}
              >
                Email professor about extra credit
              </Button>
              <Button
                icon='format-list-checks'
                onPress={() => {
                  navigation.navigate('TasksStack', {
                    screen:'TasksDetail',
                    initial: false,
                    params: {taskName: 'Module 11 Homework'}
                  })
                }}
              >
                Module 11 Homework
              </Button>
          </Surface>
          
          {/* Buttons */}
          <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
            <IconButton
              icon='delete'
              mode='outlined'
              size={20}
              onPress={showDelete}
            />
            <IconButton
              icon='pencil'
              mode='outlined'
              size={20}
              onPress={() => navigation.navigate('GoalsEdit', {goalDetails:goalDetails})}
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
                        let response = await fetch(`http://192.168.1.178:3000/goals/${goalDetails.id}`, options)
                        console.log(await response.json())
                        navigation.navigate('Goals')
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