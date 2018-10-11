import React from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, Button, FlatList } from "react-native";
import { List, ListItem, Card } from 'react-native-elements';
import Modal from "react-native-modal";

import { MainButton } from '../utils/Button';
import { getKeyByValue } from '../utils/Miscellaneous';

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
    socketId = getKeyByValue(this.props.userDict, userNameInfo.item)
    this.props.socket.emit('swapWithUser', socketId)
    this.props.onPress()
  }

  render(){
    const onPress = this.props.onPress
    const isModalVisible = this.props.isModalVisible
    const userDict = this.props.userDict
    const userList = Object.values(userDict)
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
        <Modal isVisible={isModalVisible} onBackdropPress={onCancel}>
          <View style={{marginTop: 450}}>
            <Text style={{color: "white"}}>{fromUser} wants to trade cards with you</Text>
            <View style={styles.swapContainer}>
              <View style={styles.swapButtonContainer}>
                <Button title="OK" onPress={onConfirm}/>
              </View>
              <View style={styles.swapButtonContainer}>
                <Button title="Cancel" onPress={onCancel}/>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

export class CardDescriptionModal extends React.Component{
  render(){
    const onPress = this.props.onPress
    const isModalVisible = this.props.isModalVisible
    return (
      <View>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={onPress}
          backdropOpacity={0.2}
        >
          <View style={{marginTop: 50}}>
            <Card title={this.props.cardTitle}>
              <Text><Text style={{fontWeight: "bold"}}>Goal: </Text>{this.props.description}</Text>
              <MainButton
                backgroundColor='#03A9F4'
                title="Go Back"
                onPress={onPress}
              />
            </Card>
          </View>
        </Modal>
      </View>
    )
  }
}

export class ResetServerModal extends React.Component{
  render(){
    const onConfirm = this.props.onConfirm
    const onCancel = this.props.onCancel
    const isModalVisible = this.props.isModalVisible
    return (
      <View>
        <Modal isVisible={isModalVisible} onBackdropPress={onCancel}>
          <View style={{marginTop: 450}}>
            <Text style={{color: "white"}}>Are you sure you want to kick everyone off the server?</Text>
            <View style={styles.swapContainer}>
              <View style={styles.swapButtonContainer}>
                <Button title="Yes" onPress={onConfirm}/>
              </View>
              <View style={styles.swapButtonContainer}>
                <Button title="Hell Nah" onPress={onCancel}/>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  swapContainer: {
    marginTop: 50,
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