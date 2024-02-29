import { StatusBar } from 'expo-status-bar'
import { Text, View, ScrollView } from 'react-native'

function TaskSingle() {
  return (
    <View className="bg-slate-100 p-2 rounded-lg mt-2">
      <Text>I'm a task yay!!</Text>
    </View>
  )
}

function TaskGroup() {
  return (
    <View className="mb-8">
      <Text className="font-black text-slate-800 text-2xl">Jan 05</Text>
      <TaskSingle/>
      <TaskSingle/>
      <TaskSingle/>
    </View>
  )
}

export default function Tasks() {
  return (
    <View className="flex flex-col gap-5 mt-10 ml-0.5 mr-5">
      <Text className="font-black text-slate-400 text-4xl">Tasks</Text>
      <ScrollView>
        <TaskGroup/>
        <TaskGroup/>
        <TaskGroup/>
        <TaskGroup/>
        <TaskGroup/>
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  )
}