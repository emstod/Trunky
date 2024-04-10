import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Card, IconButton, Surface, Checkbox, FAB, Button, useTheme } from 'react-native-paper'

function TaskSingle({ navigation }) {
  const theme = useTheme()

  return (
    <Surface 
      style={{marginBottom:10, padding:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderRadius:10, maxWidth:'100%'}}
      mode='flat'
      elevation='4'
      onPress={() => navigation.navigate('TasksDetail')}>
        <Checkbox
          onPress={() => {}}
        />
        <Button
          mode='text'
          textColor={theme.colors.secondary}
          style={{flexBasis:'80%', flexShrink:1, marginLeft:-20}}
          onPress={()=>navigation.navigate('TasksDetail', {taskName:'Module 11 Homework'})}
        >
          Module 11 Homework
        </Button>
        <IconButton 
            mode="contained-tonal"
            containerColor={theme.colors.tertiaryContainer}
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
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  )
}