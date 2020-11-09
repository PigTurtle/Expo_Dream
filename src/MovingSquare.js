import React from 'react';
import { Animated, View } from 'react-native';

export class MovingSquare extends React.Component {
    constructor (props) {
      super(props);
      this.state = { 
      animation: new Animated.Value(0),
      };
    }
  
    componentDidMount() {
      Animated.timing(
        this.state.animation,
        {
          toValue: 250,
          duration: 1000,
          useNativeDriver:true,
        }
      ).start();
    }
  
    render() {
      const animationStyles = {
        transform: [
          { translateY: this.state.animation }
        ]
      };
  
      return (
        <Animated.View style={[objectStyles.object, animationStyles]}>
        </Animated.View>
      );
    }
  }

  const objectStyles = {
    object: {
        position: 'absolute',
        top : 0,
      backgroundColor: 'orange',
      width: 100,
      height: 100
    }
  }