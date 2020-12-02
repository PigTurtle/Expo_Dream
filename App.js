import { StatusBar } from 'expo-status-bar';
import React, {useState, Component, useEffect}  from 'react';
import { StyleSheet, Modal, View, SafeAreaView, Image, Platform, TouchableOpacity, FlatList, AppRegistry, Dimensions,
  TouchableHighlight, TouchableWithoutFeedback, Alert, LogBox} from 'react-native';
import { DefaultTheme, Text, Button, RadioButton, TouchableRipple, ToggleButton, TextInput , Paragraph, Dialog, Portal, Appbar, 
  ProgressBar, Colors, PaperProvider } from 'react-native-paper';
import { NavigationContainer, DrawerActions, useTheme } from '@react-navigation/native';
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
import { ReanimatedScreen } from './src/ReanimatedBox';
import { ReanimatedScreen2 } from './src/ReanimatedBox2';
import { ReanimatedScreen3 } from './src/ReanimatedBox3';
import { MovingPet } from './src/MainPetMove';
import MovingChoicePet from './src/PetchoiceMove';
import Test from './src/mypractice';
import JSTestScreen from'./src/JSTestScreen';
import PetEatScreen from'./src/PetEatScreen';

LogBox.ignoreAllLogs();

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
    {/* <ReanimatedScreen3></ReanimatedScreen3> */}
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
    navigation.navigate("Main", {petnum : petNum});
  }

  const [petNum, setpetNum] = useState(0);
  const setChoicePetNum = (choicepetnum) => {
    setpetNum(choicepetnum);
  }

return(
  <View style={styles.petchoicebackground}>
    <Image source={require('./assets/images/intro/intro.png')} style={styles.intro} resizeMode ="stretch"/>
    <Image source={require('./assets/images/intro/prologuebg.png')} style={styles.prologuebg} resizeMode ="stretch"/>

    {/* {(buttonable == false) ?
    <Button disabled onPress={() => {}}></Button> :
    <Button disabled onPress={() => {}} style={styles.petchoiceborder}></Button>
    } */}

    {/* {(buttonable == false) ?
    <Image source={require('./assets/images/petchoice/petbg.png')} style={styles.pet1bg} resizeMode ="stretch"/> :
    <Image source={require('./assets/images/petchoice/petbg2.png')} style={styles.pet1bg} resizeMode ="stretch"/>
    } */}

    {/* <Image source={require('./assets/images/petchoice/pet1.png')} style={styles.pet1bg} resizeMode ="stretch"/>
    <Button onPress={isbottondown} style={styles.pet1}></Button> */}

    {/* <TouchableOpacity
                style={styles.pet1}
                onPress={isbottondown} activeOpacity={1}>
          <Image source={require('./assets/images/petchoice/pet1.png')} resizeMode ="stretch"/>
        </TouchableOpacity> */}

    {/* <TouchableOpacity onPress={isbottondown}>
    <Image style={styles.pet1} resizeMode ="stretch" source={require('./assets/images/petchoice/pet1.png')} />
    </TouchableOpacity> */}

    {/* <Image source={require('./assets/images/petchoice/petbg.png')} style={styles.pet2} resizeMode ="stretch"/>
    <Image source={require('./assets/images/petchoice/pet2.png')} style={styles.pet2} resizeMode ="stretch"/>
    <Image source={require('./assets/images/petchoice/petbg.png')} style={styles.pet3} resizeMode ="stretch"/>
    <Image source={require('./assets/images/petchoice/pet3.png')} style={styles.pet3} resizeMode ="stretch"/> */}

    <Image source={require('./assets/images/petchoice/petbg.png')} style={styles.pet1bg} resizeMode ="stretch"/>
    <Image source={require('./assets/images/petchoice/petbg.png')} style={styles.pet2} resizeMode ="stretch"/>
    <Image source={require('./assets/images/petchoice/petbg.png')} style={styles.pet3} resizeMode ="stretch"/>

    <MovingChoicePet setpetNum={setChoicePetNum}/>

    <Image source={require('./assets/images/petchoice/petinfo.png')} style={styles.petinfobg} resizeMode ="stretch"/>
    <Text style={styles.petchoiceinfo}>자연의 싱그러움이 느껴지는</Text> 
    <Text style={styles.petchoiceinfo2}> 미지의 알. </Text> 
    <Text style={styles.petchoiceinfo3}>육성 난이도 :  쉬움 </Text> 

    <Image source={require('./assets/images/intro/button.png')} style={styles.choicebuttonbg} resizeMode ="stretch"/>
    {(petNum == 0) ?
    <TouchableOpacity disabled style={styles.choicebutton} onPress={MoveToMainStack}><Text style={styles.petchoicebuttonfont}>선택하기</Text></TouchableOpacity>:
    <TouchableOpacity style={styles.choicebutton} onPress={MoveToMainStack} activeOpacity={1}><Text style={styles.petchoicebuttonfont}>선택하기</Text></TouchableOpacity>
    }

  </View>
);
}

export default App;

const FruitData = [
  {
    type : 11,
    key : 1,
    id: require('./assets/images/eat/appleslot.png'),
    title: "사과",
    idforstore: require('./assets/images/store/appleslot.png'),
    idforeat : require('./assets/images/eat/apple.png'),
  },
  {
    type : 11,
    key : 2,
    id: require('./assets/images/eat/watermelonslot.png'),
    title: "수박",
    idforstore : require('./assets/images/store/watermelonslot.png'),
    idforeat : require('./assets/images/eat/apple.png'),
  },
  {
    type : 11,
    key : 3,
    id: require('./assets/images/eat/pineappleslot.png'),
    title: "파인애플",
    idforstore: require('./assets/images/store/pineappleslot.png'),
    idforeat : require('./assets/images/eat/apple.png'),
  },
  {
    type : 0,
    key : 4,
    id: require('./assets/images/eat/slotdefault.png'),
    title: "default",
  },
];

const MeatData = [
  {
    type : 12,
    key : 1,
    id: require('./assets/images/eat/porkslot.png'),
    title: "생 돼지고기",
    idforstore: require('./assets/images/store/porkslot.png'),
    idforeat : require('./assets/images/eat/apple.png'),
  },
  {
    type : 12,
    key : 2,
    id: require('./assets/images/eat/beefslot.png'),
    title: "생 소고기",
    idforstore: require('./assets/images/store/beefslot.png'),
    idforeat : require('./assets/images/eat/apple.png'),
  },
  {
    type : 0,
    key : 3,
    id: require('./assets/images/eat/slotdefault.png'),
    title: "default",
  },
];

const EtcData = [
  {
    type : 13,
    key : 1,
    id: require('./assets/images/eat/unknownlumpslot.png'),
    title: "미지의 덩어리",
    idforstore: require('./assets/images/store/unknownlumpslot.png'),
    idforeat : require('./assets/images/eat/apple.png'),
  },
  {
    type : 0,
    key : 2,
    id: require('./assets/images/eat/slotdefault.png'),
    title: "default",
  },
];

const BrushData = [
  {
    type : 21,
    key : 1,
    id: require('./assets/images/clean/roughbrush.png'),
    title: "거친 솔",
    idforstore: require('./assets/images/store/roughbrushslot.png'),
    idforclean : require('./assets/images/clean/brush1.png'),
  },
  {
    type : 21,
    key : 2,
    id: require('./assets/images/clean/softbrush.png'),
    title: "부드러운 솔",
    idforstore: require('./assets/images/store/softbrushslot.png'),
    idforclean : require('./assets/images/clean/brush1.png'),
  },
  {
    type : 21,
    key : 3,
    id: require('./assets/images/clean/showerbrush.png'),
    title: "욕실 브러쉬",
    idforstore: require('./assets/images/store/showerbrushslot.png'),
    idforclean : require('./assets/images/clean/brush1.png'),
  },
  {
    type : 0,
    key : 4,
    id: require('./assets/images/clean/slotdefault.png'),
    title: "default",
  },
];

const DetergentData = [
  {
    type : 22,
    key : 1,
    id: require('./assets/images/clean/petshampoo.png'),
    title: "펫 샴푸",
    idforstore: require('./assets/images/store/petshampooslot.png'),
    idforclean : require('./assets/images/clean/brush1.png'),
  },
  {
    type : 22,
    key : 2,
    id: require('./assets/images/clean/orientalshampoo.png'),
    title: "한방샴푸",
    idforstore: require('./assets/images/store/orientalshampooslot.png'),
    idforclean : require('./assets/images/clean/brush1.png'),
  },
  {
    type : 22,
    key : 3,
    id: require('./assets/images/clean/snowshampoo.png'),
    title: "눈꽃샴푸",
    idforstore: require('./assets/images/store/snowshampooslot.png'),
    idforclean : require('./assets/images/clean/brush1.png'),
  },
  {
    type : 0,
    key : 4,
    id: require('./assets/images/clean/slotdefault.png'),
    title: "default",
  },
];

const TubData = [
  {
    type : 23,
    key : 1,
    id: require('./assets/images/clean/rubbertub.png'),
    title: "고무 대야",
    idforstore: require('./assets/images/store/rubbertubslot.png'),
    idforclean : require('./assets/images/clean/brush1.png'),
  },
  {
    type : 23,
    key : 2,
    id: require('./assets/images/clean/movabletub.png'),
    title: "이동식 욕조",
    idforstore: require('./assets/images/store/movabletubslot.png'),
    idforclean : require('./assets/images/clean/brush1.png'),
  },
  {
    type : 0,
    key : 3,
    id: require('./assets/images/clean/whitetub.png'),
    title: "default", // "하얀 욕조", 아직 창고 이미지 없음
  },
  {
    type : 0,
    key : 4,
    id: require('./assets/images/clean/slotdefault.png'),
    title: "default",
  },
];

const WallFData = [
  {
    type : 31,
    key : 1,
    id: require('./assets/images/furnitureposition/wallplantslot.png'),
    title: "벽걸이 식물",
    idforstore: require('./assets/images/store/wallplantslot.png'),
    idformain : require('./assets/images/furnitureposition/wallplant.png'),
  },
  {
    type : 31,
    key : 2,
    id: require('./assets/images/furnitureposition/thincurtainslot.png'),
    title: "얇은 커튼",
    idforstore: require('./assets/images/store/thincurtainslot.png'),
    idformain : require('./assets/images/store/thincurtainslot.png'),
  },
  {
    type : 31,
    key : 3,
    id : require('./assets/images/furnitureposition/wallclockslot.png'),
    title: "벽걸이 시계",
    idforstore: require('./assets/images/store/wallclockslot.png'),
    idformain : require('./assets/images/store/wallclockslot.png'),
  },
];

const FloorFData = [
  {
    type : 32,
    key : 1,
    id: require('./assets/images/furnitureposition/footmatslot.png'),
    title: "규조토 매트",
    idforstore: require('./assets/images/store/footmatslot.png'),
    idformain: require('./assets/images/store/footmatslot.png'),
  },
  {   
    type : 32,
    key : 2,
    id: require('./assets/images/furnitureposition/furrugslot.png'),
    title: "털 러그",
    idforstore: require('./assets/images/store/furrugslot.png'),
    idformain: require('./assets/images/store/furrugslot.png'),
  },
  {
    type : 32,
    key : 3,
    id: require('./assets/images/furnitureposition/europeancarpetslot.png'),
    title: "북유럽풍 카페트",
    idforstore: require('./assets/images/store/europeancarpetslot.png'),
    idformain: require('./assets/images/store/europeancarpetslot.png'),
  },
];

const ShopEatData = [
  {
    type : 11,
    key : 1,
    id: require('./assets/images/shop/appleslot.png'),
    title: "사과",
    cost : 100,
    idforeatslot: require('./assets/images/eat/appleslot.png'),
    idforstore: require('./assets/images/store/appleslot.png'),
    idforeat : require('./assets/images/eat/apple.png'),
  },
  {
    type : 11,
    key : 2,
    id: require('./assets/images/shop/watermelonslot.png'),
    title: "수박",
    cost : 100,
    idforeatslot: require('./assets/images/eat/watermelonslot.png'),
    idforstore : require('./assets/images/store/watermelonslot.png'),
    idforeat : require('./assets/images/eat/apple.png'),
  },
  {
    type : 11,
    key : 3,
    id: require('./assets/images/shop/pineappleslot.png'),
    title: "파인애플",
    cost : 100,
    idforeatslot: require('./assets/images/eat/pineappleslot.png'),
    idforstore: require('./assets/images/store/pineappleslot.png'),
    idforeat : require('./assets/images/eat/apple.png'),
  },
  {
    type : 12,
    key : 4,
    id: require('./assets/images/shop/porkslot.png'),
    title: "생 돼지고기",
    cost : 100,
    idforeatslot: require('./assets/images/eat/porkslot.png'),
    idforstore: require('./assets/images/store/porkslot.png'),
    idforeat : require('./assets/images/eat/apple.png'),
  },
];

const ShopCleanData = [
  {
    type : 21,
    key : 1,
    id: require('./assets/images/shop/roughbrush.png'),
    title: "거친 솔",
    cost : 100,
    idforcleanslot: require('./assets/images/clean/roughbrush.png'),
    idforstore: require('./assets/images/store/roughbrushslot.png'),
    idforclean : require('./assets/images/clean/brush1.png'),
  },
  {
    type : 21,
    key : 2,
    id: require('./assets/images/shop/softbrush.png'),
    title: "부드러운 솔",
    cost : 100,
    idforcleanslot: require('./assets/images/clean/softbrush.png'),
    idforstore: require('./assets/images/store/softbrushslot.png'),
    idforclean : require('./assets/images/clean/brush1.png'),
  },
  {
    type : 21,
    key : 3,
    id: require('./assets/images/shop/showerbrush.png'),
    title: "욕실 브러쉬",
    cost : 100,
    idforcleanslot: require('./assets/images/clean/showerbrush.png'),
    idforstore: require('./assets/images/store/showerbrushslot.png'),
    idforclean : require('./assets/images/clean/brush1.png'),
  },
  {
    type : 22,
    key : 4,
    id: require('./assets/images/shop/petshampoo.png'),
    title: "펫 샴푸",
    cost : 100,
    idforcleanslot: require('./assets/images/clean/petshampoo.png'),
    idforstore: require('./assets/images/store/petshampooslot.png'),
    idforclean : require('./assets/images/clean/brush1.png'),
  },
];

const ShopFurnitureData = [
  {
    type : 31,
    id: require('./assets/images/shop/wallplantslot.png'),
    title: "벽걸이 식물",
    cost : 1000,
    idforfurniture: require('./assets/images/furnitureposition/wallplantslot.png'),
    idforstore: require('./assets/images/store/wallplantslot.png'),
    idformain: require('./assets/images/store/wallplantslot.png'),
  },
  {
    type : 31,
    id: require('./assets/images/shop/thincurtainslot.png'),
    title: "얇은 커튼",
    cost : 1000,
    idforfurniture: require('./assets/images/furnitureposition/thincurtainslot.png'),
    idforstore: require('./assets/images/store/thincurtainslot.png'),
    idformain: require('./assets/images/store/thincurtainslot.png'), 
  },
  {
    type : 31,
    key : 3,
    id: require('./assets/images/shop/wallclockslot.png'),
    title: "벽걸이 시계",
    cost : 500,
    idforfurniture: require('./assets/images/furnitureposition/wallclockslot.png'),
    idforstore: require('./assets/images/store/wallclockslot.png'),
    idformain: require('./assets/images/store/wallclockslot.png'),
  },
  {
    type : 32,
    key : 4,
    id: require('./assets/images/shop/europeancarpetslot.png'),
    title: "북유럽풍 카페트",
    cost : 2000,
    idforfurniture: require('./assets/images/furnitureposition/europeancarpetslot.png'),
    idforstore: require('./assets/images/store/europeancarpetslot.png'),
    idformain : require('./assets/images/store/europeancarpetslot.png'),
  },
];

const ShopCostData = [
  {
    type : 0,
    key : 1,
    id: require('./assets/images/shop/goldslot.png'),
    title: "골드",
    cost : 1,
  },
  {
    type : 0,
    key : 2,
    id: require('./assets/images/shop/diamondslot.png'),
    title: "다이아",
    cost : 1000,
  },
  {
    type : 0,
    key : 3,
    id: require('./assets/images/shop/heartboosterslot.png'),
    title: "하트부스터",
    cost : 3300,
  },
];

const StoreEatData = [];

const StoreCleanData = [];

const StoreFurnitureData = [];

const Item = ({item, onPress}) => (
  <View style={styles2.item}>
  <TouchableOpacity
  style={[styles2.image]}
  onPress={onPress} activeOpacity={1}>
  <Image source={item.id} resizeMode ="stretch"/>
  </TouchableOpacity>
</View>
);

const ShopItem = ({item, onPress}) => (
  <View style={styles2.shopitem}>
  <TouchableOpacity
  style={[styles2.image]}
  onPress={onPress} activeOpacity={1}>
  <Image source={item.id} resizeMode ="stretch"/>
  </TouchableOpacity>
</View>
);

const StoreItem = ({item, onPress}) => (
  <View style={styles2.storeitem}>
  <TouchableOpacity
  style={[styles2.image]}
  onPress={onPress} activeOpacity={1}>
  <Image source={item.id} resizeMode ="stretch"/>
  </TouchableOpacity>
</View>
);

const styles2 = StyleSheet.create({
  item: {
    padding: 0,
    marginVertical: 15,
    marginHorizontal: 0,
  },
  shopitem: {
    padding: 0,
    marginVertical: 8,
    marginHorizontal: 0,
  },
  storeitem: {
    padding: 0,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  image:{
  }
});

function MainScreen({navigation, route}) {
  const [coin, setCoin] = useState(3000);
  const [jam, setJam] = useState(100);
  const [heart, setHeart] = useState(70);
  const [petnum, setPetnum] = useState(route.params.petnum);
  const [mainnum, setMainnum] = useState(1);

  const [eatpercent, seteatpercent] = useState(10);
  const [cleanpercent, setcleanpercent] = useState(10);
  const [funpercent, setfunpercent] = useState(100);
  const [sleeppercent, setsleeppercent] = useState(100);

  const [itemprice, setitemprice] = useState(0);
  const [itemnum, setitemnum] = useState(1);
  const [todayitem, settodayitem] = useState("벽걸이 시계");

  const [tutorial1visible, settutorial1visible] = useState(true);
  const [tutorial2visible, settutorial2visible] = useState(true);

  const itemnumdown = () => {
    setitemnum(itemnum => itemnum -1 > 1 ? itemnum -1 : 1);
  }

  const itemnumup = () => {
    setitemnum(itemnum => itemnum +1 > 10 ? 10 : itemnum+1);
  }

  const [stagevisible, setstageVisible] = useState(false);
  const showstageDialog = () => setstageVisible(true);
  const hidestageDialog = () => {
  setstageVisible(false);
  }

  const pressstage1 = () => {
    setMainnum(1);
    setstageVisible(false);
  }

  const pressstage2 = () => {
  setMainnum(2);
  setstageVisible(false);
  }

  const [shoptabnum, setshoptabnum] = useState(1);
  const [shoptabname, setshoptab] = useState("식사류");
  const setshoptabeat = () => {
    setshoptab("식사류");
    setshoptabnum(1);
  }
  const setshoptabclean = () => {
    setshoptab("청결류");
    setshoptabnum(2);
  }
  const setshoptabfurniture = () => {
    setshoptab("가구");
    setshoptabnum(3);
  }
  const setshoptabmoney = () => {
    setshoptab("재화");
    setshoptabnum(4);
  }

  const [storetabnum, setstoretabnum] = useState(1);
  const [storetabname, setstoretab] = useState("식사류");
  const setstoretabeat = () => {
    setstoretab("식사류");
    setstoretabnum(1);
  }
  const setstoretabclean = () => {
    setstoretab("청결류");
    setstoretabnum(2);
  }
  const setstoretabfurniture = () => {
    setstoretab("가구");
    setstoretabnum(3);
  }
  const setstoretabmoney = () => {
    setstoretab("재화");
    setstoretabnum(4);
  }

  const [eattabnum, seteattabnum] = useState(1);
  const [eattabname, seteattabname] = useState("과일");
  const seteattabfruit = () => {
    seteattabname("과일");
    seteattabnum(1);
  }
  const seteattabmeat = () => {
  seteattabname("육류");
  seteattabnum(2);
  }
  const seteattabetc = () => {
    seteattabname("그외");
    seteattabnum(3);
  }

  const [cleantabnum, setcleantabnum] = useState(1);
  const [cleantabname, setcleantabname] = useState("솔");
  const setcleantabbrush = () => {
    setcleantabname("솔");
    setcleantabnum(1);
  }
  const setcleantabdetergent = () => {
    setcleantabname("세정제");
    setcleantabnum(2);
  }
  const setcleantabtub = () => {
    setcleantabname("욕조");
    setcleantabnum(3);
  }

  const [dictionarypetnum, setdictionarypetnum] = useState(1);
  const [dictionaryinfo, setdictionaryinfo] = useState(false);
  const setdictionaryinfotrue = (petnum) => {
    setdictionarypetnum(petnum);
    setdictionaryinfonum(1);
    setpath();
    setdictionaryinfo(true);
  }
  const setdictionaryinfofalse = () => {
    setdictionaryinfonum(1);
    setpath();
    setdictionaryinfo(false);
  }
  
  const [dictionaryinfonum, setdictionaryinfonum] = useState(1);
  const dictionaryinfoNext = () => {
    if(dictionaryinfonum > 3)
      setdictionaryinfofalse();
    else{
      setdictionaryinfonum(dictionaryinfonum+1);
      setpath();
    }
  }

  const [dictionaryinfos, setdictionaryinfos] = useState([{
    petnum: 1,
    path : require('./assets/images/dictionary/pet1info1.png'),
    path1 : require('./assets/images/dictionary/pet1info1.png'),
    path2 : require('./assets/images/dictionary/pet1info2.png'),
    path3 : require('./assets/images/dictionary/pet1info3.png')
  }, {
    petnum: 2, 
    path : require('./assets/images/dictionary/pet2info1.png'),
    path1 : require('./assets/images/dictionary/pet2info1.png'),
    path2 : require('./assets/images/dictionary/pet2info2.png'),
    path3 : require('./assets/images/dictionary/pet2info3.png')
  }, {
    petnum: 3, 
    path : require('./assets/images/dictionary/pet3info1.png'),
    path1 : require('./assets/images/dictionary/pet3info1.png'),
    path2 : require('./assets/images/dictionary/pet3info2.png'),
    path3 : require('./assets/images/dictionary/pet3info3.png')
    } 
  ]);

  const setpath = () => {
    let mydictionaryinfos = [... dictionaryinfos];

    console.log(dictionaryinfonum);

    switch(dictionaryinfonum)
    {
      case 1:
        mydictionaryinfos[dictionarypetnum-1].path = mydictionaryinfos[dictionarypetnum-1].path1;
        break;
      case 2:
        mydictionaryinfos[dictionarypetnum-1].path = mydictionaryinfos[dictionarypetnum-1].path2;
        break;
      case 3:
        mydictionaryinfos[dictionarypetnum-1].path = mydictionaryinfos[dictionarypetnum-1].path3;
        break;
      default:
        break;
    }
    
    setdictionaryinfos(mydictionaryinfos);
  }

  const [achievevisible, setachieveVisible] = useState(false);
  const showachieveDialog = () => setachieveVisible(true);
  const hideachieveDialog = () => setachieveVisible(false);
  const [menuvisible, setmenuVisible] = useState(false);
  const showmenuDialog = () => {
    setmenu1();
    setmenuVisible(true);
  }
  const hidemenuDialog = () => setmenuVisible(false);
  const [furniturevisible, setfurnitureVisible] = useState(false);
  const showfurnitureDialog = () => {
    setfurniturewall();
    setfurnitureVisible(true);
  }
  const hidefurnitureDialog = () => setfurnitureVisible(false);

  const [dictionarynum, setdictionarynum] = useState(1);
  const [dictionaryvisible, setdictionaryVisible] = useState(false);
  const showdictionaryDialog = () => {
    setdictionarynum(1);
    setdictionaryVisible(true);
  }
  const hidedictionaryDialog = () => setdictionaryVisible(false);

  const [storevisible, setstoreVisible] = useState(false);
  const showstoreDialog = () => {
    setstoretabeat();
    setStoreData();
    setstoreVisible(true);
  }
  const hidestoreDialog = () => 
  {
    setstoreVisible(false);
  }

  const [settingvisible, setsettingVisible] = useState(false);
  const showsettingDialog = () => {
    setsettingaccount();
    setsettingVisible(true);
  }
  const hidesettingDialog = () => setsettingVisible(false);

  const [eatvisible, seteatVisible] = useState(false);
  const showeatDialog = () => {
    seteattabfruit();
    seteatVisible(true);
  }
  const hideeatDialog = () => seteatVisible(false);

  const [eatCheckVisible, seteatCheckVisible] = useState(false);
  const [eatCheckText, seteatCheckText] = useState("");
  const [imagepath, setimagepath] = useState();
  const [key, setkey] = useState(0);
  const [itemtype, setitemtype] = useState(0);

  const showeatCheckDialog = (mytype, mykey, name, myimagepath) => 
  {
    // if(name == "default")
    // {
    //   hideeatDialog();
    //   return;
    // }

    // seteatCheckText(name);
    // seteatCheckVisible(true);

    if(name != "default")
    {
      seteatCheckText(name);
      seteatCheckVisible(true);
      setimagepath(myimagepath);
      setkey(mykey);
      setitemtype(mytype);
      return;
    }

    hideeatDialog();
  }
  const hideeatCheckDialog = () => 
  {
    seteatCheckText("");
    seteatCheckVisible(false);
  }

  const  RemoveEatData = () => {
    if(itemtype == 11)
    {
      let temp = FruitData.findIndex(myitem => myitem.key == key);
      FruitData.splice(temp, 1);
    }
    if(itemtype == 12)
    {
      let temp = MeatData.findIndex(myitem => myitem.key == key);
      MeatData.splice(temp, 1);
    }
    if(itemtype == 13)
    {
      let temp = EtcData.findIndex(myitem => myitem.key == key);
      EtcData.splice(temp, 1);
    }
  }

  const [peteatscreenvisible, setpeteatscreen] = useState(false);
  const showPetEatScreen = () =>{
    RemoveEatData();
    setpeteatscreen(true);
    seteatCheckVisible(false);
  }
  const hidePetEatScreen = (addeatpercent) => {
    seteatpercent(eatpercent+addeatpercent > 100 ? 100 : eatpercent+addeatpercent);
    setpeteatscreen(false);
  }

  const [cleanvisible, setcleanVisible] = useState(false);
  const showcleanDialog = () => {
    setcleantabbrush();
    setcleanVisible(true);
  }
  const hidecleanDialog = () => setcleanVisible(false);

  const [cleanCheckVisible, setcleanCheckVisible] = useState(false);
  const [cleanCheckText, setcleanCheckText] = useState("");
  const showcleanCheckDialog = (mytype, mykey, name, myimagepath) => 
  {
    // if(name == "default")
    // {
    //   hidecleanDialog();
    //   return;
    // }

    // setcleanCheckText(name);
    // setcleanCheckVisible(true);

    if(name != "default")
    {
      setcleanCheckText(name);
      setcleanCheckVisible(true);
      setimagepath(myimagepath);
      setkey(mykey);
      setitemtype(mytype);
      return;
    }

    hidecleanDialog();
  }
  const hidecleanCheckDialog = () => 
  {
    setcleanCheckText("");
    setcleanCheckVisible(false);
  }

  const  RemoveCleanData = () => {
    if(itemtype == 21)
    {
      let temp = BrushData.findIndex(myitem => myitem.key == key);
      BrushData.splice(temp, 1);
    }
    if(itemtype == 22)
    {
      let temp = DetergentData.findIndex(myitem => myitem.key == key);
      DetergentData.splice(temp, 1);
    }
    if(itemtype == 23)
    {
      let temp = TubData.findIndex(myitem => myitem.key == key);
      TubData.splice(temp, 1);
    }
  }

  const [petcleanscreenvisible, setpetcleanscreen] = useState(false);
  const showPetCleanScreen = () =>{
    RemoveCleanData();
    setpetcleanscreen(true);
    setcleanCheckVisible(false);
  }
  const hidePetCleanScreen = (addcleanpercent) => {
    setcleanpercent(cleanpercent+addcleanpercent > 100 ? 100 : cleanpercent+addcleanpercent);
    setpetcleanscreen(false);
  }

  const [funvisible, setfunVisible] = useState(false);
  const showfunDialog = () => setfunVisible(true);
  const hidefunDialog = () => setfunVisible(false);


  const [sleepvisible, setsleepVisible] = useState(false);
  const showsleepDialog = () => setsleepVisible(true);
  const hidesleepDialog = () => setsleepVisible(false);

  const [furniturename, setfurniturename] = useState("");
  const [furnituretype, setfurnituretype] = useState(1);
  const [furnitureid, setfurnitureid] = useState("");
  const [furniturecheck, setfurniturecheck] = useState(false);

  const [furniturecheckvisible, setfurniturecheckVisible] = useState(false);
  const showfurniturecheckDialog = (myfurnituretype, myfurniturename, myfurnitureid) => {
    setisaddfurniture(false);
    setfurnituretype(myfurnituretype);
    setfurniturename(myfurniturename);
    setfurnitureid(myfurnitureid);
    setfurniturecheckVisible(true);
  }
  const showfurniture = () => {
    setfurnitureVisible(false);
    setfurniturecheckVisible(false);
    setlightVisible(true);
  }
  const hidefurniturecheckDialog = () => {
    setisaddfurniture(true);
    setfurnitureslotVisible(false);
    setfurniturecheckVisible(false);
  }

  const returntofurnituredialog = () => {
    setfurniturecheck(false);
  }

  const [furnitureslotVisible, setfurnitureslotVisible] = useState(false);
  const [isaddfurniture, setisaddfurniture] = useState(false);
  const addfurnitureslot = () => {
    if(isaddfurniture)
      return;
    
    setisaddfurniture(true);

    if(furnituretype == 31){
    let myfws = [ ...furniturewalls];
    for(let i =0; i < myfws.length; i++){
      if(myfws[i].active == false)
      {
      myfws[i].imagepath = furnitureid;
      myfws[i].active = true;
      break;
      }
    }

    setfurniturewalls(myfws);
    }
    else{
      let myfws = [ ...furniturefloors];
      for(let i =0; i < myfws.length; i++){
        if(myfws[i].active == false)
        {
        myfws[i].imagepath = furnitureid;
        myfws[i].active = true;
        break;
        }
      }
  
    setfurniturefloors(myfws);
    }

    setfurnitureslotVisible(true);
    setfurniturecheckVisible(false);
    setfurniturecheck(true);
  }

  // const removefurnitureslot1 = () => {
  //   if(furnituretype == 1){
  //     let myfws = [ ...furniturewalls];
  //     for(let i =0; i < myfws.length; i++){
  //       if(myfws[i].active == true)
  //       {
  //       myfws[i].active = false;
  //       break;
  //       }
  //     }
  
  //     setfurniturewalls(myfws);
  //     }
  //   else{
  //     let myfws = [ ...furniturefloors];
  //     for(let i =0; i < myfws.length; i++){
  //       if(myfws[i].active == true)
  //       {
  //       myfws[i].active = false;
  //       break;
  //       }
  //       }
    
  //     setfurniturefloors(myfws);
  //     }
  
  //     setfurnitureslotVisible(true);
  //     setfurniturecheckVisible(false);
  //     setfurniturecheck(true);
  // }

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
  const showquestDialog = () => {
    setquestdaily();
    setquestVisible(true);
  }
  const hidequestDialog = () => {
    setquestVisible(false);
  }

  const [shopvisible, setshopVisible] = useState(false);
  const showshopDialog = () => {
    setshoptabeat();
    setshopVisible(true);
  }
  const hideshopDialog = () => {
    setshopVisible(false);
  }

  const [itemcheckvisible, setitemcheckVisible] = useState(false);
  const showitemcheckDialog = () => setitemcheckVisible(true);
  const hideitemcheckDialog = () => {
    setitemcheckVisible(false);
  }

  const [buysuccessvisible, setbuysuccessVisible] = useState(false);
  const showbuysuccessDialog = (totalprice) => { 
    setbuysuccessVisible(true);
    setitemcheckVisible(false);
    setCoin(coin => coin - totalprice);
  }
  const hidebuysuccessDialog = () => {
    setitemprice(0);
    setitemnum(1);
    
    PushItem();
    setbuysuccessVisible(false);
  }

  const PushItem = () => {
    switch(type){
      case 11:
        setfruitdatanum(fruitdatanum => fruitdatanum+1);
        FruitData.push(item);
        break;
      case 12:
        setmeatdatanum(meatdatanum => meatdatanum+1);
        MeatData.push(item);
        break;
      case 13:
        setetcdatanum(etcdatanum => etcdatanum+1);
        EtcData.push(item);
        break;
      case 21:
        setbrushdatanum(brushdatanum => brushdatanum+1);
        BrushData.push(item);
        break;
      case 22:
        setdetergentdatanum(detergentdatanum => detergentdatanum+1);
        DetergentData.push(item);
        break;
      case 23:
        settubdatanum(tubdatanum => tubdatanum+1);
        TubData.push(item);
        break;      
      case 31:
        setwallfdatanum(wallfdatanum => wallfdatanum+1);
        WallFData.push(item);
        break;
      case 32:
        setfloorfdatanum(floorfdatanum => floorfdatanum+1);
        FloorFData.push(item);
        break;
      case 0:
        break;
      default:
        break;
    }
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


  const [furnituretabnum, setfurnituretabnum] = useState(1);
  const [furniture, setfurniture] = useState("벽 가구");
  const setfurniturewall = () => {
    setfurnituretabnum(1);
    setfurniture("벽 가구");
  }
  const setfurniturefloor = () => {
    setfurnituretabnum(2);
    setfurniture("바닥 가구");
  }

  const [setting, setsetting] = useState("account");
  const setsettingaccount = () => setsetting("account");
  const setsettinggame = () => setsetting("game");
  const [isquality, setquality] = useState(false);
  const changequality = () => setquality(!isquality);
  const [ispush, setpush] = useState(true);
  const changepush = () => setpush(!ispush);
  const [item, setitem] = useState({
    key : 0,
    id : require('./assets/images/eat/slotdefault.png'),
    title: "default"
  })

  const renderEat = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => showeatCheckDialog(item.type, item.key, item.title, item.idforeat)}
        //onPress={hideeatDialog}
      />
    );
    }

    const renderClean = ({ item }) => {
      return (
        <Item
          item={item}
          onPress={() => showcleanCheckDialog(item.type, item.key, item.title, item.idforclean)}
          //onPress={hideeatDialog}
        />
      );
      }

      const renderFurniture = ({ item }) => {
        return (
          <Item
            item={item}
            onPress={() => showfurniturecheckDialog(item.type, item.title, item.idformain)}
            //onPress={hideeatDialog}
          />
        );
        }

      const renderShop = ({ item }) => {
        return (
          <ShopItem
            item={item}
            onPress={() => showshopCheckDialog(item)}
            //onPress={hideeatDialog}
          />
        );
        }

        const renderStore = ({ item }) => {
          return (
            <StoreItem
              item={item}
              onPress={() => {}}
            />
          );
          }

  const [type, settype] = useState(0);
  const [fruitdatanum, setfruitdatanum] = useState(FruitData.length);
  const [meatdatanum, setmeatdatanum] = useState(MeatData.length);
  const [etcdatanum, setetcdatanum] = useState(EtcData.length);
  const [brushdatanum, setbrushdatanum] = useState(BrushData.length);
  const [detergentdatanum, setdetergentdatanum] = useState(DetergentData.length);
  const [tubdatanum, settubdatanum] = useState(TubData.length);
  const [wallfdatanum, setwallfdatanum] = useState(WallFData.length);
  const [floorfdatanum, setfloorfdatanum] = useState(FloorFData.length);

  const showshopCheckDialog = (myitem) => {
    if(myitem.type == 0)
      return;

    setitemprice(myitem.cost);
    settype(myitem.type);
    showitemcheckDialog();

    switch(myitem.type){
      case 11:
        let tempfruititem = {type : myitem.type,
          key : fruitdatanum+1,
          id: myitem.idforeatslot,
          title: myitem.title,
          idforstore : myitem.idforstore,
          idforeat : myitem.idforeat,
        };
        setitem(tempfruititem);
        break;
      case 12:
        let tempmeatitem = {type : myitem.type,
          key : meatdatanum+1,
          id: myitem.idforeatslot,
          title: myitem.title,
          idforstore : myitem.idforstore,
          idforeat : myitem.idforeat,
        };
        setitem(tempmeatitem);
        break;
      case 13:
        let tempetcitem = {type : myitem.type,
          key : etcdatanum+1,
          id: myitem.idforeatslot,
          title: myitem.title,
          idforstore : myitem.idforstore,
          idforeat : myitem.idforeat,
        };
        setitem(tempetcitem);
        break;
      case 21:
        let tempbrushitem = {type : myitem.type,
          key : brushdatanum+1,
          id: myitem.idforcleanslot,
          title: myitem.title,
          idforstore : myitem.idforstore,
          idforclean : myitem.idforclean,
        };
        setitem(tempbrushitem);
        break;
      case 22:
        let tempdetergentitem = {type : myitem.type,
          key : detergentdatanum+1,
          id: myitem.idforcleanslot,
          title: myitem.title,
          idforstore : myitem.idforstore,
          idforclean : myitem.idforclean,
        };
        setitem(tempdetergentitem);
        break;
      case 23:
        let temptubitem = {type : myitem.type,
          key : tubdatanum+1,
          id: myitem.idforcleanslot,
          title: myitem.title,
          idforstore : myitem.idforstore,
          idforclean : myitem.idforclean,
        };
        setitem(temptubitem);
        break;      
      case 31:
        let tempwallfitem = {type : myitem.type,
          key : wallfdatanum+1,
          id: myitem.idforfurniture,
          title: myitem.title,
          idforstore : myitem.idforstore,
          idformain : myitem.idformain,
        };
        setitem(tempwallfitem);
        break;
      case 32:
        let tempfloorfitem = {type : myitem.type,
          key : floorfdatanum+1,
          id: myitem.idforfurniture,
          title: myitem.title,
          idforstore : myitem.idforstore,
          idformain : myitem.idformain,
        };
        setitem(tempfloorfitem);
        break;
      case 0:
        break;
      default:
        break;
      }

        //hideshopDialog();
  } 
  
  const setStoreData = () => {
    setStoreEatData();
    setStoreCleanData();
    setStoreFurnitureData();
  }

  const setStoreEatData = () => {
    let myeatdatalength = StoreEatData.length;

    for(let i=0; i < myeatdatalength; i++)
    {
      StoreEatData.pop();
    }

    for(let i=0; i < FruitData.length; i++)
    {
      if(FruitData[i].type != 0)
        StoreEatData.push({key : StoreEatData.length+1, id : FruitData[i].idforstore, title : FruitData[i].title, num : 1});
    }

    for(let i=0; i < MeatData.length; i++)
    {
      if(MeatData[i].type != 0)
        StoreEatData.push({key : StoreEatData.length+1, id : MeatData[i].idforstore, title : MeatData[i].title, num : 1});
    }

    for(let i=0; i < EtcData.length; i++)
    {
      if(EtcData[i].type != 0)
        StoreEatData.push({key : StoreEatData.length+1, id : EtcData[i].idforstore, title : EtcData[i].title, num : 1});
    }
  }

    const setStoreCleanData = () => {
      let mycleandatalength = StoreCleanData.length;
  
      for(let i=0; i < mycleandatalength; i++)
      {
        StoreCleanData.pop();
      }
  
      for(let i=0; i < BrushData.length; i++)
      {
        if(BrushData[i].type != 0)
          StoreCleanData.push({key : StoreCleanData.length+1, id : BrushData[i].idforstore, title : BrushData[i].title, num : 1});
      }
  
      for(let i=0; i < DetergentData.length; i++)
      {
        if(DetergentData[i].type != 0)
          StoreCleanData.push({key : StoreCleanData.length+1, id : DetergentData[i].idforstore, title : DetergentData[i].title, num : 1});
      }
  
      for(let i=0; i < TubData.length; i++)
      {
        if(TubData[i].type != 0)
          StoreCleanData.push({key : StoreCleanData.length+1, id : TubData[i].idforstore, title : TubData[i].title, num : 1});
      }
    }

    const setStoreFurnitureData = () => {
      let myfurnituredatalength = StoreFurnitureData.length;
  
      for(let i=0; i < myfurnituredatalength; i++)
      {
        StoreFurnitureData.pop();
      }
  
      for(let i=0; i < WallFData.length; i++)
      {
        StoreFurnitureData.push({key : StoreFurnitureData.length+1, id : WallFData[i].idforstore, title : WallFData[i].title, num : 1});
      }
  
      for(let i=0; i < FloorFData.length; i++)
      {
        StoreFurnitureData.push({key : StoreFurnitureData.length+1, id : FloorFData[i].idforstore, title : FloorFData[i].title, num : 1});
      }
    }

  const removefurniture = (furnituretype, index) => {
    if(furnituretype == 1)
    {
      let myfws = [ ...furniturewalls];
      myfws[index].active = false;
      setfurniturewalls(myfws);
    }
    else
    {
      let myfws = [ ...furniturefloors];
      myfws[index].active = false;
      setfurniturefloors(myfws);
    }
  }
  
  const [furniturewalls, setfurniturewalls] = useState([{
    key: 'slot1', left : 0, active : false, imagepath : require('./assets/images/furnitureposition/wallplant.png'),
  }, {
    key: 'slot2', left : 300, active : false, imagepath : require('./assets/images/furnitureposition/wallplant.png'),
    }, 
  ]);

  const [furniturefloors, setfurniturefloors] = useState([{
    key: 'slot1', left : 0, active : false, imagepath : require('./assets/images/furnitureposition/wallplant.png'),
  }, {
    key: 'slot2', left : 300, active : false, imagepath : require('./assets/images/furnitureposition/wallplant.png'),
    },
  ]);

  let furniturewallsRender = [];
  for (let i = 0; i < furniturewalls.length; i++) {
      let fw = furniturewalls[i];

      if(fw.active)
      {
      furniturewallsRender.push( 
        <Image source={fw.imagepath} style={{...styles.furniturewallslot, left : fw.left}} resizeMode ="stretch"/>
      );
      }
  }

  let furniturefloorsRender = [];
  for (let i = 0; i < furniturefloors.length; i++) {
      let fw = furniturefloors[i];

      if(fw.active)
      {
        furniturefloorsRender.push( 
        <Image source={fw.imagepath} style={{...styles.furniturefloorslot, left : fw.left}} resizeMode ="stretch"/>
      );
      }
  }

  let furtnitureremovebuttonRender = [];
  for (let i = 0; i < furniturewalls.length; i++) {
    let fw = furniturewalls[i];

    if(fw.active)
    {
      furtnitureremovebuttonRender.push( 
        <TouchableOpacity
        style={{...styles.furniturewallremovebutton, left : 45 + fw.left, top : 200}}
        onPress={() => removefurniture(1, i)} activeOpacity={1}>
      <Image source={require('./assets/images/furnitureposition/xbutton.png')} resizeMode ="stretch"/>
      </TouchableOpacity>
    );
    }
  }
  for (let i = 0; i < furniturefloors.length; i++) {
    let fw = furniturefloors[i];

    if(fw.active)
    {
      furtnitureremovebuttonRender.push( 
        <TouchableOpacity
        style={{...styles.furniturewallremovebutton, left : 45 + fw.left, bottom : 20}}
        onPress={() => removefurniture(2, i)} activeOpacity={1}>
      <Image source={require('./assets/images/furnitureposition/xbutton.png')} resizeMode ="stretch"/>
      </TouchableOpacity>
    );
    }
  }

  return(
    <View style={styles.container}>
      
    <Image source={require('./assets/images/main/main.gif')} style={styles.main} resizeMode ="stretch"/>
    {mainnum == 2 && <Image source={require('./assets/images/main/main2.png')} style={styles.main} resizeMode ="stretch"/>}

    {lightvisible == true && <DraggableBox /> }

    {furniturewallsRender}
    {furniturefloorsRender}

    {/* {furnitureslotVisible == true && <Image source={require('./assets/images/main/furniturewallslot1.png')} 
    style={styles.furniturewallslot1} resizeMode ="stretch"/> }
    {furnitureslotVisible == true && <Image source={require('./assets/images/main/furniturewallslot1.png')} 
    style={{...styles.furniturewallslot1, left : 300}} resizeMode ="stretch"/> } */}
    <MovingPet petnum={petnum} /> 
    {/* <Image source={require('./assets/images/main/pet1.png')} style={styles.mainpetbg} resizeMode ="cover"/> */}
    <Image source={require('./assets/images/main/smile.png')} style={styles.mainsmile} resizeMode ="cover"/>

    <TouchableOpacity
                style={styles.mainstage}
                onPress={showstageDialog} activeOpacity={1}>
          <Image source={require('./assets/images/main/circle.png')} resizeMode ="cover"/>
          <Text style={styles.stage}>stage</Text>
        </TouchableOpacity>

    <Button disabled onPress={() => {}} style={styles.gamemoneybackground}><Text ></Text></Button>
    <Button disabled onPress={() => {}} style={styles.heartbackground}><Text ></Text></Button>
    <Button disabled onPress={() => {}} style={{...styles.heartgaugeimage, width : 291 * heart / 100}}><Text ></Text></Button>
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
                onPress={showmenuDialog} activeOpacity={1}>
          <Image source={require('./assets/images/main/menu.png')} resizeMode ="stretch"/>
        </TouchableOpacity>

    
  {/* <Button disabled onPress={() => {}} style={styles.bottommenu}><Text></Text></Button> */}
  <Image source={require('./assets/images/main/bottommenubg.png')} style={styles.bottommenu} resizeMode ="stretch"/>

  {/* <Button disabled onPress={() => {}} style={styles.eatbackground}><Text></Text></Button>
  <Image source={require('./assets/images/main/eat.png')} style={styles.eatgauge} resizeMode ="stretch"/> */}
  {/* <Button color={Colors.black} onPress={showeatDialog} style={styles.eatbutton}></Button> */}
  {/* <TouchableOpacity
                style={styles.eatbutton}
                onPress={showeatDialog} activeOpacity={1}>
  </TouchableOpacity> */}

<Image source={require('./assets/images/main/gaugebg.png')} style={styles.eatgaugebg} resizeMode ="stretch"/>
  <Image source={require('./assets/images/main/eatgauge.png')} style={{...styles.eatgauge, height : 68 * eatpercent/100}} resizeMode ="cover"/>

  <TouchableOpacity
                style={styles.eatbutton}
                onPress={showeatDialog} activeOpacity={1}>
                  <Image source={require('./assets/images/main/eat.png')} resizeMode ="stretch"/>
  </TouchableOpacity>


    {/* <Button disabled onPress={() => {}} style={styles.cleanbackground}><Text ></Text></Button>
    <Image source={require('./assets/images/main/clean.png')} style={styles.cleangauge} resizeMode ="stretch"/> */}
    {/* <Button color={Colors.black} onPress={showcleanDialog} style={styles.cleanbutton}></Button> */}
    {/* <TouchableOpacity
                style={styles.cleanbutton}
                onPress={showcleanDialog} activeOpacity={1}>
  </TouchableOpacity> */}

  <Image source={require('./assets/images/main/gaugebg.png')} style={styles.cleangaugebg} resizeMode ="stretch"/>
  <Image source={require('./assets/images/main/cleangauge.png')} style={{...styles.cleangauge, height : 68 * cleanpercent/100}} resizeMode ="cover"/>

  <TouchableOpacity
                style={styles.cleanbutton}
                onPress={showcleanDialog} activeOpacity={1}>
                  <Image source={require('./assets/images/main/clean.png')} resizeMode ="stretch"/>
  </TouchableOpacity>

    {/* <Button disabled onPress={() => {}} style={styles.funbackground}><Text ></Text></Button>
    <Image source={require('./assets/images/main/funny.png')} style={styles.fungauge} resizeMode ="stretch"/> */}
    {/* <Button color={Colors.black} onPress={showfunDialog} style={styles.funbutton}></Button> */}
    {/* <TouchableOpacity
                style={styles.funbutton}
                onPress={showfunDialog} activeOpacity={1}>
  </TouchableOpacity> */}

<Image source={require('./assets/images/main/gaugebg.png')} style={styles.fungaugebg} resizeMode ="stretch"/>
  <Image source={require('./assets/images/main/funnygauge.png')} style={{...styles.fungauge, height : 68 * funpercent/100}} resizeMode ="stretch"/>

<TouchableOpacity
                style={styles.funbutton}
                onPress={showfunDialog} activeOpacity={1}>
                  <Image source={require('./assets/images/main/funny.png')} resizeMode ="stretch"/>
  </TouchableOpacity>

    {/* <Button disabled onPress={() => {}} style={styles.sleepbackground}><Text ></Text></Button>
    <Image source={require('./assets/images/main/sleep.png')} style={styles.sleepgauge} resizeMode ="stretch"/> */}
    {/* <Button color={Colors.black} onPress={showsleepDialog} style={styles.sleepbutton}></Button> */}
    {/* <TouchableOpacity
                style={styles.sleepbutton}
                onPress={showsleepDialog} activeOpacity={1}>
  </TouchableOpacity> */}

<Image source={require('./assets/images/main/gaugebg.png')} style={styles.sleepgaugebg} resizeMode ="stretch"/>
<Image source={require('./assets/images/main/sleepgauge.png')} style={{...styles.sleepgauge, height : 68 * sleeppercent/100}} resizeMode ="stretch"/>

<TouchableOpacity
                style={styles.sleepbutton}
                onPress={showsleepDialog} activeOpacity={1}>
                  <Image source={require('./assets/images/main/sleep.png')} resizeMode ="stretch"/>
  </TouchableOpacity>

{tutorial2visible && <TouchableOpacity
                style={styles.tutorial}
                onPress={() =>settutorial2visible(false)} activeOpacity={1}>
                  <Image style={styles.tutorialimage} source={require('./assets/images/main/tutorial2.png')} resizeMode ="stretch"/>
</TouchableOpacity> }
{tutorial1visible && <TouchableOpacity
                style={styles.tutorial}
                onPress={() => settutorial1visible(false)} activeOpacity={1}>
                  <Image  style={styles.tutorialimage} source={require('./assets/images/main/tutorial1.png')} resizeMode ="stretch"/>
</TouchableOpacity> }

{/* 스테이지 선택 화면 */}

<Dialog visible={stagevisible} onDismiss={hidestageDialog} style={styles.stageScene}>
  <Dialog.Content>
  <Image style={styles.stagebg} source={require('./assets/images/main/stage.png')} resizeMode ="stretch"/>

  {mainnum == 1 &&   <TouchableOpacity
                style={styles.stage1}
                onPress={pressstage1} activeOpacity={1}>
          <Image source={require('./assets/images/main/stage1.png')} resizeMode ="cover" />
        </TouchableOpacity>}

        {mainnum != 1 &&   <TouchableOpacity
                style={styles.stage1}
                onPress={pressstage1} activeOpacity={1}>
          <Image source={require('./assets/images/main/stage1.1.png')} resizeMode ="cover" />
        </TouchableOpacity>}

        {mainnum == 2 &&   <TouchableOpacity
                style={styles.stage2}
                onPress={pressstage2} activeOpacity={1}>
          <Image source={require('./assets/images/main/stage2.png')} resizeMode ="cover" />
        </TouchableOpacity>}

        {mainnum != 2 &&   <TouchableOpacity
                style={styles.stage2}
                onPress={pressstage2} activeOpacity={1}>
          <Image source={require('./assets/images/main/stage2.1.png')} resizeMode ="cover" />
        </TouchableOpacity>}

  </Dialog.Content>
  <Dialog.Actions>
  </Dialog.Actions>
</Dialog>

{/* 메뉴 화면 */}

<Dialog visible={menuvisible} onDismiss={hidemenuDialog} style={styles.settinglist}>
  <Dialog.Title style={styles.textcenter}>메뉴</Dialog.Title>
  <Dialog.Content>

  {/* <Image style={styles.menubg1} source={require('./assets/images/menu/menu1bg.png')} resizeMode ="stretch"/> 
  {menu == false && <Image style={styles.menubg1} source={require('./assets/images/menu/menu2bg.png')} resizeMode ="stretch"/>}     */}
  {/* {(menu == true) ?
        <Image style={styles.menubg1} source={require('./assets/images/menu/menu1bg.png')} resizeMode ="stretch"/> :
        <Image style={styles.menubg1} source={require('./assets/images/menu/menu2bg.png')} resizeMode ="stretch"/>
  } */}
  <Image style={styles.menubg1} source={require('./assets/images/menu/menubg.png')} resizeMode ="stretch"/> 
  <Text style={styles.menufont}>메뉴</Text>

  {/* <Image style={styles.menu1} source={require('./assets/images/menu/menu1.png')} resizeMode ="stretch"/>
  {(menu == true) ?
        <Image style={styles.menu1num} source={require('./assets/images/menu/1.1.png')} resizeMode ="stretch"/> :
        <Image style={styles.menu1num} source={require('./assets/images/menu/1.png')} resizeMode ="stretch"/>
  } */}
    {/* {(menu == true) ?
        <Image style={styles.menu1} source={require('./assets/images/menu/menu1.1.png')} resizeMode ="stretch"/> :
        <Image style={styles.menu1} source={require('./assets/images/menu/menu1.2.png')} resizeMode ="stretch"/>
  } */}
    <Image style={styles.menu1} source={require('./assets/images/menu/menu1.1.png')} resizeMode ="stretch"/>
  {menu == false && <Image style={styles.menu1} source={require('./assets/images/menu/menu1.2.png')} resizeMode ="stretch"/>}

  {(menu == true) ?
     <Button disabled color={Colors.black} onPress={setmenu1} style={styles.menu1}><Text ></Text></Button> :
    //  <Button color={Colors.black} onPress={setmenu1} style={styles.menu1}><Text ></Text></Button>
    <TouchableOpacity
                style={styles.menu1}
                onPress={setmenu1} >
  </TouchableOpacity>
  }

  {/* <Image style={styles.menu2} source={require('./assets/images/menu/menu2.png')} resizeMode ="stretch"/>
  {(menu == true) ?
        <Image style={styles.menu2num} source={require('./assets/images/menu/2.png')} resizeMode ="stretch"/> :
        <Image style={styles.menu2num} source={require('./assets/images/menu/2.1.png')} resizeMode ="stretch"/>
  } */}
      {/* {(menu == true) ?
        <Image style={styles.menu2} source={require('./assets/images/menu/menu2.2.png')} resizeMode ="stretch"/> :
        <Image style={styles.menu2} source={require('./assets/images/menu/menu2.1.png')} resizeMode ="stretch"/>
  } */}
    <Image style={styles.menu2} source={require('./assets/images/menu/menu2.2.png')} resizeMode ="stretch"/>
  {menu == false && <Image style={styles.menu2} source={require('./assets/images/menu/menu2.1.png')} resizeMode ="stretch"/>}

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
      <Image style={styles.menushop} source={require('./assets/images/menu/shop.png')} resizeMode ="stretch"/>
  }   

  {(menu == true) ?
     //<Button color={Colors.black} onPress={showquestDialog} style={styles.menuquestbutton}><Text></Text></Button>
     <TouchableOpacity
     style={styles.menuquestbutton}
     onPress={showquestDialog} >
</TouchableOpacity> :
     //<Button color={Colors.black} onPress={showachieveDialog} style={styles.menuquestbutton}><Text></Text></Button>
     <TouchableOpacity
     style={styles.menushopbutton}
     onPress={showshopDialog} >
</TouchableOpacity>
  }  

  {(menu == true) ?
      <Image style={styles.menuachieve} source={require('./assets/images/menu/achieve.png')} resizeMode ="stretch"/> :
      <Image style={styles.menusetting} source={require('./assets/images/menu/setting.png')} resizeMode ="stretch"/>
  }   

  {(menu == true) ?
     //<Button color={Colors.black} onPress={showshopDialog} style={styles.menushopbutton}><Text></Text></Button> 
     <TouchableOpacity
     style={styles.menuachievebutton}
     onPress={showachieveDialog} >
</TouchableOpacity> :
     // <Button color={Colors.black} onPress={()=>{}} style={styles.menushopbutton}><Text></Text></Button>
     <TouchableOpacity
     style={styles.menusettingbutton}
     onPress={showsettingDialog} >
</TouchableOpacity>
  }  

  {(menu == true) ?
      <Image style={styles.menufurniture} source={require('./assets/images/menu/furnitureposition.png')} resizeMode ="stretch"/> :
      <Image style={styles.menudictionary} source={require('./assets/images/menu/dictionary.png')} resizeMode ="stretch"/>
  }   

  {(menu == true) ?
     // <Button color={Colors.black} onPress={showfurnitureDialog} style={styles.menufurniturebutton}><Text></Text></Button> 
     <TouchableOpacity
     style={styles.menufurniturebutton}
     onPress={showfurnitureDialog} >
</TouchableOpacity> :
    // <Button color={Colors.black} onPress={showdictionaryDialog} style={styles.menufurniturebutton}><Text></Text></Button>
    <TouchableOpacity
    style={styles.menudictionarybutton}
    onPress={showdictionaryDialog} >
</TouchableOpacity>
  }  
    
  {menu == true && <Image style={styles.menustore} source={require('./assets/images/menu/store.png')} resizeMode ="stretch"/>}
  {menu == true && <TouchableOpacity
  style={styles.menustorebutton}
  onPress={showstoreDialog} >
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

{/* 업적 화면 */}

<Dialog visible={achievevisible} onDismiss={hideachieveDialog} style={styles.achieve}>
  <Dialog.Content>

  <Image style={styles.achievebg} source={require('./assets/images/achieve/achievebg.png')} resizeMode ="stretch"/>

  <Text style={styles.achievetitle}>ACHIEVEMENT</Text>

  {/* <Image style={styles.achieveslot1bg} source={require('./assets/images/achieve/achieveslotbg.png')} resizeMode ="stretch"/>
  <Image style={styles.achieveslot1image} source={require('./assets/images/achieve/achieveimage.png')} resizeMode ="stretch"/>
  <Image style={styles.achieveslot1check} source={require('./assets/images/achieve/checkimage.png')} resizeMode ="stretch"/>
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
  <Image style={styles.achieveslot5check} source={require('./assets/images/achieve/defaultimage.png')} resizeMode ="stretch"/> */}

  {/* <Image style={styles.achievebarbg} source={require('./assets/images/achieve/achievebarbg.png')} resizeMode ="stretch"/>
  <Image style={styles.achievebar} source={require('./assets/images/achieve/achievebar.png')} resizeMode ="stretch"/> */}

  <Image style={styles.achieveslot1bg} source={require('./assets/images/achieve/achieveslot1.png')} resizeMode ="stretch"/>
  <Image style={styles.achieveslot2bg} source={require('./assets/images/achieve/achieveslot2.png')} resizeMode ="stretch"/>
  <Image style={styles.achieveslot3bg} source={require('./assets/images/achieve/achieveslot3.png')} resizeMode ="stretch"/>
  <Image style={styles.achieveslot4bg} source={require('./assets/images/achieve/achieveslot4.png')} resizeMode ="stretch"/>
  <Image style={styles.achieveslot2check} source={require('./assets/images/achieve/checkimage.png')} resizeMode ="stretch"/>
  <Image style={styles.achieveslot3check} source={require('./assets/images/achieve/checkimage.png')} resizeMode ="stretch"/>
  <Image style={styles.achieveslot4check} source={require('./assets/images/achieve/checkimage.png')} resizeMode ="stretch"/>

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


{/* 퀘스트 화면 */}

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

{quest == "daily" && <Image style={styles.dailyslot2} source={require('./assets/images/quest/defaultslot.png')} resizeMode ="stretch"/>}
{quest == "daily" && <Image style={styles.checkslot2} source={require('./assets/images/quest/defaultbutton.png')} resizeMode ="stretch"/>}
{quest == "daily" &&   <Text style={styles.dailyinfoslot2}>아무 펫이나 1회 채우세요.</Text>}

{quest == "daily" && <Image style={styles.dailyslot3} source={require('./assets/images/quest/defaultslot.png')} resizeMode ="stretch"/>}
{quest == "daily" && <Image style={styles.checkslot3} source={require('./assets/images/quest/defaultbutton.png')} resizeMode ="stretch"/>}
{quest == "daily" &&   <Text style={styles.dailyinfoslot3}></Text>}

{quest == "daily" && <Image style={styles.dailyslot4} source={require('./assets/images/quest/defaultslot.png')} resizeMode ="stretch"/>}
{quest == "daily" && <Image style={styles.checkslot4} source={require('./assets/images/quest/defaultbutton.png')} resizeMode ="stretch"/>}
{quest == "daily" &&   <Text style={styles.dailyinfoslot4}></Text>}

{/*
{quest != "daily" && <Image style={styles.attendbg} source={require('./assets/images/quest/attendbg.png')} resizeMode ="stretch"/>}

{quest != "daily" && <Image style={styles.attendslot1} source={require('./assets/images/quest/checkbutton1.png')} resizeMode ="stretch"/>}
{quest != "daily" && <Image style={styles.attendslot2} source={require('./assets/images/quest/checkbutton2.png')} resizeMode ="stretch"/>}
{quest != "daily" && <Image style={styles.attendslot3} source={require('./assets/images/quest/defaultbutton.png')} resizeMode ="stretch"/>}
{quest != "daily" && <Image style={styles.attendslot4} source={require('./assets/images/quest/defaultbutton.png')} resizeMode ="stretch"/>}
{quest != "daily" && <Image style={styles.attendslot5} source={require('./assets/images/quest/defaultbutton.png')} resizeMode ="stretch"/>} */}

{quest != "daily" && <Image style={styles.attend} source={require('./assets/images/quest/attend.png')} resizeMode ="stretch"/>}

{quest != "daily" &&  <TouchableOpacity
                style={styles.attendawardbutton}
                onPress={hidequestDialog} activeOpacity={1}>
  <Text style={styles.attendawardbuttontext}>보상받기</Text>
</TouchableOpacity> }

  </Dialog.Content>
</Dialog>



{/* 퀘스트 보상 화면 */}

<Dialog visible={questrewardvisible} onDismiss={hidequestrewardDialog} style={styles.questreward}>
  <Dialog.Title style={styles.textcenter}>퀘스트 보상</Dialog.Title>
  <Dialog.Content>
  <Button disabled color={Colors.black} onPress={() => {}} style={styles.questrewardinfo}><Text style={styles.textcenter}>보상 정보</Text></Button>
  </Dialog.Content>
  <Dialog.Actions>
  <Button color={Colors.black} onPress={hidequestrewardDialog} style={styles.questrewardbutton}><Text style={styles.textcenter}>보상 받기</Text></Button>
  </Dialog.Actions>
</Dialog>

{/* <Dialog visible={shopvisible} onDismiss={hideshopDialog} style={styles.acheivelist}>
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
</Dialog> */}

{/* 상점 화면 */}

<Dialog visible={shopvisible} onDismiss={hideshopDialog} style={styles.stageScene}>
  <Dialog.Content>
  <Image style={styles.stagebg} source={require('./assets/images/shop/shopbg.png')} resizeMode ="stretch"/>

  <Image source={require('./assets/images/coin.png')} style={styles.shopcoinimage} resizeMode ="cover"/>
  <Button disabled onPress={() => {}} style={styles.shopcoinnum}><Text style={styles.coinfont}>{coin}</Text></Button>
  <Image source={require('./assets/images/shop/tabmenu.png')} style={styles.shoptabmenu} resizeMode ="cover"/>

  <TouchableOpacity
                style={styles.shoptab1}
                onPress={setshoptabeat} activeOpacity={1}>
        <Text style={styles.textcenter}>식사류</Text>
        </TouchableOpacity>
        <TouchableOpacity
                style={styles.shoptab2}
                onPress={setshoptabclean} activeOpacity={1}>
        <Text style={styles.textcenter}>청결류</Text>
        </TouchableOpacity>
        <TouchableOpacity
                style={styles.shoptab3}
                onPress={setshoptabfurniture} activeOpacity={1}>
        <Text style={styles.textcenter}>가구</Text>
        </TouchableOpacity>
  <TouchableOpacity
                style={styles.shoptab4}
                onPress={setshoptabmoney} activeOpacity={1}>
       <Text style={styles.textcenter}>재화</Text>
        </TouchableOpacity>

<View style={{...styles.shoptab1_1, left : 23.5 + (shoptabnum-1)*(85+5/3)}}><Text style={styles.shoptabtext}>{shoptabname}</Text></View>

<TouchableOpacity
      style={styles.shopbackbutton}
      onPress={hideshopDialog} activeOpacity={1}>
    <Image source={require('./assets/images/shop/backbutton.png')} resizeMode ="cover"/>
  </TouchableOpacity> 

{/* {shoptabnum == 1 &&
  <TouchableOpacity
      style={styles.shopeatslot1}
      onPress={hideshopDialog} activeOpacity={1}>
    <Image source={require('./assets/images/shop/appleslot.png')} resizeMode ="cover"/>
  </TouchableOpacity>}

  {shoptabnum == 1 &&
  <TouchableOpacity
      style={styles.shopeatslot2}
      onPress={hideshopDialog} activeOpacity={1}>
    <Image source={require('./assets/images/shop/appleslot.png')} resizeMode ="cover"/>
  </TouchableOpacity> }

  {shoptabnum == 1 &&
  <TouchableOpacity
      style={styles.shopeatslot3}
      onPress={hideshopDialog} activeOpacity={1}>
    <Image source={require('./assets/images/shop/appleslot.png')} resizeMode ="cover"/>
  </TouchableOpacity> }

  {shoptabnum == 1 &&
  <TouchableOpacity
      style={styles.shopeatslot4}
      onPress={hideshopDialog} activeOpacity={1}>
    <Image source={require('./assets/images/shop/appleslot.png')} resizeMode ="cover"/>
  </TouchableOpacity> } */}

  {shoptabnum == 1 && 
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{position : 'absolute', top : 150, left : 70, width : 300, height : 480, marginTop: 0}}>
        <View  >
          <FlatList
          data={ShopEatData}
          renderItem={renderShop}
          keyExtractor={(item) => item.key}
          numColumns={1}
          />
        </View >
        </ScrollView>
        }

{shoptabnum == 2 && 
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{position : 'absolute', top : 150, left : 70, width : 300, height : 480, marginTop: 0}}>
        <View  >
          <FlatList
          data={ShopCleanData}
          renderItem={renderShop}
          keyExtractor={(item) => item.key}
          numColumns={1}
          />
        </View >
        </ScrollView>
        }
        
  {shoptabnum == 3 && 
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{position : 'absolute', top : 150, left : 70, width : 300, height : 480, marginTop: 0}}>
        <View  >
          <FlatList
          data={ShopFurnitureData}
          renderItem={renderShop}
          keyExtractor={(item) => item.key}
          numColumns={1}
          />
        </View >
        </ScrollView>
        }
        
  {shoptabnum == 4 && 
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{position : 'absolute', top : 150, left : 70, width : 300, height : 480, marginTop: 0}}>
        <View  >
          <FlatList
          data={ShopCostData}
          renderItem={renderShop}
          keyExtractor={(item) => item.key}
          numColumns={1}
          />
        </View >
        </ScrollView>
        }


    <Image style={styles.shopnpc} source={require('./assets/images/shop/shopnpc.png')} resizeMode ="cover"/>
    
    <TouchableOpacity style={styles.shopnpctext1} activeOpacity={1}><Text style={styles.shopnpctextfont}>오늘의 할인 물품은</Text></TouchableOpacity>
    <TouchableOpacity style={styles.shopnpctext2} activeOpacity={1}><Text style={styles.shopnpctextfont2}>"{todayitem}"</Text></TouchableOpacity>
    <TouchableOpacity style={styles.shopnpctext3} activeOpacity={1}><Text style={styles.shopnpctextfont}>라고</Text></TouchableOpacity>
    <TouchableOpacity style={styles.shopnpctext4} activeOpacity={1}><Text style={styles.shopnpctextfont}>놓치면 후회할걸?</Text></TouchableOpacity>

    <TouchableOpacity style={styles.shopnpcbutton} onPress={hideshopDialog} activeOpacity={1}><Text style={styles.shopnpcbuttonfont}>바로가기</Text></TouchableOpacity>
    
  </Dialog.Content>
  <Dialog.Actions>
    {/* <Button disabled color={Colors.black} onPress={hideshopDialog} style={styles.xbuttonbackground}></Button>
    <Button color={Colors.black} onPress={hideshopDialog} style={styles.xbutton}><Text style={styles.xbuttonfont}>X</Text></Button> */}
  </Dialog.Actions>
</Dialog>

{/* 구매 확인 화면 */}

<Dialog visible={itemcheckvisible} dismissable={false} onDismiss={hideitemcheckDialog} style={styles.itemcheck}>
  <Dialog.Content>
    <Image source={require('./assets/images/shop/appleinfo.png')} style={styles.itemimage} resizeMode ="stretch"/>
    <Image source={require('./assets/images/shop/coin.png')} style={styles.itemcost} resizeMode ="stretch"/>
    <Text style={styles.itemcosttext}>{itemprice * itemnum}</Text>
    <Text style={styles.itemnumtext}>{itemnum}</Text>

    <TouchableOpacity
      style={styles.downbutton}
      onPress={itemnumdown} activeOpacity={1}>
    <Image source={require('./assets/images/shop/downbutton.png')} resizeMode ="cover"/>
  </TouchableOpacity> 
  <TouchableOpacity
      style={styles.upbutton}
      onPress={itemnumup} activeOpacity={1}>
    <Image source={require('./assets/images/shop/upbutton.png')} resizeMode ="cover"/>
  </TouchableOpacity> 

    <Paragraph style={styles.itemchecktext}><Text style={styles.yesbuttonfont}>구매 하시겠습니까?</Text></Paragraph>
  </Dialog.Content>
  <Dialog.Actions>
    <Button color={Colors.black} onPress={() =>showbuysuccessDialog(itemprice * itemnum)} style={styles.itemyesbutton}><Text style={styles.itemyesbuttonfont}>네</Text></Button>
    <Button color={Colors.black} onPress={hideitemcheckDialog} style={styles.itemnobutton}><Text style={styles.itemnobuttonfont}>아니오</Text></Button>
  </Dialog.Actions>
</Dialog>

{/* 구매 성공 화면 */}

<Dialog visible={buysuccessvisible} dismissable={false} onDismiss={hidebuysuccessDialog} style={styles.buysuccess}>
  <Dialog.Content>
    <Text style={styles.buysuccesstext1}>구매에 성공했습니다!</Text>
    <Text style={styles.buysuccesstext2}>창고를 확인해주세요.</Text>
  </Dialog.Content>
  <Dialog.Actions>
    <Button color={Colors.black} onPress={hidebuysuccessDialog} style={styles.checkbutton}><Text style={styles.checkbuttonfont}>확인</Text></Button>
  </Dialog.Actions>
</Dialog>

{/* <Dialog visible={collectionvisible} onDismiss={hidecollectionDialog} style={styles.collectionlist}>
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
</Dialog> */}

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

{/* 가구 배치 화면 */}

<Dialog visible={furniturevisible} onDismiss={hidefurnitureDialog} style={styles.quest}>
  <Dialog.Content>

  {/* <TouchableOpacity
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
  } */}

<Text style={styles.furnituretabbg}></Text>

<TouchableOpacity
                style={styles.furnituretab1}
                onPress={setfurniturewall} activeOpacity={1}>
        <Text style={styles.textcenter}>벽 가구</Text>
        </TouchableOpacity>
        <TouchableOpacity
                style={styles.furnituretab2}
                onPress={setfurniturefloor} activeOpacity={1}>
        <Text style={styles.textcenter}>바닥 가구</Text>
        </TouchableOpacity>

<View style={{...styles.furnituretab, left : 50 + (furnituretabnum-1)*100}}><Text style={styles.textcenter}>{furniture}</Text></View>

{/* {furniture == "벽 가구" &&   <TouchableOpacity
                style={styles.furnitureslot1}
                onPress={() => showfurniturecheckDialog("벽걸이 식물", 1)} activeOpacity={1}>
          <Image source={require('./assets/images/furnitureposition/wallplantslot.png')} resizeMode ="stretch"/>
        </TouchableOpacity>}

{furniture == "벽 가구" &&  <Image source={require('./assets/images/furnitureposition/thincurtainslot.png')} style={styles.furnitureslot2} resizeMode ="stretch"/> }
{furniture == "벽 가구" &&  <Image source={require('./assets/images/furnitureposition/wallclockslot.png')} style={styles.furnitureslot3} resizeMode ="stretch"/> }

{furniture == "바닥 가구" &&   <TouchableOpacity
                style={styles.furnitureslot1}
                onPress={() => showfurniturecheckDialog("규조토 매트", 2)} activeOpacity={1}>
<Image source={require('./assets/images/furnitureposition/footmatslot.png')} resizeMode ="stretch"/>
        </TouchableOpacity>} */}
{/* {furniture == "바닥 가구" &&  <Image source={require('./assets/images/furnitureposition/footmat1slot.png')} style={styles.furnitureslot1} resizeMode ="stretch"/> } */}
{/* {furniture == "바닥 가구" &&  <Image source={require('./assets/images/furnitureposition/furrugslot.png')} style={styles.furnitureslot2} resizeMode ="stretch"/> }
{furniture == "바닥 가구" &&  <Image source={require('./assets/images/furnitureposition/europeancarpetslot.png')} style={styles.furnitureslot3} resizeMode ="stretch"/> } */}


{/* {furniture == "wall" &&   <TouchableOpacity
                style={styles.furniturexbutton}
                onPress={hidefurnitureDialog} activeOpacity={1}>
          <Image source={require('./assets/images/furnitureposition/xbutton.png')} resizeMode ="stretch"/>
        </TouchableOpacity>} */}

{furniture == "벽 가구" && 
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{position : 'absolute', top : 110, left : 15, width : 300, height : 400, marginTop: 0}}>
        <View  >
          <FlatList
          data={WallFData}
          renderItem={renderFurniture}
          keyExtractor={(item) => item.key}
          numColumns={1}
          />
        </View >
        </ScrollView>
}

{furniture == "바닥 가구" && 
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{position : 'absolute', top : 110, left : 15, width : 300, height : 400, marginTop: 0}}>
        <View  >
          <FlatList
          data={FloorFData}
          renderItem={renderFurniture}
          keyExtractor={(item) => item.key}
          numColumns={1}
          />
        </View >
        </ScrollView>
}

  </Dialog.Content>
</Dialog>

{/* 가구 배치 확인 화면 */}

<Dialog visible={furniturecheckvisible} onDismiss={hidefurniturecheckDialog} style={styles.furniturecheck} >
  <Dialog.Content>
  <Paragraph style={styles.textcenter}><Text style={styles.furniturecheckfont}>'{furniturename}'</Text></Paragraph>
    <Paragraph style={styles.textcenter}><Text style={styles.furniturecheckfont}>이 가구를 배치하시겠습니까?</Text></Paragraph>
  </Dialog.Content>
  <Dialog.Actions>
    <Button disabled color={Colors.black} onPress={showfurniture} style={styles.furnitureyesbutton}><Text style={styles.yesbuttonfont}>네</Text></Button>
    <TouchableOpacity
                style={styles.furnitureyesbuttonbg}
                onPress={addfurnitureslot} activeOpacity={1}><Text></Text>
    </TouchableOpacity>

    <Button disabled color={Colors.black} onPress={hidefurniturecheckDialog} style={styles.furniturenobutton}><Text style={styles.nobuttonfont}>아니오</Text></Button>
    <TouchableOpacity
                style={styles.furniturenobuttonbg}
                onPress={() => setfurniturecheckVisible(false)} activeOpacity={1}><Text></Text>
    </TouchableOpacity>
  </Dialog.Actions>
</Dialog>

{/* 가구 추가 삭제 확인 화면 */}

{furniturecheck && (mainnum == 1 ? <Image source={require('./assets/images/main/main.png')} style={styles.main} resizeMode ="stretch"/>
: <Image source={require('./assets/images/main/main2.png')} style={styles.main} resizeMode ="stretch"/>)}
{furniturecheck ? furniturewallsRender  : <Text></Text>}
{furniturecheck ? furniturefloorsRender  : <Text></Text>}
{furniturecheck ? furtnitureremovebuttonRender  : <Text></Text>}
{furniturecheck && <MovingPet petnum={petnum} />  }
{furniturecheck && 
<TouchableOpacity
                style={styles.returntofurnituredialogbg}
                onPress={returntofurnituredialog} activeOpacity={1}>
          <Text style={styles.returntofurnituredialog}>돌아가기</Text>
</TouchableOpacity> }

{/* 도감 화면 */}

<Dialog visible={dictionaryvisible} onDismiss={hidedictionaryDialog} style={styles.dictionary}>
  <Dialog.Content>

  <Image style={styles.achievebg} source={require('./assets/images/dictionary/dictionarybg.png')} resizeMode ="stretch"/>
  <Text style={styles.dictionarytitlefont}>도감</Text>

  {(dictionarynum == 1) ? <Image style={styles.dicpage1} source={require('./assets/images/dictionary/page1.png')} resizeMode ="stretch"/>
  : <TouchableOpacity
  style={styles.dicpage1}
  onPress={() => setdictionarynum(1)} activeOpacity={1}>
<Image source={require('./assets/images/dictionary/page1.1.png')} resizeMode ="stretch"/>
</TouchableOpacity>
}

{(dictionarynum == 2) ? <Image style={styles.dicpage2} source={require('./assets/images/dictionary/page2.png')} resizeMode ="stretch"/>
  : <TouchableOpacity
  style={styles.dicpage2}
  onPress={() => setdictionarynum(2)} activeOpacity={1}>
<Image source={require('./assets/images/dictionary/page2.1.png')} resizeMode ="stretch"/>
</TouchableOpacity>
}

{(dictionarynum == 3) ? <Image style={styles.dicpage3} source={require('./assets/images/dictionary/page3.png')} resizeMode ="stretch"/>
  :   <TouchableOpacity
  style={styles.dicpage3}
  onPress={() => setdictionarynum(3)} activeOpacity={1}>
<Image source={require('./assets/images/dictionary/page3.1.png')} resizeMode ="stretch"/>
</TouchableOpacity>
}

  {dictionarynum == 1 && <TouchableOpacity
                style={styles.dicslot1}
                onPress={() => setdictionaryinfotrue(1)} activeOpacity={1}>
          <Image source={require('./assets/images/dictionary/pet1slot.png')} resizeMode ="stretch"/>
  </TouchableOpacity> }

  {dictionarynum == 2 && <TouchableOpacity
                style={styles.dicslot1}
                onPress={() => setdictionaryinfotrue(3)} activeOpacity={1}>
          <Image source={require('./assets/images/dictionary/pet3slot.png')} resizeMode ="stretch"/>
  </TouchableOpacity> }

  {dictionarynum == 3 &&  <TouchableOpacity
                style={styles.dicslot1}
                onPress={() => setdictionaryinfotrue(2)} activeOpacity={1}>
          <Image source={require('./assets/images/dictionary/pet2slot.png')} resizeMode ="stretch"/>
  </TouchableOpacity> }

  <TouchableOpacity
                style={styles.dicslot2}
                onPress={hidedictionaryDialog} activeOpacity={1}>
          <Image source={require('./assets/images/dictionary/dic2.png')} resizeMode ="stretch"/>
  </TouchableOpacity>

  {dictionarynum == 1 && 
          <Image style={styles.dicslot2} source={require('./assets/images/dictionary/pet1slot2.png')} resizeMode ="stretch"/>
  }
  
  {/* <Image style={styles.dicslot1} source={require('./assets/images/dictionary/dic1.png')} resizeMode ="stretch"/>  
  <Image style={styles.dicslot2} source={require('./assets/images/dictionary/dic2.png')} resizeMode ="stretch"/>   */}
  <Image style={styles.dicslot3} source={require('./assets/images/dictionary/dic3.png')} resizeMode ="stretch"/>  
  <Image style={styles.dicslot4} source={require('./assets/images/dictionary/dic4.png')} resizeMode ="stretch"/>
  <Image style={styles.dicslot5} source={require('./assets/images/dictionary/dic5.png')} resizeMode ="stretch"/>
  <Image style={styles.dicslot6} source={require('./assets/images/dictionary/dic6.png')} resizeMode ="stretch"/>


  {dictionaryinfo && <Text style={styles.dicinfobg1}></Text>}
  {dictionaryinfo && <Text style={styles.dicinfobg2}></Text>}
  {dictionaryinfo && <TouchableOpacity style={styles.dicinfopet} onPress={dictionaryinfoNext} activeOpacity={1}>
  <Image source={dictionaryinfos[dictionarypetnum-1].path} resizeMode ="stretch"/> 
  </TouchableOpacity>}

  </Dialog.Content>
</Dialog>

  {/* 설정 화면 */}

  <Dialog visible={settingvisible} onDismiss={hidesettingDialog} style={styles.setting}>
  <Dialog.Title style={styles.textcenter}>설정</Dialog.Title>
  <Dialog.Content>

  <TouchableOpacity
                style={styles.questmenu1}
                onPress={setsettingaccount} activeOpacity={1}>
          <Image source={require('./assets/images/quest/tab1.png')} resizeMode ="stretch"/>
          <Text style={styles.dailyreward}>계정 설정</Text>
        </TouchableOpacity>

  <TouchableOpacity
                style={styles.questmenu2}
                onPress={setsettinggame} activeOpacity={1}>
  <Image source={require('./assets/images/quest/tab2.png')} resizeMode ="stretch"/>
  <Text style={styles.attendancereward}>게임 설정</Text>
        </TouchableOpacity>

  {(setting == "account") ?
      <Text style={{...styles.questtitlefont, backgroundColor: "#959FFF"}}>계정 설정</Text> :
      <Text style={{...styles.questtitlefont, backgroundColor: "#3C3C94"}}>게임 설정</Text>
  }

{setting == "account" && <Image style={styles.settinggooglelogin} source={require('./assets/images/setting/googlelogin.png')} resizeMode ="stretch"/>}
{setting == "account" && <Image style={styles.settingfacebooklogin} source={require('./assets/images/setting/facebooklogin.png')} resizeMode ="stretch"/>}
{setting == "account" && <Image style={styles.settingdefaultlogin} source={require('./assets/images/setting/defaultlogin.png')} resizeMode ="stretch"/>}
{/* {setting == "account" && <Image style={styles.settingcoupon} source={require('./assets/images/setting/coupon.png')} resizeMode ="stretch"/>}
{setting == "account" && <Image style={styles.settingservicecenter} source={require('./assets/images/setting/servicecenter.png')} resizeMode ="stretch"/>} */}

{setting != "account" &&   <Text style={styles.qualitytext}>고품질 효과</Text>}
{setting != "account" &&  <TouchableOpacity
                style={styles.qualitybutton}
                onPress={changequality} activeOpacity={1}>
                <Image source={require('./assets/images/setting/offbutton.png')} resizeMode ="stretch"/>
</TouchableOpacity> }
{setting != "account" && isquality && <TouchableOpacity
                style={styles.qualitybutton}
                onPress={changequality} activeOpacity={1}>
                <Image source={require('./assets/images/setting/onbutton.png')} resizeMode ="stretch"/>
</TouchableOpacity> }

{setting != "account" &&   <Text style={styles.pushtext}>푸시알림</Text>}
{setting != "account" &&  <TouchableOpacity
                style={styles.pushbutton}
                onPress={changepush} activeOpacity={1}>
                <Image source={require('./assets/images/setting/onbutton.png')} resizeMode ="stretch"/>
</TouchableOpacity> }
{setting != "account" && !ispush && <TouchableOpacity
                style={styles.pushbutton}
                onPress={changepush} activeOpacity={1}>
                <Image source={require('./assets/images/setting/offbutton.png')} resizeMode ="stretch"/>
</TouchableOpacity> }

{setting != "account" &&   <Text style={styles.soundtext}>사운드</Text>}
{setting != "account" && <Image style={styles.soundbar} source={require('./assets/images/setting/soundbar.png')} resizeMode ="stretch"/>}
{/* {setting != "account" && <Image style={styles.settingcoupon} source={require('./assets/images/setting/coupon.png')} resizeMode ="stretch"/>}
{setting != "account" && <Image style={styles.settingservicecenter} source={require('./assets/images/setting/servicecenter.png')} resizeMode ="stretch"/>} */}

<Image style={styles.settingcoupon} source={require('./assets/images/setting/coupon.png')} resizeMode ="stretch"/>
<Image style={styles.settingservicecenter} source={require('./assets/images/setting/servicecenter.png')} resizeMode ="stretch"/>

  </Dialog.Content>
</Dialog>


{/* 창고 화면 */}

<Dialog visible={storevisible} onDismiss={hidestoreDialog} style={styles.stageScene}>
  <Dialog.Content>
  <Image style={styles.stagebg} source={require('./assets/images/shop/shopbg.png')} resizeMode ="stretch"/>
  <Image source={require('./assets/images/store/topbarbg.png')} style={styles.storetopbarbg} resizeMode ="stretch"/>
  <Image source={require('./assets/images/coin.png')} style={styles.storecoinimage} resizeMode ="cover"/>
  <Button disabled onPress={() => {}} style={styles.storecoinnum}><Text style={styles.coinfont}>{coin}</Text></Button>
  <Image source={require('./assets/images/diamond.png')} style={styles.storejamimage} resizeMode ="cover"/>
  <Button disabled onPress={() => {}} style={styles.storejamnum}><Text style={styles.coinfont}>{jam}</Text></Button>

  <Image source={require('./assets/images/shop/tabmenu.png')} style={styles.shoptabmenu} resizeMode ="cover"/>

  <TouchableOpacity
                style={styles.shoptab1}
                onPress={setstoretabeat} activeOpacity={1}>
        <Text style={styles.textcenter}>식사류</Text>
        </TouchableOpacity>
        <TouchableOpacity
                style={styles.shoptab2}
                onPress={setstoretabclean} activeOpacity={1}>
        <Text style={styles.textcenter}>청결류</Text>
        </TouchableOpacity>
        <TouchableOpacity
                style={styles.shoptab3}
                onPress={setstoretabfurniture} activeOpacity={1}>
        <Text style={styles.textcenter}>가구</Text>
        </TouchableOpacity>
  <TouchableOpacity
                style={styles.shoptab4}
                onPress={setstoretabmoney} activeOpacity={1}>
       <Text style={styles.textcenter}>재화</Text>
        </TouchableOpacity>

<View style={{...styles.shoptab1_1, left : 23.5 + (storetabnum-1)*(85+5/3)}}><Text style={styles.shoptabtext}>{storetabname}</Text></View>

<TouchableOpacity
      style={styles.shopbackbutton}
      onPress={hidestoreDialog} activeOpacity={1}>
    <Image source={require('./assets/images/shop/backbutton.png')} resizeMode ="cover"/>
  </TouchableOpacity> 

  {storetabnum == 1 && 
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{position : 'absolute', top : 150, left : 20, width : 400, height : 360, marginTop: 0}}>
        <View  >
          <FlatList
          data={StoreEatData}
          renderItem={renderStore}
          keyExtractor={(item) => item.key}
          numColumns={3}
          />
        </View >
        </ScrollView>
        }

{storetabnum == 2 && 
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{position : 'absolute', top : 150, left : 20, width : 400, height : 360, marginTop: 0}}>
        <View  >
          <FlatList
          data={StoreCleanData}
          renderItem={renderStore}
          keyExtractor={(item) => item.key}
          numColumns={3}
          />
        </View >
        </ScrollView>
        }
        
  {storetabnum == 3 && 
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{position : 'absolute', top : 150, left : 20, width : 400, height : 360, marginTop: 0}}>
        <View  >
          <FlatList
          data={StoreFurnitureData}
          renderItem={renderStore}
          keyExtractor={(item) => item.key}
          numColumns={3}
          />
        </View >
        </ScrollView>
        }
        
  {storetabnum == 4 && 
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{position : 'absolute', top : 150, left : 70, width : 300, height : 480, marginTop: 0}}>
        <View  >
          <FlatList
          data={ShopCostData}
          renderItem={renderShop}
          keyExtractor={(item) => item.key}
          numColumns={1}
          />
        </View >
        </ScrollView>
        }


    <Image style={styles.shopnpc} source={require('./assets/images/shop/shopnpc.png')} resizeMode ="cover"/>
    
    <TouchableOpacity style={styles.shopnpctext1} activeOpacity={1}><Text style={styles.shopnpctextfont}>오늘의 할인 물품은</Text></TouchableOpacity>
    <TouchableOpacity style={styles.shopnpctext2} activeOpacity={1}><Text style={styles.shopnpctextfont2}>"{todayitem}"</Text></TouchableOpacity>
    <TouchableOpacity style={styles.shopnpctext3} activeOpacity={1}><Text style={styles.shopnpctextfont}>라고</Text></TouchableOpacity>
    <TouchableOpacity style={styles.shopnpctext4} activeOpacity={1}><Text style={styles.shopnpctextfont}>놓치면 후회할걸?</Text></TouchableOpacity>

    <TouchableOpacity style={styles.shopnpcbutton} onPress={hideshopDialog} activeOpacity={1}><Text style={styles.shopnpcbuttonfont}>바로가기</Text></TouchableOpacity>
    
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

  {/* 식사 화면 */}

  <Dialog visible={eatvisible} dismissable={false} onDismiss={hideeatDialog} style={styles.eatmodal}>
      <Dialog.Content>

        {/* <Image style={styles.eatfruit} source={require('./assets/images/eat/fruit.png')} resizeMode ="stretch"/>
        <Image style={styles.eatmeat} source={require('./assets/images/eat/meat.png')} resizeMode ="stretch"/>
        <Image style={styles.eatetc} source={require('./assets/images/eat/etc.png')} resizeMode ="stretch"/>

        {eattabname == "과일" && <Text style={{ ...styles.eattabname, backgroundColor: "#FFCC18"}}>{eattabname}</Text>}
        {eattabname == "육류" && <Text style={{ ...styles.eattabname, backgroundColor: "#CA7222"}}>{eattabname}</Text>}
        {eattabname == "그외" && <Text style={{ ...styles.eattabname, backgroundColor: "#6C1C1C"}}>{eattabname}</Text>} */}

        {/* {(eattabname == "과일") ?
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
        onPress={seteattabetc} activeOpacity={1}><Text></Text></TouchableOpacity>} */}

        <Image style={styles.eatbg} source={require('./assets/images/eat/eattabbg.png')} resizeMode ="stretch"/> 

        <TouchableOpacity
                style={styles.eatfruit}
                onPress={seteattabfruit} activeOpacity={1}>
        <Text style={styles.textcenter}>과일</Text>
        </TouchableOpacity>
        <TouchableOpacity
                style={styles.eatmeat}
                onPress={seteattabmeat} activeOpacity={1}>
        <Text style={styles.textcenter}>육류</Text>
        </TouchableOpacity>
        <TouchableOpacity
                style={styles.eatetc}
                onPress={seteattabetc} activeOpacity={1}>
        <Text style={styles.textcenter}>그외</Text>
        </TouchableOpacity>

        <View style={{...styles.eattab_1, left : 40 + (eattabnum-1)*70}}><Text style={styles.textcenter}>{eattabname}</Text></View>
        
        {/* {eattabname == "과일" &&         <TouchableOpacity
                style={styles.eatslot1}
                onPress={() => showeatCheckDialog("사과")} activeOpacity={1}>
        <Image source={require('./assets/images/eat/appleslot.png')} resizeMode ="stretch"/>
        </TouchableOpacity>
        }
        {eattabname == "과일" && <Image style={styles.eatslot2} source={require('./assets/images/eat/watermelonslot.png')} resizeMode ="stretch"/>}
        {eattabname == "과일" &&         <TouchableOpacity
                style={styles.eatslot3}
                onPress={hideeatDialog} activeOpacity={1}>
        <Image source={require('./assets/images/eat/slotdefault.png')} resizeMode ="stretch"/>
        </TouchableOpacity>
        } */}

        {eattabname == "과일" && 
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{position : 'absolute', top : 85, left : 15, width : 300, height : 430}}>
        <View  >
          <FlatList
          data={FruitData}
          renderItem={renderEat}
          keyExtractor={(item) => item.key}
          numColumns={1}
          />
        </View >
        </ScrollView>
        }

        {/* {eattabname == "육류" && <Image style={styles.eatslot1} source={require('./assets/images/eat/beef.png')} resizeMode ="stretch"/>}
        {eattabname == "육류" && <Image style={styles.eatslot2} source={require('./assets/images/eat/chicken.png')} resizeMode ="stretch"/>}
        {eattabname == "육류" && <Image style={styles.eatslot3} source={require('./assets/images/eat/slotdefault.png')} resizeMode ="stretch"/>} */}

        {eattabname == "육류" && 
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{position : 'absolute', top : 85, left : 15, width : 300, height : 430}}>
        <View  >
          <FlatList
          data={MeatData}
          renderItem={renderEat}
          keyExtractor={(item) => item.key}
          numColumns={1}
          />
        </View >
        </ScrollView>
        }

        {/* {eattabname == "그외" && <Image style={styles.eatslot1} source={require('./assets/images/eat/coldpill.png')} resizeMode ="stretch"/>}
        {eattabname == "그외" && <Image style={styles.eatslot2} source={require('./assets/images/eat/headachepill.png')} resizeMode ="stretch"/>}
        {eattabname == "그외" && <Image style={styles.eatslot3} source={require('./assets/images/eat/slotdefault.png')} resizeMode ="stretch"/>} */}

        {eattabname == "그외" && 
                <ScrollView 
                showsVerticalScrollIndicator={false}
                style={{position : 'absolute', top : 85, left : 15, width : 300, height : 430}}>
        <View >
          <FlatList
          data={EtcData}
          renderItem={renderEat}
          keyExtractor={(item) => item.key}
          numColumns={1}
          />
        </View >
        </ScrollView>
        }

        {/* <TouchableOpacity
                style={styles.eatslot1button}
                onPress={hideeatDialog} activeOpacity={1}>
          <Image source={require('./assets/images/eat/appleslot.png')} resizeMode ="stretch"/>
        </TouchableOpacity> */}

        {/* <Text></Text>
        <TouchableOpacity
                style={styles.eattabbackbutton}
                onPress={hideeatDialog} activeOpacity={1}>
          <Text style={styles.textcenter}>X</Text>
        </TouchableOpacity>  */}

        {/* <View style={styles.eatslot1button}>
        <Button color={Colors.black} onPress={hideeatDialog} style={styles.eatslot1button}></Button> 
        </View> */}

</Dialog.Content>
</Dialog>

{/* 식사 확인 화면 */}

<Dialog visible={eatCheckVisible} onDismiss={hideeatCheckDialog} style={styles.furniturecheck} >
  <Dialog.Content>
  <Paragraph style={styles.textcenter}><Text style={styles.furniturecheckfont}>'{eatCheckText}'</Text></Paragraph>
    <Paragraph style={styles.textcenter}><Text style={styles.furniturecheckfont}>이것을 먹이겠습니까?</Text></Paragraph>
  </Dialog.Content>
  <Dialog.Actions>
    <TouchableOpacity
                style={styles.eatcheckyes}
                onPress={showPetEatScreen} activeOpacity={1}>
        <Text style={styles.eatcheckyesfont}>네</Text>
        </TouchableOpacity>

    <TouchableOpacity
                style={styles.eatcheckno}
                onPress={hideeatCheckDialog} activeOpacity={1}>
        <Text  style={styles.eatchecknofont}>아니오</Text>
        </TouchableOpacity>
  </Dialog.Actions>
</Dialog>

{/* 먹이기 화면 */}

{peteatscreenvisible == true && <PetEatScreen mainnum={mainnum} petnum={petnum} type={1} eatinfo={eatCheckText} imagepath={imagepath} hidePetEatScreen={hidePetEatScreen} eatpercent={eatpercent} />}

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

  {/* 청결 화면 */}

     <Dialog visible={cleanvisible} dismissable={false} onDismiss={hidecleanDialog} style={styles.eatmodal}>
      <Dialog.Content>

        {/* <Image style={styles.eatfruit} source={require('./assets/images/clean/brush.png')} resizeMode ="stretch"/>
        <Image style={styles.eatmeat} source={require('./assets/images/clean/detergent.png')} resizeMode ="stretch"/>
        <Image style={styles.eatetc} source={require('./assets/images/clean/tub.png')} resizeMode ="stretch"/>

        {cleantabname == "솔" && <Text style={{ ...styles.eattabname, backgroundColor: "#AAFFF0"}}>{cleantabname}</Text>}
        {cleantabname == "세정제" && <Text style={{ ...styles.eattabname, backgroundColor: "#3DACEA"}}>{cleantabname}</Text>}
        {cleantabname == "욕조" && <Text style={{ ...styles.eattabname, backgroundColor: "#25308E"}}>{cleantabname}</Text>} */}

        {/* {(cleantabname == "솔") ?
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
        onPress={setcleantabtub} activeOpacity={1}><Text></Text></TouchableOpacity>} */}

        <Image style={styles.eatbg} source={require('./assets/images/clean/cleantabbg.png')} resizeMode ="stretch"/> 

        <TouchableOpacity
          style={styles.eatfruit}
          onPress={setcleantabbrush} activeOpacity={1}>
        <Text style={styles.textcenter}>솔</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.eatmeat}
          onPress={setcleantabdetergent} activeOpacity={1}>
        <Text style={styles.textcenter}>세정제</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.eatetc}
          onPress={setcleantabtub} activeOpacity={1}>
        <Text style={styles.textcenter}>욕조</Text>
        </TouchableOpacity>

        <View style={{...styles.cleantab_1, left : 40 + (cleantabnum-1)*70}}><Text style={styles.textcenter}>{cleantabname}</Text></View>

        {/* {cleantabname == "솔" && <Image style={styles.eatslot1} source={require('./assets/images/clean/brushslot1.png')} resizeMode ="stretch"/>}
        {cleantabname == "솔" && <Image style={styles.eatslot2} source={require('./assets/images/clean/brushslot2.png')} resizeMode ="stretch"/>}
        {cleantabname == "솔" && <TouchableOpacity
          style={styles.eatslot3}
          onPress={hidecleanDialog} activeOpacity={1}>
        <Image source={require('./assets/images/clean/slotdefault.png')} resizeMode ="stretch"/>
        </TouchableOpacity>
        } */}

        {cleantabname == "솔" && 
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{position : 'absolute', top : 85, left : 15, width : 300, height : 430}}>
        <View  >
          <FlatList
          data={BrushData}
          renderItem={renderClean}
          keyExtractor={(item) => item.key}
          numColumns={1}
          />
        </View >
        </ScrollView>
        }

        {/* {cleantabname == "세정제" && <Image style={styles.eatslot1} source={require('./assets/images/clean/detergentslot1.png')} resizeMode ="stretch"/>}
        {cleantabname == "세정제" && <Image style={styles.eatslot2} source={require('./assets/images/clean/slotdefault.png')} resizeMode ="stretch"/>}
        {cleantabname == "세정제" && <Image style={styles.eatslot3} source={require('./assets/images/clean/slotdefault.png')} resizeMode ="stretch"/>} */}

        {cleantabname == "세정제" && 
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{position : 'absolute', top : 85, left : 15, width : 300, height : 430}}>
        <View  >
          <FlatList
          data={DetergentData}
          renderItem={renderClean}
          keyExtractor={(item) => item.key}
          numColumns={1}
          />
        </View >
        </ScrollView>
        }

        {/* {cleantabname == "욕조" && <Image style={styles.eatslot1} source={require('./assets/images/clean/tubslot1.png')} resizeMode ="stretch"/>}
        {cleantabname == "욕조" && <Image style={styles.eatslot2} source={require('./assets/images/clean/slotdefault.png')} resizeMode ="stretch"/>}
        {cleantabname == "욕조" && <Image style={styles.eatslot3} source={require('./assets/images/clean/slotdefault.png')} resizeMode ="stretch"/>} */}

        {cleantabname == "욕조" && 
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{position : 'absolute', top : 85, left : 15, width : 300, height : 430}}>
        <View  >
          <FlatList
          data={TubData}
          renderItem={renderClean}
          keyExtractor={(item) => item.key}
          numColumns={1}
          />
        </View >
        </ScrollView>
        }        

        {/* <Text></Text>
        <TouchableOpacity
                style={styles.eattabbackbutton}
                onPress={hidecleanDialog} activeOpacity={1}>
          <Text style={styles.textcenter}>X</Text>
        </TouchableOpacity>  */}

        </Dialog.Content>
</Dialog>

{/* 청결 확인 화면 */}

<Dialog visible={cleanCheckVisible} onDismiss={hidecleanCheckDialog} style={styles.furniturecheck} >
  <Dialog.Content>
  <Paragraph style={styles.textcenter}><Text style={styles.furniturecheckfont}>'{cleanCheckText}'</Text></Paragraph>
    <Paragraph style={styles.textcenter}><Text style={styles.furniturecheckfont}>이것으로 씻기겠습니까?</Text></Paragraph>
  </Dialog.Content>
  <Dialog.Actions>
    <TouchableOpacity
                style={styles.eatcheckyes}
                onPress={showPetCleanScreen} activeOpacity={1}>
        <Text style={styles.eatcheckyesfont}>네</Text>
        </TouchableOpacity>

    <TouchableOpacity
                style={styles.eatcheckno}
                onPress={hidecleanCheckDialog} activeOpacity={1}>
        <Text  style={styles.eatchecknofont}>아니오</Text>
        </TouchableOpacity>
  </Dialog.Actions>
</Dialog>

{/* 청소 화면 */}

{petcleanscreenvisible == true && <PetEatScreen mainnum={mainnum} petnum={petnum} type={2} eatinfo={cleanCheckText} imagepath={imagepath} hidePetEatScreen={hidePetCleanScreen} eatpercent={cleanpercent} />}


{/* 놀이 화면 */}

<Dialog visible={funvisible} onDismiss={hidefunDialog} style={styles.stageScene}>
  <Dialog.Content>
  <Image style={styles.minigamebg} source={require('./assets/images/fun/funbg.png')} resizeMode ="stretch"/>

  <Paragraph style={styles.minigamebg2}></Paragraph>
  <Paragraph style={styles.minigameimage}><Text style={styles.minigamefont}>미니게임 이미지</Text></Paragraph>

  <TouchableOpacity
                style={styles.gamestartbutton}
                onPress={showminigameDialog} activeOpacity={1}>
          <Image source={require('./assets/images/fun/gamestartbutton.png')} resizeMode ="stretch"/>
        </TouchableOpacity> 

        <TouchableOpacity
                style={styles.minigamexbutton}
                onPress={hidefunDialog} activeOpacity={1}>
          <Image source={require('./assets/images/fun/xbutton.png')} resizeMode ="stretch"/>
        </TouchableOpacity> 

  </Dialog.Content>
</Dialog>

{/* 놀이 결과 화면 */}

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

{/* 보상 정보 화면 */}

<Dialog visible={rewardvisible} onDismiss={hiderewardDialog} style={styles.reward}>
  <Dialog.Title style={styles.textcenter}>보상</Dialog.Title>
  <Dialog.Content>
  <Button disabled color={Colors.black} onPress={() => {}} style={styles.rewardinfo}><Text style={styles.textcenter}>보상 정보</Text></Button>
  </Dialog.Content>
  <Dialog.Actions>
  <Button color={Colors.black} onPress={hiderewardDialog} style={styles.rewardbutton}><Text style={styles.textcenter}>보상 받기</Text></Button>
  </Dialog.Actions>
</Dialog>

{/* 수면 화면 */}

<Dialog visible={sleepvisible} onDismiss={hidesleepDialog} style={styles.stageScene}>
  <Dialog.Content>
  {mainnum == 1 && <Image style={styles.sleepbg} source={require('./assets/images/sleep/bg.png')} resizeMode ="stretch"/> }
  {mainnum == 2 && <Image style={styles.sleepbg} source={require('./assets/images/sleep/bg2.png')} resizeMode ="stretch"/> }

  {petnum == 1 && <Image style={styles.sleeppet} source={require('./assets/images/sleep/pet1.png')} resizeMode ="stretch"/> }
  {petnum == 2 && <Image style={styles.sleeppet} source={require('./assets/images/sleep/pet2.png')} resizeMode ="stretch"/> }
  {petnum == 3 && <Image style={styles.sleeppet} source={require('./assets/images/sleep/pet3.png')} resizeMode ="stretch"/> }
  
  <Image style={styles.sleeptime} source={require('./assets/images/sleep/sleeptime.png')} resizeMode ="stretch"/>
  <Image style={styles.sleepbottombg} source={require('./assets/images/sleep/bottombg.png')} resizeMode ="stretch"/>
  <Image style={styles.skipsleeptime} source={require('./assets/images/sleep/skipsleeptime.png')} resizeMode ="stretch"/>
  <TouchableOpacity
                style={styles.sleepusebutton}
                onPress={hidesleepDialog} activeOpacity={1}>
          <Image source={require('./assets/images/sleep/usebutton.png')} resizeMode ="stretch"/>
        </TouchableOpacity> 
  </Dialog.Content>
</Dialog>

{/* <Dialog visible={foodvisible} onDismiss={hidefoodDialog} style={{ backgroundColor: Colors.grey500 }}>
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
</Dialog> */}

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

  absoluteContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
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

  furniturewallslot:{
    position: 'absolute',
    left : 0,
    top: 0,
  },

  furniturefloorslot:{
    position: 'absolute',
    left : 0,
    bottom: 50,
  },

  furniturewallremovebutton:{
    position: 'absolute',
    backgroundColor : 'white',
  },

  mainpetbg:{
    position: 'absolute',
    width : 175,
    height: 175,
    top: 400-10,
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
    left : 10-0.5,
    top: 10,
    fontSize: 12,
    color: 'black',
  },

  stageScene:{
    position : 'absolute',
    left : -24,
    top : -48,
    width : WINDOW_W,
    height : WINDOW_H,
  },

  mainstage:{
    position: 'absolute',
    width : 50,
    height: 50,
    left : 10,
    top: 100,
  },

  stagebg:{
    left : -26,
    top : -20,
    width : WINDOW_W,
    height : WINDOW_H,
  },

  stage1:{
    position : 'absolute',
    left : 50,
    top : 480,

  },

  stage2:{
    position : 'absolute',
    left : 50,
    top : 480+100,
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

  shopcoinimage:{
    position: 'absolute',
    width : 20,
    height: 20,
    left : 96+50+30+5,
    top: 50,
  },

  shopcoinnum:{
    position: 'absolute',
    width : 100,
    height: 20,
    left : 120+50+5,
    top: 40+1.5,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  shoptabmenu:{
    position: 'absolute',
    left : 23,
    top: 100,
  },

  shoptab1:{
    position: 'absolute',
    width : 100,
    height: 32,
    left : 23+0.5,
    top: 100,
    borderRadius : 20,
    justifyContent: 'center',
  },

  shoptab2:{
    position: 'absolute',
    width : 100,
    height: 32,
    left : 23+0.5+85+5/3,
    top: 100,
    borderRadius : 20,
    justifyContent: 'center',
  },

  shoptab3:{
    position: 'absolute',
    width : 100,
    height: 32,
    left : 23+0.5+85+5/3+85+5/3,
    top: 100,
    borderRadius : 20,
    justifyContent: 'center',
  },

  shoptab4:{
    position: 'absolute',
    width : 100,
    height: 32,
    left : 23+0.5+85+85+85+5,
    top: 100,
    borderRadius : 20,
    justifyContent: 'center',
  },


  shoptab1_1:{
    position: 'absolute',
    width : 100,
    height: 32,
    top: 100,
    borderRadius : 20,
    justifyContent: 'center',
    backgroundColor : '#8775BC'
  },

  shoptabtext:{
    textAlign : 'center',
    color : 'white',
  },

  shopbackbutton:{
    position: 'absolute',
    top: 40,
    right : 20,
  },

  shopeatslot1:{
    position: 'absolute',
    left : 70,
    top: 180,
  },

  shopeatslot2:{
    position: 'absolute',
    left : 70,
    top: 180+120,
  },

  shopeatslot3:{
    position: 'absolute',
    left : 70,
    top: 180+120+120,
  },

  shopeatslot4:{
    position: 'absolute',
    left : 70,
    top: 180+120+120+120,
  },

  shopnpc :{
    position: 'absolute',
    left : 100,
    top: 580,
  },

  shopnpctext1:{
    position: 'absolute',
    left : 140,
    top: 600-10,
    justifyContent : 'center',
  },

  shopnpctext2:{
    position: 'absolute',
    left : 100-20+2,
    top: 600-10+10+2,
    width : 120,
    justifyContent : 'center',
  },
  
  shopnpctext3:{
    position: 'absolute',
    left : 140+65,
    top: 600-10+10+3,
    justifyContent : 'center',
  },

  shopnpctext4:{
    position: 'absolute',
    left : 140+2,
    top: 600-10+10+10+5,
    justifyContent : 'center',
  },

  shopnpctextfont:{
    textAlign : 'center',
    fontSize : 11,
  },

  shopnpctextfont2:{
    textAlign : 'right',
    fontSize : 12,
    fontWeight : 'bold',
  },

  shopnpcbutton : {
    position: 'absolute',
    left : 160,
    top: 635-2,
    width : 48,
    height : 12,
    justifyContent : 'center',
    backgroundColor : '#695FE3',
    borderRadius : 15,
  },

  shopnpcbuttonfont : {
    textAlign : 'center',
    color : 'white',
    fontSize : 10,
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
    height: 20,
    left : 91,
    top: 60,
    borderRadius: 25,
    backgroundColor : '#FF9AB2',
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
    left : 15,
    bottom: 0,
    width : 400-3,
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
    left : 100,
    bottom: 5,
  },

  eatgaugebg:{
    position: 'absolute',
    left : 100,
    bottom: 5,
  },

  eatbutton:{
    position: 'absolute',
    left : 30,
    bottom: 5,
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

  cleangaugebg:{
    position: 'absolute',
    left : 110+80,
    bottom: 5,
  },

  cleangauge:{
    position: 'absolute',
    left : 110+80,
    bottom: 5,
  },

  cleanbutton:{
    position: 'absolute',
    left : 40+ 85,
    bottom: 5,
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

  fungaugebg:{
    position: 'absolute',
    left : 110+80+85+5,
    bottom: 5,
  },

  fungauge:{
    position: 'absolute',
    left : 110+80+85+5,
    bottom: 5,
  },

  funbutton:{
    position: 'absolute',
    left : 40+85+85+5,
    bottom: 5,
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

  sleepgaugebg:{
    position: 'absolute',
    left : 110+80+85+85+10+2,
    bottom: 5,
  },

  sleepgauge:{
    position: 'absolute',
    left : 110+80+85+85+10+2,
    bottom: 5,
  },

  sleepbutton:{
    position: 'absolute',
    left : 40+ 85+85+85+10,
    bottom: 5,
  },

  sleepbuttonfont:{
    fontSize: 15,
    color: 'black',
  },

  tutorial : {
    position: 'absolute',
    left : 0,
    top : 0,
  },

  tutorialimage : {
    width : WINDOW_W,
    height : WINDOW_H,
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

  minigamebg:{
    position: 'absolute',
    width : WINDOW_W,
    height: WINDOW_H,
    left : 0,
    top : 3,
  },

  minigamebg2 : {
    position: 'absolute',
    width : 300,
    height: 500,
    left : 55,
    top : 90,
    borderRadius : 20,
    backgroundColor : '#EEEEEE',
  },

  minigameimage:{
    position: 'absolute',
    width : 250,
    height: 300,
    left : 80,
    top : 120,
    backgroundColor : '#C4C4C4',
    textAlign:'center',
    textAlignVertical: 'center',
    borderRadius: 20,
  },

  minigamefont:{
    fontSize : 15,
  },


  gamestartbutton:{
    position: 'absolute',
    left : 130,
    top : 520,
  },

  minigamexbutton:{
    position: 'absolute',
    left : 327,
    top : 97,
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


  sleepbg:{
    position: 'absolute',
    width : WINDOW_W,
    height: WINDOW_H,
    left : -2,
    top : 4,
  },

  sleeppet:{
    position: 'absolute',
    left : 112,
    top : 400+10,
  },

  sleeptime:{
    position: 'absolute',
    left : 60,
    top : 100,
  },

  sleepbottombg:{
    position: 'absolute',
    width : WINDOW_W,
    left : 0,
    top : 595,
  },

  skipsleeptime :{
    position: 'absolute',
    left : 170,
    top : 610,
  },

  sleepusebutton :{
    position: 'absolute',
    left : 145,
    top : 650,
  },




  eatmodal:{
    position: 'absolute',
    width : 300,
    height : 550,
    left : 25,
    top : 30,
    backgroundColor : '#EEEEEE',
    borderRadius : 20,
  },

  eattabname:{
    top : 20,
    textAlign:'center',
    fontSize : 15,
    borderTopLeftRadius : 10,
    borderTopRightRadius : 10,
    padding : 10,
  },

  eattab_1 :{
    position: 'absolute',
    width : 80,
    height : 25,
    top : 40,
    borderRadius : 20,
    backgroundColor : '#FFCC18',
    justifyContent: 'center',
  },

  cleantab_1 :{
    position: 'absolute',
    width : 80,
    height : 25,
    top : 40,
    borderRadius : 20,
    backgroundColor : '#35AFF3',
    justifyContent: 'center',
  },

  eatfruit :{
    position: 'absolute',
    width : 80,
    height : 25,
    left : 40,
    top : 40,
    borderRadius : 20,
    justifyContent: 'center'
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
    width : 80,
    height : 25,
    left : 40+70,
    top : 40,
    borderRadius : 20,
    justifyContent: 'center'
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
    width : 80,
    height : 25,
    left : 40+140,
    top : 40,
    borderRadius : 20,
    justifyContent: 'center'
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
    top : 100+120,
    left : 15,
  },

  eatslot3:{
    position: 'absolute',
    top : 100+120+120,
    left : 15,
  },



  eattabbackbutton:{
    backgroundColor: Colors.blue50,
  },

  white : {
    color : 'white',
  },

  eatcheckyes : {
    position: 'absolute',
    width : 120,
    height : 40,
    left : 20,
    bottom : -20,
    backgroundColor : '#FFFFFF',
    justifyContent : 'center',
    borderRadius: 10,
    borderWidth : 1,
    borderColor : '#665AAC',
  },
  
  eatcheckyesfont : {
    textAlign : 'center'
  },

  eatcheckno : {
    position: 'absolute',
    width : 120,
    height : 40,
    right : 20,
    bottom : -20,
    backgroundColor : '#FFFFFF',
    justifyContent : 'center',
    borderRadius: 10,
    borderWidth : 1,
    borderColor : '#665AAC',
  },

  eatchecknofont : {
    textAlign : 'center'
  },

  furniturecheck:{
    backgroundColor: '#EEEEEE',
    position: 'absolute',
    left : 30,
    width : 300,
    height : 150,
  },


  itemcheck:{
    position: 'absolute',
    left : 30,
    top : 120,
    width : 300,
    height : 400,
    borderRadius : 20,
    backgroundColor : '#EEEEEE',
    borderColor : '#8775BC',
    borderWidth : 2,
  },

  itemimage :{
    position: 'absolute',
    left : 40,
    top : 10,
  },

  itemcost :{
    position: 'absolute',
    left : 130-1,
    top : 230,
    width : 20,
    height : 20,
  },

  itemcosttext :{
    position: 'absolute',
    left : 150+1,
    top : 230,
  },

  itemnumtext :{
    position: 'absolute',
    left : 150-5,
    top : 250+10,
  },

  downbutton :{
    position: 'absolute',
    left : 150-15-10,
    top : 250+15,
  },

  upbutton :{
    position: 'absolute',
    left : 150+15,
    top : 250+15,
  },

  itemchecktext:{
    position: 'absolute',
    left : 90,
    top : 300,
  },

  itemyesbutton:{
    position: 'absolute',
    width : 120,
    height : 40,
    left : 20,
    bottom : -310,
    backgroundColor : '#4D3C9B',
    justifyContent:'center',
    borderRadius: 10,
  },

  itemnobutton:{
    position: 'absolute',
    width : 120,
    height : 40,
    right : 20,
    bottom : -310,
    backgroundColor : '#E7D3F6',
    justifyContent:'center',
    borderRadius: 10,
  },

  itemyesbuttonfont:{
    textAlign:'center',
    fontSize : 15,
    color : 'white'
  },

  itemnobuttonfont:{
    textAlign:'center',
    fontSize : 15,
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
    color : 'black',
  },

  furnitureyesbutton:{
    position: 'absolute',
    width : 120,
    left : 20,
    bottom : -20,
    backgroundColor : '#FFFFFF',
    textAlign:'center',
    borderRadius: 10,
    borderWidth : 1,
    borderColor : '#665AAC',
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
    backgroundColor : '#FFFFFF',
    textAlign:'center',
    borderRadius: 10,
    borderWidth : 1,
    borderColor : '#665AAC',
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

  returntofurnituredialogbg : {
    position : 'absolute',
    width : 120,
    height : 50,
    top : 600-8,
    backgroundColor : 'white',
    borderRadius : 30,
    justifyContent: 'center',
  },

  returntofurnituredialog : {
    textAlign: 'center',
    textAlignVertical : 'center',
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
    height : 430+30,
    backgroundColor: '#00ff0000',
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
    top : 150+130,
  },

  achieveslot3bg:{
    position: 'absolute',
    width : 310,
    height : 75,
    left : 50,
    top : 150+130+130,
  },

  achieveslot4bg:{
    position: 'absolute',
    width : 310,
    height : 75,
    left : 50,
    top : 150+130+130+130,
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
    left : 300+15,
    top : 172,
  },

  achieveslot2check:{
    position: 'absolute',
    left : 300+15,
    top : 172+130,
  },

  achieveslot3check:{
    position: 'absolute',
    left : 300+15,
    top : 172+130+130,
  },

  achieveslot4check:{
    position: 'absolute',
    left : 300+15,
    top : 172+130+130+130,
  },

  achieveslot5check:{
    position: 'absolute',
    left : 300,
    top : 172+100+100+100+100,
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
    top : -100-5+20+20,
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
    top : -100-5+20+20,
  },

  menu1num:{
    position: 'absolute',
    left : 75,
    top : -95+20+20,
  },

  menu2num:{
    position: 'absolute',
    left : 215,
    top : -95+20+20,
  },

  menubg1 : {
    position: 'absolute',
    width : 300,
    height : 400+30,
    left : 0,
    bottom : -335-1-30,
  },

  eatbg:{
    position: 'absolute',
    width : 220,
    height : 30,
    left : 40,
    top : 40,
  },

  menufont:{
    position: 'absolute',
    left : 132,
    top : -80+50,
    color : 'black',
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

  furnituretabbg :{
    position: 'absolute',
    width : 200,
    height: 32,
    left : 50,
    top: 50,
    borderRadius : 20,
    justifyContent: 'center',
    borderWidth : 1,
    borderColor : '#665AAC'
  },

  furnituretab1:{
    position: 'absolute',
    width : 100,
    height: 32,
    left : 50,
    top: 50,
    borderRadius : 20,
    justifyContent: 'center',
  },

  furnituretab2:{
    position: 'absolute',
    width : 100,
    height: 32,
    left : 50+100,
    top: 50,
    borderRadius : 20,
    justifyContent: 'center',
  },

  furnituretab:{
    position: 'absolute',
    width : 100,
    height: 32,
    top: 50,
    borderRadius : 20,
    justifyContent: 'center',
    backgroundColor : '#665AAC'
  },

  furnitureslot1:{
    position: 'absolute',
    left : 20,
    top : 120,
  },

  furnitureslot2:{
    position: 'absolute',
    left : 20,
    top : 120+120,
  },

  furnitureslot3:{
    position: 'absolute',
    left : 20,
    top : 120+120+120,
  },


  attendbg:{
    position: 'absolute',
    width : 250,
    height : 400,
    left : 25,
    top : 50,
  },

  attend:{
    position: 'absolute',
    left : 0,
    top : 20,
  },

  attendawardbutton : {
    position: 'absolute',
    left : 100,
    top : 420,
    width : 100,
    height : 30,
    backgroundColor : '#695FE3',
    justifyContent : 'center',
    borderRadius : 15,
  },

  attendawardbuttontext:{
    color : 'white',
    textAlign : 'center',
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
    bottom : -70,
  },

  menuquestbutton:{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -70+5,
  },

  menuachieve:{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -160,
  },

  menuachievebutton:{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -160+5,
  },

  menufurniture:{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -250,
  },

  menufurniturebutton:{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -250+5,
  },

  menustore :{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -340,
  },

  menustorebutton :{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -340+5,
  },

  menushop :{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -100,
  },

  menushopbutton :{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -100+5,
  },

  menusetting:{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -200,
  },

  menusettingbutton:{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -200+5,
  },

  menudictionary:{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -300,
  },

  menudictionarybutton:{
    position: 'absolute',
    width : 200,
    height : 70,
    left : 50,
    bottom : -300+5,
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
    left : 240+50,
    top : 32,
  },
  
  dicpage3:{
    position: 'absolute',
    left : 240+50+50,
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

  dicinfobg1:{
    position: 'absolute',
    left : 0,
    top : 0,
    width : WINDOW_W,
    height : WINDOW_H,
  },

  dicinfobg2:{
    position: 'absolute',
    left : 0,
    top : 80,
    width : WINDOW_W,
    height : WINDOW_H,
    backgroundColor : '#F1ECF5',
  },

  dicinfopet:{
    position: 'absolute',
    left : 20,
    top : 20,
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

  // shopcoinimage:{
  //   position: 'absolute',
  //   width : 20,
  //   height: 20,
  //   left : 10,
  //   top: -55,
  // },

  // shopcoinnum:{
  //   position: 'absolute',
  //   width : 80,
  //   height : 30,
  //   left : 5,
  //   top: -60,
  //   justifyContent: 'center',
  //   backgroundColor: 'lightgray',
  // },

  shopcoinfont:{
    fontSize: 10,
  },

  buysuccess:{
    backgroundColor: '#EEEEEE',
    borderWidth : 2,
    borderColor : '#625A92',
    borderRadius : 20,
    position: 'absolute',
    left : 30,
    width : 300,
    height : 170,
  },

  buysuccesstext1:{
    position: 'absolute',
    left : 70,
    top: 30-3,
    fontSize : 15+3,
  },

  buysuccesstext2:{
    position: 'absolute',
    left : 70,
    top: 50+2,
    fontSize : 15+3,
  },

  checkbutton:{
    position: 'absolute',
    width : 120,
    height : 40,
    left : 90,
    top: 50,
    justifyContent: 'center',
    backgroundColor: '#665AAC',
    borderRadius : 10,
  },

  checkbuttonfont:{
    fontSize: 15,
    color : 'white'
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





  setting : {
    position: 'absolute',
    left : 30,
    width : 300,
    height : 430+120,
    backgroundColor: 'white',
    borderRadius : 0,
  },

  settinggooglelogin: {
    position: 'absolute',
    left : 25,
    top : 100,
  },

  settingfacebooklogin: {
    position: 'absolute',
    left : 25,
    top : 160,
  },

  settingdefaultlogin: {
    position: 'absolute',
    left : 25,
    top : 220,
  },

  settingcoupon: {
    position: 'absolute',
    left : 65-2,
    top : 340,
  },

  settingservicecenter: {
    position: 'absolute',
    left : 65-2,
    top : 400,
  },

  qualitytext : {
    position: 'absolute',
    left : 40-10,
    top : 100+5,
    fontSize : 15,
  },

  qualitybutton : {
    position: 'absolute',
    left : 150,
    top : 100,
  },

  pushtext : {
    position: 'absolute',
    left : 40,
    top : 180+5,
    fontSize : 15,
  },

  pushbutton : {
    position: 'absolute',
    left : 150,
    top : 180,
  },

  soundtext : {
    position: 'absolute',
    left : 40+5,
    top : 280-5,
    fontSize : 15,
  },
  soundbar : {
    position: 'absolute',
    left : 120,
    top : 280,
  },










  handlerbox:{
    width : 100,
    height: 100,
    backgroundColor : 'red',
  },







  storetopbarbg:{
    position: 'absolute',
    left: 65-2,
    top: 45+2.5,
    height : 36,
  },

  storecoinimage:{
    position: 'absolute',
    width : 20,
    height: 20+0.5,
    left : 72,
    top: 50,
  },

  storecoinnum:{
    position: 'absolute',
    width : 100,
    height: 20,
    left : 100-10,
    top: 40+1.5,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  storejamimage:{
    position: 'absolute',
    width : 20,
    height: 20+0.5,
    left : 72+150,
    top: 50+1,
  },

  storejamnum:{
    position: 'absolute',
    width : 100,
    height: 20,
    left : 100-10+150-5,
    top: 40+1.5,
    textAlign: 'center',
    textAlignVertical: 'center',
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
