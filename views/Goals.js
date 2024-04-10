import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Card, Text, IconButton, Surface, List, FAB } from 'react-native-paper'

function GoalSingle() {
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
              description="30 Minute Walk Daily"
              style={{paddingVertical:0}}
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
      <Card.Title title='Work' titleVariant='titleLarge' />
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