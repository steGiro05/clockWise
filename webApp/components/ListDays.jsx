import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const SCREEN_WIDTH = Dimensions.get('window').width;

class SwiperComponent extends Component {
  render() {
    // Array di dati per i rettangoli numerati
    const data = Array.from({ length: 20 }, (_, i) => i + 1);

    return (
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        showsPagination={false}
        scrollEnabled={true}
        loop={false}
      >
        {data.map((item) => (
          <View key={item} style={styles.slide}>
            <Text style={styles.text}>Slide {item}</Text>
          </View>
        ))}
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    width: SCREEN_WIDTH,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default SwiperComponent;
