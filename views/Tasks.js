import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Card, IconButton, Surface, Checkbox, FAB, Button, useTheme, Chip, Text, Switch } from 'react-native-paper'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { BACKEND_IP } from '@env'
import { useEffect, useState, useCallback } from 'react'

export function TaskSingle({task, categoryMode}) {
  const theme = useTheme()
  const navigation = useNavigation()
  const [completed, setCompleted] = useState(task.completed)

  useEffect(() => {
    setCompleted(task.completed)
  }, [task])

  return (
    <Surface 
      style={{marginBottom:10, padding:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderRadius:10, maxWidth:'100%'}}
      mode='flat'
      elevation='4'
      onPress={() => navigation.navigate('TasksDetail')}>
        <Checkbox
          status={completed ? 'checked' : 'unchecked'}
          onPress={async () => {
            let payloadObject = {
              id: task.id,
              title: task.title,
              date: task.date,
              description: task.description,
              completed: task.completed,
              category: task.category
            }
            payloadObject.completed = !payloadObject.completed
            let options = {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(payloadObject)
            }
            try {
              let response = await fetch(`http://${BACKEND_IP}:3000/tasks/${payloadObject.id}`, options)
              let jsonResponse = await response.json()
              task.completed = !task.completed
              setCompleted(task.completed)
            } catch(error) {
              console.error(error)
            }
          }}
        />
        <View style={{flexBasis:'90%', flexShrink:1, alignItems:'flex-start', flexDirection:'column'}}>
          <Button
            mode='text'
            textColor={theme.colors.secondary}
            onPress={()=>navigation.navigate('TasksDetail', {taskDetails: task})}
          >
            {task.title}
          </Button>
          {categoryMode ? <Chip style={{marginHorizontal:10}}><Text variant='labelSmall'>Due:</Text> <Text variant='bodySmall'>{task.date}</Text></Chip> :
          <Chip style={{marginHorizontal:10}}><Text variant='labelSmall'>Category:</Text> <Text variant='bodySmall'>{task.category}</Text></Chip>}
        </View>
        <IconButton 
          icon="pencil"
          mode="contained-tonal"
          size={20}
          onPress={()=>navigation.navigate('TasksEdit', {taskDetails: task})}
        />
    </Surface>
  )
}

function TaskGroup({listWithHeader: listWithHeader, categoryMode: categoryMode}) {
  const tasksList = [...listWithHeader]

  // Get the header and modify it if it's a date
  let header = tasksList.shift()
  if (!categoryMode) header = header.slice(4, 10)

  return (
    <Card style={{margin:10}}>
      <Card.Title title={header} titleVariant='titleLarge' />
      <Card.Content>
        {
          tasksList.map((task) =>
            <TaskSingle task={task} categoryMode={categoryMode} />
          )
        }
      </Card.Content>
    </Card>
  )
}

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [categoryMode, setCategoryMode] = useState(false)

  const onToggleSwitch = () => setCategoryMode(!categoryMode)

  useFocusEffect(
    useCallback(() => {
      async function fetchTasks() {
        let options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
        try {
          console.log('Loading tasks data from server')
          const response = await fetch(`http://${BACKEND_IP}:3000/tasks/${categoryMode ? 'category' : 'date'}`, options)
          setTasks(await response.json())
        } catch(error) {
          console.error(error)
        }
      }
      fetchTasks()
      return () => {}
    }, [categoryMode])
  )

  const navigation = useNavigation()
  return (
    <View style={{height:'100%'}}>
      <FAB
        icon="plus"
        style={{position:'absolute', margin:16, right:0, bottom:0, zIndex:1}}
        onPress={() => {
          navigation.navigate('TasksEdit', {
            taskDetails: {
              id: '',
              title: '',
              date: '',
              description: '',
              completed: false,
              category: ''
            }
          })
        }}
      />

      <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginHorizontal:10, marginTop:5}}>
        <Text variant='labelLarge'>Category View</Text>
        <Switch value={categoryMode} onValueChange={onToggleSwitch} />
      </View>

      <ScrollView>
        {
          tasks.map((listWithHeader) =>
            <TaskGroup listWithHeader={listWithHeader} categoryMode={categoryMode} />
          )
        }
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  )
}