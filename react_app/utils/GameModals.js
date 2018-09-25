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
  constructor(props) {
    super(props);
    const userList = [];
    const userDict = {};

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
              renderItem={({item}) => <Button title={item} onPress={onPress}/>}
            />
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInputStyle: {
    marginTop: 20,
    height: 40,
    backgroundColor: "grey",

  }
});