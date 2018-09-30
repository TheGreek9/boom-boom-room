import React from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, Button, FlatList } from "react-native";
import { List, ListItem } from 'react-native-elements';
import Modal from "react-native-modal";

export class UserNameModal extends React.Component{
  render(){
    const onPress = this.props.onPress
    const isModalVisible = this.props.isModalVisible
    return (
      <View>
        <Modal isVisible={isModalVisible}>
          <Text style={{color: "white"}}>Please enter your name:</Text>
          <TextInput
            style={styles.textInputStyle}
            onSubmitEditing={(event) => onPress(event.nativeEvent.text)}
            autoCapitalize="words"
            autoFocus={true}
            returnKeyType="done"
            enablesReturnKeyAutomatically={true}
            keyboardAppearance="dark"
          />
        </Modal>
      </View>
    )
  }
}

export class UserListModal extends React.Component{

  swapWithUser  = (userNameInfo) => {
    this.props.socket.emit('swapWithUser', this.props.userDict[userNameInfo.item])
    this.props.onPress()
  }

  render(){
    const onPress = this.props.onPress
    const isModalVisible = this.props.isModalVisible
    const userDict = this.props.userDict
    const userList = Object.keys(userDict)
    return (
      <View>
        <Modal isVisible={isModalVisible}  onBackdropPress={onPress}>
          <View style={{marginTop: 350}}>
            <Text style={{color: "white"}}>Who would you like to card swap with?</Text>
            <FlatList
              data={userList}
              keyExtractor={(item, index) => String(index)}
              renderItem={({item}) => <Button title={item} onPress={({itm}) => this.swapWithUser({item})}/>}
            />
          </View>
        </Modal>
      </View>
    )
  }
}

export class SwapRequestModal extends React.Component{
  render(){
    const onConfirm = this.props.onConfirm
    const onCancel = this.props.onCancel
    const isModalVisible = this.props.isModalVisible
    const fromUser = this.props.fromUser
    return (
      <View>
        <Modal isVisible={isModalVisible}>
          <Text style={{color: "white"}}>{fromUser} wants to trade cards with you</Text>
          <View style={styles.swapContainer}>
            <View style={styles.swapButtonContainer}>
              <Button title="OK" onPress={onConfirm}/>
            </View>
            <View style={styles.swapButtonContainer}>
              <Button title="Cancel" onPress={onCancel}/>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  swapContainer: {
    marginTop: 350,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swapButtonContainer: {
    flex: 1,
  },
  textInputStyle: {
    marginTop: 20,
    height: 40,
    backgroundColor: "grey",

  }
});