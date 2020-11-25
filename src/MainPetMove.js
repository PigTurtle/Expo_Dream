import React, { Component, useState, useRef, useEffect } from 'react';
import { Dimensions, View, Image, StyleSheet, TouchableOpacity, Pressable, TouchableWithoutFeedback } from 'react-native';
import { Modal, Text, Button, TouchableRipple } from 'react-native-paper';
import { State, TapGestureHandler, PanGestureHandler, RotationGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, useSharedValue, useDerivedValue, interpolateColors, withSpring, useAnimatedStyle, repeat, delay, useAnimatedGestureHandler, withTiming, sequence, EasingNode, cancelAnimation } from 'react-native-reanimated';


const Pet = (props) => {
    const x = useSharedValue(0);
    const y = useSharedValue(0);
    const color = useSharedValue("blue");
    const scale = useSharedValue(1);
    const [active, setActive] = useState(false);
    const ismove = useSharedValue(0);
    const rotate = useSharedValue(0);

    useEffect( ()=> {
        react(active);
    }, [active]);
      
    const react = () => {
        // 랜덤 패턴
        let pattern = Math.floor(Math.random()*10) % 4;

        if(pattern == 0)
        {
            reactchangescale();
        }
        else if(pattern == 1)
        {
            reactxmove();
        }
        else if(pattern == 2)
        {
            reactymove();
        }
        else if(pattern == 3)
        {
            reactrotate();
        }
    } 

    const reactchangescale = () => {
        scale.value = sequence(
            withTiming(0.9, {duration: 250}),
            repeat(withTiming(1.1, {duration: 500}), 3, true)
            , withTiming(1.0, {duration: 250,  ease: Easing.linear}));
        
        ismove.value = withTiming(0, {duration: 2000+100});
    }

    const reactxmove = () => {
        x.value = sequence(
            withTiming(x.value-40, {duration: 250}),
            repeat(withTiming(x.value+40+40, {duration: 500}), 3, true)
            , withTiming(x.value, {duration: 250, ease: Easing.linear}));

        ismove.value = withTiming(0, {duration: 2000+100});
    }

    const reactymove = () => {
        y.value = repeat(withTiming(y.value-80, { duration: 500}), 4, true);

        ismove.value = withTiming(0, {duration: 2000+100});
    }

    const reactrotate = () => {
        rotate.value = sequence(withTiming(360, { duration: 1000}), withTiming(0, { duration: 1000}));

        ismove.value = withTiming(0, {duration: 2000+100});
    }
    
    const panHandler = useAnimatedGestureHandler( {
        onStart: (_, ctx) => {
            // ctx.startX = x.value;
            // ctx.startY = y.value;
            // ctx.dragged = false;
        },
        onActive: (event, ctx) => {
            // if (ctx.dragged == false) {
            //     ctx.dragged = true;
            //     /* dragging를 처음 시작하게 된다면 */               
            // }
            // x.value = ctx.startX + event.translationX;
            // y.value = ctx.startY + event.translationY;
        },
        onFinish: (_, ctx) => {
            // if (ctx.dragged == true) {
            //     /* dragging을 했다면 */
            // }
        }
    });

    const onTap = () => {
        if(ismove.value == 0)
        {
            setActive(!active);
            ismove.value = withTiming(1, {duration : 100});
        }
    }

    const animatedStyle = useAnimatedStyle( ()=> {
        return {
            //borderRadius: 5,
            //elevation: 10,
            //backgroundColor: color.value,
            //left: props.left,
            //top: props.top,
            transform: [ 
                {translateX: x.value },
                {translateY: y.value },
                {scale: scale.value },
                {rotate: (rotate.value).toString() + 'deg'}
            ]
        }
    });

    let imagepath;
    switch(props.petnum)
    {
        case 1:
            imagepath = require('../assets/images/main/pet1.png');
            break;
        case 2:
            imagepath = require('../assets/images/main/pet2.png');
            break;
        case 3:
            imagepath = require('../assets/images/main/pet3.png');
            break;
        default:
            break;
    }

    return (
        <PanGestureHandler onGestureEvent={panHandler}>
        <Animated.View  style={[styles.mainpetbg, animatedStyle]} >
        <TouchableOpacity
                onPress={onTap} activeOpacity={1}>
          <Image source={imagepath} resizeMode ="cover"/>
        </TouchableOpacity>
        </Animated.View>
        </PanGestureHandler>
    );
}

export class MovingPet extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        return (
            <View>
                <Pet petnum={this.props.petnum} />
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

    mainpetbg:{
        position : 'absolute',
        width : 175,
        height: 175,
        top : 50,
        left : -90,
    },
});