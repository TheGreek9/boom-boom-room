import React from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, Button } from "react-native";
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
  render(){
    const onPress = this.props.onPress
    const isModalVisible = this.props.isModalVisible
    return (
      <View>
        <Modal isVisible={isModalVisible}  onBackdropPress={onPress}>
          <View style={{marginTop: 350}}>
            <Text style={{color: "white"}}>Who would you like to card swap with?</Text>
            <ScrollView>
              <Button title="Maddie" onPress={onPress}/>
              <Button title="Matt" onPress={onPress}/>
              <Button title="John" onPress={onPress}/>
              <Button title="Spyro" onPress={onPress}/>
              <Button title="Josh" onPress={onPress}/>
              <Button title="Alex" onPress={onPress}/>
              <Button title="Maddie" onPress={onPress}/>
              <Button title="Matt" onPress={onPress}/>
              <Button title="John" onPress={onPress}/>
              <Button title="Spyro" onPress={onPress}/>
              <Button title="Josh" onPress={onPress}/>
              <Button title="Alex" onPress={onPress}/>
              <Button title="Maddie" onPress={onPress}/>
              <Button title="Matt" onPress={onPress}/>
              <Button title="John" onPress={onPress}/>
              <Button title="Spyro" onPress={onPress}/>
              <Button title="Josh" onPress={onPress}/>
              <Button title="Alex" onPress={onPress}/>
            </ScrollView>
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