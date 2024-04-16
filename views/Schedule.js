import { View, ScrollView } from 'react-native'
import { Text, Button } from 'react-native-paper'
import { CalendarProvider, ExpandableCalendar, TimelineList, TimelineEventProps, CalendarUtils } from 'react-native-calendars'
import groupBy from 'lodash/groupBy'
import { useNavigation } from '@react-navigation/native'

export default function Schedule() {
  const navigation = useNavigation()

  const renderCustomEvent = (event) => {
    return (
      <Button
        onPress={() => navigation.navigate('ScheduleDetail', {eventName:event.title})}
        style={{margin:-7}}
        textColor='black'
      >
        {event.title}
      </Button>
    )
  }
  timelineEvents = [
    {
      start: `${CalendarUtils.getCalendarDateString(new Date(2024, 3, 15))} 09:30:00`,
      end: `${CalendarUtils.getCalendarDateString(new Date(2024, 3, 15))} 10:00:00`,
      title: 'Test event 1',
      summary: 'Test event description',
      color:'aliceblue'
    },
    {
      start: `${CalendarUtils.getCalendarDateString(new Date(2024, 3, 15))} 09:45:00`,
      end: `${CalendarUtils.getCalendarDateString(new Date(2024, 3, 15))} 10:30:00`,
      title: 'Test event 2',
      summary: 'Test event description'
    }
  ]

  timelineProps = {
    format24h: false,
    renderEvent: renderCustomEvent,
    onBackgroundLongPress: () => navigation.navigate('ScheduleEdit', {eventName:''})
  }

  eventsByDate = groupBy(timelineEvents, e => CalendarUtils.getCalendarDateString(e.start))

  return (
    <CalendarProvider
      date={'2024-04-15'}
      showTodayButton
    >
      <ExpandableCalendar />
      <TimelineList
        events={eventsByDate}
        showNowIndicator
        timelineProps={timelineProps}
        scrollToNow
      />
    </CalendarProvider>

  )
}