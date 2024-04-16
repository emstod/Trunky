import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Text, Icon, IconButton, useTheme, Portal, Modal, Card, Button, Surface, List } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default function ScheduleDetail({ route }) {
  const navigation = useNavigation()
  const eventName = route.params['eventName']
  const theme = useTheme()

  const [deleteVisible, setDeleteVisible] = React.useState(false)
  const showDelete = () => setDeleteVisible(true)
  const hideDelete = () => setDeleteVisible(false)

  return (
    <View>
      <ScrollView>
        <View style={{paddingHorizontal:15, paddingTop:75, paddingBottom:20}}>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <Text variant='headlineLarge' style={{flexShrink:1, flexBasis:'80%'}}>{eventName}</Text>
            <IconButton
              mode='contained'
              containerColor={theme.colors.tertiaryContainer}
            />
          </View>
          <Text variant='labelLarge' style={{paddingVertical:8}}>April 15, 8:00 am - April 15, 9:00 am</Text>
          <Text variant='bodyLarge' style={{paddingVertical:15}}>This is the event description.</Text>
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
                onPress={() => navigation.navigate('Goals')}
              >
                Finish homework before Netflix
              </Button>
              <Button
                icon='bullseye-arrow'
                onPress={() => navigation.navigate('Goals')}
              >
                Get A&apos;s this semester
              </Button>
          </Surface>

          <Surface
            style={{marginVertical:15, paddingHorizontal:15, paddingVertical:10, borderRadius:10, display:'flex', flexDirection:'column', alignItems:'flex-start'}}
            mode='flat'
            elevation='4'>
              <Button
                icon='format-list-checks'
                onPress={() => navigation.navigate('Tasks')}
              >
                Finish homework before Netflix
              </Button>
              <Button
                icon='format-list-checks'
                onPress={() => navigation.navigate('Tasks')}
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
              onPress={() => navigation.navigate('ScheduleEdit', {eventName: eventName})}
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