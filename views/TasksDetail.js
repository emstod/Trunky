import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Text, Icon, IconButton, useTheme } from 'react-native-paper'

export default function TasksDetail({ route, navigation }) {
  const taskName = route.params['taskName']
  const theme = useTheme()
  return (
    <View>
      <ScrollView style={{marginHorizontal:15, marginVertical:75}}>
        <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <Text variant='headlineLarge' style={{flexShrink:1, flexBasis:'80%'}}>{taskName}</Text>
          <IconButton
            mode='contained'
            containerColor={theme.colors.tertiaryContainer}
          />
        </View>
        <Text variant='labelLarge' style={{paddingVertical:8}}>January 5, 2024</Text>
        <Text variant='bodyLarge'>This is the task description.</Text>
        <View style={{paddingVertical:15, display:'flex', flexDirection:'row', gap:10}}>
          <Icon
            source='bell'
            size={20}
          />
          <Text>1 day before</Text>
        </View>
        <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
          <IconButton
            icon='delete'
            mode='outlined'
            size={20}
            onPress={() => navigation.navigate('Tasks')}
          />
          <IconButton
            icon='pencil'
            mode='outlined'
            size={20}
            onPress={() => navigation.navigate('Tasks')}
          />
          <IconButton
            icon='check-bold'
            mode='contained'
            size={20}
            onPress={() => navigation.navigate('Tasks')}
          />
        </View>
      </ScrollView>
      <StatusBar />
    </View>
  )
}