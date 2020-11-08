

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

export default class TitleScreen extends React.Component{
  MoveToIntro = () =>{
    navigation.navigate("Intro");
  }
render(){
  return(
    <View style={styles.container}>
    <Text style={styles.title}>TITLE</Text>
    <Button onPress = {MoveToIntro} style={styles.titlebutton}> <Text style={styles.titlebuttonfont}>화면을 터치해 주세요.</Text></Button>
  </View>
  )
}


}