import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Card, IconButton, Surface, List, FAB, Text } from 'react-native-paper'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState, useCallback } from 'react'

function GoalSingle({goal}) {
  const navigation = useNavigation()
  const [completed, setCompleted] = React.useState(goal.completed)

  return (
    <Surface style={{marginBottom:10, padding:10, display: 'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderRadius:10, maxWidth:'100%'}} mode='flat' elevation='4'>
        <List.Item
          title={`${goal.completed}/${goal.quantity}`}
          left={() => <IconButton
            icon="plus"
            mode="outlined"
            size={10}
            onPress={async () => {
              let today = new Date()
              let newCompleted = completed + 1
              console.log(`the new value is ${newCompleted}, ${typeof newCompleted}`)
              let options = {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({completed: newCompleted})
              }
              try {
                let response = await fetch(`http://192.168.1.178:3000/goalcomplete/${goal.id}/${today.toDateString()}`, options)
                let jsonResponse = await response.json()
                goal.completed++
                console.log(`Returned value is ${jsonResponse.newCompleted}`)
                setCompleted(jsonResponse.newCompleted)
              } catch(error) {
                console.error(error)
              }
            }}
          />}
          description={goal.title}
          style={{paddingVertical:0, flexBasis:'70%', flexShrink:1}}
          key={goal.id}
        />
        <View style={{display:'flex', flexBasis:'30%', flexDirection:'row'}}>
          <IconButton
            icon='dots-horizontal'
            mode="contained-tonal"
            size={20}
            onPress={() => navigation.navigate('GoalsDetail', {goalDetails:goal})}
          />
          <IconButton 
            icon="pencil"
            mode="contained-tonal"
            size={20}
            onPress={() => navigation.navigate('GoalsEdit', {goalDetails:goal})}
          />
        </View>
    </Surface>
  )
}

function GoalGroup({categoryList}) {
  const goalsList = [...categoryList]
  const category = goalsList.shift()

  return (
    <Card style={{margin:10}}>
      <Card.Title title={category} titleVariant='titleLarge' />
      <Card.Content>
        {
          goalsList.map((goal) =>
            <GoalSingle goal={goal} />
          )
        }
      </Card.Content>
    </Card>
  )
}

export default function Goals() {
  const [ goals, setGoals ] = React.useState([])

  useFocusEffect(
    React.useCallback(() => {
      async function fetchGoals() {
        let options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
        try {
          console.log('about to call fetch')
          // Home IP address
          const response = await fetch('http://192.168.1.178:3000/goals', options)
          // const response = await fetch('http://192.168.137.77:3000/goals', options)
          // const response = await fetch('http://172.27.147.47:3000/goals', options)
          // const response = await fetch('http://10.37.154.140:3000/goals', options)
          foo = await response.json()
          setGoals(foo)
          console.log(foo)
        } catch(error) {
          console.error(error)
        }
      }
      fetchGoals()
      return () => {}
    }, [])
  )

  const navigation = useNavigation()
  const users = [
    {name: 'Anson', language: 'JavaScript'},
    {name: 'Barbara', language: 'Python'}
  ]
  return (
    <View style={{height:'100%'}}>
      <FAB
        icon="plus"
        style={{position:'absolute', margin:16, right:0, bottom:0, zIndex:1}}
        onPress={() => {
          navigation.navigate('GoalsEdit', {
            goalDetails: {
              id: '',
              title: '',
              description: '',
              frequency: 'once',
              quantity: 1,
              categoryId: 1
            }
          })
        }}
      />
      <ScrollView>
        {
          goals.map((categoryList) => 
            <GoalGroup categoryList={categoryList} />
          )
        }
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  )
}