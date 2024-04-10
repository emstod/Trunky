import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Card, Text, IconButton, Surface, Checkbox, FAB } from 'react-native-paper'

function GoalSingle() {
  return (
    <Surface style={{marginBottom:10, padding:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderRadius:10, maxWidth:'100%'}} mode='flat' elevation='4'>
        <Checkbox />
        <Text style={{flexShrink:1}} variant='labelLarge'>Module 11 Homework</Text>
        <IconButton 
            mode="contained-tonal"
            onPress={() => {}}
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

function GoalGroup() {
  return (
    <Card style={{margin:10}}>
      <Card.Title title='Jan 05' titleVariant='titleLarge' />
      <Card.Content>
        <GoalSingle/>
        <GoalSingle/>
        <GoalSingle/>
      </Card.Content>
    </Card>
  )
}

export default function Goals({ navigation }) {
  return (
    <View>
      <FAB 
        icon="plus"
        style={{position:'absolute', margin:16, right:0, bottom:0, zIndex:1}}
        onPress={() => {}}
      />
      <ScrollView>
        <GoalGroup/>
        <GoalGroup/>
        <GoalGroup/>
        <GoalGroup/>
        <GoalGroup/>
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  )
}