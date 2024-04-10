import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Card, Text, IconButton, Surface, Checkbox, FAB } from 'react-native-paper'

function TaskSingle({ navigation }) {
  return (
    <Surface style={{marginBottom:10, padding:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderRadius:10, maxWidth:'100%'}} mode='flat' elevation='4'>
        <Checkbox
          onPress={() => {}}
        />
        <Text style={{flexBasis:'80%', flexShrink:1}} variant='labelLarge'>Module 11 Homework</Text>
        <IconButton 
            mode="contained-tonal"
            onPress={() => navigation.navigate('TasksCategory')}
          />
        <IconButton 
          icon="pencil"
          mode="contained-tonal"
          size={20}
          onPress={() => {}}
        />
    </Surface>
  )
}

function TaskGroup({ navigation }) {
  return (
    <Card style={{margin:10}}>
      <Card.Title title='Jan 05' titleVariant='titleLarge' />
      <Card.Content>
        <TaskSingle navigation={navigation}/>
        <TaskSingle navigation={navigation}/>
        <TaskSingle navigation={navigation}/>
      </Card.Content>
    </Card>
  )
}

export default function Tasks({ navigation }) {
  return (
    <View>
      <FAB 
        icon="plus"
        style={{position:'absolute', margin:16, right:0, bottom:0, zIndex:1}}
        onPress={() => {}}
      />
      <ScrollView>
        <TaskGroup navigation={navigation}/>
        <TaskGroup navigation={navigation}/>
        <TaskGroup navigation={navigation}/>
        <TaskGroup navigation={navigation}/>
        <TaskGroup navigation={navigation}/>
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  )
}