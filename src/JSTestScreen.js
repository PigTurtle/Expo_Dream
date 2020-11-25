import React, { Component, useState, useRef, useEffect } from 'react';
import { Dimensions, View, StyleSheet, TouchableOpacity, Pressable, TouchableWithoutFeedback, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useDerivedValue, withSpring, 
    useAnimatedStyle, repeat, delay, useAnimatedGestureHandler, withTiming, sequence  } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Box = (props) => {
    const x = useSharedValue(props.object.x);
    const y = useSharedValue(props.object.y);

    const panHandler = useAnimatedGestureHandler( {
        onStart: (_, ctx) => {
            ctx.startX = x.value;
            ctx.startY = y.value;
            ctx.dragged = false;
        },
        onActive: (event, ctx) => {
            if (ctx.dragged == false) {
                ctx.dragged = true;
                // in the middle of dragging
            }
            x.value = ctx.startX + event.translationX;
            y.value = ctx.startY + event.translationY;
        },
        onFinish: (_, ctx) => {
            if (ctx.dragged == true) {
                // dragging is done.
                props.update(props.object.id, x.value, y.value);
            }
        }
    });

    const animatedStyle = useAnimatedStyle( ()=> {
        return {
            left: 0, 
            top: 0,
            width: 100,
            height: 100,
            position: 'absolute',
            backgroundColor: props.object.color,
            color: 'white',
            //zIndex: y.value*scale.value,
            transform: [ 
                {translateX: x.value },
                {translateY: y.value },
                //{scale: scale.value },
                //{rotate: `${angle.value}deg` }
            ]
        }
    });
    return (
        <PanGestureHandler onGestureEvent={panHandler} >
            <Animated.View style={animatedStyle} >
                <Text style={styles.text}>{props.object.id}</Text>
            </Animated.View>
        </PanGestureHandler>
    );
}

const JSTestScreen = (props) => {
    console.log("Dimension", Dimensions.get("screen"));
    const [boxes, setBoxes ] = useState([
        { id: "box 1", x: 10, y: 0, width: 100, height: 100, color: 'blue'},
        { id: "box 2", x: 130, y: 0, width: 100, height: 100, color: 'blue'},
        { id: "box 3", x: 250, y: 0, width: 100, height: 100, color: 'blue'},
        { id: "box 4", x: 370, y: 0, width: 100, height: 100, color: 'blue'},
    ]);

    useEffect(()=> {
        const getData = async () => {
            const result = await AsyncStorage.getItem('boxesNew');
            console.log("result", result);
            if (result != null) {
                const json = await JSON.parse(result);
                setBoxes(json);
            }
        }
        getData();
    }, []);

    const intersect = ( x, y, w, h, x1, y1, w1, h1) => 
        y + h >= y1 && y1 + h1 >= y && x + w >= x1 && x1 + w1 >= x;

    const update = (id, x, y) => {
        let myBoxes = JSON.parse(JSON.stringify(boxes));
        myBoxes = myBoxes.map( (item) => {
            return {...item, color: 'blue'};
        })
        myBoxes = myBoxes.map((item)=> item.id == id ? { ...item, x: x, y: y} : item);
        myBoxes = myBoxes.map( (item)=> {
            if (item.id == id) return item;
            if (intersect(x, y, 100, 100, item.x, item.y, item.width, item.height )) {
                return { ...item, color: 'orange'};
            } else return item;
        });
        AsyncStorage.setItem('boxesNew', JSON.stringify(myBoxes));
        setBoxes(myBoxes);
    }

    

    return (
        <View style={[styles.absoluteContainer]}>
            {
                boxes.map ( item => <Box key={item.id} object={item}
                    update={update}
                /> )
            }
        </View>
    );
}

export default JSTestScreen;

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
        width: 100, 
        height: 100,
        backgroundColor: "blue",
    },
    item: {
        width: 100, 
        height: 100,
        backgroundColor: 'orange',
    },
    text: {
        flex:1,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center'
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
        justifyContent: 'space-around'
    },
    border: {
        borderColor: 'white',
        borderWidth: 1,
        borderStyle: 'dashed',
    }
});