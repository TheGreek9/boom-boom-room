import React from 'react';
import { Text, View, StyleSheet, TextInput, Alert } from "react-native";
import { List, ListItem } from 'react-native-elements';
import Modal from "react-native-modal";

export default class GameModal extends React.Component{
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

const styles = StyleSheet.create({
  textInputStyle: {
    marginTop: 20,
    height: 40,
    backgroundColor: "grey",

  }
});