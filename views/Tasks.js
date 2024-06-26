import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Card, IconButton, Surface, Checkbox, FAB, Button, useTheme, Chip, Text, Switch } from 'react-native-paper'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { useEffect, useState, useCallback, useContext } from 'react'
import { UserContext } from '../App'

export function TaskSingle({task, categoryMode}) {
  const navigation = useNavigation()
  const [completed, setCompleted] = useState(task.completed)
  const [userContext, setUserContext] = useContext(UserContext)

  useEffect(() => {
    setCompleted(task.completed)
  }, [task])

  return (
    <Surface 
      style={{marginBottom:10, padding:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderRadius:10, maxWidth:'100%'}}
      mode='flat'
      elevation='4'
      onPress={() => {
        navigation.navigate('TasksStack', {
          screen:'TasksDetail',
          initial: false,
          params: {taskId: task.id}
        })
      }}>
        <Checkbox
          status={completed ? 'checked' : 'unchecked'}
          onPress={async () => {
            // Set completed or not completed
            task.completed = !task.completed
            setCompleted(task.completed)

            // Create an object to do the update with
            let payloadObject = {
              id: task.id,
              title: task.title,
              date: task.date,
              description: task.description,
              completed: task.completed,
              category: task.category
            }
            let options = {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': userContext
              },
              body: JSON.stringify({...payloadObject, initial_date:taskDetails.date})
            }
            // Make the API update call
            try {
              let response = await fetch(`https://trunky.site/tasks/${payloadObject.id}`, options)
              let jsonResponse = await response.json()

              // Revert if the API call wasn't successful
              if(jsonResponse.message != 'Success') {
                task.completed = !task.completed
                setCompleted(task.completed)
              }
            } catch(error) {
              console.error(error)
            }
          }}
        />
        <View style={{flexBasis:'90%', flexShrink:1, alignItems:'flex-start', flexDirection:'column'}}>
          <Button
            mode='text'
            onPress={() => {
              navigation.navigate('TasksStack', {
                screen:'TasksDetail',
                initial: false,
                params: {taskId: task.id, taskDate: task.date}
              })
            }}
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
          onPress={()=> {
            navigation.navigate('TasksStack', {
              screen: 'TasksEdit',
              initial: false,
              params: {taskDetails: task}
            })
          }}
          
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
            <TaskSingle key={task.id} task={task} categoryMode={categoryMode} />
          )
        }
      </Card.Content>
    </Card>
  )
}

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [end, setEnd] = useState(false)
  const [categoryMode, setCategoryMode] = useState(false)
  const [page, setPage] = useState(0)
  const [userContext, setUserContext] = useContext(UserContext)

  const onToggleSwitch = () => setCategoryMode(!categoryMode)

  const theme = useTheme()

  useFocusEffect(
    useCallback(() => {
      async function fetchTasks() {
        setPage(0)
        let options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': userContext
          }
        }
        try {
          let response = []
          console.log('Loading tasks data from server')
          if (categoryMode) {
            response = await fetch(`https://trunky.site/tasks?listtype=category`, options)
          } else {
            response = await fetch(`https://trunky.site/tasks?listtype=date&page=${page}`, options)
          }
          const data = await response.json()
          setTasks(data.tasks)
          setEnd(data.end)
        } catch(error) {
          console.error(error)
        }
      }
      fetchTasks()
      return () => {}
    }, [categoryMode])
  )

  useEffect(() => {
    async function fetchTasks() {
      let options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': userContext
        }
      }
      try {
        let response = []
        console.log('Loading tasks data from server')
        if (categoryMode) {
          response = await fetch(`https://trunky.site/tasks?listtype=category`, options)
        } else {
          response = await fetch(`https://trunky.site/tasks?listtype=date&page=${page}`, options)
        }
        const data = await response.json()
        setTasks(data.tasks)
        setEnd(data.end)
      } catch(error) {
        console.error(error)
      }
    }
    fetchTasks()
    return () => {}
  }, [page])

  const navigation = useNavigation()
  return (
    <View style={{height:'100%'}}>
      <FAB
        icon="plus"
        style={{position:'absolute', margin:16, right:0, bottom:0, zIndex:1, backgroundColor:theme.colors.tasksContainer}}
        onPress={() => {
          navigation.navigate('TasksEdit', {
            taskDetails: {
              id: '',
              title: '',
              date: '',
              description: '',
              completed: false,
              category: '',
              recur: {
                Sunday: false,
                Monday: false,
                Tuesday: false,
                Wednesday: false,
                Thursday: false,
                Friday: false,
                Saturday: false
              }
            }
          })
        }}
      />

      <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginHorizontal:5, marginTop:5}}>
        <Button
          icon='arrow-up'
          mode='text'
          onPress={() => {
            setPage(page + 1)
          }}
          disabled={end}
        >
          Show more
        </Button>
        <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
          <Text variant='labelLarge'>Category View</Text>
          <Switch value={categoryMode} onValueChange={onToggleSwitch} />
        </View>
      </View>

      <ScrollView>
        { tasks.length > 0 ? (
          tasks.map((listWithHeader) =>
            <TaskGroup key={listWithHeader[0]} listWithHeader={listWithHeader} categoryMode={categoryMode} />
          ) ) : (
            <Card style={{margin:10}}>
              <Card.Content>
                <Text variant='bodyLarge'>No future tasks</Text>
              </Card.Content>
            </Card>
          )
        }
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  )
}