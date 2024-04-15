import { View, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import { CalendarProvider, ExpandableCalendar, Timeline } from 'react-native-calendars'

export default function Schedule() {
  return (
    <CalendarProvider
      date={'2024-04-15'}
      showTodayButton
    >
      <ExpandableCalendar />
      <Timeline
      />
    </CalendarProvider>

  )
}