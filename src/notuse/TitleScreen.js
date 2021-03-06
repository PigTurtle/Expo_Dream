import { StatusBar } from 'expo-status-bar';
import React, {useState, Component, useEffect}  from 'react';
import { StyleSheet, Modal, View, SafeAreaView, Image, Platform, TouchableOpacity, FlatList, AppRegistry, Dimensions,
  TouchableHighlight, TouchableWithoutFeedback, Alert, } from 'react-native';
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
import PopupDialog, { Animation, DialogTitle, SlideAnimation, DialogContent , } from 'react-native-popup-dialog';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { VerticalMotionExample } from './src/test';
import { MovingSquare } from './src/MovingSquare';
import { RotatingSquare } from './src/RotatingSquare';
import { DraggableBox } from './src/DraggableBox';
import { MyModal } from './src/MyModal';
import { ReanimatedScreen2 } from './src/Reanimated2Box';
import { ReanimatedScreen } from './src/animationcode';

import Animated, { Easing, useSharedValue, withSpring, useAnimatedStyle, repeat, delay, 
  useAnimatedGestureHandler, withTiming, sequence } from 'react-native-reanimated';


const WINDOW_H = Dimensions.get('window').height;
const WINDOW_W = Dimensions.get('window').width;

const slideAnimation = new SlideAnimation({ slideFrom: 'top', useNativeDriver: true, });


export class SlideDialogTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
    };

    this.openSlideAnimationDialog = this.openSlideAnimationDialog.bind(this);
  }

  openSlideAnimationDialog() {
    this.slideAnimationDialog.openDialog();
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.openSlideAnimationDialog}> <Text>Open Dialog - Slide Animation</Text></Button>

        <PopupDialog
          dialogTitle={<DialogTitle title="Popup Dialog - Slide Animation" />}
          ref={(popupDialog) => {
            this.slideAnimationDialog = popupDialog;
          }}
          dialogAnimation={slideAnimation}
        >
          <View style={styles.dialogContentView}>
            <Text>Slide Animation</Text>
          </View>
        </PopupDialog>
      </View>
		);
  }
}









function TitleScreen({navigation}){
  const MoveToIntro = () =>{
    navigation.navigate("Intro");
  }
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    // 1초마다 깜빡거림
    const interval = setInterval(() => {
      setShowText((showText) => !showText);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

return(
  <View style={styles.container}>
    <Image source={require('./assets/images/title/title.png')} style={styles.title} resizeMode ="stretch"/>
    <View style={styles.titlebutton}>
    <Text style={[ styles.titlebuttonfont, {display: showText ? 'none' : 'flex'} ]}>
          화면을 터치해 주세요. </Text></View>
    <TouchableOpacity style={styles.titlebuttonbg} onPress={MoveToIntro} activeOpacity={1}></TouchableOpacity>
  </View>
);
}

function IntroScreen({navigation}){
  const MoveToPetChoice = () =>{
    navigation.navigate("PetChoice");
  }
return(
  <View style={styles.introbackground}>
    <Image source={require('./assets/images/intro/intro.png')} style={styles.intro} resizeMode ="stretch"/>
    <Image source={require('./assets/images/intro/prologuebg.png')} style={styles.prologuebg} resizeMode ="stretch"/>

    <Text style={styles.prologuefont}>프롤로그</Text>

    <Image source={require('./assets/images/intro/prologue.png')} style={styles.prologue} resizeMode ="stretch"/>
    <Image source={require('./assets/images/intro/selectcircle.png')} style={styles.introcircle1} resizeMode ="stretch"/>
    <Image source={require('./assets/images/intro/normalcircle.png')} style={styles.introcircle2} resizeMode ="stretch"/>
    <Image source={require('./assets/images/intro/normalcircle.png')} style={styles.introcircle3} resizeMode ="stretch"/>
    <Image source={require('./assets/images/intro/normalcircle.png')} style={styles.introcircle4} resizeMode ="stretch"/>
    <Image source={require('./assets/images/intro/normalcircle.png')} style={styles.introcircle5} resizeMode ="stretch"/>

    <Text style={styles.prologueinfofont}>꿈속에 나오던 미지의 공간 ...</Text>

    <Image source={require('./assets/images/intro/button.png')} style={styles.introbuttonbg} resizeMode ="stretch"/>
    <TouchableOpacity style={styles.introbutton} onPress={MoveToPetChoice} activeOpacity={1}><Text style={styles.introbuttonfont}>Skip ></Text></TouchableOpacity>
  </View>
);
}

function PetChoiceScreen({navigation}){
  const [buttonable, setable] = useState(false);
  const isbottondown = () =>{
    setable(buttonable === false ? true : false);
  }
  const MoveToMainStack = () =>{
    navigation.navigate("Main");
  }
return(
  <View style={styles.petchoicebackground}>
    <Image source={require('./assets/images/intro/intro.png')} style={styles.intro} resizeMode ="stretch"/>
    <Image source={require('./assets/images/intro/prologuebg.png')} style={styles.prologuebg} resizeMode ="stretch"/>

    {(buttonable == false) ?
    <Button disabled onPress={() => {}}></Button> :
    <Button disabled onPress={() => {}} style={styles.petchoiceborder}></Button>
    }
    
    <Image source={require('./assets/images/petchoice/pet1bg.png')} style={styles.pet1bg} resizeMode ="stretch"/>
    {/* <Image source={require('./assets/images/petchoice/pet1.png')} style={styles.pet1bg} resizeMode ="stretch"/>
    <Button onPress={isbottondown} style={styles.pet1}></Button> */}

    <TouchableOpacity
                style={styles.pet1}
                onPress={isbottondown} activeOpacity={1}>
          <Image source={require('./assets/images/petchoice/pet1.png')} resizeMode ="stretch"/>
        </TouchableOpacity>


    {/* <TouchableOpacity onPress={isbottondown}>
    <Image style={styles.pet1} resizeMode ="stretch" source={require('./assets/images/petchoice/pet1.png')} />
    </TouchableOpacity> */}

    <Image source={require('./assets/images/petchoice/pet2bg.png')} style={styles.pet2} resizeMode ="stretch"/>
    <Image source={require('./assets/images/petchoice/pet2.png')} style={styles.pet2} resizeMode ="stretch"/>
    <Image source={require('./assets/images/petchoice/pet3bg.png')} style={styles.pet3} resizeMode ="stretch"/>
    <Image source={require('./assets/images/petchoice/pet3.png')} style={styles.pet3} resizeMode ="stretch"/>
    <Image source={require('./assets/images/petchoice/petinfo.png')} style={styles.petinfobg} resizeMode ="stretch"/>
    <Text style={styles.petchoiceinfo}>자연의 싱그러움이 느껴지는</Text> 
    <Text style={styles.petchoiceinfo2}> 미지의 알. </Text> 
    <Text style={styles.petchoiceinfo3}>육성 난이도 :  쉬움 </Text> 

    <Image source={require('./assets/images/intro/button.png')} style={styles.choicebuttonbg} resizeMode ="stretch"/>
    {(buttonable == false) ?
    <TouchableOpacity disabled style={styles.choicebutton} onPress={MoveToMainStack}><Text style={styles.petchoicebuttonfont}>선택하기</Text></TouchableOpacity>:
    <TouchableOpacity style={styles.choicebutton} onPress={MoveToMainStack} activeOpacity={1}><Text style={styles.petchoicebuttonfont}>선택하기</Text></TouchableOpacity>
    }
  </View>
);
}

export default App;

const FruitData = [
  {
    key : 1,
    id: './assets/images/eat/appleslot.png',
    title: "apple",
  },
  {
    key : 2,
    id: './assets/images/eat/watermelon.png',
    title: "watermelon",
  },
  {
    key : 3,
    id: './assets/images/eat/slotdefault.png',
    title: "default",
  },
  {
    key : 4,
    id: './assets/images/eat/slotdefault.png',
    title: "default",
  },
  {
    key : 5,
    id: './assets/images/eat/slotdefault.png',
    title: "default",
  },
  {
    key : 6,
    id: './assets/images/eat/slotdefault.png',
    title: "default",
  },
  {
    key : 7,
    id: './assets/images/eat/slotdefault.png',
    title: "default",
  },
  {
    key : 8,
    id: './assets/images/eat/slotdefault.png',
    title: "default",
  },
  {
    key : 9,
    id: './assets/images/eat/slotdefault.png',
    title: "default",
  },
  {
    key : 10,
    id: './assets/images/eat/slotdefault.png',
    title: "default",
  },
];

const Item = ({item, onPress}) => (
  <TouchableOpacity
  style={[styles.image]}
  onPress={onPress} activeOpacity={1}>
<Image source={{require : item.id}} resizeMode ="stretch"/>
</TouchableOpacity>
);

const styles2 = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  image:{
    width : 100,
    height : 100,
  }
});

function MainScreen({navigation}) {
  const [coin, setCoin] = useState(3000);
  const [jam, setJam] = useState(100);
  const [heart, setHeart] = useState(70);

  const [eattabname, seteattabname] = useState("과일");
  const seteattabfruit = () => seteattabname("과일");
  const seteattabmeat = () => seteattabname("육류");
  const seteattabetc = () => seteattabname("그외");

  const [cleantabname, setcleantabname] = useState("솔");
  const setcleantabbrush = () => setcleantabname("솔");
  const setcleantabdetergent = () => setcleantabname("세정제");
  const setcleantabtub = () => setcleantabname("욕조");

  const [dictionaryinfo, setdictionaryinfo] = useState(false);
  const setdictionaryinfofalse = () => setdictionaryinfo(false);
  const setdictionaryinfotrue = () => setdictionaryinfo(true);

  const [achievevisible, setachieveVisible] = useState(false);
  const showachieveDialog = () => setachieveVisible(true);
  const hideachieveDialog = () => setachieveVisible(false);
  const [settingvisible, setsettingVisible] = useState(false);
  const showsettingDialog = () => {
    setmenu1();
    setsettingVisible(true);
  }
  const hidesettingDialog = () => setsettingVisible(false);
  const [furniturevisible, setfurnitureVisible] = useState(false);
  const showfurnitureDialog = () => setfurnitureVisible(true);
  const hidefurnitureDialog = () => setfurnitureVisible(false);
  const [dictionaryvisible, setdictionaryVisible] = useState(false);
  const showdictionaryDialog = () => setdictionaryVisible(true);
  const hidedictionaryDialog = () => setdictionaryVisible(false);
  const [eatvisible, seteatVisible] = useState(false);
  const showeatDialog = () => {
    seteattabfruit();
    seteatVisible(true);
  }
  const hideeatDialog = () => seteatVisible(false);
  const [cleanvisible, setcleanVisible] = useState(false);
  const showcleanDialog = () => {
    setcleantabbrush();
    setcleanVisible(true);
  }
  const hidecleanDialog = () => setcleanVisible(false);
  const [funvisible, setfunVisible] = useState(false);
  const showfunDialog = () => setfunVisible(true);
  const hidefunDialog = () => setfunVisible(false);
  const [sleepvisible, setsleepVisible] = useState(false);
  const showsleepDialog = () => setsleepVisible(true);
  const hidesleepDialog = () => setsleepVisible(false);

  const [furniturecheckvisible, setfurniturecheckVisible] = useState(false);
  const showfurniturecheckDialog = () => setfurniturecheckVisible(true);
  const showfurniture = () => {
    setfurnitureVisible(false);
    setfurniturecheckVisible(false);
    setlightVisible(true);
  }
  const hidefurniturecheckDialog = () => {
    setfurniturecheckVisible(false);
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
    setCoin(coin => coin + 100);
  }

  const [questrewardvisible, setquestrewardVisible] = useState(false);
  const showquestrewardDialog = () => setquestrewardVisible(true);
  const hidequestrewardDialog = () => {
    setquestrewardVisible(false);
    setquestVisible(false);
    setCoin(coin => coin + 100);
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
  const showbuysuccessDialog = () => { 
    setbuysuccessVisible(true);
    setCoin(coin => coin - 100);
  }
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

  const [menu, setmenunum] = useState(true);
  const setmenu1 = () => setmenunum(true);
  const setmenu2 = () => setmenunum(false);

  const [quest, setquest] = useState("daily");
  const setquestdaily = () => setquest("daily");
  const setquestattend = () => setquest("attend");

  const [furniture, setfurniture] = useState("wall");
  const setfurniturewall = () => setfurniture("wall");
  const setfurniturefloor = () => setfurniture("floor");

  const renderEatFruit = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={hideeatDialog}
      />
    );
    }
  
  return(
    <View style={styles.container}>
    <Image source={require('./assets/images/main/main.png')} style={styles.main} resizeMode ="stretch"/>

    {(lightvisible == true) ?
        <DraggableBox /> : <Text></Text>
    }

    <Image source={require('./assets/images/main/pet1.png')} style={styles.mainpetbg} resizeMode ="cover"/>
    <Image source={require('./assets/images/main/smile.png')} style={styles.mainsmile} resizeMode ="cover"/>
    <Image source={require('./assets/images/main/circle.png')} style={styles.stagebg} resizeMode ="cover"/>
    <Button disabled onPress={() => {}} style={styles.stage}><Text style={styles.statefont}>stage</Text></Button>
    <Button disabled onPress={() => {}} style={styles.gamemoneybackground}><Text ></Text></Button>
    <Button disabled onPress={() => {}} style={styles.heartbackground}><Text ></Text></Button>
    <Button disabled onPress={() => {}} style={styles.heartgaugeimage}><Text ></Text></Button>
    <Image source={require('./assets/images/coin.png')} style={styles.coinimage} resizeMode ="cover"/>
    <Image source={require('./assets/images/diamond.png')} style={styles.jamimage} resizeMode ="cover"/>
    <Image source={require('./assets/images/heart.png')} style={styles.heartimage} resizeMode ="cover"/>
    <Button disabled onPress={() => {}} style={styles.coinnum}><Text style={styles.coinfont}>{coin}</Text></Button>
    <Button disabled onPress={() => {}} style={styles.jamnum}><Text style={styles.jamfont}>{jam}</Text></Button>
    <Button disabled onPress={() => {}} style={styles.heartgauge}><Text style={styles.heartfont}>{heart}%</Text></Button>

    {/* <RotatingSquare />
    <MovingSquare />  
    <MyModal />  */}

    <TouchableOpacity
                style={styles.menubg}
                onPress={showsettingDialog} activeOpacity={1}>
          <Image source={require('./assets/images/main/menu.png')} resizeMode ="stretch"/>
        </TouchableOpacity>

    
  <Button disabled onPress={() => {}} style={styles.bottommenu}><Text></Text></Button>

  <Button disabled onPress={() => {}} style={styles.eatbackground}><Text></Text></Button>
  <Image source={require('./assets/images/main/eat.png')} style={styles.eatgauge} resizeMode ="stretch"/>
  {/* <Button color={Colors.black} onPress={showeatDialog} style={styles.eatbutton}></Button> */}
  <TouchableOpacity
                style={styles.eatbutton}
                onPress={showeatDialog} activeOpacity={1}>
  </TouchableOpacity>

    <Button disabled onPress={() => {}} style={styles.cleanbackground}><Text ></Text></Button>
    <Image source={require('./assets/images/main/clean.png')} style={styles.cleangauge} resizeMode ="stretch"/>
    {/* <Button color={Colors.black} onPress={showcleanDialog} style={styles.cleanbutton}></Button> */}
    <TouchableOpacity
                style={styles.cleanbutton}
                onPress={showcleanDialog} activeOpacity={1}>
  </TouchableOpacity>

    <Button disabled onPress={() => {}} style={styles.funbackground}><Text ></Text></Button>
    <Image source={require('./assets/images/main/funny.png')} style={styles.fungauge} resizeMode ="stretch"/>
    {/* <Button color={Colors.black} onPress={showfunDialog} style={styles.funbutton}></Button> */}
    <TouchableOpacity
                style={styles.funbutton}
                onPress={showfunDialog} activeOpacity={1}>
  </TouchableOpacity>

    <Button disabled onPress={() => {}} style={styles.sleepbackground}><Text ></Text></Button>
    <Image source={require('./assets/images/main/sleep.png')} style={styles.sleepgauge} resizeMode ="stretch"/>
    {/* <Button color={Colors.black} onPress={showsleepDialog} style={styles.sleepbutton}></Button> */}
    <TouchableOpacity
                style={styles.sleepbutton}
                onPress={showsleepDialog} activeOpacity={1}>
  </TouchableOpacity>

  {/* <FlatList
        data={FruitData}
        renderItem={renderEatFruit}
        keyExtractor={(item) => item.key}
      /> */}


<Dialog visible={settingvisible} onDismiss={hidesettingDialog} style={styles.settinglist}>
  <Dialog.Title style={styles.textcenter}>메뉴</Dialog.Title>
  <Dialog.Content>

  <Image style={styles.menubg1} source={require('./assets/images/menu/menu1bg.png')} resizeMode ="stretch"/> 
  {menu == false && <Image style={styles.menubg1} source={require('./assets/images/menu/menu2bg.png')} resizeMode ="stretch"/>}    
  {/* {(menu == true) ?
        <Image style={styles.menubg1} source={require('./assets/images/menu/menu1bg.png')} resizeMode ="stretch"/> :
        <Image style={styles.menubg1} source={require('./assets/images/menu/menu2bg.png')} resizeMode ="stretch"/>
  } */}
  <Text style={styles.menufont}>메뉴</Text>

  <Image style={styles.menu1} source={require('./assets/images/menu/menu1.png')} resizeMode ="stretch"/>
  {(menu == true) ?
        <Image style={styles.menu1num} source={require('./assets/images/menu/1.1.png')} resizeMode ="stretch"/> :
        <Image style={styles.menu1num} source={require('./assets/images/menu/1.png')} resizeMode ="stretch"/>
  }

  {(menu == true) ?
     <Button disabled color={Colors.black} onPress={setmenu1} style={styles.menu1}><Text ></Text></Button> :
    //  <Button color={Colors.black} onPress={setmenu1} style={styles.menu1}><Text ></Text></Button>
    <TouchableOpacity
                style={styles.menu1}
                onPress={setmenu1} >
  </TouchableOpacity>
  }

  <Image style={styles.menu2} source={require('./assets/images/menu/menu2.png')} resizeMode ="stretch"/>
  {(menu == true) ?
        <Image style={styles.menu2num} source={require('./assets/images/menu/2.png')} resizeMode ="stretch"/> :
        <Image style={styles.menu2num} source={require('./assets/images/menu/2.1.png')} resizeMode ="stretch"/>
  }

{(menu == true) ?
      // <Button color={Colors.black} onPress={setmenu2} style={styles.menu2}><Text ></Text></Button>
      <TouchableOpacity
                style={styles.menu2}
                onPress={setmenu2} >
  </TouchableOpacity> :
       <Button disabled color={Colors.black} onPress={setmenu2} style={styles.menu2}><Text ></Text></Button>
  
  }
     
  {(menu == true) ?
      <Image style={styles.menuquest} source={require('./assets/images/menu/quest.png')} resizeMode ="stretch"/> :
      <Image style={styles.menuquest} source={require('./assets/images/menu/achieve.png')} resizeMode ="stretch"/>
  }   

  {(menu == true) ?
     //<Button color={Colors.black} onPress={showquestDialog} style={styles.menuquestbutton}><Text></Text></Button>
     <TouchableOpacity
     style={styles.menuquestbutton}
     onPress={showquestDialog} >
</TouchableOpacity> :
     //<Button color={Colors.black} onPress={showachieveDialog} style={styles.menuquestbutton}><Text></Text></Button>
     <TouchableOpacity
     style={styles.menuquestbutton}
     onPress={showachieveDialog} >
</TouchableOpacity>
  }  

  {(menu == true) ?
      <Image style={styles.menushop} source={require('./assets/images/menu/shop.png')} resizeMode ="stretch"/> :
      <Image style={styles.menushop} source={require('./assets/images/menu/store.png')} resizeMode ="stretch"/>
  }   

  {(menu == true) ?
     //<Button color={Colors.black} onPress={showshopDialog} style={styles.menushopbutton}><Text></Text></Button> 
     <TouchableOpacity
     style={styles.menushopbutton}
     onPress={showshopDialog} >
</TouchableOpacity> :
     // <Button color={Colors.black} onPress={()=>{}} style={styles.menushopbutton}><Text></Text></Button>
     <TouchableOpacity
     style={styles.menushopbutton}
     onPress={()=>{}} >
</TouchableOpacity>
  }  

  {(menu == true) ?
      <Image style={styles.menufurniture} source={require('./assets/images/menu/furnitureposition.png')} resizeMode ="stretch"/> :
      <Image style={styles.menufurniture} source={require('./assets/images/menu/dictionary.png')} resizeMode ="stretch"/>
  }   

  {(menu == true) ?
     // <Button color={Colors.black} onPress={showfurnitureDialog} style={styles.menufurniturebutton}><Text></Text></Button> 
     <TouchableOpacity
     style={styles.menufurniturebutton}
     onPress={showfurnitureDialog} >
</TouchableOpacity> :
    // <Button color={Colors.black} onPress={showdictionaryDialog} style={styles.menufurniturebutton}><Text></Text></Button>
    <TouchableOpacity
    style={styles.menufurniturebutton}
    onPress={showdictionaryDialog} >
</TouchableOpacity>
  }  
    
  {menu == true && <Image style={styles.menusetting} source={require('./assets/images/menu/setting.png')} resizeMode ="stretch"/>}
  {menu == true && // <Button color={Colors.black} onPress={() => {}} style={styles.menusettingbutton}><Text></Text></Button>
  <TouchableOpacity
  style={styles.menusettingbutton}
  onPress={() => {}} >
</TouchableOpacity>
}


{/* 
  <Image style={styles.menuachieve} source={require('./assets/images/menu/achieve.png')} resizeMode ="stretch"/>
  <Button color={Colors.black} onPress={showachieveDialog} style={styles.menuachievebutton}><Text></Text></Button>

  <Image style={styles.menustore} source={require('./assets/images/menu/store.png')} resizeMode ="stretch"/>
  <Button color={Colors.black} onPress={showcollectionDialog} style={styles.menustorebutton}><Text></Text></Button>

  <Image style={styles.menudictionary} source={require('./assets/images/menu/dictionary.png')} resizeMode ="stretch"/>
  <Button color={Colors.black} onPress={() => {}} style={styles.menudictionarybutton}><Text></Text></Button> */}

  </Dialog.Content>
</Dialog>

{/* <Dialog visible={achievevisible} onDismiss={hideachieveDialog} style={styles.acheivelist}>
  <Dialog.Title style={styles.textcenter}>업적</Dialog.Title>
  <Dialog.Content>
    <Paragraph style={styles.achieveinfo}><Text style={styles.achievefont}>업적 내용</Text></Paragraph>
    <Paragraph style={styles.achieveimage}><Text style={styles.achieveimagefont}>업적        아이콘</Text></Paragraph>
  </Dialog.Content>
  <Dialog.Actions>
  <Button disabled color={Colors.black} onPress={hideachieveDialog} style={styles.xbuttonbackground}></Button>
    <Button color={Colors.black} onPress={hideachieveDialog} style={styles.xbutton}><Text style={styles.xbuttonfont}>X</Text></Button>
  </Dialog.Actions>
</Dialog> */}

<Dialog visible={achievevisible} onDismiss={hideachieveDialog} style={styles.achieve}>
  <Dialog.Content>

  <Image style={styles.achievebg} source={require('./assets/images/achieve/achievebg.png')} resizeMode ="stretch"/>

  <Text style={styles.achievetitle}>ACHIEVEMENT</Text>

  <Image style={styles.achieveslot1bg} source={require('./assets/images/achieve/achieveslotbg.png')} resizeMode ="stretch"/>
  <Image style={styles.achieveslot1image} source={require('./assets/images/achieve/achieveimage.png')} resizeMode ="stretch"/>
  {/* <Image style={styles.achieveslot1check} source={require('./assets/images/achieve/checkimage.png')} resizeMode ="stretch"/> */}
  <Text style={styles.slot1title}>집사로 간택되었습니...다?</Text>
  <Text style={styles.slot1info}>알을 선택하세요.</Text>

  <Image style={styles.achieveslot2bg} source={require('./assets/images/achieve/achieveslotbg.png')} resizeMode ="stretch"/>
  <Image style={styles.achieveslot2image} source={require('./assets/images/achieve/achieveimage.png')} resizeMode ="stretch"/>
  <Image style={styles.achieveslot2check} source={require('./assets/images/achieve/defaultimage.png')} resizeMode ="stretch"/>
  <Text style={styles.slot2title}>초보 집사의 한걸음</Text>
  <Text style={styles.slot2info}>알을 부화시키세요.</Text>

  <Image style={styles.achieveslot3bg} source={require('./assets/images/achieve/achieveslotbg.png')} resizeMode ="stretch"/>
  <Image style={styles.achieveslot3image} source={require('./assets/images/achieve/achieveimage.png')} resizeMode ="stretch"/>
  <Image style={styles.achieveslot3check} source={require('./assets/images/achieve/defaultimage.png')} resizeMode ="stretch"/>
  <Text style={styles.slot3title}>사회적 거리두기</Text>
  <Text style={styles.slot3info}>청결도를 1회 올리세요.</Text>

  <Image style={styles.achieveslot4bg} source={require('./assets/images/achieve/achieveslotbg.png')} resizeMode ="stretch"/>
  <Image style={styles.achieveslot4image} source={require('./assets/images/achieve/achieveimage.png')} resizeMode ="stretch"/>
  <Image style={styles.achieveslot4check} source={require('./assets/images/achieve/defaultimage.png')} resizeMode ="stretch"/>

  <Image style={styles.achieveslot5bg} source={require('./assets/images/achieve/achieveslotbg.png')} resizeMode ="stretch"/>
  <Image style={styles.achieveslot5image} source={require('./assets/images/achieve/achieveimage.png')} resizeMode ="stretch"/>
  <Image style={styles.achieveslot5check} source={require('./assets/images/achieve/defaultimage.png')} resizeMode ="stretch"/>

  <Image style={styles.achievebarbg} source={require('./assets/images/achieve/achievebarbg.png')} resizeMode ="stretch"/>
  <Image style={styles.achievebar} source={require('./assets/images/achieve/achievebar.png')} resizeMode ="stretch"/>

  <TouchableOpacity
                style={styles.achieveslot1check}
                onPress={hideachieveDialog} activeOpacity={1}>
          <Image source={require('./assets/images/achieve/checkimage.png')} resizeMode ="stretch"/>
        </TouchableOpacity>

  </Dialog.Content>
</Dialog>

{/* <Dialog visible={questvisible} onDismiss={hidequestDialog} style={styles.acheivelist}>
  <Dialog.Title style={styles.todayquest}>일일 도전</Dialog.Title>
  <Dialog.Content>
    <Button color={Colors.black} onPress={showquestrewardDialog} style={styles.questinfo}><Text style={styles.questfont}>일일 퀘스트</Text></Button>
    <Paragraph style={styles.questimage}><Text style={styles.questimagefont}></Text></Paragraph>
  </Dialog.Content>
  <Dialog.Actions>
  <Button disabled color={Colors.black} onPress={hidequestDialog} style={styles.xbuttonbackground}></Button>
    <Button color={Colors.black} onPress={hidequestDialog} style={styles.xbutton}><Text style={styles.xbuttonfont}>X</Text></Button>
  </Dialog.Actions>
</Dialog> */}




<Dialog visible={questvisible} onDismiss={hidequestDialog} style={styles.quest}>
  <Dialog.Title style={styles.textcenter}>퀘스트</Dialog.Title>
  <Dialog.Content>

  <TouchableOpacity
                style={styles.questmenu1}
                onPress={setquestdaily} activeOpacity={1}>
          <Image source={require('./assets/images/quest/tab1.png')} resizeMode ="stretch"/>
          <Text style={styles.dailyreward}>일일 도전</Text>
        </TouchableOpacity>

  <TouchableOpacity
                style={styles.questmenu2}
                onPress={setquestattend} activeOpacity={1}>
  <Image source={require('./assets/images/quest/tab2.png')} resizeMode ="stretch"/>
  <Text style={styles.attendancereward}>출석 보상</Text>
        </TouchableOpacity>

  {(quest == "daily") ?
      <Text style={{...styles.questtitlefont, backgroundColor: "#959FFF"}}>일일 도전</Text> :
      <Text style={{...styles.questtitlefont, backgroundColor: "#3C3C94"}}>출석 보상</Text>
  }

{quest == "daily" && <Image style={styles.dailyslot1} source={require('./assets/images/quest/selectslot.png')} resizeMode ="stretch"/>}
{quest == "daily" && <Image style={styles.checkslot1} source={require('./assets/images/quest/checkbutton1.png')} resizeMode ="stretch"/>}
{quest == "daily" &&   <Text style={styles.dailyinfoslot1}>아무 펫의 청결도를 2회 올리세요.</Text>}

{quest == "daily" && <Image style={styles.dailyslot2} source={require('./assets/images/quest/selectslot.png')} resizeMode ="stretch"/>}
{quest == "daily" && <Image style={styles.checkslot2} source={require('./assets/images/quest/defaultbutton.png')} resizeMode ="stretch"/>}
{quest == "daily" &&   <Text style={styles.dailyinfoslot2}></Text>}

{quest == "daily" && <Image style={styles.dailyslot3} source={require('./assets/images/quest/selectslot.png')} resizeMode ="stretch"/>}
{quest == "daily" && <Image style={styles.checkslot3} source={require('./assets/images/quest/defaultbutton.png')} resizeMode ="stretch"/>}
{quest == "daily" &&   <Text style={styles.dailyinfoslot3}></Text>}

{quest == "daily" && <Image style={styles.dailyslot4} source={require('./assets/images/quest/selectslot.png')} resizeMode ="stretch"/>}
{quest == "daily" && <Image style={styles.checkslot4} source={require('./assets/images/quest/defaultbutton.png')} resizeMode ="stretch"/>}
{quest == "daily" &&   <Text style={styles.dailyinfoslot4}></Text>}

{quest != "daily" && <Image style={styles.attendbg} source={require('./assets/images/quest/attendbg.png')} resizeMode ="stretch"/>}

{quest != "daily" && <Image style={styles.attendslot1} source={require('./assets/images/quest/checkbutton1.png')} resizeMode ="stretch"/>}
{quest != "daily" && <Image style={styles.attendslot2} source={require('./assets/images/quest/checkbutton2.png')} resizeMode ="stretch"/>}
{quest != "daily" && <Image style={styles.attendslot3} source={require('./assets/images/quest/defaultbutton.png')} resizeMode ="stretch"/>}
{quest != "daily" && <Image style={styles.attendslot4} source={require('./assets/images/quest/defaultbutton.png')} resizeMode ="stretch"/>}
{quest != "daily" && <Image style={styles.attendslot5} source={require('./assets/images/quest/defaultbutton.png')} resizeMode ="stretch"/>}

  </Dialog.Content>
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
  <Button disabled onPress={() => {}} style={styles.shopcoinnum}><Text style={styles.shopcoinfont}>    {coin}</Text></Button>
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

{/* <Dialog visible={furniturevisible} onDismiss={hidefurnitureDialog} style={styles.foodlist}>
  <Dialog.Title style={styles.textcenter}>가구 목록</Dialog.Title>
  <Dialog.Content>
  <Button disabled onPress={() => {}} style={styles.foodbackground}><Text></Text></Button>
  <Button color={Colors.black} onPress={showfurniturecheckDialog} style={styles.foodbutton}><Text style={styles.foodfont}>가구 이미지</Text></Button>
    <Paragraph style={styles.foodname}><Text style={styles.foodfont}>가구 이름</Text></Paragraph>
  </Dialog.Content>
  <Dialog.Actions>
  <Button disabled color={Colors.black} onPress={hidefurnitureDialog} style={styles.xbuttonbackground}></Button>
    <Button color={Colors.black} onPress={hidefurnitureDialog} style={styles.xbutton}><Text style={styles.xbuttonfont}>X</Text></Button>
  </Dialog.Actions>
</Dialog> */}

<Dialog visible={furniturevisible} onDismiss={hidefurnitureDialog} style={styles.quest}>
  <Dialog.Title style={styles.textcenter}>가구 목록</Dialog.Title>
  <Dialog.Content>

  <TouchableOpacity
                style={styles.questmenu1}
                onPress={setfurniturewall} activeOpacity={1}>
          <Image source={require('./assets/images/furnitureposition/tab1.png')} resizeMode ="stretch"/>
          <Text style={styles.furniturewall}>벽 가구</Text>
        </TouchableOpacity>

  <TouchableOpacity
                style={styles.questmenu2}
                onPress={setfurniturefloor} activeOpacity={1}>
  <Image source={require('./assets/images/furnitureposition/tab2.png')} resizeMode ="stretch"/>
  <Text style={styles.attendancereward}>바닥 가구</Text>
        </TouchableOpacity>

  {(furniture == "wall") ?
      <Text style={{...styles.furnituretitlefont, backgroundColor: "#F6C473"}}>벽 가구</Text> :
      <Text style={{...styles.furnituretitlefont, backgroundColor: "#50497F"}}>바닥 가구</Text>
  }

{furniture == "wall" &&   <TouchableOpacity
                style={styles.dailyslot1}
                onPress={showfurniturecheckDialog} activeOpacity={1}>
          <Image source={require('./assets/images/furnitureposition/slot1.png')} resizeMode ="stretch"/>
        </TouchableOpacity>}

{furniture == "wall" &&   <TouchableOpacity
                style={styles.furniturexbutton}
                onPress={hidefurnitureDialog} activeOpacity={1}>
          <Image source={require('./assets/images/furnitureposition/xbutton.png')} resizeMode ="stretch"/>
        </TouchableOpacity>}


  </Dialog.Content>
</Dialog>

<Dialog visible={furniturecheckvisible} onDismiss={hidefurniturecheckDialog} style={styles.furniturecheck}>
  <Dialog.Content>
  <Paragraph style={styles.textcenter}><Text style={styles.furniturecheckfont}>'벽걸이 식물'</Text></Paragraph>
    <Paragraph style={styles.textcenter}><Text style={styles.furniturecheckfont}>이 가구를 배치하시겠습니까?</Text></Paragraph>
  </Dialog.Content>
  <Dialog.Actions>
    <Button disabled color={Colors.black} onPress={showfurniture} style={styles.furnitureyesbutton}><Text style={styles.yesbuttonfont}>네</Text></Button>
    <TouchableOpacity
                style={styles.furnitureyesbuttonbg}
                onPress={showfurniture} activeOpacity={1}><Text></Text>
    </TouchableOpacity>

    <Button disabled color={Colors.black} onPress={hidefurniturecheckDialog} style={styles.furniturenobutton}><Text style={styles.nobuttonfont}>아니오</Text></Button>
    <TouchableOpacity
                style={styles.furniturenobuttonbg}
                onPress={hidefurniturecheckDialog} activeOpacity={1}><Text></Text>
    </TouchableOpacity>
  </Dialog.Actions>
</Dialog>



<Dialog visible={dictionaryvisible} onDismiss={hidedictionaryDialog} style={styles.dictionary}>
  <Dialog.Content>

  <Image style={styles.achievebg} source={require('./assets/images/dictionary/dictionarybg.png')} resizeMode ="stretch"/>
  <Text style={styles.dictionarytitlefont}>도감</Text>

  <Image style={styles.dicpage1} source={require('./assets/images/dictionary/page1.png')} resizeMode ="stretch"/>
  <Image style={styles.dicpage2} source={require('./assets/images/dictionary/page2.png')} resizeMode ="stretch"/>

  <TouchableOpacity
                style={styles.dicslot1}
                onPress={setdictionaryinfotrue} activeOpacity={1}>
          <Image source={require('./assets/images/dictionary/dic1.png')} resizeMode ="stretch"/>
        </TouchableOpacity>

        <TouchableOpacity
                style={styles.dicslot2}
                onPress={hidedictionaryDialog} activeOpacity={1}>
          <Image source={require('./assets/images/dictionary/dic2.png')} resizeMode ="stretch"/>
        </TouchableOpacity>
  
  <Image style={styles.dicslot3} source={require('./assets/images/dictionary/dic3.png')} resizeMode ="stretch"/>
  <Image style={styles.dicslot4} source={require('./assets/images/dictionary/dic4.png')} resizeMode ="stretch"/>

  <Image style={styles.dicslot5} source={require('./assets/images/dictionary/dic5.png')} resizeMode ="stretch"/>

  <Image style={styles.dicslot6} source={require('./assets/images/dictionary/dic6.png')} resizeMode ="stretch"/>

  {dictionaryinfo && <Text style={styles.dicinfobg}></Text>}
  {dictionaryinfo && <TouchableOpacity style={styles.dicinfopet1} onPress={setdictionaryinfofalse} activeOpacity={1}>
          <Image source={require('./assets/images/dictionary/pet1info.png')} resizeMode ="stretch"/>
        </TouchableOpacity>}

  </Dialog.Content>
</Dialog>

    {/* <Dialog visible={eatvisible} onDismiss={hideeatDialog} style={styles.foodlist}>
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
</Dialog> */}

<Modal
          animationType="fade"
          transparent={true}
          visible={eatvisible}
          contentContainerStyle={{backgroundColor : 'white', padding : 20}}
          >
  <View style={styles.eatmodal}>
     <View style={styles.textcenter}>

        <Image style={styles.eatfruit} source={require('./assets/images/eat/fruit.png')} resizeMode ="stretch"/>
        <Image style={styles.eatmeat} source={require('./assets/images/eat/meat.png')} resizeMode ="stretch"/>
        <Image style={styles.eatetc} source={require('./assets/images/eat/etc.png')} resizeMode ="stretch"/>

        {eattabname == "과일" && <Text style={{ ...styles.eattabname, backgroundColor: "#FFCC18"}}>{eattabname}</Text>}
        {eattabname == "육류" && <Text style={{ ...styles.eattabname, backgroundColor: "#CA7222"}}>{eattabname}</Text>}
        {eattabname == "그외" && <Text style={{ ...styles.eattabname, backgroundColor: "#6C1C1C"}}>{eattabname}</Text>}

        {(eattabname == "과일") ?
        <Button disabled onPress={seteattabfruit} style={styles.eatfruitbutton}><Text style={styles.white}>과일</Text></Button> :
        <Button disabled color={Colors.black} onPress={seteattabfruit} style={styles.eatfruitbutton}><Text>과일</Text></Button>
        }
        {eattabname != "과일" && <TouchableOpacity style={styles.eatfruitbutton} 
        onPress={seteattabfruit} activeOpacity={1}><Text></Text></TouchableOpacity>}

        {(eattabname == "육류") ?
        <Button disabled onPress={seteattabmeat} style={styles.eatmeatbutton}><Text style={styles.white}>육류</Text></Button> :
        <Button disabled color={Colors.black} onPress={seteattabmeat} style={styles.eatmeatbutton}><Text>육류</Text></Button>
        }
        {eattabname != "육류" && <TouchableOpacity style={styles.eatmeatbutton} 
        onPress={seteattabmeat} activeOpacity={1}><Text></Text></TouchableOpacity>}

        {(eattabname == "그외") ?
        <Button disabled onPress={seteattabetc} style={styles.eatetcbutton}><Text style={styles.white}>그외</Text></Button>:
        <Button disabled color={Colors.black} onPress={seteattabetc} style={styles.eatetcbutton}><Text>그외</Text></Button>
        }
        {eattabname != "그외" && <TouchableOpacity style={styles.eatetcbutton} 
        onPress={seteattabetc} activeOpacity={1}><Text></Text></TouchableOpacity>}

        {eattabname == "과일" && <Image style={styles.eatslot1} source={require('./assets/images/eat/appleslot.png')} resizeMode ="stretch"/>}
        {eattabname == "과일" && <Image style={styles.eatslot2} source={require('./assets/images/eat/watermelonslot.png')} resizeMode ="stretch"/>}
        {eattabname == "과일" && <Image style={styles.eatslot3} source={require('./assets/images/eat/slotdefault.png')} resizeMode ="stretch"/>}
        {eattabname == "과일" && <Image style={styles.eatslot4} source={require('./assets/images/eat/slotdefault.png')} resizeMode ="stretch"/>}

        {eattabname == "육류" && <Image style={styles.eatslot1} source={require('./assets/images/eat/beef.png')} resizeMode ="stretch"/>}
        {eattabname == "육류" && <Image style={styles.eatslot2} source={require('./assets/images/eat/chicken.png')} resizeMode ="stretch"/>}
        {eattabname == "육류" && <Image style={styles.eatslot3} source={require('./assets/images/eat/slotdefault.png')} resizeMode ="stretch"/>}
        {eattabname == "육류" && <Image style={styles.eatslot4} source={require('./assets/images/eat/slotdefault.png')} resizeMode ="stretch"/>}

        {eattabname == "그외" && <Image style={styles.eatslot1} source={require('./assets/images/eat/coldpill.png')} resizeMode ="stretch"/>}
        {eattabname == "그외" && <Image style={styles.eatslot2} source={require('./assets/images/eat/headachepill.png')} resizeMode ="stretch"/>}
        {eattabname == "그외" && <Image style={styles.eatslot3} source={require('./assets/images/eat/slotdefault.png')} resizeMode ="stretch"/>}
        {eattabname == "그외" && <Image style={styles.eatslot4} source={require('./assets/images/eat/slotdefault.png')} resizeMode ="stretch"/>}

        {/* <TouchableOpacity
                style={styles.eatslot1button}
                onPress={hideeatDialog} activeOpacity={1}>
          <Image source={require('./assets/images/eat/appleslot.png')} resizeMode ="stretch"/>
        </TouchableOpacity> */}

        <Text></Text>
        <TouchableOpacity
                style={styles.eattabbackbutton}
                onPress={hideeatDialog} activeOpacity={1}>
          <Text style={styles.textcenter}>X</Text>
        </TouchableOpacity> 

        {/* <View style={styles.eatslot1button}>
        <Button color={Colors.black} onPress={hideeatDialog} style={styles.eatslot1button}></Button> 
        </View> */}

     </View>
  </View>
</Modal>

{/* <Dialog visible={cleanvisible} onDismiss={hidecleanDialog} style={styles.foodlist}>
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
</Dialog> */}

<Modal
          animationType="fade"
          transparent={true}
          visible={cleanvisible}
          contentContainerStyle={{backgroundColor : 'white', padding : 20}}
          >
  <View style={styles.eatmodal}>
     <View style={styles.textcenter}>

        <Image style={styles.eatfruit} source={require('./assets/images/clean/brush.png')} resizeMode ="stretch"/>
        <Image style={styles.eatmeat} source={require('./assets/images/clean/detergent.png')} resizeMode ="stretch"/>
        <Image style={styles.eatetc} source={require('./assets/images/clean/tub.png')} resizeMode ="stretch"/>

        {cleantabname == "솔" && <Text style={{ ...styles.eattabname, backgroundColor: "#AAFFF0"}}>{cleantabname}</Text>}
        {cleantabname == "세정제" && <Text style={{ ...styles.eattabname, backgroundColor: "#3DACEA"}}>{cleantabname}</Text>}
        {cleantabname == "욕조" && <Text style={{ ...styles.eattabname, backgroundColor: "#25308E"}}>{cleantabname}</Text>}

        {(cleantabname == "솔") ?
        <Button disabled onPress={setcleantabbrush} style={styles.eatfruitbutton}><Text style={styles.white}>솔</Text></Button> :
        <Button disabled color={Colors.black} onPress={setcleantabbrush} style={styles.eatfruitbutton}><Text>솔</Text></Button>
        }
        {cleantabname != "솔" && <TouchableOpacity style={styles.eatfruitbutton} 
        onPress={setcleantabbrush} activeOpacity={1}><Text></Text></TouchableOpacity>}

        {(cleantabname == "세정제") ?
        <Button disabled onPress={setcleantabdetergent} style={styles.eatmeatbutton}><Text style={styles.white}>세정제</Text></Button> :
        <Button disabled color={Colors.black} onPress={setcleantabdetergent} style={styles.eatmeatbutton}><Text>세정제</Text></Button>
        }
        {cleantabname != "세정제" && <TouchableOpacity style={styles.eatmeatbutton} 
        onPress={setcleantabdetergent} activeOpacity={1}><Text></Text></TouchableOpacity>}

        {(cleantabname == "욕조") ?
        <Button disabled onPress={setcleantabtub} style={styles.eatetcbutton}><Text style={styles.white}>욕조</Text></Button>:
        <Button disabled color={Colors.black} onPress={setcleantabtub} style={styles.eatetcbutton}><Text>욕조</Text></Button>
        }
        {cleantabname != "욕조" && <TouchableOpacity style={styles.eatetcbutton} 
        onPress={setcleantabtub} activeOpacity={1}><Text></Text></TouchableOpacity>}

        {cleantabname == "솔" && <Image style={styles.eatslot1} source={require('./assets/images/clean/brushslot1.png')} resizeMode ="stretch"/>}
        {cleantabname == "솔" && <Image style={styles.eatslot2} source={require('./assets/images/clean/brushslot2.png')} resizeMode ="stretch"/>}
        {cleantabname == "솔" && <Image style={styles.eatslot3} source={require('./assets/images/clean/slotdefault.png')} resizeMode ="stretch"/>}
        {cleantabname == "솔" && <Image style={styles.eatslot4} source={require('./assets/images/clean/slotdefault.png')} resizeMode ="stretch"/>}

        {cleantabname == "세정제" && <Image style={styles.eatslot1} source={require('./assets/images/clean/detergentslot1.png')} resizeMode ="stretch"/>}
        {cleantabname == "세정제" && <Image style={styles.eatslot2} source={require('./assets/images/clean/slotdefault.png')} resizeMode ="stretch"/>}
        {cleantabname == "세정제" && <Image style={styles.eatslot3} source={require('./assets/images/clean/slotdefault.png')} resizeMode ="stretch"/>}
        {cleantabname == "세정제" && <Image style={styles.eatslot4} source={require('./assets/images/clean/slotdefault.png')} resizeMode ="stretch"/>}

        {cleantabname == "욕조" && <Image style={styles.eatslot1} source={require('./assets/images/clean/tubslot1.png')} resizeMode ="stretch"/>}
        {cleantabname == "욕조" && <Image style={styles.eatslot2} source={require('./assets/images/clean/slotdefault.png')} resizeMode ="stretch"/>}
        {cleantabname == "욕조" && <Image style={styles.eatslot3} source={require('./assets/images/clean/slotdefault.png')} resizeMode ="stretch"/>}
        {cleantabname == "욕조" && <Image style={styles.eatslot4} source={require('./assets/images/clean/slotdefault.png')} resizeMode ="stretch"/>}

        <Text></Text>
        <TouchableOpacity
                style={styles.eattabbackbutton}
                onPress={hidecleanDialog} activeOpacity={1}>
          <Text style={styles.textcenter}>X</Text>
        </TouchableOpacity> 

     </View>
  </View>
</Modal>

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


const Stack = createStackNavigator();

// export default 
function App() {
  return (
      <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="Title" component={TitleScreen} />
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="PetChoice" component={PetChoiceScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
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
    width : WINDOW_W,
    height : WINDOW_H,
  },

  titlebutton:{
    position: 'absolute',
    bottom: 80,
  },

  titlebuttonbg:{
    position: 'absolute',
    width : WINDOW_W,
    height : WINDOW_H,
  },

  titlebuttonfont:{
    fontSize: 20,
    color: 'black',
  },

  introbackground:{
    flex : 1,
    backgroundColor: '#A9A8B8',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },

  intro:{
    width : WINDOW_W,
    height : WINDOW_H+20,
  },

  prologuebg : {
    position: 'absolute',
    left : 50+10,
    top: 75,
    width : 300,
    height: 550,
  },

  prologue : {
    position: 'absolute',
    left : 75+10,
    top: 100,
    width : 250,
    height: 450,
  },

  introcircle1 : {
    position: 'absolute',
    left : 140,
    bottom: 120,
    width : 15,
    height: 15,
  },

  introcircle2 : {
    position: 'absolute',
    left : 140+30,
    bottom: 120+2,
    width : 10,
    height: 10,
  },

  introcircle3 : {
    position: 'absolute',
    left : 140 + 60,
    bottom: 120 + 2,
    width : 10,
    height: 10,
  },

  introcircle4 : {
    position: 'absolute',
    left : 140 + 90,
    bottom: 120 + 2,
    width : 10,
    height: 10,
  },

  introcircle5 : {
    position: 'absolute',
    left : 140 + 120,
    bottom: 120 + 2,
    width : 10,
    height: 10,
  },

  introbuttonbg:{
    position: 'absolute',
    right : 65,
    bottom: 75,
    borderRadius: 20,
  },

  introbutton:{
    position: 'absolute',
    right : 65 +20,
    bottom: 75 +10,
    borderRadius: 20,
  },

  introbuttonfont:{
    fontSize: 15,
    color: 'white',
  },

  prologuefont : {
    position: 'absolute',
    left: 180,
    top : 95,
    fontSize: 15,
    color: 'black',
  },

  prologueinfofont : {
    position: 'absolute',
    left: 135,
    bottom : 155,
    fontSize: 12,
    color: 'black',
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

  petchoiceborder:{
    position: 'absolute',
    width : 110,
    height: 110,
    left : 155,
    top: 105-4,

    backgroundColor : 'red',
    borderRadius : 15,
  },

  pet1button:{
    position: 'absolute',
    width : 110,
    height: 110,
    left : 155,
    top: 105,
  },

  pet1:{
    position: 'absolute',
    width : 100,
    height: 100,
    left : 161,
    top: 107,
  },

  pet1bg:{
    position: 'absolute',
    width : 110,
    height: 110,
    left : 155,
    top: 105,
  },

  pet2:{
    position: 'absolute',
    width : 110,
    height: 110,
    left : 90+5,
    top: 220,
  },

  pet3:{
    position: 'absolute',
    width : 110,
    height: 110,
    left : 220-5,
    top: 220,
  },

  petinfobg : {
    position: 'absolute',
    width : 240,
    height: 240,
    left : 90,
    bottom: 90,
  },

  choicebuttonbg:{
    position: 'absolute',
    right : 90,
    bottom: 100,
  },

  choicebutton:{
    position: 'absolute',
    right : 90+22,
    bottom: 100+12,
  },

  petchoicebuttonfont:{
    fontSize: 10,
    color: 'white',
  },
  
  petchoiceinfo:{
    position: 'absolute',
    width : 225,
    height: 225,
    left : 95,
    bottom: 100+20+20,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 225,
    borderRadius: 20,
  },

  petchoiceinfo2:{
    position: 'absolute',
    width : 225,
    height: 225,
    left : 95,
    bottom: 100+20,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 225,
    borderRadius: 20,
  },

  petchoiceinfo3:{
    position: 'absolute',
    width : 225,
    height: 225,
    left : 100,
    bottom: 100 - 50,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 225,
    borderRadius: 20,
  },






  main:{
    position: 'absolute',
    width : WINDOW_W,
    height : WINDOW_H,
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

  mainpetbg:{
    position: 'absolute',
    width : 175,
    height: 175,
    top: 400+20,
    left : 100+30,
  },

  mainsmile:{
    position: 'absolute',
    width : 60,
    height: 60,
    left : 25,
    top: 30 -2,
  },

  stagebg:{
    position: 'absolute',
    width : 50,
    height: 50,
    left : 10,
    top: 100,
  },
  
  stage:{
    position: 'absolute',
    left : 0+3,
    top: 100+5,
  },

  statefont:{
    fontSize: 8,
    color: 'black',
    fontWeight : 'bold',
  },


  gamemoneybackground:{
    position: 'absolute',
    width : 290,
    height: 20,
    right : 30,
    top: 30,
    borderRadius: 25,
    backgroundColor : 'white',
  },

  coinimage:{
    position: 'absolute',
    width : 20,
    height: 20,
    left : 96,
    top: 30,
  },

  coinnum:{
    position: 'absolute',
    width : 100,
    height: 20,
    left : 120,
    top: 20,
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
    top: 30,
  },

  jamnum:{
    position: 'absolute',
    width : 100,
    height: 20,
    left : 260,
    top: 20,
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
    top: 60,
    borderRadius: 25,
    backgroundColor : 'white',
  },

  heartgaugeimage:{
    position: 'absolute',
    width : 200,
    height: 20,
    right : 120,
    top: 60,
    borderRadius: 25,
    backgroundColor : '#FF6969',
  },

  heartimage:{
    position: 'absolute',
    width : 15,
    height: 15,
    left : 100,
    top: 64,
  },

  heartgauge:{
    position: 'absolute',
    width : 100,
    height: 20,
    left : 190,
    top: 50,
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

  menubg:{
    position: 'absolute',
    width : 50,
    height: 50,
    right : 10,
    top: 100,
  },

  menubutton:{
    position: 'absolute',
    width : 20,
    height: 20,
    right : 0,
    top: 100,
    borderRadius : 100,
  },

  settingbuttonfont:{
    fontSize: 15,
    color: 'black',
  },

  furniturebackground:{
    position: 'absolute',
    width : 60,
    height: 60,
    right : 20,
    top: 250,
    borderRadius: 50,
    backgroundColor : '#A9A8B8',
  },




  bottommenu:{
    position: 'absolute',
    width : WINDOW_W,
    height: 100,
    left : 0,
    bottom: 0,
    borderTopLeftRadius : 20,
    borderTopRightRadius : 20,
    backgroundColor : 'lightgray',
  },

  eatbackground:{
    position: 'absolute',
    width : 80,
    height: 80,
    left : 20-5,
    bottom: 10,
    borderRadius: 20,
    backgroundColor : '#A9A8B8',
  },

  eatgauge:{
    position: 'absolute',
    width : 80,
    height: 80,
    left : 20-5,
    bottom: 10,
  },

  eatbutton:{
    position: 'absolute',
    width : 80,
    height: 80,
    left : 20-5,
    bottom: 10,
  },

  eatbuttonfont:{
    fontSize: 15,
    color: 'black',
  },

  cleanbackground:{
    position: 'absolute',
    width : 80,
    height: 80,
    left : 120-5,
    bottom: 10,
    borderRadius: 20,
    backgroundColor : '#A9A8B8',
  },

  cleangauge:{
    position: 'absolute',
    width : 80,
    height: 80,
    left : 120-5,
    bottom: 10,
  },

  cleanbutton:{
    position: 'absolute',
    width : 80,
    height: 80,
    left : 120-5,
    bottom: 10,
  },

  cleanbuttonfont:{
    fontSize: 15,
    color: 'black',
  },

  funbackground:{
    position: 'absolute',
    width : 80,
    height: 80,
    left : 210+5,
    bottom: 10,
    borderRadius: 20,
    backgroundColor : '#A9A8B8',
  },

  fungauge:{
    position: 'absolute',
    width : 80,
    height: 80,
    left : 210+5,
    bottom: 10,
  },

  funbutton:{
    position: 'absolute',
    width : 80,
    height: 80,
    left : 210+5,
    bottom: 10,
  },

  funbuttonfont:{
    fontSize: 15,
    color: 'black',
  },

  sleepbackground:{
    position: 'absolute',
    width : 80,
    height: 80,
    left : 310+5,
    bottom: 10,
    borderRadius: 20,
    backgroundColor : 'gray',
  },

  sleepgauge:{
    position: 'absolute',
    width : 80,
    height: 80,
    left : 310+5,
    bottom: 10,
  },

  sleepbutton:{
    position: 'absolute',
    width : 80,
    height: 80,
    left : 310+5,
    bottom: 10,
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


  eatmodal:{
    position: 'absolute',
    width : 300,
    height : 500,
    left : 55,
    top : 50,
    backgroundColor : 'white',
  },

  eattabname:{
    top : 20,
    textAlign:'center',
    fontSize : 15,
    borderTopLeftRadius : 10,
    borderTopRightRadius : 10,
    padding : 10,
  },

  eatfruit :{
    position: 'absolute',
    width : 100,
    height : 50,
    left : 0,
    top : -10,
  },

  eatfruitbutton :{
    position: 'absolute',
    width : 100,
    height : 30,
    left : 0,
    top : -10,
  },

  eatmeat:{
    position: 'absolute',
    width : 100,
    height : 50,
    left : 100,
    top : -10,
  },

  eatmeatbutton :{
    position: 'absolute',
    width : 100,
    height : 30,
    left : 100,
    top : -10,
  },

  eatetc:{
    position: 'absolute',
    width : 100,
    height : 50,
    left : 200,
    top : -10,
  },

  eatetcbutton :{
    position: 'absolute',
    width : 100,
    height : 30,
    left : 200,
    top : -10,
  },


  eatslot1:{
    position: 'absolute',
    top : 100,
    left : 15,
  },

  eatslot1button:{
    position: 'absolute',
    top: 20,
    left: 15,
    height: 85,
    width: 260,
    zIndex: 1,
  },

  eatslot2:{
    position: 'absolute',
    top : 100+100,
    left : 15,
  },

  eatslot3:{
    position: 'absolute',
    top : 100+100+100,
    left : 15,
  },

  eatslot4:{
    position: 'absolute',
    top : 100+100+100+100,
    left : 15,
  },

  eattabbackbutton:{
    backgroundColor: Colors.blue50,
  },

  white : {
    color : 'white',
  },





  furniturecheck:{
    backgroundColor: '#50497F',
    position: 'absolute',
    left : 30,
    width : 300,
    height : 150,
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

  furniturecheckfont:{
    fontSize : 15,
    color : 'white',
  },

  furnitureyesbutton:{
    position: 'absolute',
    width : 120,
    left : 20,
    bottom : -20,
    backgroundColor : '#F6C473',
    textAlign:'center',
    borderRadius: 10,
  },

  furnitureyesbuttonbg:{
    position: 'absolute',
    width : 120,
    height : 40,
    left : 20,
    bottom : -20,
  },

  furniturenobutton:{
    position: 'absolute',
    width : 120,
    right : 20,
    bottom : -20,
    backgroundColor : '#F1ECF5',
    textAlign:'center',
    borderRadius: 10,
  },

  furniturenobuttonbg:{
    position: 'absolute',
    width : 120,
    height : 40,
    right : 20,
    bottom : -20,
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
    width : 300,
    height : 430,
    backgroundColor: '#8E9AFF',
    borderRadius : 30,
  },

  quest : {
    position: 'absolute',
    left : 30,
    width : 300,
    height : 430+120,
    backgroundColor: 'white',
    borderRadius : 30,
  },

  achieve: {
    left : -30,
    width : WINDOW_W+20,
    height : WINDOW_H+20,
    backgroundColor: 'white',
  },

  achievebg : {
    left : -20,
    top : -15,
    width : WINDOW_W,
    height : WINDOW_H,
  },

  achievetitle :{
    position: 'absolute',
    left : 110,
    top : 50,
    fontSize : 30,
    color : 'white',
  },

  achieveslot1bg:{
    position: 'absolute',
    width : 310,
    height : 75,
    left : 50,
    top : 150,
  },

  achieveslot2bg:{
    position: 'absolute',
    width : 310,
    height : 75,
    left : 50,
    top : 150+100,
  },

  achieveslot3bg:{
    position: 'absolute',
    width : 310,
    height : 75,
    left : 50,
    top : 150+100+100,
  },

  achieveslot4bg:{
    position: 'absolute',
    width : 310,
    height : 75,
    left : 50,
    top : 150+100+100+100,
  },

  achieveslot5bg:{
    position: 'absolute',
    width : 310,
    height : 75,
    left : 50,
    top : 150+100+100+100+100,
  },

  achieveslot1image:{
    position: 'absolute',
    width : 50,
    height : 50,
    left : 60,
    top : 162,
  },

  achieveslot2image:{
    position: 'absolute',
    width : 50,
    height : 50,
    left : 60,
    top : 162+100,
  },

  achieveslot3image:{
    position: 'absolute',
    width : 50,
    height : 50,
    left : 60,
    top : 162+100+100,
  },

  achieveslot4image:{
    position: 'absolute',
    width : 50,
    height : 50,
    left : 60,
    top : 162+100+100+100,
  },

  achieveslot5image:{
    position: 'absolute',
    width : 50,
    height : 50,
    left : 60,
    top : 162+100+100+100+100,
  },

  achieveslot1check:{
    position: 'absolute',
    left : 300,
    top : 165,
  },

  achieveslot2check:{
    position: 'absolute',
    left : 300,
    top : 165+100,
  },

  achieveslot3check:{
    position: 'absolute',
    left : 300,
    top : 165+100+100,
  },

  achieveslot4check:{
    position: 'absolute',
    left : 300,
    top : 165+100+100+100,
  },

  achieveslot5check:{
    position: 'absolute',
    left : 300,
    top : 165+100+100+100+100,
  },

  achievebarbg:{
    position: 'absolute',
    left : 380,
    top : 145,
  },

  achievebar:{
    position: 'absolute',
    left : 380+1,
    top : 145+2,
  },

  slot1title :{
    position: 'absolute',
    left : 125,
    top : 165,
    fontSize : 15,
  },

  slot2title :{
    position: 'absolute',
    left : 125,
    top : 165+100,
    fontSize : 15,
  },

  slot3title :{
    position: 'absolute',
    left : 125,
    top : 165+100+100,
    fontSize : 15,
  },

  slot1info :{
    position: 'absolute',
    left : 125,
    top : 195,
    fontSize : 13,
    color : 'gray',
  },

  slot2info :{
    position: 'absolute',
    left : 125,
    top : 195+100,
    fontSize : 13,
    color : 'gray',
  },

  slot3info :{
    position: 'absolute',
    left : 125,
    top : 195+100+100,
    fontSize : 13,
    color : 'gray',
  },

  menu1:{
    position: 'absolute',
    width : 130+10,
    height : 30,
    left : 20-10,
    top : -100-5+20,
  },

  questmenu1:{
    position: 'absolute',
    width : 130+10,
    height : 30,
    left : 0,
    top : -80,
  },

  questmenu2:{
    position: 'absolute',
    width : 130+10,
    height : 30,
    right : 10,
    top : -80,
  },

  menu2:{
    position: 'absolute',
    width : 130+10,
    height : 30,
    left : 150,
    top : -100-5+20,
  },

  menu1num:{
    position: 'absolute',
    left : 75,
    top : -95+20,
  },

  menu2num:{
    position: 'absolute',
    left : 215,
    top : -95+20,
  },

  menubg1 : {
    position: 'absolute',
    width : 300,
    height : 400+30,
    left : 0,
    bottom : -335-1,
  },

  menufont:{
    position: 'absolute',
    left : 132,
    top : -50,
    color : 'white',
    fontSize : 20,
    paddingTop : 10,
  },

  questtitlefont:{
    width : 300,
    height : 60,
    left : -24,
    top : -40,
    fontSize : 20,
    justifyContent : 'center',
    textAlign:'center',
    textAlignVertical : 'center',
    borderTopLeftRadius : 5,
    borderTopRightRadius : 5,
  },

  furnituretitlefont:{
    width : 300,
    height : 60,
    left : -24,
    top : -40,
    fontSize : 20,
    justifyContent : 'center',
    textAlign:'center',
    textAlignVertical : 'center',
    borderTopLeftRadius : 5,
    borderTopRightRadius : 5,
    color : 'white',
  },

  furniturexbutton:{
    position: 'absolute',
    left : 265,
    top : -30,
  },

  attendbg:{
    position: 'absolute',
    width : 250,
    height : 400,
    left : 25,
    top : 50,
  },

  dailyslot1:{
    position: 'absolute',
    left : 20,
    top : 50,
  },

  dailyslot2:{
    position: 'absolute',
    left : 20,
    top : 50+100,
  },

  dailyslot3:{
    position: 'absolute',
    left : 20,
    top : 50+100+100,
  },

  dailyslot4:{
    position: 'absolute',
    left : 20,
    top : 50+100+100+100,
  },

  checkslot1:{
    position: 'absolute',
    left : 30,
    top : 60,
  },

  checkslot2:{
    position: 'absolute',
    left : 30,
    top : 60+100,
  },

  checkslot3:{
    position: 'absolute',
    left : 30,
    top : 60+100+100,
  },

  checkslot4:{
    position: 'absolute',
    left : 30,
    top : 60+100+100+100,
  },

  dailyinfoslot1:{
    position: 'absolute',
    left : 90,
    top : 75,
    fontSize : 12,
  },

  dailyinfoslot2:{
    position: 'absolute',
    left : 90,
    top : 75+100,
    fontSize : 12,
  },

  dailyinfoslot3:{
    position: 'absolute',
    left : 90,
    top : 75+100+100,
    fontSize : 12,
  },

  dailyinfoslot4:{
    position: 'absolute',
    left : 90,
    top : 75+100+100+100,
    fontSize : 12,
  },

  attendslot1:{
    position: 'absolute',
    left : 35,
    top : 60,
  },

  attendslot2:{
    position: 'absolute',
    left : 35+60,
    top : 60,
  },

  attendslot3:{
    position: 'absolute',
    left : 35+60+60,
    top : 60,
  },

  attendslot4:{
    position: 'absolute',
    left : 35+60+60+60,
    top : 60,
  },

  attendslot5:{
    position: 'absolute',
    left : 35,
    top : 60+60,
  },

  dailyreward:{
    position: 'absolute',
    left : 37,
    top : 10,
    fontSize : 20,
    color : 'white',
  },

  furniturewall:{
    position: 'absolute',
    left : 45,
    top : 10,
    fontSize : 20,
    color : 'white',
  },

  attendancereward:{
    position: 'absolute',
    left : 37,
    top : 10,
    fontSize : 20,
    color : 'white',
  },

  menuquest:{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -50,
  },

  menuquestbutton:{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -50+5,
  },

  menushop :{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -130,
  },

  menushopbutton :{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -130+5,
  },

  menufurniture:{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -210,
  },

  menufurniturebutton:{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -210+5,
  },

  menusetting:{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -290,
  },

  menusettingbutton:{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -290+5,
  },

  menuachieve:{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -50,
  },

  menuachievebutton:{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -50-10,
  },

  menustore :{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -130,
  },

  menustorebutton :{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -130-10,
  },

  menudictionary:{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -210,
  },

  menudictionarybutton:{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -210-10,
  },


  dictionary: {
    left : -30,
    width : WINDOW_W+20,
    height : WINDOW_H+20,
    backgroundColor: 'black',
  },

  dictionarytitlefont:{
    position: 'absolute',
    left : 200-20,
    top : 130,
    fontSize : 25,
    fontWeight : 'bold',
  },

  dicpage1:{
    position: 'absolute',
    left : 240,
    top : 32,
  },

  dicpage2:{
    position: 'absolute',
    left : 240+70,
    top : 32,
  },

  dicslot1:{
    position: 'absolute',
    left : 50,
    top : 171,
  },

  dicslot2:{
    position: 'absolute',
    left : 230,
    top : 180,
  },

  dicslot3:{
    position: 'absolute',
    left : 50,
    top : 171+150+2,
  },

  dicslot4:{
    position: 'absolute',
    left : 230+7,
    top : 180+150-2,
  },

  dicslot5:{
    position: 'absolute',
    left : 50,
    top : 171+150+150+10,
  },

  dicslot6:{
    position: 'absolute',
    left : 230+8,
    top : 180+150+150,
  },

  dicinfobg:{
    position: 'absolute',
    left : 0,
    top : 80,
    width : WINDOW_W,
    height : WINDOW_H,
    backgroundColor : '#F1ECF5',
  },

  dicinfopet1:{
    position: 'absolute',
    left : 20,
    top : 80,
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



  dialogContentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeButtonContainer: {
		position: 'absolute',
		top:51,
		width:44,
		height:44,
		backgroundColor:'white',
		justifyContent:'center',
		alignItems:'center',
		borderRadius: 50
	},

	closeButton: {
		color:'white',
		textAlign:'center'
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
