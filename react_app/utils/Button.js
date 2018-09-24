import React from 'react';
import { Button } from 'react-native-elements';
import {StyleSheet, TouchableOpacity} from "react-native";

export default class BoomButton extends React.Component{
    render(){
        const { onPress, title, disabled } = this.props
        return (
            <Button
                Component={TouchableOpacity}
                raised
                buttonStyle={styles.button}
                title={title}
                onPress={onPress}
                disabled={disabled}
                disabledStyle={{opacity: 0}}
            />
        )
    }
}

BoomButton.defaultProps = {
  disabled: false
}

const styles = StyleSheet.create({
  button: {
      backgroundColor: '#03A9F4',
      margin: 10,
      borderRadius: 10,
  }
});