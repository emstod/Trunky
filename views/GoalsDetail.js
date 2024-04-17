import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Text, Icon, IconButton, useTheme, Portal, Modal, Card, Button, Surface, List } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default function GoalsDetail({ route }) {
  const navigation = useNavigation()
  const goalDetails = route.params['goalDetails']
  const theme = useTheme()

  const [deleteVisible, setDeleteVisible] = React.useState(false)
  const showDelete = () => setDeleteVisible(true)
  const hideDelete = () => setDeleteVisible(false)

  return (
    <View>
      <ScrollView>
        <View style={{paddingHorizontal:15, paddingTop:75, paddingBottom:20}}>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <Text variant='headlineLarge' style={{flexShrink:1, flexBasis:'80%'}}>{goalDetails.title}</Text>
            <IconButton
              mode='contained'
              containerColor={theme.colors.tertiaryContainer}
            />
          </View>
          <Text variant='bodyLarge' style={{paddingVertical:15}}>{goalDetails.description}</Text>
          <View style={{display:'flex', flexDirection:'row', gap:15, alignItems:'center'}}>
            <View style={{display:'flex', flexDirection:'row'}}>
              <IconButton 
                icon="plus"
                mode="outlined"
                size={10}
                onPress={() => {}}
              />
              <IconButton 
                icon="minus"
                mode="outlined"
                size={10}
                onPress={() => {}}
              />
            </View>
            <Text variant='titleMedium'>{`0/${goalDetails.quantity} ${goalDetails.frequency}`}</Text>
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