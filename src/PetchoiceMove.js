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
    const [first, setFirst] = useState(true);
    const [choice, setChoice] = useState(true);

    useEffect( ()=> {
        react(active);
    }, [active]);
      
    const react = () => {
        if(first)
        {
            setFirst(!first);
            return;
        }

        reactchangescale();
    } 

    const reactchangescale = () => {
        scale.value = sequence(
            withTiming(0.9, {duration: 200}),
            repeat(withTiming(1.1, {duration: 400}), 3, true)
            , withTiming(1.0, {duration: 200,  ease: Easing.linear}));
        
        ismove.value = withTiming(0, {duration: 1600});
    }
    
    const panHandler = useAnimatedGestureHandler( {
        onStart: (_, ctx) => {
        },
        onActive: (event, ctx) => {
        },
        onFinish: (_, ctx) => {
        }
    });

    const onTap = () => {
        console.log("choice : ", choice, "num : ", props.num);

        if(choice)
            props.onChoice(props.num);
        else
            props.onChoice(0);

        setChoice(!choice);

        if(ismove.value == 0)
        {
            setActive(!active);
            ismove.value = 1;
        }
    }

    const animatedStyle = useAnimatedStyle( ()=> {
        return {
            left: props.left,
            top: props.top,

            transform: [ 
                {translateX: x.value },
                {translateY: y.value },
                {scale: scale.value },
                {rotate: (rotate.value).toString() + 'deg'}
            ]
        }
    });

    let imagepath;
    switch(props.num)
    {
        case 1:
            imagepath = require('../assets/images/petchoice/pet1.png');
            break;
        case 2:
            imagepath = require('../assets/images/petchoice/pet2.png');
            break;
        case 3:
            imagepath = require('../assets/images/petchoice/pet3.png');
            break;
        default:
            break;
    }

    return (
        <PanGestureHandler onGestureEvent={panHandler}>
        <Animated.View  style={[styles.pet, animatedStyle]} >
        <TouchableOpacity
                onPress={onTap} activeOpacity={1} >
          <Image source={imagepath} resizeMode ="cover"/>
        </TouchableOpacity>
        </Animated.View>
        </PanGestureHandler>
    );
}

function MovingChoicePets(props) {
    const [currentpet, setCurrentpet] = useState(0);
    const [currentleft, setCurrentleft] = useState(0);
    const [currenttop, setCurrenttop] = useState(0);

    const setCurrentpetNum = (num) => {
        setCurrentpet(num);
        console.log(currentpet);
        switch(currentpet)
        {
            case 1:
                setCurrentleft(-250-7);
                setCurrenttop(-250+2);

                break;
            case 2:
                setCurrentleft(-250-7-60);
                setCurrenttop(-250+120-3);

                break;
            case 3:
                setCurrentleft(-250-7+60);
                setCurrenttop(-250+120-3);

                break;
            default:
                setCurrentleft(0);
                setCurrenttop(0);

                break;
        }
    }

    return (        
        <View>
             <Image source={require('../assets/images/petchoice/petbg2.png')} style={{...styles.petbg, left : currentleft, top : currenttop}} resizeMode ="cover"/>
            <Pet num={1} left={-250} top={-250+5} onChoice={setCurrentpetNum}/>
            <Pet num={2} left={-305} top={-130+5} onChoice={setCurrentpetNum}/>
            <Pet num={3} left={-305+105} top={-150} onChoice={setCurrentpetNum}/>
        </View>
    );
}

export class MovingChoicePet extends React.Component {
    constructor(props) {
        super(props);
        
        this.SetChoice = this.SetChoice.bind(this);
    }

    SetChoice(ischoice){
        this.props.onChoice(ischoice);
    }

    render() {
        return (
            <View>
                    <MovingChoicePets />
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

    pet:{
        position : 'absolute',
        width : 175,
        height: 175,
    },

    petbg:{
        position: 'absolute',
        width : 110,
        height: 110,
    },
});