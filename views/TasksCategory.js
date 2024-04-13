import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Card, Text, IconButton, Surface, Checkbox, FAB } from 'react-native-paper'
import { TaskSingle } from './Tasks.js'
import { useNavigation } from '@react-navigation/native'

function TaskGroup() {
  const navigation = useNavigation()
  return (
    <Card style={{margin:10}}>
      <Card.Title title='Jan 05' titleVariant='titleLarge' />
      <Card.Content>
        <TaskSingle />
      </Card.Content>
    </Card>
  )
}

export default function TasksCategory() {
  const navigation = useNavigation()
  return (
    <View>
      <FAB 
        icon="plus"
        style={{position:'absolute', margin:16, right:0, bottom:0, zIndex:1}}
        onPress={() => {}}
      />
      <ScrollView>
        <TaskGroup/>
        <TaskGroup/>
        <TaskGroup/>
        <TaskGroup/>
        <TaskGroup/>
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  )
}