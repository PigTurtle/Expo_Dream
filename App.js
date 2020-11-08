import { StatusBar } from 'expo-status-bar';
import React, {useState, Component }  from 'react';
import { Animated, StyleSheet, View, SafeAreaView, Image, Platform, TouchableOpacity, 
  TouchableHighlight, TouchableWithoutFeedback, } from 'react-native';
import { DefaultTheme, Text, Button, RadioButton, TouchableRipple, ToggleButton, TextInput , Paragraph, Dialog, Portal, Appbar, 
  ProgressBar, Colors, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem,
 } from '@react-navigation/drawer';
 import {
  PanGestureHandler,
  ScrollView,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// import {TitleScreen } from '/src/test';












export class DraggableBox extends Component {
  constructor(props) {
    super(props);
    this._translateX = new Animated.Value(0);
    this._translateY = new Animated.Value(0);
    this._lastOffset = { x: 0, y: 0 };
    this._onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this._translateX,
            translationY: this._translateY,
          },
        },
      ],
      { useNativeDriver: true }
    );
  }
  _onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastOffset.x += event.nativeEvent.translationX;
      this._lastOffset.y += event.nativeEvent.translationY;
      this._translateX.setOffset(this._lastOffset.x);
      this._translateX.setValue(0);
      this._translateY.setOffset(this._lastOffset.y);
      this._translateY.setValue(0);
    }
  };
  render() {
    return (
      <PanGestureHandler
        {...this.props}
        onGestureEvent={this._onGestureEvent}
        onHandlerStateChange={this._onHandlerStateChange}>
        <Animated.View>
        <Animated.Image
        source={require('./assets/images/lightfuniture.png')}
          style={[
            styles.lightfuniture,
            {
              transform: [
                { translateX: this._translateX },
                { translateY: this._translateY },
              ],
            },
            this.props.boxStyle,
          ]}
          resizeMode ="cover" />
          </Animated.View>
      </PanGestureHandler>
    );
  }
}

// export default class App extends React.Component{
//   constructor()
//   {
//     super()
//     this.translateX = new Animated.Value(0)
//     this.onGestureEvent = Animated.event([ 
//       {
//       nativeEvent:{
//           translateX: this.translateX
//       }
//     }
//   ], {useNativeDriver:true});
//   }

//   componentDidMount(){
//     setInterval(()=>{
//       for(i=0; i< 5000; i++){
//         console.log('blocking thread');
//       }
//     }, 1000);
//   }

//   onHandlerStateChange = event =>{
//     if(event.nativeEvent.oldState == State.ACTIVE)
//     {
//       Animated.timing(this.translateX, {
//         toValue:0,
//         duration: 1000,
//         useNativeDriver : true,
//       }).start();
//     }
//   }

//   render(){
//   return(
//     <View style={styles.container}>
//       <PanGestureHandler onGestureEvent={this.onGestureEvent}
//       onHandlerStateChange={this.onHandlerStateChange}>
        
//       <Animated.View style={[styles.handlerbox,
//       {
//         transform:[{translateX: this.translateX}]
//       }
//       ]}/>
//       </PanGestureHandler>
//     </View>
//   );
//   }
// }





function test() {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const Search = () => {
    alert("Press Search");
  }
  const More = () => {
    alert("Press More");
  }
  
  const [value, setValue] = useState('first');

  const [status, setStatus] = useState('checked');  
  const onButtonToggle = value => {
    setStatus(status === 'checked' ? 'unchecked' : 'checked');
    alert(status);
  };
  const [text, setText] = useState('');
  return (
    <View style={styles.header}>
    <Appbar.Header>
    <Appbar.Content title="Title" subtitle="Subtitle" />
    <Appbar.Action icon="magnify" onPress={Search} />
    <Appbar.Action icon="dots-vertical" onPress={More} />
    </Appbar.Header>

    <View style={styles.container}>

    {/* <Avatar.Image size={24} source={require('../assets/images/avatar.png')} /> */}

    <Button  onPress={More} icon={{ uri: 'https://avatars0.githubusercontent.com/u/17571969?v=3&s=400' }} mode="contained">
    Press me 1
    </Button>
    <Button icon="camera" mode="contained" onPress={() => alert('Pressed')}>
        Press me 2
        </Button>
            <Button mode="contained" loading onPress={() => {}} >
         Press me 3
          </Button>
          <Button
            mode="outlined"
            icon={require('./assets/images/favorite.png')}
            onPress={() => {}}>
         Press me 4
          </Button>
          <Button
            mode="outlined"
            icon={require('./assets/images/email-icon.png')} onPress={() => {}}> </Button>

          <TouchableOpacity activeOpacity={0.5}>
          <Image
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/facebook.png',
            }}  /><Text style={styles.buttonTextStyle}>Login Using Facebook</Text></TouchableOpacity>

    <ToggleButton
      icon="bluetooth"
      value="bluetooth"
      status={status}
      onPress={onButtonToggle}
    />

    {(value == "first") ?
    <Image source={require('./assets/images/1.png')} style={styles.box} resizeMode ="cover"/>  :
    <Image source={require('./assets/images/2.png')} style={styles.box} resizeMode ="contain"/>
    }

    {(value == "first") ?
    <Text>First RadioButton Click</Text> : <Text>Second RadioButton Click</Text>
    }
    <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
      <View>
        <Text>First</Text>
        <RadioButton value="first" />
      </View>
      <View>
        <Text>Second</Text>
        <RadioButton value="second" />
      </View>
    </RadioButton.Group>
    
    <TextInput
      label="PetName"
      value={text}
      onChangeText={text => setText(text)}
    />

    <Button onPress={showDialog} style={styles.button} >다이얼로그 보여주기</Button>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>타이틀</Dialog.Title>
            <Dialog.Content>
              <Paragraph>가장 단순한 다이얼로그 화면입니다.</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>확인</Button>
            </Dialog.Actions>
          </Dialog>

    </View>

    <View style={styles.bottom}>
    <Appbar >
   <Appbar.Action
     icon="archive"
     onPress={() => alert('Pressed archive')}
    />
    <Appbar.Action icon="mail" onPress={() => alert('Pressed mail')} />
    <Appbar.Action icon="label" onPress={() => alert('Pressed label')} />
    <Appbar.Action
      icon="delete"
      onPress={() => alert('Pressed delete')}
    />
  </Appbar>
  </View>
  </View>
  );
}

function TitleScreen({navigation}){
  const MoveToIntro = () =>{
    navigation.navigate("Intro");
  }
return(
  <View style={styles.container}>
    <Text style={styles.title}>TITLE</Text>
    <Button onPress = {MoveToIntro} style={styles.titlebutton}> <Text style={styles.titlebuttonfont}>화면을 터치해 주세요.</Text></Button>
  </View>
);
}

function IntroScreen({navigation}){
  const MoveToPetChoice = () =>{
    navigation.navigate("PetChoice");
  }
return(
  <View style={styles.introbackground}>
    <Text style={styles.introimage}></Text>
    <Text style={styles.intro}>인트로영상</Text>
    <Button onPress = {MoveToPetChoice} style={styles.introbutton}> <Text style={styles.introbuttonfont}>SKip ></Text></Button>
  </View>
);
}

function PetChoiceScreen({navigation}){
  const [buttonable, setable] = useState(false);
  const isbottondown = () =>{
    setable(buttonable === false ? true : false);
  }
  const MoveToMainStack = () =>{
    navigation.navigate("MainStack");
  }
return(
  <View style={styles.petchoicebackground}>
    <Text style={styles.introimage}></Text>
    {(buttonable == false) ?
    <Button onPress={isbottondown} style={styles.petchoicebutton1}>  </Button> :
    <Button onPress={isbottondown} style={styles.petchoicebutton1_1}>  </Button>
    }
    <Image source={require('./assets/images/egg.png')} style={styles.egg1} resizeMode ="cover"/>
    <Button disabled onPress={() => {}} style={styles.petchoicebutton2} ></Button>
    <Image source={require('./assets/images/egg.png')} style={styles.egg2} resizeMode ="cover"/>
    <Button disabled onPress={() => {}} style={styles.petchoicebutton3}></Button>
    <Image source={require('./assets/images/egg.png')} style={styles.egg3} resizeMode ="cover"/>
    <Text style={styles.petchoice}>알설명</Text>
    {(buttonable == false) ?
    <Button disabled onPress={() => {}} style={styles.choicebutton}><Text style={styles.petchoicebuttonfont}>선택하기</Text></Button> :
    <Button onPress = {MoveToMainStack} style={styles.choicebutton}><Text style={styles.petchoicebuttonfont}>선택하기</Text></Button>
    }
  </View>
);
}


const MainStack = createStackNavigator();
const collectionDrawer = createDrawerNavigator();
const petinfoDrawer = createDrawerNavigator();

function MainStackScreen(){
return(
  // <View style={styles.container}>
  //   <Text>MainStackScreen</Text>
  //   <FontAwesome5 name="home" size={24} color="black" />

    // <MainStack.Navigator headerMode={'none'}>
    //       <MainStack.Screen name="Main" component={MainScreen} />
    //       <MainStack.Screen name="Eat" component={EatStackScreen}/>
    //       <MainStack.Screen name="Clean" component={CleanStackScreen}/>
    //       <MainStack.Screen name="Fun" component={FunStackScreen}/>
    //       <MainStack.Screen name="Sleep" component={SleepScreen}/>
    //       <MainStack.Screen name="Achieve" component={AchieveDrawerScreen}/>
    //       <MainStack.Screen name="Setting" component={SettingDrawerScreen}/>
    //       <MainStack.Screen name="Funiture" component={FunitureStackScreen}/>
    // </MainStack.Navigator>

    <collectionDrawer.Navigator initialRouteName="Main" headerMode={'none'}>
    <collectionDrawer.Screen name="Main" component={MainScreen} />
    </collectionDrawer.Navigator>

    // <petinfoDrawer.Navigator drawerPosition={'right'} drawerWidth={200} drawerBackgroundColor={'gray'} 
    // headerMode={'none'} drawerContent={props => <MyDrawerContent {...props} />}>
    // <petinfoDrawer.Screen name="Main" component={MainScreen} />
    // </petinfoDrawer.Navigator>

  // </View>
);
}

function MyDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="X"
        onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
      />
    </DrawerContentScrollView>
  );
}

export default App;

function MainScreen({navigation}) {
  const MoveToEat = () =>{
    navigation.navigate("Eat");
  }
  const MoveToClean = () =>{
    navigation.navigate("Clean");
  }
  const MoveToFun = () =>{
    navigation.navigate("Fun");
  }
  const MoveToSleep = () =>{
    navigation.navigate("Sleep");
  }
  const MoveToAchieve = () =>{
    navigation.navigate("Achieve");
  }
  const MoveToSetting = () =>{
    navigation.navigate("Setting");
  }
  const MoveToFuniture = () =>{
    navigation.navigate("Funiture");
  }

  const [achievevisible, setachieveVisible] = useState(false);
  const showachieveDialog = () => setachieveVisible(true);
  const hideachieveDialog = () => setachieveVisible(false);
  const [settingvisible, setsettingVisible] = useState(false);
  const showsettingDialog = () => setsettingVisible(true);
  const hidesettingDialog = () => setsettingVisible(false);
  const [funiturevisible, setfunitureVisible] = useState(false);
  const showfunitureDialog = () => setfunitureVisible(true);
  const hidefunitureDialog = () => setfunitureVisible(false);
  const [eatvisible, seteatVisible] = useState(false);
  const showeatDialog = () => seteatVisible(true);
  const hideeatDialog = () => seteatVisible(false);
  const [cleanvisible, setcleanVisible] = useState(false);
  const showcleanDialog = () => setcleanVisible(true);
  const hidecleanDialog = () => setcleanVisible(false);
  const [funvisible, setfunVisible] = useState(false);
  const showfunDialog = () => setfunVisible(true);
  const hidefunDialog = () => setfunVisible(false);
  const [sleepvisible, setsleepVisible] = useState(false);
  const showsleepDialog = () => setsleepVisible(true);
  const hidesleepDialog = () => setsleepVisible(false);

  const [funiturecheckvisible, setfuniturecheckVisible] = useState(false);
  const showfuniturecheckDialog = () => setfuniturecheckVisible(true);
  const showfuniture = () => {
    setfunitureVisible(false);
    setfuniturecheckVisible(false);
    setlightVisible(true);
  }
  const hidefuniturecheckDialog = () => {
    setfunitureVisible(false);
    setfuniturecheckVisible(false);
  }

  const [foodvisible, setfoodVisible] = useState(false);
  const showfoodDialog = () => setfoodVisible(true);
  const hidefoodDialog = () => {
    seteatVisible(false);
    setfoodVisible(false);
  }
  const [cleanlistvisible, setcleanlistVisible] = useState(false);
  const showcleanlistDialog = () => setcleanlistVisible(true);
  const hidecleanlistDialog = () => {
    setcleanVisible(false);
    setcleanlistVisible(false);
  }

  const [minigamevisible, setminigameVisible] = useState(false);
  const showminigameDialog = () => setminigameVisible(true);
  const hideminigameDialog = () => {
    setfunVisible(false);
    setminigameVisible(false);
  }

  const [rewardvisible, setrewardVisible] = useState(false);
  const showrewardDialog = () => setrewardVisible(true);
  const hiderewardDialog = () => {
    setfunVisible(false);
    setminigameVisible(false);
    setrewardVisible(false);
  }

  const [questrewardvisible, setquestrewardVisible] = useState(false);
  const showquestrewardDialog = () => setquestrewardVisible(true);
  const hidequestrewardDialog = () => {
    setquestrewardVisible(false);
    setquestVisible(false);
  }

  const [questvisible, setquestVisible] = useState(false);
  const showquestDialog = () => setquestVisible(true);
  const hidequestDialog = () => {
    setquestVisible(false);
  }

  const [shopvisible, setshopVisible] = useState(false);
  const showshopDialog = () => setshopVisible(true);
  const hideshopDialog = () => {
    setshopVisible(false);
  }

  const [itemcheckvisible, setitemcheckVisible] = useState(false);
  const showitemcheckDialog = () => setitemcheckVisible(true);
  const hideitemcheckDialog = () => {
    setitemcheckVisible(false);
  }

  const [buysuccessvisible, setbuysuccessVisible] = useState(false);
  const showbuysuccessDialog = () => setbuysuccessVisible(true);
  const hidebuysuccessDialog = () => {
    setbuysuccessVisible(false);
    setitemcheckVisible(false);
  }

  const [collectionvisible, setcollectionVisible] = useState(false);
  const showcollectionDialog = () => setcollectionVisible(true);
  const hidecollectionDialog = () => {
    setcollectionVisible(false);
  }

  const [petinfovisible, setpetinfoVisible] = useState(false);
  const showpetinfoDialog = () => {
    setcollectionVisible(false);
    setpetinfoVisible(true);
  }
  const hidepetinfoDialog = () => {
    setpetinfoVisible(false);
  }

  const [lightvisible, setlightVisible] = useState(false);

  return(
    <View style={styles.container}>
    <Button disabled onPress={() => {}} style={styles.mainbackground1}><Text ></Text></Button>
    <Button disabled onPress={() => {}} style={styles.mainbackground2}><Text ></Text></Button>
    <Image source={require('./assets/images/egg.png')} style={styles.eggbackground} resizeMode ="cover"/>

    <Button disabled onPress={() => {}} style={styles.statebackground}><Text></Text></Button>
    <Button disabled onPress={() => {}} style={styles.state}><Text style={styles.statefont}>상태</Text></Button>
    <Button disabled onPress={() => {}} style={styles.topmenu}><Text ></Text></Button>
    <Button disabled onPress={() => {}} style={styles.gamemoneybackground}><Text ></Text></Button>
    <Button disabled onPress={() => {}} style={styles.heartbackground}><Text ></Text></Button>
    <Button disabled onPress={() => {}} style={styles.heartgaugeimage}><Text ></Text></Button>
    <Image source={require('./assets/images/coin.png')} style={styles.coinimage} resizeMode ="cover"/>
    <Image source={require('./assets/images/diamond.png')} style={styles.jamimage} resizeMode ="cover"/>
    <Image source={require('./assets/images/heart.png')} style={styles.heartimage} resizeMode ="cover"/>
    <Button disabled onPress={() => {}} style={styles.coinnum}><Text style={styles.coinfont}>3000</Text></Button>
    <Button disabled onPress={() => {}} style={styles.jamnum}><Text style={styles.jamfont}>100</Text></Button>
    <Button disabled onPress={() => {}} style={styles.heartgauge}><Text style={styles.heartfont}>70%</Text></Button>

    <Button disabled onPress={() => {}} style={styles.achievebackground}><Text ></Text></Button>
    {/* <Button onPress = {MoveToAchieve} style={styles.achievebutton}><Text style={styles.achievebuttonfont}>업적</Text></Button> */}
    <Button color={Colors.black} onPress={showachieveDialog} style={styles.achievebutton}>업적</Button>
    <Button disabled onPress={() => {}} style={styles.settingbackground}><Text ></Text></Button>
    {/* <Button onPress = {MoveToSetting} style={styles.settingbutton}><Text style={styles.settingbuttonfont}>설정</Text></Button> */}
    <Button color={Colors.black} onPress={showsettingDialog} style={styles.settingbutton}>설정</Button>
    <Button disabled onPress={() => {}} style={styles.funiturebackground}><Text ></Text></Button>
    {/* <Button onPress = {MoveToFuniture} style={styles.funiturebutton}><Text style={styles.funiturebuttonfont}>가구</Text></Button> */}
    <Button color={Colors.black} onPress={showfunitureDialog} style={styles.funiturebutton}>가구</Button>
    
  <Button disabled onPress={() => {}} style={styles.bottommenu}><Text></Text></Button>
  <Button disabled onPress={() => {}} style={styles.eatbackground}><Text></Text></Button>
  <Button disabled onPress={() => {}} style={styles.eatgauge}><Text></Text></Button>
{/* <Button onPress = {MoveToEat} style={styles.eatbutton}><Text style={styles.eatbuttonfont}>식사</Text></Button> */}
  <Button color={Colors.black} onPress={showeatDialog} style={styles.eatbutton}>식사</Button>
    
    <Button disabled onPress={() => {}} style={styles.cleanbackground}><Text ></Text></Button>
  <Button disabled onPress={() => {}} style={styles.cleangauge}><Text ></Text></Button>
    {/* <Button onPress = {MoveToClean} style={styles.cleanbutton}><Text style={styles.cleanbuttonfont}>청결</Text></Button> */}
    <Button color={Colors.black} onPress={showcleanDialog} style={styles.cleanbutton}>청결</Button>

    <Button disabled onPress={() => {}} style={styles.funbackground}><Text ></Text></Button>
  <Button disabled onPress={() => {}} style={styles.fungauge}><Text ></Text></Button>
    {/* <Button onPress = {MoveToFun} style={styles.funbutton}><Text style={styles.funbuttonfont}>재미</Text></Button> */}
    <Button color={Colors.black} onPress={showfunDialog} style={styles.funbutton}>재미</Button>

    <Button disabled onPress={() => {}} style={styles.sleepbackground}><Text ></Text></Button>
  <Button disabled onPress={() => {}} style={styles.sleepgauge}><Text ></Text></Button>
    {/* <Button onPress = {MoveToSleep} style={styles.sleepbutton}><Text style={styles.sleepbuttonfont}>수면</Text></Button> */}
    <Button color={Colors.black} onPress={showsleepDialog} style={styles.sleepbutton}>수면</Button>

    {(lightvisible == true) ?
        <DraggableBox /> : <Text></Text>
    }



{/* <NavigationContainer>
  <collectionDrawer   drawerPosition={'left'}   drawerWidth={350}
    drawerContent={props => <MyDrawerContent {...props} />}>
  <collectionDrawer.Screen name="collection" component={MainScreen} />
  </collectionDrawer>
</NavigationContainer>
    
<NavigationContainer>
  <petinfoDrawer   drawerPosition={'right'}   drawerWidth={350}
    drawerContent={props => <MyDrawerContent {...props} />}>
  <petinfoDrawer.Screen name="Petinfo" component={MainScreen} />
  </petinfoDrawer>
</NavigationContainer> */}

  <Dialog visible={achievevisible} onDismiss={hideachieveDialog} style={styles.acheivelist}>
  <Dialog.Title style={styles.textcenter}>업적</Dialog.Title>
  <Dialog.Content>
    <Paragraph style={styles.achieveinfo}><Text style={styles.achievefont}>업적 내용</Text></Paragraph>
    <Paragraph style={styles.achieveimage}><Text style={styles.achieveimagefont}>업적        아이콘</Text></Paragraph>
  </Dialog.Content>
  <Dialog.Actions>
  <Button disabled color={Colors.black} onPress={hideachieveDialog} style={styles.xbuttonbackground}></Button>
    <Button color={Colors.black} onPress={hideachieveDialog} style={styles.xbutton}><Text style={styles.xbuttonfont}>X</Text></Button>
  </Dialog.Actions>
</Dialog>

<Dialog visible={settingvisible} onDismiss={hidesettingDialog} style={styles.settinglist}>
  <Dialog.Title style={styles.textcenter}>설정</Dialog.Title>
  <Dialog.Content>
  <Button color={Colors.black} onPress={showquestDialog} style={styles.settingquest}><Text style={styles.settingfont}>퀘스트</Text></Button>
  <Button color={Colors.black} onPress={showshopDialog} style={styles.settingshop}><Text style={styles.settingfont}>상점</Text></Button>
  <Button color={Colors.black} onPress={showcollectionDialog} style={styles.settingcollection}><Text style={styles.settingfont}>수집품</Text></Button>
  <Button color={Colors.black} onPress={showfunDialog} style={styles.settingminigame}><Text style={styles.settingfont}>미니 게임</Text></Button>
  </Dialog.Content>
  <Dialog.Actions>
  <Button disabled color={Colors.black} onPress={hidesettingDialog} style={styles.xbuttonbackground}></Button>
    <Button color={Colors.black} onPress={hidesettingDialog} style={styles.xbutton}><Text style={styles.xbuttonfont}>X</Text></Button>
  </Dialog.Actions>
</Dialog>

<Dialog visible={questvisible} onDismiss={hidequestDialog} style={styles.acheivelist}>
  <Dialog.Title style={styles.todayquest}>일일 도전</Dialog.Title>
  <Dialog.Content>
    <Button color={Colors.black} onPress={showquestrewardDialog} style={styles.questinfo}><Text style={styles.questfont}>일일 퀘스트</Text></Button>
    <Paragraph style={styles.questimage}><Text style={styles.questimagefont}></Text></Paragraph>
  </Dialog.Content>
  <Dialog.Actions>
  <Button disabled color={Colors.black} onPress={hidequestDialog} style={styles.xbuttonbackground}></Button>
    <Button color={Colors.black} onPress={hidequestDialog} style={styles.xbutton}><Text style={styles.xbuttonfont}>X</Text></Button>
  </Dialog.Actions>
</Dialog>

<Dialog visible={questrewardvisible} onDismiss={hidequestrewardDialog} style={styles.questreward}>
  <Dialog.Title style={styles.textcenter}>퀘스트 보상</Dialog.Title>
  <Dialog.Content>
  <Button disabled color={Colors.black} onPress={() => {}} style={styles.questrewardinfo}><Text style={styles.textcenter}>보상 정보</Text></Button>
  </Dialog.Content>
  <Dialog.Actions>
  <Button color={Colors.black} onPress={hidequestrewardDialog} style={styles.questrewardbutton}><Text style={styles.textcenter}>보상 받기</Text></Button>
  </Dialog.Actions>
</Dialog>

<Dialog visible={shopvisible} onDismiss={hideshopDialog} style={styles.acheivelist}>
  <Dialog.Title style={styles.todayquest}>상점</Dialog.Title>
  <Dialog.Content>
  <Button disabled onPress={() => {}} style={styles.shopcoinnum}><Text style={styles.shopcoinfont}>    3000</Text></Button>
  <Image source={require('./assets/images/coin.png')} style={styles.shopcoinimage} resizeMode ="cover"/>
  <Button disabled onPress={() => {}} style={styles.foodbackground}><Text></Text></Button>
  <Button color={Colors.black} onPress={showitemcheckDialog} style={styles.foodbutton}><Text style={styles.foodfont}>상품 이미지</Text></Button>
    <Paragraph style={styles.foodname}><Text style={styles.foodfont}>상품 이름</Text></Paragraph>
  </Dialog.Content>
  <Dialog.Actions>
  <Button disabled color={Colors.black} onPress={hideshopDialog} style={styles.xbuttonbackground}></Button>
    <Button color={Colors.black} onPress={hideshopDialog} style={styles.xbutton}><Text style={styles.xbuttonfont}>X</Text></Button>
  </Dialog.Actions>
</Dialog>

<Dialog visible={itemcheckvisible} onDismiss={hideitemcheckDialog} style={styles.itemcheck}>
  <Dialog.Title></Dialog.Title>
  <Dialog.Content>
  <Button disabled color={Colors.black} onPress={() => {}} style={styles.itemname}><Text style={styles.itemnamefont}>상품 이름</Text></Button>
  <Button disabled color={Colors.black} onPress={() => {}} style={styles.itemimage}></Button>
  <Button disabled color={Colors.black} onPress={() => {}} style={styles.iteminfo1}></Button>
    <Button disabled color={Colors.black} onPress={() => {}} style={styles.iteminfo2}></Button>
    <Paragraph style={styles.itemchecktext}><Text style={styles.yesbuttonfont}>구매 하시겠습니까?</Text></Paragraph>
  </Dialog.Content>
  <Dialog.Actions>
    <Button color={Colors.black} onPress={showbuysuccessDialog} style={styles.itemyesbutton}><Text style={styles.yesbuttonfont}>네</Text></Button>
    <Button color={Colors.black} onPress={hideitemcheckDialog} style={styles.itemnobutton}><Text style={styles.nobuttonfont}>아니오</Text></Button>
  </Dialog.Actions>
</Dialog>

<Dialog visible={buysuccessvisible} onDismiss={hidebuysuccessDialog} style={styles.buysuccess}>
  <Dialog.Title style={styles.textcenter}>구매 성공!</Dialog.Title>
  <Dialog.Content>
  </Dialog.Content>
  <Dialog.Actions>
    <Button color={Colors.black} onPress={hidebuysuccessDialog} style={styles.checkbutton}><Text style={styles.checkbuttonfont}>확인</Text></Button>
  </Dialog.Actions>
</Dialog>

<Dialog visible={collectionvisible} onDismiss={hidecollectionDialog} style={styles.collectionlist}>
  <Dialog.Title style={styles.collectiontitle}>수집품</Dialog.Title>
  <Dialog.Content>
  <Button disabled onPress={() => {}} style={styles.collectionbackground}><Text></Text></Button>
  <Button color={Colors.black} onPress={showpetinfoDialog} style={styles.collectionbutton}><Text style={styles.collectionfont}>펫 이미지</Text></Button>
    <Paragraph style={styles.collectionname}><Text style={styles.collectionfont}>펫 종류</Text></Paragraph>
  </Dialog.Content>
  <Dialog.Actions>
  </Dialog.Actions>
</Dialog>

<Dialog visible={petinfovisible} onDismiss={hidepetinfoDialog} style={styles.petinfo}>
  <Dialog.Title style={styles.petname}>펫 종류</Dialog.Title>
  <Dialog.Content>
    <Paragraph style={styles.petimage}><Text style={styles.petfont}>펫 이미지</Text></Paragraph>
    <Button disabled color={Colors.black} onPress={() => {}} style={styles.petinfo1}></Button>
    <Button disabled color={Colors.black} onPress={() => {}} style={styles.petinfo2}></Button>
    <Button disabled color={Colors.black} onPress={() => {}} style={styles.petinfo3}></Button>
    <Button disabled color={Colors.black} onPress={() => {}} style={styles.petinfo4}></Button>
  </Dialog.Content>
  <Dialog.Actions>
  <Button disabled color={Colors.black} onPress={hidepetinfoDialog} style={styles.petxbuttonbackground}></Button>
    <Button color={Colors.black} onPress={hidepetinfoDialog} style={styles.petxbutton}><Text style={styles.petxbuttonfont}>X</Text></Button>
  </Dialog.Actions>
</Dialog>

<Dialog visible={funiturevisible} onDismiss={hidefunitureDialog} style={styles.foodlist}>
  <Dialog.Title style={styles.textcenter}>가구 목록</Dialog.Title>
  <Dialog.Content>
  <Button disabled onPress={() => {}} style={styles.foodbackground}><Text></Text></Button>
  <Button color={Colors.black} onPress={showfuniturecheckDialog} style={styles.foodbutton}><Text style={styles.foodfont}>가구 이미지</Text></Button>
    <Paragraph style={styles.foodname}><Text style={styles.foodfont}>가구 이름</Text></Paragraph>
  </Dialog.Content>
  <Dialog.Actions>
  <Button disabled color={Colors.black} onPress={hidefunitureDialog} style={styles.xbuttonbackground}></Button>
    <Button color={Colors.black} onPress={hidefunitureDialog} style={styles.xbutton}><Text style={styles.xbuttonfont}>X</Text></Button>
  </Dialog.Actions>
</Dialog>

<Dialog visible={funiturecheckvisible} onDismiss={hidefuniturecheckDialog} style={styles.funiturecheck}>
  <Dialog.Title style={styles.textcenter}>'가구 이름'</Dialog.Title>
  <Dialog.Content>
    <Paragraph style={styles.textcenter}><Text style={styles.yesbuttonfont}>이 가구를 배치하시겠습니까?</Text></Paragraph>
  </Dialog.Content>
  <Dialog.Actions>
    <Button color={Colors.black} onPress={showfuniture} style={styles.yesbutton}><Text style={styles.yesbuttonfont}>네</Text></Button>
    <Button color={Colors.black} onPress={hidefuniturecheckDialog} style={styles.nobutton}><Text style={styles.nobuttonfont}>아니오</Text></Button>
  </Dialog.Actions>
</Dialog>

    <Dialog visible={eatvisible} onDismiss={hideeatDialog} style={styles.foodlist}>
  <Dialog.Title style={styles.textcenter}>음식 목록</Dialog.Title>
  <Dialog.Content>
  <Button disabled onPress={() => {}} style={styles.foodbackground}><Text></Text></Button>
  <Button color={Colors.black} onPress={showfoodDialog} style={styles.foodbutton}><Text style={styles.foodfont}>상품 이미지</Text></Button>
    <Paragraph style={styles.foodname}><Text style={styles.foodfont}>상품 이름</Text></Paragraph>
  </Dialog.Content>
  <Dialog.Actions>
  <Button disabled color={Colors.black} onPress={hideeatDialog} style={styles.xbuttonbackground}></Button>
    <Button color={Colors.black} onPress={hideeatDialog} style={styles.xbutton}><Text style={styles.xbuttonfont}>X</Text></Button>
  </Dialog.Actions>
</Dialog>

<Dialog visible={cleanvisible} onDismiss={hidecleanDialog} style={styles.foodlist}>
  <Dialog.Title style={styles.textcenter}>청결용품 목록</Dialog.Title>
  <Dialog.Content>
  <Button disabled onPress={() => {}} style={styles.foodbackground}><Text></Text></Button>
  <Button color={Colors.black} onPress={showcleanlistDialog} style={styles.foodbutton}><Text style={styles.foodfont}>상품 이미지</Text></Button>
    <Paragraph style={styles.foodname}><Text style={styles.foodfont}>상품 이름</Text></Paragraph>
  </Dialog.Content>
  <Dialog.Actions>
  <Button disabled color={Colors.black} onPress={hidecleanDialog} style={styles.xbuttonbackground}></Button>
    <Button color={Colors.black} onPress={hidecleanDialog} style={styles.xbutton}><Text style={styles.xbuttonfont}>X</Text></Button>
  </Dialog.Actions>
</Dialog>

<Dialog visible={funvisible} onDismiss={hidefunDialog} style={styles.foodlist}>
  <Dialog.Title style={styles.textcenter}>미니게임 이름</Dialog.Title>
  <Dialog.Content>
    <Paragraph style={styles.minigameimage}><Text style={styles.minigamefont}>미니게임 이미지</Text></Paragraph>
    <Button disabled color={Colors.black} onPress={() => {}} style={styles.minigameinfo1}></Button>
    <Button disabled color={Colors.black} onPress={() => {}} style={styles.minigameinfo2}></Button>
    <Button disabled color={Colors.black} onPress={() => {}} style={styles.minigameinfo3}></Button>
    <Button color={Colors.black} onPress={showminigameDialog} style={styles.gamestartbutton}><Text style={styles.textcenter}>게임 시작</Text></Button>
  </Dialog.Content>
  <Dialog.Actions>
  <Button disabled color={Colors.black} onPress={hidefunDialog} style={styles.xbuttonbackground}></Button>
    <Button color={Colors.black} onPress={hidefunDialog} style={styles.xbutton}><Text style={styles.xbuttonfont}>X</Text></Button>
  </Dialog.Actions>
</Dialog>

<Dialog visible={minigamevisible} onDismiss={hideminigameDialog} style={styles.scoreboard}>
  <Dialog.Title></Dialog.Title>
  <Dialog.Content>
  <Button disabled color={Colors.black} onPress={() => {}} style={styles.scoretitle}><Text style={styles.textcenter}>점수판</Text></Button>
  <Button disabled color={Colors.black} onPress={() => {}} style={styles.scoreboardinfo}><Text style={styles.textcenter}>점수판 내용</Text></Button>
  <Button color={Colors.black} onPress={showrewardDialog} style={styles.gotorewardbutton}><Text style={styles.textcenter}>보상 받기</Text></Button>
  </Dialog.Content>
  <Dialog.Actions>
  </Dialog.Actions>
</Dialog>

<Dialog visible={rewardvisible} onDismiss={hiderewardDialog} style={styles.reward}>
  <Dialog.Title style={styles.textcenter}>보상</Dialog.Title>
  <Dialog.Content>
  <Button disabled color={Colors.black} onPress={() => {}} style={styles.rewardinfo}><Text style={styles.textcenter}>보상 정보</Text></Button>
  </Dialog.Content>
  <Dialog.Actions>
  <Button color={Colors.black} onPress={hiderewardDialog} style={styles.rewardbutton}><Text style={styles.textcenter}>보상 받기</Text></Button>
  </Dialog.Actions>
</Dialog>

<Dialog visible={sleepvisible} onDismiss={hidesleepDialog} style={{ backgroundColor: Colors.grey500 }}>
  <Dialog.Title style={styles.textcenter}>잠자는 시간</Dialog.Title>
  <Dialog.Content>
    <Paragraph style={styles.textcenter}>피곤함 저하</Paragraph>
  </Dialog.Content>
  <Dialog.Actions>
  <Button disabled color={Colors.black} onPress={hidesleepDialog} style={styles.xbuttonbackground}></Button>
    <Button color={Colors.black} onPress={hidesleepDialog} style={styles.xbutton}><Text style={styles.xbuttonfont}>X</Text></Button>
  </Dialog.Actions>
</Dialog>


<Dialog visible={foodvisible} onDismiss={hidefoodDialog} style={{ backgroundColor: Colors.grey500 }}>
  <Dialog.Title style={styles.textcenter}>식사 완료</Dialog.Title>
  <Dialog.Content>
    <Paragraph style={styles.textcenter}>포만감 상승</Paragraph>
  </Dialog.Content>
  <Dialog.Actions>
  <Button disabled color={Colors.black} onPress={hidefoodDialog} style={styles.xbuttonbackground}></Button>
    <Button color={Colors.black} onPress={hidefoodDialog} style={styles.xbutton}><Text style={styles.xbuttonfont}>X</Text></Button>
  </Dialog.Actions>
</Dialog>

<Dialog visible={cleanlistvisible} onDismiss={hidecleanlistDialog} style={{ backgroundColor: Colors.grey500 }}>
  <Dialog.Title style={styles.textcenter}>청결 완료</Dialog.Title>
  <Dialog.Content>
    <Paragraph style={styles.textcenter}>청결함 상승</Paragraph>
  </Dialog.Content>
  <Dialog.Actions>
  <Button disabled color={Colors.black} onPress={hidecleanlistDialog} style={styles.xbuttonbackground}></Button>
    <Button color={Colors.black} onPress={hidecleanlistDialog} style={styles.xbutton}><Text style={styles.xbuttonfont}>X</Text></Button>
  </Dialog.Actions>
</Dialog>


</View>
  );
}

const EatStack = createStackNavigator();

function EatStackScreen(){
return(
  <EatStack.Navigator>
  <EatStack.Screen name="Eat" component={EatScreen}/>
  <EatStack.Screen name="FoodList" component={FoodListScreen}/>
  <EatStack.Screen name="Fullness" component={FullnessScreen}/>
  <EatStack.Screen name="Main" component={MainScreen}/>
  </EatStack.Navigator>
);
}

function EatScreen({navigation}){
  const MoveToFoodList = () =>{
    navigation.navigate("FoodList");
  }
return(
  <View style={styles.container}>
    <Text>EatScreen</Text>
    <Button onPress = {MoveToFoodList} title="FoodList" />
  </View>
);
}

function FoodListScreen({navigation}){
  const MoveToFullness = () =>{
    navigation.navigate("Fullness");
  }
return(
  <View style={styles.container}>
    <Text>FoodListScreen</Text>
    <Button onPress = {MoveToFullness} title="Fullness" />
  </View>
);
}

function FullnessScreen({navigation}){
  const MoveToMain = () =>{
    navigation.navigate("Main");
  }
return(
  <View style={styles.container}>
    <Text>FullnessScreen</Text>
    <Button onPress = {MoveToMain} title="Main" />
  </View>
);
}

const CleanStack = createStackNavigator();

function CleanStackScreen(){
return(
  <CleanStack.Navigator>
  <CleanStack.Screen name="Clean" component={CleanScreen}/>
  <CleanStack.Screen name="CleanList" component={CleanListScreen}/>
  <CleanStack.Screen name="Cleanliness" component={CleanlinessScreen}/>
  <CleanStack.Screen name="Main" component={MainScreen}/>
  </CleanStack.Navigator>
);
}

function CleanScreen({navigation}){
  const MoveToCleanList = () =>{
    navigation.navigate("CleanList");
  }
return(
  <View style={styles.container}>
    <Text>CleanScreen</Text>
    <Button onPress = {MoveToCleanList} title="CleanList" />
  </View>
);
}

function CleanListScreen({navigation}){
  const MoveToCleanliness = () =>{
    navigation.navigate("Cleanliness");
  }
return(
  <View style={styles.container}>
    <Text>CleanListScreen</Text>
    <Button onPress = {MoveToCleanliness} title="Cleanliness" />
  </View>
);
}

function CleanlinessScreen({navigation}){
  const MoveToMain = () =>{
    navigation.navigate("Main");
  }
return(
  <View style={styles.container}>
    <Text>CleanlinessScreen</Text>
    <Button onPress = {MoveToMain} title="Main" />
  </View>
);
}

const FunStack = createStackNavigator();

function FunStackScreen(){
return(
  <FunStack.Navigator>
  <FunStack.Screen name="Fun" component={FunScreen}/>
  <FunStack.Screen name="MiniGame" component={MiniGameScreen}/>
  <FunStack.Screen name="FunScore" component={FunScoreScreen}/>
  <FunStack.Screen name="FunReWard" component={FunReWardScreen}/>
  <CleanStack.Screen name="Main" component={MainScreen}/>
  </FunStack.Navigator>
);
}

function FunScreen({navigation}){
  const MoveToMiniGame = () =>{
    navigation.navigate("MiniGame");
  }
return(
  <View style={styles.container}>
    <Text>FunScreen</Text>
    <Button onPress = {MoveToMiniGame} title="MiniGame" />
  </View>
);
}

function MiniGameScreen({navigation}){
  const MoveToFunScore = () =>{
    navigation.navigate("FunScore");
  }
return(
  <View style={styles.container}>
    <Text>MiniGameScreen</Text>
    <Button onPress = {MoveToFunScore} title="FunScore" />
  </View>
);
}

function FunScoreScreen({navigation}){
  const MoveToFunReWard = () =>{
    navigation.navigate("FunReWard");
  }
return(
  <View style={styles.container}>
    <Text>FunScoreScreen</Text>
    <Button onPress = {MoveToFunReWard} title="FunReWard" />
  </View>
);
}

function FunReWardScreen({navigation}){
  const MoveToMain = () =>{
    navigation.navigate("Main");
  }
return(
  <View style={styles.container}>
    <Text>FunReWardScreen</Text>
    <Button onPress = {MoveToMain} title="Main" />
  </View>
);
}

function SleepScreen({navigation}){
  const MoveToMain = () =>{
    navigation.navigate("Main");
  }
return(
  <View style={styles.container}>
    <Text>SleepScreen</Text>
    <Button onPress = {MoveToMain} title="Main" />
  </View>
);
}

const AchieveDrawer = createDrawerNavigator();

function AchieveDrawerScreen(){
return(
  <AchieveDrawer.Navigator>
  <AchieveDrawer.Screen name="Achieve" component={AchieveScreen} />
  <AchieveDrawer.Screen name="AchieveReward" component={AchieveRewardScreen} />
  <AchieveDrawer.Screen name="Main" component={MainScreen} />
  </AchieveDrawer.Navigator>
);
}

function AchieveScreen({navigation}){
  const MoveToAchieveReward = () =>{
    navigation.navigate("AchieveReward");
  }
return(
  <View style={styles.container}>
    <Text>AchieveScreen</Text>
    <Button onPress = {MoveToAchieveReward} title="AchieveReward" />
  </View>
);
}

function AchieveRewardScreen({navigation}){
  const MoveToMain = () =>{
    navigation.navigate("Main");
  }
  const OpenDrawer = () =>{
    navigation.dispatch(DrawerActions.openDrawer());
  }
  const ToggleDrawer = () =>{
    navigation.dispatch(DrawerActions.toggleDrawer());
  }
return(
  <View style={styles.container}>
    <Text>AchieveRewardScreen</Text>
    <Button onPress = {MoveToMain} title="Main" />
    <Button onPress = {OpenDrawer} title="Open Drawer"/>
    <Button onPress = {ToggleDrawer} title="Toggle Drawer"/>
  </View>
);
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <Image source={require('./assets/favicon.png')} styles={styles.box}/>
    </DrawerContentScrollView>
  );
}

const SettingDrawer = createDrawerNavigator();

function SettingDrawerScreen(){
return(
  <SettingDrawer.Navigator 
  drawerPosition={'right'}
  drawerBackgroundColor={'orange'}
  drawerWidth={200}
  drawerContent={props => <CustomDrawerContent {...props} />}>
  <SettingDrawer.Screen name="Setting" component={SettingStackScreen} />
  <SettingDrawer.Screen name="Main" component={MainScreen} />
  </SettingDrawer.Navigator>
);
}

const SettingStack = createStackNavigator();

function SettingStackScreen(){
return(
  <SettingStack.Navigator>
  <SettingStack.Screen name="Setting" component={SettingScreen}/>
  <SettingStack.Screen name="Quest" component={QuestScreen}/>
  <SettingStack.Screen name="Attend" component={AttendScreen}/>
  <SettingStack.Screen name="Shop" component={ShopScreen}/>
  <SettingStack.Screen name="Collection" component={CollectionScreen}/>
  <SettingStack.Screen name="Main" component={MainScreen}/>
  </SettingStack.Navigator>
);
}

function SettingScreen({navigation}) {
  const MoveToQuest = () =>{
    navigation.navigate("Quest");
  }
  const MoveToAttend = () =>{
    navigation.navigate("Attend");
  }
  const MoveToShop = () =>{
    navigation.navigate("Shop");
  }
  const MoveToCollection = () =>{
    navigation.navigate("Collection");
  }
  const MoveToMain = () =>{
    navigation.navigate("Main");
  }
  return(
    <View style={styles.container}>
    <Text>SettingScreen</Text>
    <FontAwesome5 name="home" size={24} color="black" />
    <Button onPress = {MoveToQuest} title="Quest" />
    <Button onPress = {MoveToAttend} title="Attend" />
    <Button onPress = {MoveToShop} title="Shop" />
    <Button onPress = {MoveToCollection} title="Collection" />
    <Button onPress = {MoveToMain} title="Main" />
    </View>
  );
}

function QuestScreen({navigation}){
  const MoveToSetting = () =>{
    navigation.navigate("Setting");
  }
return(
  <View style={styles.container}>
    <Text>QuestScreen</Text>
    <Button onPress = {MoveToSetting} title="Setting" />
  </View>
);
}

function AttendScreen({navigation}){
  const MoveToSetting = () =>{
    navigation.navigate("Setting");
  }
return(
  <View style={styles.container}>
    <Text>AttendScreen</Text>
    <Button onPress = {MoveToSetting} title="Setting" />
  </View>
);
}

function ShopScreen({navigation}){
  const MoveToSetting = () =>{
    navigation.navigate("Setting");
  }
return(
  <View style={styles.container}>
    <Text>ShopScreen</Text>
    <Button onPress = {MoveToSetting} title="Setting" />
  </View>
);
}

function CollectionScreen({navigation}){
  const MoveToSetting = () =>{
    navigation.navigate("Setting");
  }
return(
  <View style={styles.container}>
    <Text>CollectionScreen</Text>
    <Button onPress = {MoveToSetting} title="Setting" />
  </View>
);
}

const FunitureStack = createStackNavigator();

function FunitureStackScreen(){
return(
  <FunitureStack.Navigator>
  <FunitureStack.Screen name="Funiture" component={FunitureScreen}/>
  <FunitureStack.Screen name="FunitureList" component={FunitureListScreen}/>
  <FunitureStack.Screen name="FuniturePosition" component={FuniturePositionScreen}/>
  <FunitureStack.Screen name="Main" component={MainScreen}/>
  </FunitureStack.Navigator>
);
}

function FunitureScreen({navigation}){
  const MoveToFunitureList = () =>{
    navigation.navigate("FunitureList");
  }
return(
  <View style={styles.container}>
    <Text>FunitureScreen</Text>
    <Button onPress = {MoveToFunitureList} title="FunitureList" />
  </View>
);
}

function FunitureListScreen({navigation}){
  const MoveToFuniturePosition = () =>{
    navigation.navigate("FuniturePosition");
  }
return(
  <View style={styles.container}>
    <Text>FunitureListScreen</Text>
    <Button onPress = {MoveToFuniturePosition} title="FuniturePosition" />
  </View>
);
}

function FuniturePositionScreen({navigation}){
  const MoveToMain = () =>{
    navigation.navigate("Main");
  }
return(
  <View style={styles.container}>
    <Text>FuniturePositionScreen</Text>
    <Button onPress = {MoveToMain} title="Main" />
  </View>
);
}

function MainTitle() {
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', backgroundColor: '#f4511e'}}>
    <FontAwesome5 name="home" size={24} color="black" />
    <Text style={{color : 'white', fontsize:18}}>Main</Text>
    </View>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// export default 
function App() {
  const pressText = () =>{
    console.log("you pressed touchable");
  } 
  return (
      <NavigationContainer>
      <Stack.Navigator headerMode={'none'}
      // initialRouteName="Title" screenOptions={{title : '100일몽', headerStyle: {
      //       backgroundColor: '#f4511e',
      //     },
      //     headerTintColor: '#fff',
      //     headerTitleStyle: {
      //       fontWeight: 'bold',
      //       alignItems: 'center',
      //     },}}
          >
        <Stack.Screen name="Title" component={TitleScreen} />
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="PetChoice" component={PetChoiceScreen} />
        <Stack.Screen name="MainStack" component={MainStackScreen} /*options={{headerTitle : props => <MainTitle{...props} /> }}*/></Stack.Screen>
      </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },

  safeAreaContainer: {
    flex : 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'skyblue',
    paddingTop : Platform.Os == 'android' ? 24 : 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    fontSize: 32
  },

  header:{
    flex:1,
  },

  title:{
    position: 'absolute',
    fontSize: 50,
    top : 100,
  },

  titlebutton:{
    position: 'absolute',
    bottom: 100,
  },

  titlebuttonfont:{
    fontSize: 25,
    color: 'black',
  },

  intro:{
    position: 'absolute',
    justifyContent: 'center',
    top : 200,
    fontSize: 32,
  },

  introbutton:{
    position: 'absolute',
    right : 75,
    bottom: 75,
    borderRadius: 20,
    backgroundColor : '#A9A8B8',
  },

  introbuttonfont:{
    fontSize: 15,
    color: 'black',
  },

  introimage:{
    position: 'absolute',
    left : 50,
    top: 75,
    width : 300,
    height: 550,
    backgroundColor: 'gray',
    opacity: 0.5,
  },

  introbackground:{
    flex : 1,
    backgroundColor: '#A9A8B8',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },

  petchoicebackground:{
    flex : 1,
    backgroundColor: '#A9A8B8',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },

  petchoicebutton1:{
    position: 'absolute',
    width : 100,
    height: 100,
    left : 148,
    top: 100,
    borderRadius: 20,
    backgroundColor : 'gray',
    opacity : 0.6,
  },

  petchoicebutton1_1:{
    position: 'absolute',
    width : 100,
    height: 100,
    left : 148,
    top: 100,
    borderRadius: 20,
    backgroundColor : 'purple',
    opacity : 0.6,
  },

  petchoicebutton2:{
    position: 'absolute',
    width : 100,
    height: 100,
    left : 85,
    top: 225,
    borderRadius: 20,
    backgroundColor : 'gray',
    opacity : 0.6,
  },

  petchoicebutton3:{
    position: 'absolute',
    width : 100,
    height: 100,
    left : 215,
    top: 225,
    borderRadius: 20,
    backgroundColor : 'gray',
    opacity : 0.6,
  },

  egg1:{
    position: 'absolute',
    width : 90,
    height: 90,
    left : 153,
    top: 110,
  },

  egg2:{
    position: 'absolute',
    width : 90,
    height: 90,
    left : 90,
    top: 235,
  },

  egg3:{
    position: 'absolute',
    width : 90,
    height: 90,
    left : 220,
    top: 235,
  },

  choicebutton:{
    position: 'absolute',
    right : 115,
    bottom: 110,
    borderRadius: 20,
    backgroundColor : 'gray',
  },

  petchoicebuttonfont:{
    fontSize: 10,
    color: 'black',
  },

  petchoice:{
    position: 'absolute',
    width : 225,
    height: 225,
    right : 100,
    bottom: 100,
    backgroundColor : '#A9A8B8',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 225,
    borderRadius: 20,
  },

  mainbackground1:{
    position: 'absolute',
    width : 450,
    height: 350,
    left : 0,
    top: 0,
    backgroundColor : '#CFCFD7',
  },

  mainbackground2:{
    position: 'absolute',
    width : 450,
    height: 350,
    left : 0,
    top: 350,
    backgroundColor : '#A9A8B8',
  },

  eggbackground:{
    position: 'absolute',
    width : 150,
    height: 150,
    top: 280,
  },

  statebackground:{
    position: 'absolute',
    width : 60,
    height: 60,
    left : 5,
    top: 35,
    borderRadius: 50,
    backgroundColor : '#A9A8B8',
  },
  
  state:{
    position: 'absolute',
    width : 60,
    height: 60,
    left : 5,
    top: 45,
  },

  statefont:{
    fontSize: 15,
    color: 'black',
  },

  topmenu:{
    position: 'absolute',
    width : 330,
    height: 70,
    right : 10,
    top: 30,
    borderRadius: 20,
    backgroundColor : '#A9A8B8',
  },

  gamemoneybackground:{
    position: 'absolute',
    width : 290,
    height: 20,
    right : 30,
    top: 40,
    borderRadius: 25,
    backgroundColor : '#CFCFD7',
  },

  coinimage:{
    position: 'absolute',
    width : 20,
    height: 20,
    left : 96,
    top: 40,
  },

  coinnum:{
    position: 'absolute',
    width : 100,
    height: 20,
    left : 120,
    top: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  coinfont:{
    fontSize: 13,
  },

  jamimage:{
    position: 'absolute',
    width : 20,
    height: 20,
    left : 236,
    top: 40,
  },

  jamnum:{
    position: 'absolute',
    width : 100,
    height: 20,
    left : 260,
    top: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
   },

  jamfont:{
    fontSize: 13,
  },

  heartbackground:{
    position: 'absolute',
    width : 290,
    height: 20,
    right : 30,
    top: 70,
    borderRadius: 25,
    backgroundColor : '#CFCFD7',
  },

  heartgaugeimage:{
    position: 'absolute',
    width : 200,
    height: 20,
    right : 120,
    top: 70,
    borderRadius: 25,
    backgroundColor : '#FF6969',
  },

  heartimage:{
    position: 'absolute',
    width : 15,
    height: 15,
    left : 100,
    top: 74,
  },

  heartgauge:{
    position: 'absolute',
    width : 100,
    height: 20,
    left : 190,
    top: 60,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  heartfont:{
    fontSize: 13,
  },

  achievebackground:{
    position: 'absolute',
    width : 60,
    height: 60,
    right : 20,
    top: 110,
    borderRadius: 50,
    backgroundColor : '#A9A8B8',
  },

  achievebutton:{
    position: 'absolute',
    width : 60,
    height: 60,
    right : 20,
    top: 120,
    textAlign: 'center',
    lineHeight: 60,
  },

  achievebuttonfont:{
    fontSize: 15,
    color: 'black',
  },

  settingbackground:{
    position: 'absolute',
    width : 60,
    height: 60,
    right : 20,
    top: 180,
    borderRadius: 50,
    backgroundColor : '#A9A8B8',
  },

  settingbutton:{
    position: 'absolute',
    width : 60,
    height: 60,
    right : 20,
    top: 190,
    textAlign: 'center',
    lineHeight: 60,
  },

  settingbuttonfont:{
    fontSize: 15,
    color: 'black',
  },

  funiturebackground:{
    position: 'absolute',
    width : 60,
    height: 60,
    right : 20,
    top: 250,
    borderRadius: 50,
    backgroundColor : '#A9A8B8',
  },

  funiturebutton:{
    position: 'absolute',
    width : 60,
    height: 60,
    right : 20,
    top: 260,
    textAlign: 'center',
    lineHeight: 60,
  },

  funiturebuttonfont:{
    fontSize: 15,
    color: 'black',
  },

  bottommenu:{
    position: 'absolute',
    width : 370,
    height: 100,
    left : 20,
    bottom: 40,
    borderRadius: 20,
    backgroundColor : '#CFCFD7',
  },

  eatbackground:{
    position: 'absolute',
    width : 80,
    height: 80,
    left : 30,
    bottom: 50,
    borderRadius: 20,
    backgroundColor : '#A9A8B8',
  },

  eatgauge:{
    position: 'absolute',
    width : 80,
    height: 35,
    left : 30,
    bottom: 50,
    borderRadius: 20,
    backgroundColor : 'gray',
    opacity : 0.7,
  },

  eatbutton:{
    position: 'absolute',
    width : 80,
    height: 80,
    left : 30,
    bottom: 30,
    textAlign: 'center',
    lineHeight: 80,
  },

  eatbuttonfont:{
    fontSize: 15,
    color: 'black',
  },

  cleanbackground:{
    position: 'absolute',
    width : 80,
    height: 80,
    left : 120,
    bottom: 50,
    borderRadius: 20,
    backgroundColor : '#A9A8B8',
  },

  cleangauge:{
    position: 'absolute',
    width : 80,
    height: 45,
    left : 120,
    bottom: 50,
    borderRadius: 20,
    backgroundColor : 'gray',
    opacity : 0.7,
  },

  cleanbutton:{
    position: 'absolute',
    width : 80,
    height: 80,
    left : 120,
    bottom: 30,
    textAlign: 'center',
    lineHeight: 80,
  },

  cleanbuttonfont:{
    fontSize: 15,
    color: 'black',
  },

  funbackground:{
    position: 'absolute',
    width : 80,
    height: 80,
    left : 210,
    bottom: 50,
    borderRadius: 20,
    backgroundColor : '#A9A8B8',
  },

  fungauge:{
    position: 'absolute',
    width : 80,
    height: 65,
    left : 210,
    bottom: 50,
    borderRadius: 20,
    backgroundColor : 'gray',
    opacity : 0.7,
  },

  funbutton:{
    position: 'absolute',
    width : 80,
    height: 80,
    left : 210,
    bottom: 30,
    textAlign: 'center',
    lineHeight: 80,
  },

  funbuttonfont:{
    fontSize: 15,
    color: 'black',
  },

  sleepbackground:{
    position: 'absolute',
    width : 80,
    height: 80,
    left : 300,
    bottom: 50,
    borderRadius: 20,
    backgroundColor : '#A9A8B8',
  },

  sleepgauge:{
    position: 'absolute',
    width : 80,
    height: 30,
    left : 300,
    bottom: 50,
    borderRadius: 20,
    backgroundColor : 'gray',
    opacity : 0.7,
  },

  sleepbutton:{
    position: 'absolute',
    width : 80,
    height: 80,
    left : 300,
    bottom: 30,
    textAlign: 'center',
    lineHeight: 80,
  },

  sleepbuttonfont:{
    fontSize: 15,
    color: 'black',
  },

  textcenter:{
  textAlign:'center',
  },

  foodbackground:{
    position: 'absolute',
    width : 80,
    height: 80,
    left : 10,
    top : -10,
    borderColor: 'gray',
    borderWidth : 5,
    backgroundColor : '#A9A8B8',
  },

  foodbutton:{
    position: 'absolute',
    width : 120,
    left : -12,
    top : 15,
  },

  foodname:{
    position: 'absolute',
    width : 60,
    left : 20,
    top : 80,
    backgroundColor : 'white',
    textAlign:'center',
    borderRadius: 10,
  },

  foodfont:{
    fontSize : 10,
  },

  foodlist:{
    backgroundColor: Colors.grey500,
    width : 350,
    height : 500,
  },

  xbuttonbackground : {
    position: 'absolute',
    width : 30,
    height : 30,
    top : -80,
    right : 20,
    backgroundColor : '#CFCFD7',
  },

  xbutton : {
    position: 'absolute',
    width : 30,
    height : 30,
    top : -85,
    right : 20,
  },

  xbuttonfont :{
    position: 'absolute',
    top : 0,
    fontSize : 15,
  },

  minigameimage:{
    position: 'absolute',
    width : 250,
    height: 240,
    left : 50,
    top : 0,
    backgroundColor : '#CFCFD7',
    textAlign:'center',
    textAlignVertical: 'center',
    borderRadius: 20,
  },

  minigamefont:{
    fontSize : 15,
  },

  minigameinfo1:{
    position: 'absolute',
    width : 200,
    height: 5,
    left : 75,
    top : 270,
    backgroundColor : 'gray',
  },

  minigameinfo2:{
    position: 'absolute',
    width : 200,
    height: 5,
    left : 75,
    top : 300,
    backgroundColor : 'gray',
  },

  minigameinfo3:{
    position: 'absolute',
    width : 200,
    height: 5,
    left : 75,
    top : 330,
    backgroundColor : 'gray',
  },

  gamestartbutton:{
    position: 'absolute',
    width : 120,
    left : 120,
    bottom : -380,
    backgroundColor : '#CFCFD7',
    textAlign:'center',
    borderRadius: 10,
  },

  scoreboard:{
    position: 'absolute',
    backgroundColor: Colors.grey500,
    width : 275,
    height : 450,
    left : 35,
    borderRadius : 20,
  },

  scoretitle : {
    position: 'absolute',
    width : 130,
    height : 50,
    left : 70,
    top : -20,
    textAlign : 'center',
    justifyContent : 'center',
    backgroundColor: '#CFCFD7',
    borderRadius : 10,
  },

  scoreboardinfo: {
    position: 'absolute',
    width : 200,
    height : 230,
    left : 35,
    top : 45,
    textAlign : 'center',
    justifyContent : 'center',
    backgroundColor: '#CFCFD7',
    borderRadius : 10,
  },

  gotorewardbutton:{
    position: 'absolute',
    width : 120,
    height : 40,
    left : 75,
    bottom : -320,
    backgroundColor : '#CFCFD7',
    justifyContent: 'center',
    borderRadius: 10,
  },

  rewardinfo :{
    position: 'absolute',
    width : 150,
    height : 150,
    left : 50,
    top : 0,
    textAlign : 'center',
    justifyContent : 'center',
    backgroundColor: '#CFCFD7',
    borderRadius : 100,
  },

  questrewardinfo :{
    position: 'absolute',
    width : 150,
    height : 150,
    left : 55,
    top : 0,
    textAlign : 'center',
    justifyContent : 'center',
    backgroundColor: '#CFCFD7',
    borderRadius : 100,
  },

  questrewardbutton:{
    position: 'absolute',
    width : 120,
    height : 40,
    left : 70,
    bottom : -220,
    backgroundColor : '#CFCFD7',
    justifyContent: 'center',
    borderRadius: 10,
  },

















  funiturecheck:{
    backgroundColor: Colors.grey500,
    position: 'absolute',
    left : 20,
    width : 300,
    height : 170,
  },

  itemname:{
    position: 'absolute',
    width : 80,
    height : 25,
    left : 110,
    top : 120,
    textAlign : 'center',
    justifyContent : 'center',
    backgroundColor : 'white',
    borderRadius : 10,
  },

  itemnamefont:{
    fontSize : 10,
  },

  itemcheck:{
    backgroundColor: Colors.grey500,
    position: 'absolute',
    left : 30,
    width : 300,
    height : 400,
  },

  itemimage : {
    position: 'absolute',
    width : 150,
    height : 150,
    left : 75,
    top : -40,
    backgroundColor: 'darkgray',
    borderColor : 'gray',
    borderWidth : 5,
  },

  iteminfo1 : {
    position: 'absolute',
    width : 175,
    height: 5,
    left : 65,
    top : 170,
    backgroundColor : 'gray',
  },

  iteminfo2 : {
    position: 'absolute',
    width : 175,
    height: 5,
    left : 65,
    top : 200,
    backgroundColor : 'gray',
  },

  itemchecktext:{
    position: 'absolute',
    left : 90,
    top : 230,
  },

  itemyesbutton:{
    position: 'absolute',
    width : 120,
    left : 20,
    bottom : -270,
    backgroundColor : '#CFCFD7',
    textAlign:'center',
    borderRadius: 10,
  },

  itemnobutton:{
    position: 'absolute',
    width : 120,
    right : 20,
    bottom : -270,
    backgroundColor : '#CFCFD7',
    textAlign:'center',
    borderRadius: 10,
  },

  yesbutton:{
    position: 'absolute',
    width : 120,
    left : 20,
    bottom : -20,
    backgroundColor : '#CFCFD7',
    textAlign:'center',
    borderRadius: 10,
  },

  yesbuttonfont:{
    fontSize : 15,
  },

  nobutton:{
    position: 'absolute',
    width : 120,
    right : 20,
    bottom : -20,
    backgroundColor : '#CFCFD7',
    textAlign:'center',
    borderRadius: 10,
  },

  nobuttonfont :{
    fontSize : 15,
  },

  acheivelist:{
    position: 'absolute',
    left : 30,
    backgroundColor: Colors.grey500,
    width : 300,
    height : 500,
  },

  achieveimage:{
    position: 'absolute',
    width : 50,
    height : 40,
    left : 30,
    bottom : -15,
    backgroundColor : 'darkgray',
    borderColor : 'gray',
    borderWidth : 4,
    textAlign:'center',
    textAlignVertical: 'center',
    flexWrap : 'wrap',
  },

  achieveinfo:{
    position: 'absolute',
    width : 250,
    height : 50,
    left : 25,
    bottom : -20,
    backgroundColor : '#CFCFD7',
    textAlign:'center',
    textAlignVertical: 'center',
    flexWrap : 'wrap',
    borderRadius: 10,
  },

  achieveimagefont:{
    fontSize : 10,
  },

  achievefont:{
    fontSize : 15,
  },

  settinglist:{
    position: 'absolute',
    left : 30,
    backgroundColor: Colors.grey500,
    width : 300,
    height : 400,
  },

  settingquest:{
    position: 'absolute',
    width : 250,
    height : 60,
    left : 25,
    bottom : -40,
    backgroundColor : '#CFCFD7',
    justifyContent: 'center',
    borderRadius: 10,
  },

  settingshop :{
    position: 'absolute',
    width : 250,
    height : 60,
    left : 25,
    bottom : -120,
    backgroundColor : '#CFCFD7',
    justifyContent: 'center',
    borderRadius: 10,
  },

  settingcollection:{
    position: 'absolute',
    width : 250,
    height : 60,
    left : 25,
    bottom : -200,
    backgroundColor : '#CFCFD7',
    justifyContent: 'center',
    borderRadius: 10,
  },

  settingminigame:{
    position: 'absolute',
    width : 250,
    height : 60,
    left : 25,
    bottom : -280,
    backgroundColor : '#CFCFD7',
    justifyContent: 'center',
    borderRadius: 10,
  },

  settingfont:{
    fontSize : 15,
  },

  todayquest:{
    width : 125,
    height : 50,
    left : 70,
    textAlign:'center',
    textAlignVertical: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },

  questimage:{
    position: 'absolute',
    width : 30,
    height : 30,
    left : 15,
    bottom : -10,
    backgroundColor : 'darkgray',
    borderColor : 'gray',
    borderWidth : 4,
    textAlign:'center',
    textAlignVertical: 'center',
    flexWrap : 'wrap',
  },

  questinfo:{
    position: 'absolute',
    width : 220,
    height : 50,
    left : 55,
    bottom : -20,
    backgroundColor : '#CFCFD7',
    justifyContent: 'center',
    borderRadius: 10,
  },

  questimagefont:{
    fontSize : 10,
  },

  questfont:{
    fontSize : 15,
  },

  rewardbutton:{
    position: 'absolute',
    width : 120,
    height : 40,
    left : 65,
    bottom : -220,
    backgroundColor : '#CFCFD7',
    justifyContent: 'center',
    borderRadius: 10,
  },

  reward:{
    position: 'absolute',
    backgroundColor: Colors.grey500,
    width : 250,
    height : 400,
    left : 47,
  },

  
  questreward:{
    position: 'absolute',
    backgroundColor: Colors.grey500,
    width : 265,
    height : 400,
    left : 47,
  },

  shopcoinimage:{
    position: 'absolute',
    width : 20,
    height: 20,
    left : 10,
    top: -55,
  },

  shopcoinnum:{
    position: 'absolute',
    width : 80,
    height : 30,
    left : 5,
    top: -60,
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },

  shopcoinfont:{
    fontSize: 10,
  },

  buysuccess:{
    backgroundColor: Colors.grey500,
    position: 'absolute',
    left : 30,
    width : 300,
    height : 170,
  },

  checkbutton:{
    position: 'absolute',
    width : 120,
    height : 40,
    left : 90,
    bottom: -20,
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    borderRadius : 10,
  },

  checkbuttonfont:{
    fontSize: 20,
  },

  collectionlist:{
    position: 'absolute',
    left : -25,
    top: -45,
    backgroundColor: Colors.grey500,
    width : 335,
    height : 700,
  },

  collectiontitle:{
    textAlign:'center',
    top: 50,
  },
  
  collectionbackground:{
    position: 'absolute',
    width : 80,
    height: 80,
    left : 30,
    top : 70,
    borderColor: 'gray',
    borderWidth : 5,
    backgroundColor : '#A9A8B8',
  },

  collectionbutton:{
    position: 'absolute',
    width : 80,
    left : 30,
    top : 95,
  },

  collectionname:{
    position: 'absolute',
    width : 70,
    left : 35,
    top : 160,
    backgroundColor : 'white',
    textAlign:'center',
    borderRadius: 5,
  },

  collectionfont:{
    fontSize : 10,
  },

  petinfo:{
    position: 'absolute',
    right : -25,
    top: -45,
    backgroundColor: Colors.grey500,
    width : 335,
    height : 700,
  },

  petname:{
    textAlign:'center',
    textAlignVertical: 'center',
    width : 150,
    height: 50,
    left: 75,
    top: 50,
    borderRadius: 10,
    backgroundColor : 'lightgray',
  },

  petxbuttonbackground : {
    position: 'absolute',
    width : 30,
    height : 30,
    top : -60,
    left : 20,
    backgroundColor : '#CFCFD7',
  },

  petxbutton : {
    position: 'absolute',
    width : 30,
    height : 30,
    top : -65,
    left : 20,
  },

  petxbuttonfont :{
    position: 'absolute',
    top : 0,
    fontSize : 15,
  },

  petimage:{
    position: 'absolute',
    width : 250,
    height: 300,
    left : 50,
    top : 50,
    backgroundColor : '#CFCFD7',
    textAlign:'center',
    textAlignVertical: 'center',
    borderRadius: 20,
  },

  petfont:{
    fontSize : 15,
  },

  petinfo1:{
    position: 'absolute',
    width : 200,
    height: 5,
    left : 75,
    top : 390,
    backgroundColor : 'gray',
  },

  petinfo2:{
    position: 'absolute',
    width : 200,
    height: 5,
    left : 75,
    top : 420,
    backgroundColor : 'gray',
  },

  petinfo3:{
    position: 'absolute',
    width : 200,
    height: 5,
    left : 75,
    top : 450,
    backgroundColor : 'gray',
  },

  petinfo4:{
    position: 'absolute',
    width : 200,
    height: 5,
    left : 75,
    top : 480,
    backgroundColor : 'gray',
  },

  lightfuniture: {
    width: 250,
    height: 300,
    alignSelf: 'center',
    margin: 10,
    zIndex: 200,
  },










































  handlerbox:{
    width : 100,
    height: 100,
    backgroundColor : 'red',
  },
































  bottom:{
    position: 'absolute',
    left:0,
    right:0,
    bottom:0,
  },

  box:{
    width : 100,
    height: 100,
    resizeMode : 'cover',
  },

  touchable:{
    width : 100,
    height : 100,
  },

  text1:{
    width : 100,
    height: 100,
    backgroundColor: 'red',
    color : 'white',
    textAlign : "center",
    textAlignVertical : 'center',
  },

  text3:{
    width : 100,
    height: 100,
    backgroundColor: 'blue',
  },

});
