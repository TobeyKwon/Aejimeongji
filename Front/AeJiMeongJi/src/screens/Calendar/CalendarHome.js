import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Avatar, Button, Card, Title, Typography} from 'react-native-paper';

import {Colors} from '../../constants/styles';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Navbar from './../../components/nav/Navbar';
import {useSelector} from 'react-redux';
import {format} from 'date-fns';
import axios from 'axios';
const url = 'http://i7d203.p.ssafy.io:8080';
const now = new Date();

const CalendarHome = ({navigation}) => {
  const dogId = useSelector(state => state.profile.id);

  const openModal = props => {
    console.log('데이터이지');
    console.log(props.dateString);
    axios
      .get(url + `/api/dog/${dogId}/calendar?date=${props.dateString}`)
      .then(response => {
        console.log('reponse찍기');
        console.log(response);
        if (response.status == 200) {
          console.log('오늘의 to-do');
          console.log(response.data);
        } else {
          console.log(error.response + '가이드받기에러');
        }
      });
  };

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );

  LocaleConfig.locales['calendarData'] = {
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Jan.',
      'Feb.',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul.',
      'Aug',
      'Sep.',
      'Oct.',
      'Nov.',
      'Dec.',
    ],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
    today: "Aujourd'hui",
  };
  LocaleConfig.defaultLocale = 'calendarData';

  return (
    <View style={styles.rootContainer}>
      {/* <Navbar /> */}
      <View style={styles.nav}>
        <Image
          style={styles.logo2}
          resizeMode="contain"
          source={require('../../Assets/image/logo2.png')}
        />
      </View>
      <View style={styles.contentbox}>
        <Calendar
          markingType={'period'}
          markedDates={{
            '2022-08-11': {
              marked: true,
              dotColor: '#50cebb',
              startingDay: true,
              color: '#51cebb',
              textColor: 'white',
              startingDay: true,
            },
            '2022-08-12': {
              marked: true,
              dotColor: '#50cebb',
              color: '#50cebb',
              textColor: 'white',
            },
            '2022-08-13': {
              dotColor: '#50cebb',

              color: '#50cebb',
              textColor: 'white',
              endingDay: true,
            },
          }}
          onDayPress={day => {
            setSelectedDate(day.dateString);
            openModal(day);
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('TodoUpload');
        }}
        style={{paddingLeft: 24}}>
        <Image
          style={styles.plusButton}
          resizeMode="contain"
          source={require('../../Assets/image/plusButton.png')}
          title="plusButton"
        />
      </TouchableOpacity>
    </View>
  );
};
export default CalendarHome;

const styles = StyleSheet.create({
  font: {
    fontFamily: 'ONE Mobile POP',
  },
  contentFont: {
    fontFamily: 'ONE Mobile Regular',
    fontWeight: 'bold',
  },

  mainText: {
    fontSize: 20,
    lineHeight: 40,
    letterSpacing: 4,
    color: Colors.contentText,
  },
  subText: {
    fontSize: 18,
    lineHeight: 40,
    letterSpacing: 4,
    color: Colors.contentText,
  },

  contentText: {
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 2,
    color: Colors.contentText,
  },
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.back100,
  },
  nav: {
    height: 50,
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  contentbox: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.back100,
  },

  logo2: {
    marginTop: 10,
    maxWidth: '50%',
    maxHeight: '60%',
  },
  runicon: {
    marginTop: 5,
    maxWidth: '70%',
    maxHeight: '60%',
  },
  calendarLogo: {
    marginTop: 5,
    marginRight: 10,
    maxWidth: '40%',
    maxHeight: '80%',
  },
  logo: {
    marginTop: 50,
    maxWidth: '60%',
    maxHeight: '30%',
  },
  item: {
    backgroundColor: Colors.back100,
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  plusButton: {
    borderWidth: 1,
    position: 'absolute',
    bottom: 60,
    right: 20,
    alignSelf: 'flex-end',
    marginTop: 5,

    maxWidth: '10%',
    maxHeight: '10%',
  },
});
