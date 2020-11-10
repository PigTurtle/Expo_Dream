import React, { Component }  from 'react';
import { Modal, View, TouchableHighlight, Dimensions} from 'react-native';
import { Text, Button, } from 'react-native-paper';

const WINDOW_H = Dimensions.get('window').height;
const WINDOW_W = Dimensions.get('window').width;

export class MyModal extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        modalVisible : false,
      };
    }
  
    setModalVisible(visible){
      this.setState({
        modalVisible : visible,
      });
    }
  
    render() {
      return (
        <View>
        <Button onPress = {()=> {this.setModalVisible(true)}} style={objectStyles.myopenButton}> <Text style={objectStyles.textStyle}>Show Modal</Text></Button>
  
      <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          >
          <View style={objectStyles.centeredView}>
            <View style={objectStyles.modalView}>
              <Text style={objectStyles.modalText}>Hello World!</Text>
  
              <TouchableHighlight
                style={{ ...objectStyles.openButton, backgroundColor: "#2196F3" }}
                onPress={()=> {this.setModalVisible(!this.state.modalVisible)}}>
                <Text style={objectStyles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        </View>
          );
    }
  }

const objectStyles = {
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width : WINDOW_W,
        height : WINDOW_H - 50,
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      myopenButton: {
        position : 'absolute',
        top : 50,
        left : -50,
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
}