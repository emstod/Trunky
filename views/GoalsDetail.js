import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Text, Chip, IconButton, useTheme, Portal, Modal, Card, Button, Surface, Divider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { BACKEND_IP } from '@env'

export default function GoalsDetail({ route }) {
  const navigation = useNavigation()
  const goalDetails = route.params['goalDetails']
  const theme = useTheme()

  const [goalsDetailDeleteVisible, setGoalsDetailDeleteVisible] = React.useState(false)
  const [completed, setCompleted] = React.useState(goalDetails.completed)
  const showDelete = () => setGoalsDetailDeleteVisible(true)
  const hideDelete = () => setGoalsDetailDeleteVisible(false)

  return (
    <View>
      <ScrollView>
        <View style={{paddingHorizontal:15, paddingTop:75, paddingBottom:20}}>
          <Text variant='headlineLarge' style={{flexShrink:1, flexBasis:'80%'}}>{goalDetails.title}</Text>
          <View style={{display:'flex', flexDirection:'row', gap:15, alignItems:'center', marginVertical:8}}>
            <View style={{display:'flex', flexDirection:'row'}}>
              <IconButton 
                icon="plus"
                mode="outlined"
                size={10}
                onPress={async () => {
                  let today = new Date()
                  let newCompleted = completed + 1
                  let options = {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({completed: newCompleted})
                  }
                  try {
                    let response = await fetch(`http://${BACKEND_IP}:3000/goalcomplete/${goalDetails.id}/${today.toDateString()}`, options)
                    let jsonResponse = await response.json()
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
                  let options = {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({completed: newCompleted})
                  }
                  try {
                    let response = await fetch(`http://${BACKEND_IP}:3000/goalcomplete/${goalDetails.id}/${today.toDateString()}`, options)
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
          {goalDetails.description ? <Text variant='bodyLarge' style={{marginVertical:8}}>{goalDetails.description}</Text> : <></>}
          

          <View style={{flexDirection:'row', marginVertical:15}}>
            <Chip><Text variant='labelLarge'>Category:</Text> <Text>{goalDetails.category}</Text></Chip>
          </View>

          <Divider style={{marginVertical:15}} />
          

          {/* Tasks */}
          <Text variant='headlineSmall'>Linked Tasks</Text>
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
            <Modal visible={goalsDetailDeleteVisible} onDismiss={hideDelete} style={{marginHorizontal:15}}>
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
                      let options = {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json'
                        }
                      }
                      try {
                        let response = await fetch(`http://${BACKEND_IP}:3000/goals/${goalDetails.id}`, options)
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