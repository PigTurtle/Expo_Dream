import React, { Component, useState, useRef } from 'react';
import { Dimensions, View, StyleSheet, TouchableOpacity, Pressable, TouchableWithoutFeedback } from 'react-native';
import { Modal, Text, Button, TouchableRipple } from 'react-native-paper';
import { State, TapGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, useSharedValue, useDerivedValue, interpolateColors, withSpring, useAnimatedStyle, repeat, delay, useAnimatedGestureHandler, withTiming, sequence, EasingNode } from 'react-native-reanimated';


const Box = (props) => {
    const x = useSharedValue(100);
    const y = useSharedValue(10);
    const color = useSharedValue("blue");
    const scale = useSharedValue(1);
    
    const blink = () => {
        console.log(props.myName);
        scale.value = sequence( withTiming(0.8), repeat( withTiming(1.2), -1, true) );
    }

    const animatedStyle = useAnimatedStyle( ()=> {
        return {
            borderRadius: 5,
            elevation: 10,
            width: x.value,
            backgroundColor: color.value,
            transform: [ 
                {translateX: x.value },
                {translateY: y.value },
                { scale: scale.value }
            ]
        }
    });
    return (
        <Animated.View style={[ styles.box, animatedStyle ]} >
            <TouchableWithoutFeedback onPress={blink} >
                <Text style={styles.commandText} >�대� �띿뒪��</Text>
            </TouchableWithoutFeedback>
        </Animated.View>
    );
}

export class ReanimatedScreen2 extends React.Component {
    constructor(props) {
        super(props);
        this.name = 'bseo';
        this.state = {
            backgroundColor: 'blue',
            offsetY: 0,
        };
    }
    moveDown = () => this.setState( {offsetY: this.state.offsetY+ 10})
    
    render() {
        let animatedStyle = { transform: [ { translateY:  this.state.offsetY } ] };
        return (
            <View style={styles.absoluteContainer}>
                <Button onPress={this.moveDown}>View �꾨옒濡� �대룞</Button>
                <View style={[styles.container, {backgroundColor: 'yellow'}, animatedStyle]} >
                    <Box myName="box 1" style={[styles.absoluteContainer, styles.box]} />
                    <Box myName="box 2" style={[styles.absoluteContainer, styles.box]} />
                    <Box myName="box 3" style={[styles.absoluteContainer, styles.box]} />
                    <Box myName="box 4" style={[styles.absoluteContainer, styles.box]} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },
    absoluteContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    box: {
        width: 80,
        height: 80,
        backgroundColor: "blue",
    },
    commandText: {
        flex:1,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white'
    },
    wrapRowContainer: {
        flex: 1, 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'flex-start'
    },
    border: {
        borderColor: 'yellow',
        borderWidth: 10,
        borderStyle: 'dashed',
    }
});