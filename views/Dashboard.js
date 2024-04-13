import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Card, Text, IconButton, Checkbox, List } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default function Dashboard() {
  const navigation = useNavigation()
  return (
    <View>
      <ScrollView style={{marginTop:50}}>
        <Text variant='displaySmall' style={{margin:15}}>Hi, Milly</Text>
        <Card style={{marginHorizontal:15, marginVertical:7}}>
          <Card.Content>
            <Text variant="bodyMedium">"People are capable, at any time in their lives, of doing what they dream of."</Text>
            <Text variant="labelSmall">-Paul Coelho</Text>
          </Card.Content>
        </Card>
        <View style={{display:'flex', flexDirection:'row', marginHorizontal:15, marginVertical:7, justifyContent: 'space-between'}}>
          <Card style={{flexBasis:'48%'}}>
            <Card.Title title='Happening Now' titleVariant='labelLarge' />
            <Card.Content>
              <Text variant='headlineMedium'>9:00 am</Text>
              <Text variant='bodyMedium'>Meeting w/ Abigail</Text>
            </Card.Content>
          </Card>
          <Card style={{flexBasis:'48%'}}>
            <Card.Title title='Next Up' titleVariant='labelLarge' />
            <Card.Content>
              <Text variant='headlineMedium'>10:30 am</Text>
              <Text variant='bodyMedium'>CS Class</Text>
            </Card.Content>
          </Card>
        </View>
        <Card style={{marginHorizontal:15, marginVertical:7}} onPress={() => navigation.navigate('TasksStack')}>
          <Card.Title title='Today&apos;s To Do' titleVariant='labelLarge' />
          <Card.Content>
            <List.Item
              title='Python project'
              left={() => <Checkbox
                onPress={() => {}}
              />}
              style={{paddingVertical:0}}
            />
            <List.Item
              title='Buy gift for Mom'
              left={() => <Checkbox
                onPress={() => {}}
              />}
              style={{paddingVertical:0}}
            /><List.Item
            title='Grocery shopping'
            left={() => <Checkbox
              onPress={() => {}}
            />}
            style={{paddingVertical:0}}
          />
          </Card.Content>
        </Card>
        <Card style={{marginHorizontal:15, marginVertical:7}} onPress={() => navigation.navigate('Goals')}>
          <Card.Title title='Goals' titleVariant='labelLarge' />
          <Card.Content>
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
            <List.Item
              title='10/20'
              left={() => <IconButton 
                icon="plus"
                mode="outlined"
                size={10}
                onPress={() => {}}
              />}
              description="Read for 20 minutes"
              style={{paddingVertical:0}}
            />
            <List.Item
              title='3/8'
              left={() => <IconButton 
                icon="plus"
                mode="outlined"
                size={10}
                onPress={() => {}}
              />}
              description="Drink 8 glasses of water"
              style={{paddingVertical:0}}
            />
          </Card.Content>
        </Card>
      </ScrollView>
      <StatusBar style='auto' />
    </View>
  )
}