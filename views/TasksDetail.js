import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Text, Icon, IconButton, useTheme, Portal, Modal, Card, Button, Surface, List } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default function TasksDetail({ route }) {
  const navigation = useNavigation()
  const taskName = route.params['taskName']
  const theme = useTheme()

  const [deleteVisible, setDeleteVisible] = React.useState(false)
  const showDelete = () => setDeleteVisible(true)
  const hideDelete = () => setDeleteVisible(false)

  return (
    <View>
      <ScrollView>
        <View style={{paddingHorizontal:15, paddingTop:75, paddingBottom:20}}>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <Text variant='headlineLarge' style={{flexShrink:1, flexBasis:'80%'}}>{taskName}</Text>
            <IconButton
              mode='contained'
              containerColor={theme.colors.tertiaryContainer}
            />
          </View>
          <Text variant='labelLarge' style={{paddingVertical:8}}>January 5, 2024</Text>
          <Text variant='bodyLarge' style={{paddingVertical:15}}>This is the task description.</Text>
          <View style={{paddingVertical:15, display:'flex', flexDirection:'row', gap:10}}>
            <Icon
              source='bell'
              size={20}
            />
            <Text>1 day before</Text>
          </View>
          <View style={{paddingVertical:15, display:'flex', flexDirection:'row', gap:10}}>
            <Icon
              source='repeat'
              size={20}
            />
            <Text>Every day</Text>
          </View>

          {/* Goals */}
          <Surface
            style={{marginVertical:15, paddingHorizontal:15, paddingVertical:10, borderRadius:10, display:'flex', flexDirection:'column', alignItems:'flex-start'}}
            mode='flat'
            elevation='4'>
              <Button
                icon='bullseye-arrow'
                onPress={() => {
                  navigation.navigate('GoalsStack', {
                    screen:'GoalsDetail',
                    initial: false,
                    params: {goalName: 'Finish homework before Netflix'}
                  })
                }}
              >
                Finish homework before Netflix
              </Button>
              <Button
                icon='bullseye-arrow'
                onPress={() => {
                  navigation.navigate('GoalsStack', {
                    screen:'GoalsDetail',
                    initial: false,
                    params: {goalName: 'Get A\'s this semester'}
                  })
                }}
              >
                Get A&apos;s this semester
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
              onPress={() => navigation.navigate('TasksEdit', {taskName:'Module 11 Homework'})}
            />
            <IconButton
              icon='check-bold'
              mode='contained'
              size={20}
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