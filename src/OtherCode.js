












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