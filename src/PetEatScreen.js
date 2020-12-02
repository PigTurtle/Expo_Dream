import React, { Component, useState, useRef, useEffect } from 'react';
import { Dimensions, View, Image, StyleSheet, TouchableOpacity, Pressable, TouchableWithoutFeedback } from 'react-native';
import { Modal, Text, Button, TouchableRipple, Paragraph } from 'react-native-paper';
import { State, TapGestureHandler, PanGestureHandler, RotationGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, useSharedValue, useDerivedValue, interpolateColors, withSpring, useAnimatedStyle, 
    repeat, delay, useAnimatedGestureHandler, withTiming, sequence, EasingNode, cancelAnimation } from 'react-native-reanimated';

const WINDOW_H = Dimensions.get('window').height;
const WINDOW_W = Dimensions.get('window').width;

const EatItem = (props) => {
    const x = useSharedValue(0);
    const y = useSharedValue(0);
    const scale = useSharedValue(1);

    const panHandler = useAnimatedGestureHandler( {
        onStart: (_, ctx) => {
            ctx.startX = x.value;
            ctx.startY = y.value;
            ctx.dragged = false;
            props.ontap();
            scale.value = 1.1;
        },
        onActive: (event, ctx) => {
            if (ctx.dragged == false) {
                ctx.dragged = true;
                /* dragging를 처음 시작하게 된다면 */               
            }
            x.value = ctx.startX + event.translationX;
            y.value = ctx.startY + event.translationY;

            //console.log(x.value, y.value);
        },
        onFinish: (_, ctx) => {
            if (ctx.dragged == true) {
                /* dragging을 했다면 */
            props.touchcheck(x.value, y.value);
            scale.value = 1;
            }
        }
    });

    const onTap = () => {
        props.ontap();
    }

    const animatedStyle = useAnimatedStyle( ()=> {
        return {
            transform: [ 
                {translateX: x.value },
                {translateY: y.value },
                {scale: scale.value },
            ]
        }
    });

    let imagepath = props.imagepath;

    return (
        <PanGestureHandler onGestureEvent={panHandler}>
        <Animated.View  style={[styles.item, animatedStyle]} >
        <TouchableOpacity
                onPress={onTap} activeOpacity={1}>
          <Image source={imagepath} resizeMode ="cover"/>
        </TouchableOpacity>
        </Animated.View>
        </PanGestureHandler>
    );
}

const PetEatScreen = (props) => {
    const [bottommenutext, setbottommenutext] = useState(props.eatinfo);
    const [bottomgauge, setbottomgauge] = useState(false);
    const [iseat, setiseat] = useState(false);
    const [eatgauge, seteatgauge] = useState(props.eatpercent);
    const [out, setout] = useState(false);
    const [addgauge, setaddgauge] = useState(30);

    let menutext;
    switch(props.type)
    {
        case 1:
            menutext = "포만감";
            break;
        case 2:
            menutext = "청결도";
            break;
        default:
            break;
    }

    const onTap = () => {
        setbottommenutext(menutext);
        setbottomgauge(true);
        //props.hidePetEatScreen();
    }

    const IsEat = () => {
        setiseat(true);
        seteatgauge(eatgauge + addgauge > 100 ? 100 : eatgauge + addgauge);
        setTimeout(goout, 3000);
    }

    const goout = () => {
        props.hidePetEatScreen(addgauge);
    }

    // props.hidePetEatScreen();

    // const intersect = ( x, y, w, h, x1, y1, w1, h1) => 
    //     y + h >= y1 && y1 + h1 >= y && x + w >= x1 && x1 + w1 >= x;

    const intersect = ( x, y, w, h, x1, y1, w1, h1) => 
       y + h >= y1 && y1 + h1 >= y && x + w >= x1 && x1 + w1 >= x;

    const touchcheck = (x, y) => {
        let itemx = -20;
        let itemy = -160;
        let itemwidth = 170;
        let itemheight = 140;

        if (intersect(x, y, 100, 100, itemx, itemy, itemwidth, itemheight )) 
            return IsEat();

            //console.log(x, y);
    }

    let mainimagepath;
    switch(props.mainnum)
    {
        case 1:
            mainimagepath = require('../assets/images/main/main.png');
            break;
        case 2:
            mainimagepath = require('../assets/images/main/main2.png');
            break;
        default:
            break;
    }

    let petimagepath;
    switch(props.petnum)
    {
        case 1:
            petimagepath = require('../assets/images/main/pet1.png');
            break;
        case 2:
            petimagepath = require('../assets/images/main/pet2.png');
            break;
        case 3:
            petimagepath = require('../assets/images/main/pet3.png');
            break;
        default:
            break;
    }

    let gaugemaxpath;
    let gaugepath;
    switch(props.type)
    {
        case 1:
            gaugemaxpath = require('../assets/images/eat/eatgaugemax.png');
            gaugepath = require('../assets/images/eat/eatgauge.png');
            break;
        case 2:
            gaugemaxpath = require('../assets/images/clean/cleangaugemax.png');
            gaugepath = require('../assets/images/clean/cleangauge.png');
            break;
        default:
            break;
    }

    return (
        <View style={{top : -30}}>
            <Image source={mainimagepath} style={styles.main} resizeMode ="cover"/>
            <Image source={petimagepath} style={styles.pet} resizeMode ="cover"/>
            <Image source={require('../assets/images/main/bottommenu.png')} style={styles.bottomtab} resizeMode ="cover"/>
            <Button disabled style={styles.bottommenutext}><Text>{bottommenutext}</Text></Button>
            {bottomgauge == true && <Image source={gaugemaxpath} style={styles.eatgaugemax} resizeMode ="cover"/> }
            {bottomgauge == true && <Image source={gaugepath} style={{...styles.eatgauge,  width : 339 * eatgauge/100}} resizeMode ="cover"/>  }

            {bottomgauge == true && <Button disabled style={styles.eatgaugetext}><Text>{eatgauge}%</Text></Button> }

            {iseat == false && <EatItem imagepath={props.imagepath} ontap={onTap} touchcheck={touchcheck} /> } 

            {iseat == true && <TouchableOpacity onPress={goout} activeOpacity={1} style={styles.gooutbg}><Text></Text></TouchableOpacity>}
        </View>
    );
}

export default PetEatScreen;

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
    // item: {
    //     width: 100, 
    //     height: 100,
    //     backgroundColor: 'orange',
    // },
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
    },

    item:{
        position : 'absolute',
        top : 240,
        left : -65,
    },

    main:{
        position: 'absolute',
        width : WINDOW_W,
        height : WINDOW_H,
        left : -WINDOW_W/2,
        top : -WINDOW_H/2,
    },

    pet : {
        position: 'absolute',
        top : 50,
        left : -90,
    },

    bottomtab : {
        position: 'absolute',
        width : WINDOW_W,
        height : 120,
        left : -WINDOW_W/2,
        bottom : -WINDOW_H/2,
    },

    eatgaugemax : {
        position: 'absolute',
        left : -WINDOW_W/2+35,
        bottom : -WINDOW_H/2+30,
    },

    eatgauge : {
        position: 'absolute',
        left : -WINDOW_W/2+35,
        bottom : -WINDOW_H/2+30,
    },

    bottommenutext : {
        position: 'absolute',
        left : -100,
        bottom : -260,
        width : 200,
        height : 30,
        justifyContent : 'center',
    },
    
    eatgaugetext : {
        position: 'absolute',
        left : -100,
        bottom : -303,
        width : 200,
        height : 30,
        justifyContent : 'center',
    },

    gooutbg :{
        position: 'absolute',
        width : WINDOW_W,
        height : WINDOW_H,
        left : -WINDOW_W/2,
        top : -WINDOW_H/2,
    },
});