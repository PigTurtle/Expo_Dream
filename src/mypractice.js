import React, { Component, useState, useRef, useEffect } from 'react';
import { Dimensions, View, StyleSheet, TouchableOpacity, Pressable, TouchableWithoutFeedback } from 'react-native';
import { Modal, Text, Button, TouchableRipple } from 'react-native-paper';
import { State, TapGestureHandler, PanGestureHandler, RotationGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, useSharedValue, useDerivedValue, interpolateColors, withSpring, useAnimatedStyle, 
    repeat, delay, useAnimatedGestureHandler, withTiming, sequence, EasingNode, cancelAnimation } from 'react-native-reanimated';


const Box = (props) => {
    return(
        <View onLayout={(event) => {
            props.boxevent(props.object.id, event.nativeEvent.layout);
        }}>
            <Text style={{...styles.text, left: props.x, top: props.y}}>{props.object.id}</Text>
        </View>
    );
}

const Test = (props) => {
    // let box = { id: 'box 1', position:{x : 0, y: 0}};
    // let box2 = JSON.parse(JSON.stringify(box));
    // let box3 = {... box};
    // let boxes = [box, box2, box3];

    let boxes = [{id : 'box 1', x: 0, y: 0},
    {id : 'box 2', x: 100, y: 100},
    {id : 'box 3', x: 200, y: 200},
    {id : 'box 4', x: 300, y: 300},
    ];

    const setLayout = (id, layout) => {
        boxes.map((item) => item.id == id ? {...item, layout} : item);
    }   

    let boxesRender = boxes.map((item) => <Box key={item.id} object={item} x={item.x} y={item.y} boxevent={setLayout} />)

    // let another = boxes.map( (item) => {
    //     if(item.id == 'box 1')
    //         return {...item, id: 'box 5', y: 500};

    //     return item;
    // });

    // let anotherboxes = [];
    // for(let i=0; i < 4; i++)
    // {
    //     anotherboxes.push({id : `box ${i}`, x: 0, y: i * 100});
    // }

    return(
        <View style={styles.absoluteContainer}>
            <View style={{flex:1, backgroundColor: 'yellow'}}>
                {boxesRender}
            </View>
        </View>
    );
}

export default Test;

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
    menu: {
        height:36, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    box: {
        position: 'absolute',
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
    },
    text:{
        position: 'absolute',
        width : 100,
        height : 100,
        backgroundColor : 'blue',
        textAlign: 'center',
        textAlignVertical: 'center',
        color : 'white',
    },
});