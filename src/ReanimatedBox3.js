import React, { Component, useState, useRef, useEffect } from 'react';
import { Dimensions, View, StyleSheet, TouchableOpacity, Pressable, TouchableWithoutFeedback } from 'react-native';
import { Modal, Text, Button, TouchableRipple } from 'react-native-paper';
import { State, TapGestureHandler, PanGestureHandler, RotationGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, useSharedValue, useDerivedValue, interpolateColors, withSpring, useAnimatedStyle, repeat, delay, useAnimatedGestureHandler, withTiming, sequence, EasingNode, cancelAnimation } from 'react-native-reanimated';


const Box = (props) => {
    const x = useSharedValue(0);
    const y = useSharedValue(0);
    const color = useSharedValue("blue");
    const scale = useSharedValue(1);
    const [active, setActive] = useState(false);
        
    useEffect(() => {
        activate(props.active);
      }, [props.active]);
    
    useEffect(() => {
       switch(props.action){
           case "jump" : jump();
           setTimeout(()=>{
               props.cleanupAction();
           }, 200);
           break;
       }
    }, [props.action]);

    const jump = () => {
            x.value = withTiming(x.value+20, {duration: 200, ease:Easing.linear});
            y.value = repeat(withTiming(y.value -80, {duration:100}), 2, true);
            //sequence(withTiming(y.value -80, {duration:100}), withTiming(y.value, {duration:100}));
     }

    const blink = () => { }

    const setColor = (c)=> color.value = c;

    const activate = (newActive=true)=> {
        if (newActive) {
            setColor("orange");
        } else {
            setColor("blue");
        }
        setActive(newActive);
    }
    
    const panHandler = useAnimatedGestureHandler( {
        onStart: (_, ctx) => {
            ctx.startX = x.value;
            ctx.startY = y.value;
            ctx.dragged = false;
            jump()
        },
        onActive: (event, ctx) => {
            if (ctx.dragged == false) {
                ctx.dragged = true;
                /* dragging를 처음 시작하게 된다면 */               
            }
            x.value = ctx.startX + event.translationX;
            y.value = ctx.startY + event.translationY;
        },
        onFinish: (_, ctx) => {
            if (ctx.dragged == true) {
                /* dragging을 했다면 */
            }
        }
    });

    const onTap = () => {}

    const animatedStyle = useAnimatedStyle( ()=> {
        return {
            borderRadius: 5,
            elevation: 10,
            backgroundColor: color.value,
            transform: [ 
                {translateX: x.value },
                {translateY: y.value },
                {scale: scale.value }
            ]
        }
    });
    return (
        <PanGestureHandler onGestureEvent={panHandler} >
            <Animated.View style={[styles.box, animatedStyle]} >
                <TouchableWithoutFeedback 
                    onPress = {onTap} >
                    <Text style={styles.commandText} >
                        test
                    </Text>
                </TouchableWithoutFeedback>
            </Animated.View>
        </PanGestureHandler>
    );
}

const Boxes = (props) => {
    const [box, setBox] = useState({
        name : 'box1', left:0, right:0, height: 100, width:100, activate : false
    });

    const intersect = ( x, y, w, h, x1, y1, w1, h1) => 
        y + h >= y1 && y1 + h1 >= y && x + w >= x1 && x1 + w1 >= x;

    const cleanupAction = () => {
        setBox({ ...box, action : null });
    }

    const jump = ()=> {
        setBox({...box, action : "jump"});
    }

    const blink = () => {}

    const activate = (newActivate) => {
        setBox({ ...box, activate : newActivate });
    }
    
    let boxRender = null;
    if(box != null){
        boxRender = <Box name={box.name} key={box.name} left={box.left} right={box.right} width={box.width} 
        height={box.height} activate={box.activate} action={box.action} />;
    }

    return( 
    
    <View key="boxContainer" style={styles.absoluteContainer} >
        {
            /* box 정보로부터 Box 콤포넌트 구축 */
            boxRender
        }
        <Text></Text>
        <View key="buttons" style={styles.menu} >
            <Button onPress={jump} >점프</Button>
            <Button onPress={blink} >깜박</Button>
            <Button onPress={()=>console.log(box)} >박스 정보보기</Button>
            <Button onPress={() => activate(!box.active)} >활성화</Button>
        </View>
    </View>
    )
}

export class ReanimatedScreen3 extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View style={styles.absoluteContainer}>
                <View style={[styles.container, {backgroundColor: 'yellow'}]}>
                    <Boxes />
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
    menu: {
        height:30, 
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
    }
});