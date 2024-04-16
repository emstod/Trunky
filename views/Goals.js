import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Card, IconButton, Surface, List, FAB } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

function GoalSingle() {
  const navigation = useNavigation()
  return (
    <Surface style={{marginBottom:10, padding:10, display: 'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderRadius:10, maxWidth:'100%'}} mode='flat' elevation='4'>
        <List.Item
          title='0/1'
          left={() => <IconButton
            icon="plus"
            mode="outlined"
            size={10}
            onPress={() => {}}
          />}
          description="Finish homework before Netflix"
          style={{paddingVertical:0, flexBasis:'70%', flexShrink:1}}
        />
        <View style={{display:'flex', flexBasis:'30%', flexDirection:'row'}}>
          <IconButton
            icon='dots-horizontal'
            mode="contained-tonal"
            size={20}
            onPress={() => navigation.navigate('GoalsDetail', {goalName:'Finish homework before Netflix'})}
          />
          <IconButton 
            icon="pencil"
            mode="contained-tonal"
            size={20}
            onPress={() => navigation.navigate('GoalsEdit', {goalName:'Finish homework before Netflix'})}
          />
        </View>
    </Surface>
  )
}

function GoalGroup() {
  return (
    <Card style={{margin:10}}>
      <Card.Title title='School' titleVariant='titleLarge' />
      <Card.Content>
        <GoalSingle/>
        <GoalSingle/>
        <GoalSingle/>
      </Card.Content>
    </Card>
  )
}

export default function Goals() {
  const navigation = useNavigation()
  return (
    <View>
      <FAB 
        icon="plus"
        style={{position:'absolute', margin:16, right:0, bottom:0, zIndex:1}}
        onPress={() => navigation.navigate('GoalsEdit', {goalName:''})}
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