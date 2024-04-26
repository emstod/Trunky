import { StatusBar } from 'expo-status-bar'
import { View, ScrollView } from 'react-native'
import { Card, IconButton, Surface, List, FAB, useTheme } from 'react-native-paper'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState, useCallback } from 'react'
// import { BACKEND_IP } from '@env'

export function GoalSingle({goal}) {
  const navigation = useNavigation()
  const [completed, setCompleted] = React.useState(goal.completed)

  React.useEffect(() => {
    setCompleted(goal.completed)
  }, [goal])

  return (
    <Surface style={{marginBottom:10, padding:10, display: 'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderRadius:10, maxWidth:'100%'}} mode='flat' elevation='4'>
        <List.Item
          title={`${completed}/${goal.quantity}`}
          left={() => <IconButton
            icon="plus"
            mode="outlined"
            size={10}
            onPress={async () => {
              let today = new Date()
              let newCompleted = completed + 1
              let options = {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({completed: newCompleted})
              }
              try {
                let response = await fetch(`http://54.226.7.16/goalcomplete/${goal.id}/${today.toDateString()}`, options)
                let jsonResponse = await response.json()
                if(jsonResponse.message == 'Success') {
                  goal.completed++
                  setCompleted(jsonResponse.newCompleted)
                }
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
            onPress={() => {
              navigation.navigate('GoalsStack', {
                screen: 'GoalsDetail',
                initial: false,
                params: {goalId: goal.id}
              })
            }}
          />
          <IconButton 
            icon="pencil"
            mode="contained-tonal"
            size={20}
            // onPress={() => navigation.navigate('GoalsStack', 'GoalsEdit', {goalDetails:goal})}
            onPress={() => {
              navigation.navigate('GoalsStack', {
                screen: 'GoalsEdit',
                initial: false,
                params: {goalDetails: goal}
              })
            }}
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
            <GoalSingle key={goal.id} goal={goal} />
          )
        }
      </Card.Content>
    </Card>
  )
}

export default function Goals() {
  const theme = useTheme()
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
          console.log('Loading goals data from server')
          const response = await fetch(`http://54.226.7.16/goals?listtype=category`, options)
          setGoals(await response.json())
        } catch(error) {
          console.error(error)
        }
      }
      fetchGoals()
      return () => {}
    }, [])
  )

  const navigation = useNavigation()
  return (
    <View style={{height:'100%'}}>
      <FAB
        icon="plus"
        style={{position:'absolute', margin:16, right:0, bottom:0, zIndex:1, backgroundColor:theme.colors.goalsContainer}}
        onPress={() => {
          navigation.navigate('GoalsEdit', {
            goalDetails: {
              id: '',
              title: '',
              description: '',
              frequency: 'once',
              quantity: 1,
              category: ''
            }
          })
        }}
      />
      <ScrollView>
        {
          goals.map((categoryList) => 
            <GoalGroup key={categoryList[0]} categoryList={categoryList} />
          )
        }
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  )
}