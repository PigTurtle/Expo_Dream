import React, { Component,  }  from 'react';
import { Animated, Dimensions } from 'react-native';


const SQUARE_H = 100;
const SQUARE_W = 100;
const WINDOW_H = Dimensions.get('window').height;
const WINDOW_W = Dimensions.get('window').width;

export class RotatingSquare extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: new Animated.Value(0),
    };
  }

  componentWillMount () {
    this.translateX = this.state.value.interpolate({
      inputRange: [0, 1],
      outputRange: [0, WINDOW_W/2],
      // extrapolate : 'extend' | 'identity' | 'clamp',
      // extrapolateRight : 'extend' | 'identity' | 'clamp',
      // extrapolateLeft : 'extend' | 'identity' | 'clamp',
    });

    this.rotate = this.state.value.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    })
  }

  componentDidMount () {
    Animated.timing(this.state.value, {
      duration: 1000,
      toValue: 1,
      delay: 2000,
      useNativeDriver:true,
    }).start();
  }

  getTransform () {
    return {
      transform: [
        {translateX: this.translateX},
        {rotate: this.rotate}
      ]
    }
  }

  render () {
    return (
      <Animated.View style={[objectStyles.square, this.getTransform()]}/>
    )
  }
}

const objectStyles = {
    square : {
        position: 'absolute',
        left : 0,
        height: SQUARE_H,
        width: SQUARE_W,
        backgroundColor: '#ff0000',
      }
  }